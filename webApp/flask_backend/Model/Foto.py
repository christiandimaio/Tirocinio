


from datetime import date
from pony.orm import *
from connection import db


class Foto(db.Entity):
    id_foto = PrimaryKey(int, auto=True)
    path_foto = Required(str, 300)
    data_caricamento = Required(date, default=lambda: date.today())
    stazione_sismica = Required('Stazione_Sismica', column='id_stazione')