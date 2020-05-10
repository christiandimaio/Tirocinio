from flask import Flask
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), unique=True)
    password = db.Column(db.String())
    registered_on = db.Column('registered_on', db.DateTime)

    def __init__(self, email, password):
        self.email = email
        self.password = generate_password_hash(password)
        self.registered_on = datetime.datetime.utcnow()

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    # def __repr__(self):
    #     return f"<User {self.email}>"
