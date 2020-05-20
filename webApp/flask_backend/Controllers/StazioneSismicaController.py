import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from connection import db,db_session, commit
from Model import Stazione_Sismica
from Model import Componente
from Model import Gps,Canale
from Model import Localizzazione
from Model import Nota
from Model import Operatore
from Model import Responsabile
from Model import Operazione
from pony.orm import *


class postStazioneSismica(Resource):
    @staticmethod
    def post():
        print(request.json)
        try:
            with db_session:
                gps = Gps.select(lambda gps: gps.componente.seriale == request.json["seriale_gps"]).first()
                operatore_installazione = Operatore[request.json["operatore_installazione"]]
                operatori=[]
                if request.json["responsabile_1"]:
                    operatori.append(Operatore[request.json["responsabile_1"]])
                if request.json["responsabile_2"]:
                    operatori.append(Operatore[request.json["responsabile_2"]])
                if request.json["responsabile_3"]:
                    operatori.append(Operatore[request.json["responsabile_3"]])
                if request.json["responsabile_4"]:
                    operatori.append(Operatore[request.json["responsabile_4"]])
                responsabili = []

                station = Stazione_Sismica(codice_stazione=request.json["codice_stazione"],
                                           tipo_stazione=request.json["tipo_stazione"],
                                           altezza_lv_mare=request.json["altezza_lv_mare"],
                                           frequenza_manutenzione=request.json["periodo_manutenzione"])
                nota = Nota(nota=request.json["note_aggiuntive"],stazione_sismica=station)
                localizzazione = Localizzazione(gps=gps, stazione_sismica=station, latitudine=request.json["latitudine"],
                                                longitudine=request.json["longitudine"])
                for operatore in operatori:
                    responsabili.append(Responsabile(stazione_sismica=station,operatore=operatore))
                station.responsabili = responsabili
                installazione = Operazione(stazione_sismica=station,
                                           componente=gps.componente,
                                           operatore=operatore_installazione,
                                           tipo_operazione="Installazione",
                                           note_operazione=request.json["note_aggiuntive"])

        except Exception as ex:
            rollback()
            return jsonify(operationCode=500,message="Errore durante inserimento della stazione, riprovare")
        return jsonify(operationCode=200)

class getStazioneSismicaInfo(Resource):
    @staticmethod
    def get():
        with db_session:
            stazioni = select((stazioni, avg(stazioni.localizzazioni.latitudine),
                               avg(stazioni.localizzazioni.longitudine), count(stazioni.operazioni_svolte)) for stazioni
                              in Stazione_Sismica)
            list = []
            for stazione in stazioni:
                list.append({
                    "id_univoco": stazione[0].id,
                    "tipo_stazione": stazione[0].tipo_stazione,
                    "codice": stazione[0].codice_stazione,
                    "data_messa_funzione": stazione[0].data_messa_funzione.strftime("%d/%m/%Y"),
                    "numero_operazioni": stazione[3],
                    "latitudine": stazione[1],
                    "longitudine": stazione[2],
                    "is_attiva": stazione[0].is_attiva()
                })
        return jsonify(data=list)
