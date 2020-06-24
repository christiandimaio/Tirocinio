from pony.orm import *
from connection import db
from decimal import Decimal


class Pannello_Solare(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    potenza_pannello = Optional(Decimal, precision=2)
    ah_pannello = Required(Decimal, precision=2)  # corrente erogata in AH