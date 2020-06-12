from pony.orm import *
from connection import db
from decimal import Decimal
from datetime import date


class Canale(db.Entity):
    id_canale = PrimaryKey(int, auto=True)
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')
    sensore = Required('Sensore', column='cod_sensore')
    acquisitore = Required('Acquisitore', column='cod_acquisitore')
    check_canale = Required(bool, default=True)
    componente_sensore = Required(str)  # HHZ,HHE..
    n_canale_acquisitore = Required(int, size=8)
    inclinazione = Required(int)  # in gradi
    azimuth = Required(int, size=8)  # in gradi
    data_creazione_canale = Required(date, default=lambda: date.today())
    data_dismessa_canale = Optional(date)
    profondita = Required(int, size=8)  # in metri
    location_code= Required(str,30, unique=True)