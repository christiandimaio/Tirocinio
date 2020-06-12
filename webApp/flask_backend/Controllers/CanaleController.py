import psycopg2
from flask import request, jsonify
from flask_restful import Resource
from connection import db, db_session, commit
from Model import Stazione_Sismica
from Model import Componente
from Model import Sensore, Acquisitore, Canale
from Model import Localizzazione
from Model import Nota
from Model import Operatore
from Model import Responsabile
from Model import Operazione
from pony.orm import *
import jsonpickle


class PostCanale(Resource):
    @staticmethod
    def post(codice_stazione):
        if request.json is None:
            return jsonify(operationCode=404, message="Bad Request")
        with db_session:
            try:
                _stazione = Stazione_Sismica.select(lambda stazione: stazione.codice_stazione == codice_stazione) \
                    .first()
                _sensore = Sensore.select(lambda sensore: sensore.componente.seriale == request.json["seriale_sensore"]) \
                    .first()
                _acquisitore = Acquisitore.select(
                    lambda acquisitore: acquisitore.componente.seriale == request.json["seriale_acquisitore"]) \
                    .first()
                if _stazione and _sensore and _acquisitore:
                    canale = Canale(stazione_sismica=_stazione,
                                    sensore=_sensore,
                                    acquisitore=_acquisitore,
                                    check_canale=True,
                                    componente_sensore=request.json["componente_sensore"],
                                    n_canale_acquisitore=request.json["n_canale_acquisitore"],
                                    inclinazione=request.json["inclinazione"],
                                    azimuth=request.json["azimuth"],
                                    data_creazione_canale=request.json["data_creazione_canale"],
                                    profondita=request.json["profondita"],
                                    location_code=request.json["location_code"])
            except Exception as ex:
                return jsonify(operationCode=500)


class GetCanali(Resource):
    @staticmethod
    @db_session
    def get(codice_stazione):
        canali = select((canale) for canale in Canale
                        if canale.stazione_sismica.codice_stazione == codice_stazione) \
            .order_by(Canale.data_creazione_canale, Canale.location_code)

        if len(canali) != 0:
            return jsonify(operationCode=200,
                           stazione=list(canali).pop().stazione_sismica.to_dict(),
                           items=[{"info": canale.to_dict(),
                                   "acquisitore": canale.acquisitore.componente.to_dict(),
                                   "sensore": canale.sensore.componente.to_dict()} for canale in canali])
        else:
            stazione = Stazione_Sismica.select(lambda stazione: stazione.codice_stazione == codice_stazione).first()
            if stazione is not None:
                return jsonify(operationCode=404,stazione=stazione.to_dict(),items=[],message="Non ci sono canali")
            else:
                return jsonify(operationCode=500, message="Stazione non trovata")
