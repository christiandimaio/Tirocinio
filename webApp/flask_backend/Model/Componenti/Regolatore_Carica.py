from pony.orm import *
from connection import db
from decimal import Decimal


class Regolatore_Carica(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    volts_supportati = Required(Decimal, precision=2)
    ah_supportati = Optional(str, 100)