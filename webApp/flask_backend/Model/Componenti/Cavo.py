from pony.orm import *
from connection import db
from decimal import Decimal


class Cavo(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    sezione = Required(int, size=16)  # Espressa in mm
    tipo = Required(str, 100)
    lunghezza = Required(int, size=8)  # Espressa in metri