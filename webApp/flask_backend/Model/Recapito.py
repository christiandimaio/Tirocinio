
from datetime import date, datetime
from pony.orm import *
from connection import db


class Recapito(db.Entity):
    numero_telefonico = Required(str, 255, unique=True)
    prefisso = Optional(str, default="+39")
    data_inserimento = Required(date, default=lambda: date.today())
    operatore = Required('Operatore', column='cod_operatore')