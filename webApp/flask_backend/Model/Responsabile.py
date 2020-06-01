from datetime import date, datetime
from pony.orm import *
from connection import db

class Responsabile(db.Entity):
    stazione_sismica = Required('Stazione_Sismica', unique=True, column='id_stazione')
    operatore = Required('Operatore', column='cod_operatore')
    data_fine_incarico = Optional(date)
    data_inizio_incarico = Required(date, default=lambda: date.today())
    PrimaryKey(operatore, stazione_sismica)