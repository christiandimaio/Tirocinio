from datetime import date, datetime
from pony.orm import *
from connection import db


class Operatore(db.Entity):
    id_operatore = PrimaryKey(int, auto=True)
    nome = Required(str, 255)
    cognome = Required(str, 255)
    data_nascita = Optional(date)
    tipo = Required(str, 255)
    log_in = Optional('Log_In', cascade_delete=True)
    esterno = Optional('Esterno', cascade_delete=True)
    recapiti = Set('Recapito')
    responsabile = Set('Responsabile', cascade_delete=True)
    operazioni = Set('Operazione', cascade_delete=True)