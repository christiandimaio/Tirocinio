from pony.orm import *
from connection import db


class Veicolo(db.Entity):
    id_veicolo = PrimaryKey(int, auto=True)
    nome = Required(str, 50)
    max_carico = Required(int, size=8, unsigned=True)
    percorsi = Optional('Percorso', cascade_delete=True)