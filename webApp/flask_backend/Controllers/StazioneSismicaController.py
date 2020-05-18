import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from connection import db,db_session, commit
from Model import Stazione_Sismica
from Model import Componente
from Model import Gps
from Model import Localizzazione
from pony.orm import *


class postStazioneSismica(Resource):
    @staticmethod
    def post():
        with db_session:
            station = Stazione_Sismica(codice_stazione="IOCA", tipo_stazione="Analogica")
            componente = Componente(seriale="WIEWD232", codice_ov="12312", produttore="Garmin", nome="T3")
            gps = Gps(componente=componente)
            localizzazione = Localizzazione(gps=gps, stazione_sismica=station, latitudine=40.863,
                                            longitudine=14.2503)
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
