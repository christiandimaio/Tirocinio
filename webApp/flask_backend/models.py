
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date
from pony.orm import *


db = Database()
db.bind(provider='postgres', user='postgres', password='root', host='localhost', database='test')

class Operatore(db.Entity):
    id_operatore = PrimaryKey(int, size=16, auto=True)
    nome = Required(str, 255)
    cognome = Required(str, 255)
    data_nascita = Optional(date)
    tipo = Required(str)
    log_in = Optional('Log_in')
    is_esterno = Optional('Esterno')


class Log_in(db.Entity):
    email = PrimaryKey(str, 255, auto=True)
    password = Required(str, 255)
    is_online = Optional(bool, default=False)
    remember_me = Optional(bool,default=False)
    registrato_il = Required(date, default=lambda: date.today())
    cod_operatore = Required(Operatore)


class Esterno(db.Entity):
    provenienza = Required(str, 255)
    cod_operatore = Required(Operatore, unique=True)

db.generate_mapping(create_tables=True)