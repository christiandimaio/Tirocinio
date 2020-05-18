from datetime import date, datetime
from pony.orm import *
from connection import db


class Nota(db.Entity):
    id_nota = PrimaryKey(int, auto=True)
    data_inserimento = Optional(date, default=lambda: date.today())
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')