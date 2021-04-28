from flask import request, jsonify
from flask_restful import Resource
from Model import Acquisitore, Componente, Nrl
from pony.orm import *


class PostAcquisitore(Resource):
    @staticmethod
    @db_session
    def post(seriale):
        acquisitore = Acquisitore.select(lambda acquisitore: acquisitore.componente.seriale == seriale).first()
        if acquisitore:
            return jsonify(operationCode=500, message="Sensore già presente in magazzino o installato in una stazione")
        try:
            componente = Componente(
                seriale=seriale,
                codice_ov=request.json["codice_ov"],
                data_acquisto=request.json["data_acquisto"],
                periodo_manutenzione=request.json["periodo_manutenzione"],
                produttore=request.json["data_acquisto"],
                nome=request.json["nome"],
                larghezza_mm=request.json["larghezza_mm"],
                altezza_mm=request.json["altezza_mm"],
                profondita_mm=request.json["profondita_mm"],
            )
            nrl = Nrl.select(lambda nrl: nrl.livello_1==request.json["livello_1"] and
                                nrl.livello_2==request.json["livello_2"] and
                                nrl.livello_3==request.json["livello_3"] and
                                nrl.livello_4==request.json["livello_4"]).first()
            if nrl:
                _nrl = nrl
            else:
                _nrl = Nrl(
                    livello_1=request.json["livello_1"],
                    livello_2=request.json["livello_2"],
                    livello_3=request.json["livello_3"],
                    livello_4=request.json["livello_4"]
                )
            acquisitore = Acquisitore(
                componente=componente,
                n_canali=request.json["n_canali"],
                nrl=_nrl
            )
            return jsonify(operationCode=200)
        except Exception as ex:
            rollback()
            return jsonify(operationCode=500, message="OPS! Qualcosa è andato storto")
        return jsonify(operationCode=500, message="OPS! Qualcosa è andato storto")