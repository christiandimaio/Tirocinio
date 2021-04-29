from pony.orm import *
from connection import db
from decimal import Decimal

class Batteria(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    voltaggio = Required(int)
    amperaggio = Required(int)