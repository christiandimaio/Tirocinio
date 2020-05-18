from pony.orm import *
from connection import db

class NRL(db.Entity):
    id_ft = PrimaryKey(int, auto=True)
    livello_1 = Optional(str, 100)
    livello_2 = Optional(str, 100)
    livello_3 = Optional(str, 100)
    sensori = Optional('Sensore')
    acquisitori = Optional('Acquisitore')