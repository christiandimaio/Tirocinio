import psycopg2
from flask import Flask, render_template, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required
import os
import sys
from filelock import FileLock
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
import models

sys.path.append('./myPackage/Utils/')
sys.path.append('./myPackage/NrlWrap/')
import Utils



class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:root@localhost:5432/user"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)


# login_manager.login_view = '/login'


@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.
    :param unicode user_id: user_id (email) user to retrieve
    """
    return models.UserModel.query.get(str(user_id))


@app.route("/api/login", methods=['GET', 'POST'])
def log_in():
    """
    CODE RESPONSE : 201 = SOME ERRORS HAS OCCURRED
                    200 = OK, LOGGED
    """
    if request.method == "GET":
        return render_template('login.html')
    content = request.json
    email = content['email']
    password = content['password']
    rememberMe = content['rememberME']
    print(email)
    print(password)
    user = models.UserModel.query.filter_by(email=email).first()
    if user:
        if user.check_password(password):
            login_user(user, remember=rememberMe)
            print("logged in")
            return jsonify(operationCode=200)
        else:
            return jsonify(operationCode=201,message="Password Errata!")
    return jsonify(operationCode=201,message="Utente inesistente!")


@app.route("/", methods=["GET"])
@login_required
def main_app():
    return render_template("app.html")


@app.route("/api/logout", methods=["GET"])
@login_required
def log_out():
    print("log_out called")
    logout_user()
    print("logged out")
    return jsonify(operationCode=200)


@app.route("/api/main", methods=["GET"])
@login_required
def test():
    return jsonify(ok=1)


"""----------------------------------------------------------------------------"""
"""Database Select"""


@app.route("/api/database/select/user/type", methods=["GET"])
def get_user_type():
    return jsonify(operationCode=200, items=["Esterno","Operatore Semplice","Autorizzato"])


"""----------------------------------------------------------------------------"""
"""Database Insert"""


# Sign In
@app.route("/api/database/insert/user", methods=["POST"])
def sign_in():
    print(request.json)
    user = models.UserModel(request.json['email'], request.json['password'])
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError as ex:
        if ex.orig.__class__ == psycopg2.errors.UniqueViolation:
            return jsonify(operationCode=201,message="Utente già registrato!")
        else:
            return jsonify(operationCode=201)
    return jsonify(operationCode=200)


"""----------------------------------------------------------------------------"""
"""Check Directory Route"""


@app.route("/api/check/directory/nrl", methods=["GET"])
def check_nrl_folder_status():
    """
    CODE RESPONSE :
                    201 = NRL In Updating
                    199 = SOME ERROR HAS OCCURRED
                    200 = OK
    """
    try:

        if nrl_update_lock.is_locked:
            return jsonify(result=201)
    except Exception as ex:
        print(ex)
        return jsonify(result=199)
    return jsonify(result=200)


"""______----------------------------------------------------------------------"""
"""Update Route"""


@app.route("/api/update/NRL", methods=["GET"])
def update_nrl():
    """
    CODE RESPONSE : 201 = UPDATE IS ALREADY CALLED
                    199 = SOME ERROR HAS OCCURRED
                    200 = OK, UPDATED
    """
    try:

        if nrl_update_lock.is_locked:
            return jsonify(result=201)
        """Istanzio un file di lock """
        nrl_update_lock.acquire()
        Utils.update_nrl_structure()
        """Rimuovo il lock """
        nrl_update_lock.release()
    except Exception as ex:
        print(ex)
        nrl_update_lock.release()
        return jsonify(result=199)
    return jsonify(result=200)


if __name__ == "__main__":
    nrl_update_lock = FileLock(os.path.join(Utils.retrieve_config_value(["application", "lock_folder"]),
                                            Utils.retrieve_config_value(
                                                ["application", "module_configuration", "NRLWrap",
                                                 "update_in_progress_lock_file"])
                                            ))
    app.run(host="0.0.0.0", debug=True)
