import psycopg2
from flask import request, jsonify
from flask_restful import Resource
from connection import db_session, commit
from Model import Pannello_Solare, Componente, Nrl
from pony.orm import *
from pony.orm.serialization import to_json
from connection import db


class GetPannelliSolariMagazzino(Resource):
    @staticmethod
    @db_session
    def get():
        pannelli_solari = Pannello_Solare.select()
        _pannelli_solari = []
        for pannello_solare in pannelli_solari:
            if pannello_solare.componente.can_install():
                _pannelli_solari.append(pannello_solare)
        if len(_pannelli_solari) > 0:
            return jsonify(operationCode=200, items=[pannello_solare.to_dict() for pannello_solare in _pannelli_solari],
                           info=[pannello_solare.componente.to_dict(with_collections=True) for pannello_solare in _pannelli_solari])
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")
