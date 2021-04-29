from datetime import date
from pony.orm import *
from connection import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Log_In(db.Entity,UserMixin):
    email = Required(str, 255, unique=True)
    password = Required(str, 255)
    registrato_il = Required(date, default=lambda: date.today())
    is_online = Required(bool, default=False)
    remember_me = Required(bool, default=False)
    operatore = Required('Operatore', column='cod_operatore')

