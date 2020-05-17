from decimal import Decimal

from sqlalchemy import Float
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date, datetime
from pony.orm import *

db = Database()
db.bind(provider='postgres', user='postgres', password='root', host='localhost', database='test')


class Operatore(db.Entity):
    id_operatore = PrimaryKey(int, auto=True)
    nome = Required(str, 255)
    cognome = Required(str, 255)
    data_nascita = Optional(date)
    tipo = Required(str, 255)
    log_in = Optional('Log_in', cascade_delete=True)
    esterno = Optional('Esterno', cascade_delete=True)
    recapiti = Set('Recapito')
    responsabile = Optional('Responsabile', cascade_delete=True)
    operazioni = Optional('Operazione', cascade_delete=True)


class Log_in(db.Entity):
    id_login = PrimaryKey(int, auto=True)
    email = Required(str, 255, unique=True)
    password = Required(str, 255)
    registrato_il = Required(date, default=lambda: date.today())
    is_online = Required(bool, default=False)
    remember_me = Required(bool, default=False)
    operatore = Required(Operatore, column='cod_operatore')


class Esterno(db.Entity):
    provenienza = Required(str, 255)
    operatore = Required(Operatore, column='cod_operatore')


class Recapito(db.Entity):
    numero_telefonico = Required(str, 255, unique=True)
    prefisso = Optional(str, default="+39")
    data_inserimento = Required(date, default=lambda: date.today())
    operatore = Required(Operatore, column='cod_operatore')


class Veicolo(db.Entity):
    id_veicolo = PrimaryKey(int, auto=True)
    nome = Required(str, 50)
    max_carico = Required(int, size=8, unsigned=True)
    percorsi = Optional('Percorso', cascade_delete=True)


class Percorso(db.Entity):
    tempo_percorrenza = Required(int)
    veicolo = Required(Veicolo, column='cod_veicolo')
    stazione_sismica = Required('Stazione_sismica', column='id_stazione')
    PrimaryKey(veicolo, stazione_sismica)


class Stazione_sismica(db.Entity):
    codice_stazione = Required(str, 255, unique=True)
    percorsi = Set(Percorso)
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


class Nota(db.Entity):
    id_nota = PrimaryKey(int, auto=True)
    data_inserimento = Optional(date, default=lambda: date.today())
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')


class Foto(db.Entity):
    id_foto = PrimaryKey(int, auto=True)
    path_foto = Required(str, 300)
    data_caricamento = Required(date, default=lambda: date.today())
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')


class Responsabile(db.Entity):
    stazione_sismica = Required(Stazione_sismica, unique=True, column='id_stazione')
    operatore = Required(Operatore, column='cod_operatore')
    data_fine_incarico = Optional(date)
    data_inizio_incarico = Required(date, default=lambda: date.today())
    PrimaryKey(operatore, stazione_sismica)


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
    memoria_massa = Optional('Memoria_massa', cascade_delete=True)
    pannello_solare = Optional('Pannello_solare', cascade_delete=True)
    cavo = Optional('Cavo', cascade_delete=True)
    regolatore_carica = Optional('Regolatore_carica', cascade_delete=True)
    gps = Optional('Gps', cascade_delete=True)
    sensore = Optional('Sensore', cascade_delete=True)
    acquisitore = Optional('Acquisitore', cascade_delete=True)


class Operazione(db.Entity):
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')
    componente = Required(Componente, column='cod_componente')
    operatore = Required(Operatore, column='cod_operatore')
    data_inizio_operazione = Required(date, default=lambda: date.today())
    data_fine_operazione = Optional(date)
    tipo_operazione = Optional(str, 50)
    note_operazione = Optional(str)
    PrimaryKey(stazione_sismica, operatore, componente)


class Batteria(db.Entity):
    componente = PrimaryKey(Componente, column='cod_componente')
    voltaggio = Required(Decimal, precision=2)
    amperaggio = Required(Decimal, precision=2)


class Memoria_massa(db.Entity):
    componente = PrimaryKey(Componente, column='cod_componente')
    dimensione = Optional(Decimal)  # dimensione memoria espressa in GByte
    tipologia = Optional(str, 150)


class Pannello_solare(db.Entity):
    componente = PrimaryKey(Componente, column='cod_componente')
    potenza_pannello = Optional(Decimal, precision=2)
    ah_pannello = Required(Decimal, precision=2)  # corrente erogata in AH


class Cavo(db.Entity):
    componente = PrimaryKey(Componente, column='cod_componente')
    sezione = Required(int, size=16)  # Espressa in mm
    tipo = Required(str, 100)
    lunghezza = Required(int, size=8)  # Espressa in metri


class Regolatore_carica(db.Entity):
    componente = PrimaryKey(Componente, column='cod_componente')
    volts_supportati = Required(Decimal, precision=2)
    ah_supportati = Optional(str, 100)


class Gps(db.Entity):
    componente = PrimaryKey(Componente, column='cod_componente')
    localizzazione = Optional('Localizzazione')
    is_impermeabile = Optional(bool, default=False)
    is_autocalibrante = Optional(bool, default=False)


class Sensore(db.Entity):
    nrl = Required('NRL', column='resp_id')
    componente = PrimaryKey(Componente, column='cod_componente')
    canali = Set('Canale')
    gain = Optional(Decimal, precision=2)
    sampling_rate = Optional(int, size=16)


class Acquisitore(db.Entity):
    nrl = Required('NRL', column='resp_id')
    componente = PrimaryKey(Componente, column='cod_componente')
    canali = Set('Canale')
    n_canali = Required(int, default=4)


class NRL(db.Entity):
    id_ft = PrimaryKey(int, auto=True)
    livello_1 = Optional(str, 100)
    livello_2 = Optional(str, 100)
    livello_3 = Optional(str, 100)
    sensori = Optional(Sensore)
    acquisitori = Optional(Acquisitore)


class Localizzazione(db.Entity):
    gps = PrimaryKey(Gps, column='id_gps')
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')
    latitudine = Required(float)
    longitudine = Required(float)
    ultimo_aggiornamento = Optional(datetime, default=lambda: datetime.utcnow())  # date time espresso utc


class Canale(db.Entity):
    id_canale = PrimaryKey(int, auto=True)
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')
    sensore = Required(Sensore, column='cod_sensore')
    acquisitore = Required(Acquisitore, column='cod_acquisitore')
    check_canale = Required(bool, default=True)
    componente_sensore = Required(str)  # HHZ,HHE..
    n_canale_acquisitore = Required(int, size=8)
    inclinazione = Required(int)  # in gradi
    azimuth = Required(int, size=8)  # in gradi
    data_creazione_canale = Required(date, default=lambda: date.today())
    data_dismessa_canale = Optional(date)
    profondita = Required(int, size=8)  # in metri


db.generate_mapping(create_tables=True)
