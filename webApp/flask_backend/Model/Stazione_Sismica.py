from datetime import date
from pony.orm import *
from connection import db


class Stazione_Sismica(db.Entity):
    codice_stazione = Required(str, 255, unique=True)
    percorsi = Set('Percorso')
    note = Optional('Nota', cascade_delete=True)
    immagini = Optional('Foto', cascade_delete=True)
    responsabili = Set('Responsabile')
    operazioni_svolte = Set('Operazione')
    localizzazioni = Set('Localizzazione')
    canali = Set('Canale')
    tipo_stazione = Required(str, 30)
    data_messa_funzione = Optional(date, default=lambda: date.today())
    data_dismessa_funzione = Optional(date)
    frequenza_manutenzione = Required(int, default=1)  # espressa in mesi
    altezza_lv_mare = Optional(int)  # espressa in metri

    def is_attiva(self):
        if self.data_dismessa_funzione is None:
            return "Dismessa"
        else:
            return "Attiva"