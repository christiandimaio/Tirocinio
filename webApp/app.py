from flask import Flask, render_template, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager,login_user,logout_user,current_user,login_required
import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:root@localhost:5432/user"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from webApp import models

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = '/'

@login_manager.user_loader
def user_loader(user_id):
    """Given *user_id*, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve

    """
    return models.UserModel.query.get(str(user_id))


@app.route("/", methods=['GET',"POST"])
def home():
    if request.method == "GET":
        return render_template('login.html')
    content = request.json
    email = content['email']
    password = content['password']
    print(email)
    print(password)
    registered_user = models.UserModel.query.filter_by(email=email,password=password).first()
    if registered_user is None:
        return jsonify(operationCode=201)
    login_user(registered_user)
    return jsonify(operationCode = 200)

@app.route("/logout",methods=["GET"])
def log_out():
    logout_user()
    return render_template('login.html')

@app.route("/main", methods=["GET"])
@login_required
def test():
    return jsonify(ok=1)


if __name__ == "__main__":

    app.run(host="0.0.0.0",debug=True)
