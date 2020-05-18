from datetime import date, datetime
from pony.orm import *
from connection import db
from decimal import Decimal


class Componente(db.Entity):
    seriale = Required(str, unique=True)
    codice_ov = Required(str, 50, unique=True)
    data_acquisto = Required(date, default=lambda: date.today())
    periodo_manutenzione = Optional(int, default=12)
    produttore = Required(str, 100)
    nome = Required(str, 100)
    larghezza_mm = Optional(Decimal, precision=2)
    altezza_mm = Optional(Decimal, precision=2)
    profondita_mm = Optional(Decimal, precision=2)
    operazioni = Optional('Operazione', cascade_delete=True)
    batteria = Optional('Batteria', cascade_delete=True)
    memoria_massa = Optional('Memoria_Massa', cascade_delete=True)
    pannello_solare = Optional('Pannello_Solare', cascade_delete=True)
    cavo = Optional('Cavo', cascade_delete=True)
    regolatore_carica = Optional('Regolatore_Carica', cascade_delete=True)
    gps = Optional('Gps', cascade_delete=True)
    sensore = Optional('Sensore', cascade_delete=True)
    acquisitore = Optional('Acquisitore', cascade_delete=True)