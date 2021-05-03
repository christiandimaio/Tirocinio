import psycopg2
from flask import request, jsonify
from flask_restful import Resource
from Model import Cavo
from pony.orm import *


class GetCaviMagazzino(Resource):
    @staticmethod
    @db_session
    def get():
        cavi = Cavo.select()
        _cavi = []
        for cavo in cavi:
            if cavo.componente.can_install():
                _cavi.append(cavo)
        if len(_cavi) > 0:
            return jsonify(operationCode=200, items=[cavo.to_dict() for cavo in _cavi],
                           info=[cavo.componente.to_dict(with_collections=True) for cavo in _cavi])
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")
