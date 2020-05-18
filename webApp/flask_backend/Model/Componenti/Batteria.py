from pony.orm import *
from connection import db
from decimal import Decimal

class Batteria(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    voltaggio = Required(Decimal, precision=2)
    amperaggio = Required(Decimal, precision=2)