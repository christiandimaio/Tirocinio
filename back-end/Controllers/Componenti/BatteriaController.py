import psycopg2
from flask import request, jsonify
from flask_restful import Resource
from Model import Batteria
from pony.orm import *


class GetBatterieMagazzino(Resource):
    @staticmethod
    @db_session
    def get():
        batterie = Batteria.select()
        _batterie = []
        for batteria in batterie:
            if batteria.componente.can_install():
                _batterie.append(batteria)
        if len(_batterie) > 0:
            return jsonify(operationCode=200, items=[batteria.to_dict() for batteria in _batterie],
                           info=[batteria.componente.to_dict(with_collections=True) for batteria in _batterie])
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")
