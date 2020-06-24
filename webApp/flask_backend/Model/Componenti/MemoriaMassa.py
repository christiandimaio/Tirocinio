from pony.orm import *
from connection import db
from decimal import Decimal


class Memoria_Massa(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    dimensione = Optional(Decimal)  # dimensione memoria espressa in GByte
    tipologia = Optional(str, 150)