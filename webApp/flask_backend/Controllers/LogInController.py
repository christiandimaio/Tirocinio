from flask import request,jsonify
from flask_restful import Resource
from pony.orm import *

from Model import Log_In
from LoginManager import *


class Auth(Resource):
    @staticmethod
    @db_session
    def post():
        """
           CODE RESPONSE : 201 = SOME ERRORS HAS OCCURRED
                           200 = OK, LOGGED
        """
        content = request.json
        email = content['email']
        password = content['password']
        rememberME = content['rememberME']
        print(email)
        print(password)

        try:
            user = Log_In.select(lambda user: user.email == email).first()
            if user:
                if user.is_online:
                    return jsonify(operationCode=201, message="Utente già loggato!")
                if user.password == password:
                    user.remember_me = rememberME
                    user.is_online = True

                    print(user.operatore.nome)
                    print("logged in")
                    loadUser(user)
                    return jsonify(operationCode=200, message="OK")

        except pony.orm.core.ObjectNotFound as ex:
            return jsonify(operationCode=201, message="Utente inesistente!")
        return jsonify(operationCode=201, message="Errore")

class DeAuth(Resource):
    @staticmethod
    def get():
        print("log_out called")
        user = currentUser()
        with db_session:
            user.is_online=False
        logoutUser()
        print("logged out")
        return jsonify(operationCode=200)