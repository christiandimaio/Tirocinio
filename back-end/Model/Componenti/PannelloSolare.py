from pony.orm import *
from connection import db
from decimal import Decimal


class Pannello_Solare(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    potenza_pannello = Optional(int) # in Watt
    ah_pannello = Required(int)  # corrente erogata in AH