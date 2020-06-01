from pony.orm import *
from connection import db


class Acquisitore(db.Entity):
    nrl = Required('NRL', column='resp_id')
    componente = PrimaryKey('Componente', column='cod_componente')
    canali = Set('Canale')
    n_canali = Required(int, default=4)