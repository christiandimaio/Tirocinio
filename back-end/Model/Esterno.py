

from pony.orm import *
from connection import db

class Esterno(db.Entity):
    provenienza = Required(str, 255)
    operatore = Required('Operatore', column='cod_operatore')