import psycopg2
from flask import request, jsonify
from flask_restful import Resource
from connection import db_session, commit
from Model import Regolatore_Carica, Componente, Nrl
from pony.orm import *
from pony.orm.serialization import to_json
from connection import db


class GetRegolatoriCaricaMagazzino(Resource):
    @staticmethod
    @db_session
    def get():
        regolatori_carica = Regolatore_Carica.select()
        _regolatori_carica = []
        for regolatore_carica in regolatori_carica:
            if regolatore_carica.componente.can_install():
                _regolatori_carica.append(regolatore_carica)
        if len(_regolatori_carica) > 0:
            return jsonify(operationCode=200, items=[regolatore_carica.to_dict() for regolatore_carica in _regolatori_carica],
                           info=[regolatore_carica.componente.to_dict(with_collections=True) for regolatore_carica in _regolatori_carica])
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")
