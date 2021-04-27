from pony.orm import *
from connection import db



class Regolatore_Carica(db.Entity):
    componente = PrimaryKey('Componente', column='cod_componente')
    volts_supportati = Required(int) # Volt
    ah_supportati = Optional(str, 100)