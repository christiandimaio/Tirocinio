import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from connection import db_session, commit
from Model import Componente
from pony.orm import *
from pony.orm.serialization import to_json
from connection import db

class GetComponente(Resource):
    @staticmethod
    @db_session
    def get(seriale):
        componente = Componente.select(lambda componente: componente.seriale == seriale)[:1]
        if componente :
            return jsonify(operationCode=200,item=componente,possible_to_install=componente.can_install(),
                           installed=componente.check_operation_supported())
        else:
            return jsonify(operationCode=404,message="Not Found")
        return jsonify(operationCode=500,message="Internal Error")