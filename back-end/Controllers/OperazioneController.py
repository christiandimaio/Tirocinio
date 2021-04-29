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


class InsertOperazione(Resource):
    @staticmethod
    def post(codice_stazione):
        with db_session:
            try:

                stazione = Stazione_Sismica.select(lambda stazione:stazione.codice_stazione==codice_stazione)\
                                            .first()
                operatore_incaricato = Operatore[request.json["operatore_incaricato"]]
                #Inserisco un'operazione solo se ho validato stazione ed operatore
                if stazione and operatore_incaricato:
                    operazione = Operazione(stazione_sismica=stazione,
                                            operatore=operatore_incaricato,
                                            data_inizio_operazione=request.json["data_inizio_operazione"],
                                            data_fine_operazione=request.json["data_fine_operazione"],
                                            tipo_operazione=request.json["tipo_operazione"],
                                            note_operazione=request.json["note"])
                # Inserisco un componente solo se il tipo di operazione lo prevede
                if request.json["seriale_componente"] != "" and request.json["tipo_operazione"] != "Altro":
                    componente = Componente.select(lambda componente: componente.seriale == request.json["seriale_componente"])\
                                            .first()
                    operazione.componente=componente

                return jsonify(operationCode=200)
            except Exception as ex:
                rollback()
                return jsonify(operationCode=500, message="OPS! Qualcosa e' andato storto")
        return jsonify(operationCode=500,message="OPS! Qualcosa e' andato storto")