import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from connection import db,db_session, commit
from Model import Stazione_Sismica
from Model import Componente
from Model import Gps,Canale
from Model import Localizzazione
from Model import Nota
from Model import Operatore
from Model import Responsabile
from Model import Operazione
from pony.orm import *


class PostStazioneSismica(Resource):
    @staticmethod
    def post():
        print(request.json)
        try:
            with db_session:
                operatore_installazione = Operatore[request.json["operatore_installazione"]]
                operatori=[]
                if request.json["responsabile_1"]:
                    operatori.append(Operatore[request.json["responsabile_1"]])
                if request.json["responsabile_2"]:
                    operatori.append(Operatore[request.json["responsabile_2"]])
                if request.json["responsabile_3"]:
                    operatori.append(Operatore[request.json["responsabile_3"]])
                if request.json["responsabile_4"]:
                    operatori.append(Operatore[request.json["responsabile_4"]])
                responsabili = []

                station = Stazione_Sismica(codice_stazione=request.json["codice_stazione"],
                                           tipo_stazione=request.json["tipo_stazione"],
                                           altezza_lv_mare=request.json["altezza_lv_mare"],
                                           frequenza_manutenzione=request.json["periodo_manutenzione"])
                nota = Nota(nota=request.json["note_aggiuntive"],stazione_sismica=station)
                localizzazione = Localizzazione(stazione_sismica=station, latitudine=request.json["latitudine"],
                                                longitudine=request.json["longitudine"],ellissoide=request.json["ellissoide"])
                for operatore in operatori:
                    responsabili.append(Responsabile(stazione_sismica=station,operatore=operatore))
                station.responsabili = responsabili

        except Exception as ex:
            rollback()
            return jsonify(operationCode=500,message="Errore durante inserimento della stazione, riprovare")
        return jsonify(operationCode=200)

class GetStazioneSismicaInfo(Resource):
    @staticmethod
    def get():
        with db_session:
            stazioni = select((stazione, localizzazione.latitudine,
                               localizzazione.longitudine, count(stazione.operazioni_svolte))
                              for stazione in Stazione_Sismica
                              for localizzazione in stazione.localizzazioni
                              if localizzazione.ultimo_aggiornamento == max(stazione.localizzazioni.ultimo_aggiornamento))
            list = []
            for stazione in stazioni:
                storico_coordinate = (Localizzazione
                                          .select(lambda localizzazione:
                                                        localizzazione.stazione_sismica == stazione[0])[:]).to_list()
                list.append({
                    "id_univoco": stazione[0].id,
                    "tipo_stazione": stazione[0].tipo_stazione,
                    "codice": stazione[0].codice_stazione,
                    "data_messa_funzione": stazione[0].data_messa_funzione.strftime("%d/%m/%Y"),
                    "numero_operazioni": stazione[3],
                    "latitudine": stazione[1],
                    "longitudine": stazione[2],
                    "is_attiva": stazione[0].is_attiva(),
                    "storico_coordinate":[localizzazione.to_dict() for localizzazione in storico_coordinate]
                })
        return jsonify(data=list)

class GetStazione(Resource):
    @staticmethod
    def get(codice_stazione):
        operatori=[]
        with db_session:
            try:
                stazione = Stazione_Sismica.select(lambda stazione: stazione.codice_stazione==codice_stazione).first()
                storico_coordinate = (Localizzazione
                                          .select(lambda localizzazione:
                                                  localizzazione.stazione_sismica == stazione)[:]).to_list()
                if stazione:
                    responsabili = list(stazione.responsabili.operatore)
                    for resposabile in responsabili:
                        operatori.append(""+resposabile.nome+" "+resposabile.cognome)
                    return jsonify(operationCode=200,
                                   item=stazione.to_dict(),
                                   responsabili=operatori,
                                   nota=stazione.note.nota,
                                   storico_coordinate=[localizzazione.to_dict() for localizzazione in storico_coordinate])
                else:
                    return jsonify(operationCode=404)
            except Exception as ex:
                return jsonify(operationCode=500)
        return jsonify(operationCode=500)



