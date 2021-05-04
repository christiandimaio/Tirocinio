import psycopg2
from flask import request, jsonify
from flask_restful import Resource
from connection import db_session, commit
from Model import Memoria_Massa, Componente
from pony.orm import *
from pony.orm.serialization import to_json
from connection import db


class GetMemorieMassaMagazzino(Resource):
    @staticmethod
    @db_session
    def get():
        memorie_massa = Memoria_Massa.select()
        _memorie_massa = []
        for memoria_massa in memorie_massa:
            if memoria_massa.componente.can_install():
                _memorie_massa.append(memoria_massa)
        if len(_memorie_massa) > 0:
            return jsonify(operationCode=200, items=[memoria_massa.to_dict() for memoria_massa in _memorie_massa],
                           info=[memoria_massa.componente.to_dict(with_collections=True) for memoria_massa in _memorie_massa])
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")
