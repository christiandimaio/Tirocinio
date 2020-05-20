import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from connection import db_session, commit
from Model import Gps
from Model import Operazione
from pony.orm import *
from pony.orm.serialization import to_json
from connection import db

class GetGps(Resource):
    @staticmethod
    @db_session
    def get(seriale):
        possible_to_install=False
        installed=False
        gps = Gps.select(lambda gps: gps.componente.seriale == seriale).first()

        if gps :
            return jsonify(operationCode=200,item=gps.to_dict(),info=gps.componente.to_dict(with_collections=True),possible_to_install=gps.componente.can_install(),
                           installed=gps.componente.check_operation_supported())
        else:
            return jsonify(operationCode=404,message="Not Found")
        return jsonify(operationCode=500,message="Internal Error")