class GetOperazioniStazione(Resource):
    @staticmethod
    def get(codice_stazione):
        with db_session:
            operazioni = select ((operazioni) for operazioni in Operazione
                                              if operazioni.stazione_sismica.codice_stazione==codice_stazione)[:]
            result = []
            for operazione in operazioni:
                result.append({
                    "componente":{
                        "seriale":operazione.componente.seriale if operazione.componente is not None else "",
                        "produttore":operazione.componente.produttore if operazione.componente is not None else "",
                        "nome":operazione.componente.nome if operazione.componente is not None else ""
                    },
                    "operazione":{
                        "tipo_operazione":operazione.tipo_operazione,
                        "data_inizio_operazione":operazione.data_inizio_operazione,
                        "data_fine_operazione":operazione.data_fine_operazione,
                    },
                    "operatore":{
                        "nome_cognome":operazione.operatore.nome+" "+operazione.operatore.cognome,
                        "note":operazione.note_operazione
                    }
                })
            return jsonify(operationCode=200,data=result)

class GetComponenteStazione(Resource):
    @staticmethod
    @db_session
    def get(codice_stazione,seriale):
        max_data = max((operazione.data_inizio_operazione) for operazione in Operazione
                                                    if operazione.stazione_sismica.codice_stazione==codice_stazione
                                                        and operazione.componente.seriale==seriale)
        operazione = select((operazione) for operazione in Operazione
                                                    if operazione.stazione_sismica.codice_stazione==codice_stazione
                                                        and operazione.componente.seriale==seriale
                                                            and operazione.data_inizio_operazione==max_data).first()


        if operazione and operazione.tipo_operazione != "Rimozione":
            return jsonify(operationCode=200, item=operazione.componente.to_dict())
        else:
            return jsonify(operationCode=404, message="Not Found")
        return jsonify(operationCode=500, message="Internal Error")

class GetSensoriStazione(Resource):
    @staticmethod
    @db_session
    def get(codice_stazione):
        operazioni = select((operazione) for operazione in Operazione
                            if operazione.stazione_sismica.codice_stazione == codice_stazione
                            and operazione.componente.sensore is not None
                            )
        sensori = []
        for _operazione in operazioni:
            if _operazione.componente not in sensori:
                n_installazioni_sensore = count(operazione.tipo_operazione for operazione in Operazione
                                                if operazione.stazione_sismica.codice_stazione==codice_stazione
                                                and operazione.componente.seriale == _operazione.componente.seriale
                                                and operazione.tipo_operazione == "Installazione")
                n_rimozioni_sensore = count(operazione.tipo_operazione for operazione in Operazione
                                                if operazione.stazione_sismica.codice_stazione == codice_stazione
                                                and operazione.componente.seriale == _operazione.componente.seriale
                                                and operazione.tipo_operazione == "Rimozione")
                if n_installazioni_sensore > n_rimozioni_sensore:
                    sensori.append(_operazione.componente)
        if len(sensori) > 0:
            return jsonify(operationCode=200,items=[{"componente":sensore.to_dict(),
                                                     "sensore":sensore.sensore.to_dict(),
                                                     "NRL":sensore.sensore.nrl.to_dict()} for sensore in sensori])
        return jsonify(operationCode=500, message="Internal Error")

class GetAcquisitoriStazione(Resource):
    @staticmethod
    @db_session
    def get(codice_stazione):
        operazioni = select((operazione) for operazione in Operazione
                            if operazione.stazione_sismica.codice_stazione == codice_stazione
                            and operazione.componente.acquisitore is not None
                            )
        acquisitori = []
        try:
            for _operazione in operazioni:
                if _operazione.componente not in acquisitori:
                    n_installazioni_acquisitore = count(operazione.tipo_operazione for operazione in Operazione
                                                    if operazione.stazione_sismica.codice_stazione==codice_stazione
                                                    and operazione.componente.seriale == _operazione.componente.seriale
                                                    and operazione.tipo_operazione == "Installazione")
                    n_rimozioni_acquisitore = count(operazione.tipo_operazione for operazione in Operazione
                                                    if operazione.stazione_sismica.codice_stazione == codice_stazione
                                                    and operazione.componente.seriale == _operazione.componente.seriale
                                                    and operazione.tipo_operazione == "Rimozione")
                    if n_installazioni_acquisitore > n_rimozioni_acquisitore:
                        acquisitori.append(_operazione.componente)
            if len(acquisitori) > 0:
                return jsonify(operationCode=200,items=[{"componente":acquisitore.to_dict(),
                                                         "acquisitore":acquisitore.acquisitore.to_dict(),
                                                         "NRL":acquisitore.acquisitore.nrl.to_dict()} for acquisitore in acquisitori])
            else:
                return jsonify(operationCode=404,message="Not Found")
        except Exception as ex:
            return jsonify(operationCode=500, message="Internal Error")

