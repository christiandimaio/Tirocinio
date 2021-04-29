
from pony.orm import *
from connection import db


class Percorso(db.Entity):
    tempo_percorrenza = Required(int)
    veicolo = Required('Veicolo', column='cod_veicolo')
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')
    PrimaryKey(veicolo, stazione_sismica)
