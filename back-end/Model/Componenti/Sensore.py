from pony.orm import *
from connection import db
from decimal import Decimal


class Sensore(db.Entity):
    nrl = Required('NRL', column='resp_id')
    componente = PrimaryKey('Componente', column='cod_componente')
    canali = Set('Canale')
    gain = Optional(int)
    sampling_rate = Optional(int, size=16)