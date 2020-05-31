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


class PostStazioneSismica(Resource):
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

class GetStazioneSismicaInfo(Resource):
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

class GetStazione(Resource):
    @staticmethod
    def get(codice_stazione):
        operatori=[]
        with db_session:
            try:
                stazione = Stazione_Sismica.select(lambda stazione: stazione.codice_stazione==codice_stazione).first()
                if stazione:
                    responsabili = list(stazione.responsabili.operatore)
                    for resposabile in responsabili:
                        operatori.append(""+resposabile.nome+" "+resposabile.cognome)
                    return jsonify(operationCode=200,item=stazione.to_dict(),responsabili=operatori,nota=stazione.note.nota)
                else:
                    return jsonify(operationCode=404)
            except Exception as ex:
                return jsonify(operationCode=500)
        return jsonify(operationCode=500)


class GetOperazioniStazione(Resource):
    @staticmethod
    def get(codice_stazione):
        with db_session:
            operazioni = select ((operazioni) for operazioni in Operazione
                                              if operazioni.stazione_sismica.codice_stazione==codice_stazione)[:]
            result = []
            for operazione in operazioni:
                result.append({
                    "componente":{
                        "seriale":operazione.componente.seriale if operazione.componente is not None else "",
                        "produttore":operazione.componente.produttore if operazione.componente is not None else "",
                        "nome":operazione.componente.nome if operazione.componente is not None else ""
                    },
                    "operazione":{
                        "tipo_operazione":operazione.tipo_operazione,
                        "data_inizio_operazione":operazione.data_inizio_operazione,
                        "data_fine_operazione":operazione.data_fine_operazione,
                    },
                    "operatore":{
                        "nome_cognome":operazione.operatore.nome+" "+operazione.operatore.cognome,
                        "note":operazione.note_operazione
                    }
                })
            return jsonify(operationCode=200,data=result)

class GetComponenteStazione(Resource):
    @staticmethod
    @db_session
    def get(codice_stazione,seriale):
        max_data = max((operazione.data_inizio_operazione) for operazione in Operazione
                                                    if operazione.stazione_sismica.codice_stazione==codice_stazione
                                                        and operazione.componente.seriale==seriale)
        operazione = select((operazione) for operazione in Operazione
                                                    if operazione.stazione_sismica.codice_stazione==codice_stazione
                                                        and operazione.componente.seriale==seriale
                                                            and operazione.data_inizio_operazione==max_data).first()


        if operazione and operazione.tipo_operazione != "Rimozione":
            return jsonify(operationCode=200, item=operazione.componente.to_dict())
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")

class InsertOperazione(Resource):
    @staticmethod
    def post(codice_stazione):
        with db_session:
            try:

                stazione = Stazione_Sismica.select(lambda stazione:stazione.codice_stazione==codice_stazione)\
                                            .first()
                operatore_incaricato = Operatore[request.json["operatore_incaricato"]]

                if stazione and operatore_incaricato:
                    operazione = Operazione(stazione_sismica=stazione,
                                            operatore=operatore_incaricato,
                                            data_inizio_operazione=request.json["data_inizio_operazione"],
                                            data_fine_operazione=request.json["data_fine_operazione"],
                                            tipo_operazione=request.json["tipo_operazione"],
                                            note_operazione=request.json["note"])

                if request.json["seriale_componente"] != "" and request.json["tipo_operazione"] != "Altro":
                    componente = Componente.select(lambda componente: componente.seriale == request.json["seriale_componente"])\
                                            .first()
                    operazione.componente=componente

                return jsonify(operationCode="200")
            except Exception as ex:
                rollback()
                return jsonify(operationCode=500, message="OPS! Qualcosa è andato storto")
        return jsonify(operationCode=500,message="OPS! Qualcosa è andato storto")