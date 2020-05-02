from flask import Flask,render_template, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required
import os


from webApp.flask_backend.myPackage.Utils import Utils
from webApp.flask_backend.models import *

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
    return UserModel.query.get(str(user_id))


@app.route("/login", methods=['GET','POST'])
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
    user = UserModel.query.filter_by(email=email).first()
    if user:
        if user.check_password(password):
            login_user(user, remember=rememberMe)
            print("logged in")
            return jsonify(operationCode=200)

    return jsonify(operationCode=201)


@app.route("/", methods=["GET"])
@login_required
def main_app():
    return render_template("app.html")

@app.route("/logout", methods=["GET"])
@login_required
def log_out():
    print("log_out called")
    logout_user()
    print("logged out")
    return jsonify(operationCode=200)


@app.route("/main", methods=["GET"])
@login_required
def test():
    return jsonify(ok=1)


"""----------------------------------------------------------------------------"""
"""Database Select"""


@app.route("/database/select/user/type", methods=["GET"])
def get_user_type():
    return jsonify(operationCode=200, items=["Operatore Semplice", "Esterno", "Autorizzato"])


"""----------------------------------------------------------------------------"""
"""Database Insert"""


# Sign In
@app.route("/database/insert/user", methods=["POST"])
def sign_in():
    user = UserModel(request.json['email'], request.json['password'])
    db.session.add(user)
    db.session.commit()
    print(request.json)
    return jsonify(operationCode=200)


"""----------------------------------------------------------------------------"""
"""Check Directory Route"""


@app.route("/check/directory/nrl", methods=["GET"])
def check_nrl_folder_status():
    """
    CODE RESPONSE :
                    201 = NRL In Updating
                    199 = SOME ERROR HAS OCCURRED
                    200 = OK
    """
    try:
        lock_folder = Utils.retrieve_config_value(["application", "lock_folder"])
        lock_file_name = Utils.retrieve_config_value(
            ["application", "module_configuration", "NRLWrap", "update_in_progress_lock_file"])
        if os.path.exists(os.path.join(lock_folder, lock_file_name)):
            return jsonify(result=201)
    except Exception as ex:
        print(ex)
        return jsonify(result=199)
    return jsonify(result=200)


"""______----------------------------------------------------------------------"""
"""Update Route"""


@app.route("/update/NRL", methods=["GET"])
def update_nrl():
    """
    CODE RESPONSE : 201 = UPDATE IS ALREADY CALLED
                    199 = SOME ERROR HAS OCCURRED
                    200 = OK, UPDATED
    """
    try:
        lock_folder = Utils.retrieve_config_value(["application", "lock_folder"])
        lock_file_name = Utils.retrieve_config_value(
            ["application", "module_configuration", "NRLWrap", "update_in_progress_lock_file"])
        if os.path.exists(os.path.join(lock_folder, lock_file_name)):
            return jsonify(result=201)
        """Istanzio un file di lock """
        lock_file = open(os.path.join("./" + lock_folder, lock_file_name), "w+")
        Utils.update_nrl_structure()
        lock_file.close()
        """Rimuovo il lock """
        os.remove(os.path.join(lock_folder, lock_file_name))
    except Exception as ex:
        print(ex)
        if os.path.exists(os.path.join(lock_folder, lock_file_name)):
            os.remove(os.path.join(lock_folder, lock_file_name))
        return jsonify(result=199)
    return jsonify(result=200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
