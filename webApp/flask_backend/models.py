from decimal import Decimal

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
    tipo = Required(str)
    log_in = Optional('Log_in')
    esterno = Optional('Esterno')
    recapiti = Set('Recapito')
    responsabile = Optional('Responsabile')
    operazioni = Optional('Operazione')


class Log_in(db.Entity):
    email = PrimaryKey(str, 255, auto=True)
    password = Required(str, 255)
    registrato_il = Required(date, default=lambda: date.today())
    is_online = Required(bool, default=False)
    remember_me = Required(bool,default=False)
    operatore = Required(Operatore, column='cod_operatore')


class Esterno(db.Entity):
    provenienza = Required(str, 255)
    operatore = Required(Operatore, unique=True, column='cod_operatore')


class Recapito(db.Entity):
    numero_telefonico = PrimaryKey(str)
    prefisso = Optional(str, default="+39")
    data_inserimento = Required(date, default=lambda: date.today())
    operatore = Required(Operatore, column='cod_operatore')


class Veicolo(db.Entity):
    id_veicolo = PrimaryKey(int, auto=True)
    nome = Required(str)
    max_carico = Required(int, size=8, unsigned=True)
    percorsi = Optional('Percorso')


class Percorso(db.Entity):
    id = PrimaryKey(int, auto=True)
    tempo_percorrenza = Required(int)
    veicolo = Required(Veicolo, column='cod_veicolo')
    stazione_sismica = Required('Stazione_sismica', column='id_stazione')


class Stazione_sismica(db.Entity):
    codice_stazione = PrimaryKey(str, auto=True)
    percorsi = Set(Percorso)
    note = Optional('Nota')
    immagini = Optional('Foto')
    responsabili = Set('Responsabile')
    operazioni_svolte = Set('Operazione')
    localizzazioni = Set('Localizzazione')
    canali = Set('Canale')
    tipo_stazione = Required(str)
    data_messa_funzione = Optional(date, default=lambda: date.today())
    data_dismessa_funzione = Optional(date)
    frequenza_manutenzione = Required(int, default=1)  # espressa in mesi
    altezza_lv_mare = Optional(int)  # espressa in metri


class Nota(db.Entity):
    id_nota = PrimaryKey(int, auto=True)
    data_inserimento = Optional(date, default=lambda: date.today())
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')


class Foto(db.Entity):
    id_foto = PrimaryKey(int, auto=True)
    path_foto = Required(str)
    data_caricamento = Required(date, default=lambda: date.today())
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')


class Responsabile(db.Entity):
    stazione_sismica = Required(Stazione_sismica, unique=True, column='id_stazione')
    operatore = Required(Operatore, column='cod_operatore')
    data_fine_incarico = Optional(date)
    data_inizio_incarico = Required(date, default=lambda: date.today())


class Componente(db.Entity):
    seriale = PrimaryKey(str, auto=True)
    codice_ov = Required(str, unique=True)
    data_acquisto = Required(date, default=lambda: date.today())
    periodo_manutenzione = Optional(int, default=12)
    produttore = Required(str)
    nome = Required(str)
    larghezza_mm = Optional(Decimal, precision=2)
    altezza_mm = Optional(Decimal, precision=2)
    profondita_mm = Optional(Decimal, precision=2)
    operazioni = Optional('Operazione')
    batteria = Optional('Batteria')
    memoria_massa = Optional('Memoria_massa')
    pannello_solare = Optional('Pannello_solare')
    cavo = Optional('Cavo')
    regolatore_carica = Optional('Regolatore_carica')
    gps = Optional('Gps')
    sensore = Optional('Sensore')
    acquisitore = Optional('Acquisitore')


class Operazione(db.Entity):
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')
    componente = Required(Componente, column='cod_componente')
    operatore = Required(Operatore, column='cod_operatore')
    data_inizio_operazione = Required(date, default=lambda: date.today())
    data_fine_operazione = Optional(date)
    tipo_operazione = Optional(str)
    note_operazione = Optional(str)


class Batteria(db.Entity):
    componente = Required(Componente, column='cod_componente')
    voltaggio = Required(Decimal, precision=2)
    amperaggio = Required(Decimal, precision=2)


class Memoria_massa(db.Entity):
    componente = Required(Componente, column='cod_componente')
    dimensione = Optional(Decimal)  # dimensione memoria espressa in GByte
    tipologia = Optional(str)


class Pannello_solare(db.Entity):
    componente = Required(Componente, column='cod_componente')
    potenza_pannello = Optional(Decimal, precision=2)
    ah_pannello = Required(Decimal, precision=2)  # corrente erogata in AH


class Cavo(db.Entity):
    componente = Required(Componente, column='cod_componente')
    sezione = Required(int, size=16)  # Espressa in mm
    tipo = Required(str)
    lunghezza = Required(int, size=8)  # Espressa in metri


class Regolatore_carica(db.Entity):
    componente = Required(Componente, column='cod_componente')
    volts_supportati = Required(Decimal, precision=2)
    ah_supportati = Optional(str)


class Gps(db.Entity):
    componente = Required(Componente, column='cod_componente')
    localizzazione = Optional('Localizzazione')
    is_impermeabile = Optional(bool, default=False)
    is_autocalibrante = Optional(bool, default=False)


class Sensore(db.Entity):
    nrl = Required('NRL', column='resp_id')
    componente = Required(Componente, column='cod_componente')
    canali = Set('Canale')
    gain = Optional(Decimal, precision=2)
    sampling_rate = Optional(int, size=16)


class Acquisitore(db.Entity):
    nrl = Required('NRL', column='resp_id')
    componente = Required(Componente, column='cod_componente')
    canali = Set('Canale')
    n_canali = Required(int, default=4)


class NRL(db.Entity):
    id_ft = PrimaryKey(int, auto=True)
    livello_1 = Optional(str)
    livello_2 = Optional(str)
    livello_3 = Optional(str)
    sensori = Optional(Sensore)
    acquisitori = Optional(Acquisitore)


class Localizzazione(db.Entity):
    gps = Required(Gps, column='id_gps')
    stazione_sismica = Required(Stazione_sismica, column='id_stazione')
    latitudine = Required(Decimal, precision=6)
    longitudine = Required(Decimal, precision=6)
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