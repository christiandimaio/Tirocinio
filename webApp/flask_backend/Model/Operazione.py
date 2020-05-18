from pony.orm import *
from connection import db
from datetime import date


class Operazione(db.Entity):
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')
    componente = Required('Componente', column='cod_componente')
    operatore = Required('Operatore', column='cod_operatore')
    data_inizio_operazione = Required(date, default=lambda: date.today())
    data_fine_operazione = Optional(date)
    tipo_operazione = Optional(str, 50)
    note_operazione = Optional(str)
    PrimaryKey(stazione_sismica, operatore, componente)