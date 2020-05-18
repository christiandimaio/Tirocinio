from pony.orm import *
from connection import db
from decimal import Decimal


class Gps(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    localizzazione = Optional('Localizzazione')
    is_impermeabile = Optional(bool, default=False)
    is_autocalibrante = Optional(bool, default=False)