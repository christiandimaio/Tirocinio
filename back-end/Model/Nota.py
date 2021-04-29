from datetime import date, datetime
from pony.orm import *
from connection import db


class Nota(db.Entity):
    id_nota = PrimaryKey(int, auto=True)
    data_inserimento = Optional(date, default=lambda: date.today())
    nota = Required(str,column="nota")
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')