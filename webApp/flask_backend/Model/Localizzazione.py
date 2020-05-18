from datetime import datetime
from pony.orm import *
from connection import db


class Localizzazione(db.Entity):
    gps = PrimaryKey('Gps', column='id_gps')
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')
    latitudine = Required(float)
    longitudine = Required(float)
    ultimo_aggiornamento = Optional(datetime, default=lambda: datetime.utcnow())  # date time espresso utc