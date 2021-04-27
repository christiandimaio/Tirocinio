import psycopg2
from flask import request, jsonify, send_file
from flask_restful import Resource
from filelock import FileLock
from NRLWrap import NRLWrap
import os
import Utils
from StationXMLMaker import NRLToStationXML
import obspy
from connection import db, db_session, commit
from Model import Stazione_Sismica, Localizzazione
from Model import Canale
from datetime import datetime

nrl_update_lock = FileLock(os.path.join(Utils.retrieve_config_value(["application", "lock_folder"]),
                                        Utils.retrieve_config_value(
                                            ["application", "module_configuration", "NRLWrap",
                                             "update_in_progress_lock_file"])
                                        ))


class UpdateNrl(Resource):
    @staticmethod
    def get():
        """
        CODE RESPONSE : 201 = UPDATE IS ALREADY CALLED
                        199 = SOME ERROR HAS OCCURRED
                        200 = OK, UPDATED
        """
        try:
            if nrl_update_lock.is_locked: #Se ho un lock allora informo che un aggiornamento è già in esecuzione
                return jsonify(result=201)
            """Istanzio un file di lock """
            nrl_update_lock.acquire()
            Utils.update_nrl_structure()
            """Rimuovo il lock """
            nrl_update_lock.release()
        except Exception as ex:
            print(ex)
            nrl_update_lock.release()
            return jsonify(result=199)
        return jsonify(result=200)


class CheckIfNrlIsUpdating(Resource):
    @staticmethod
    def get():
        """
        CODE RESPONSE :
                        201 = NRL In Updating
                        199 = SOME ERROR HAS OCCURRED
                        200 = OK
        """
        try:

            if nrl_update_lock.is_locked:
                return jsonify(result=201)
        except Exception as ex:
            print(ex)
            return jsonify(result=199)
        return jsonify(result=200)


class GetNrlIndex(Resource):
    @staticmethod
    def get(request_type, level_1=None, level_2=None, level_3=None, level_4=None):
        try:
            nrl_interface = NRLWrap(
                Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "root"]))
        except FileNotFoundError as ex:
            print("NRL Non presente")
            # print("interfaccia NRL non presente")
            # nrl_update_lock.acquire()
            # Utils.update_nrl_structure()
            # """Rimuovo il lock """
            # nrl_update_lock.release()
        dict_lv = None
        try:
            if request_type == "sensors":
                dict_lv = nrl_interface.local_nrl().sensors
            elif request_type == "dataloggers":
                dict_lv = nrl_interface.local_nrl().dataloggers
            else:
                return jsonify(operationCode=404, message="Bad Request!")
            if level_1 is None:
                return jsonify(operationCode=200, message=dict_lv._question, data=list(dict_lv.keys()))
            if level_2 is None:
                return jsonify(operationCode=200, message=dict_lv[level_1]._question,
                               data=list(dict_lv[level_1].keys()))
            if level_3 is None:
                return jsonify(operationCode=200, message=dict_lv[level_1][level_2]._question,
                               data=list(dict_lv[level_1][level_2].keys()))
            if level_4 is None:
                return jsonify(operationCode=200, message=dict_lv[level_1][level_2][level_3]._question,
                               data=list(dict_lv[level_1][level_2][level_3].keys()))
            else:
                return jsonify(operationCode=200, message=dict_lv[level_1][level_2][level_3][level_4]._question,
                               data=list(dict_lv[level_1][level_2][level_3][level_4].keys()))
        except KeyError as key_except:
            return jsonify(operationCode=201, message="Chiave Errata!")
        except AttributeError as no_more_index_error:
            return jsonify(operationCode=201, message="Non e' possibile effettuare altre sotto-ricerche")


class GetStationXML(Resource):
    @staticmethod
    def get(codice_stazione):
        try:
            nrl_interface = NRLWrap(
                Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "root"]))
        except FileNotFoundError as ex:
            print("NRL Non presente")
            # print("interfaccia NRL non presente")
            # nrl_update_lock.acquire()
            # Utils.update_nrl_structure()
            # """Rimuovo il lock """
            # nrl_update_lock.release()
        da = None
        a = None
        if not request.args.get("data_creazione_canale") is None and \
                not request.args.get('data_dismessa_canale') is None:
            da = datetime.strptime(request.args.get('data_creazione_canale'), "%Y/%m/%d").date()
            a = datetime.strptime(request.args.get('data_dismessa_canale'), "%Y/%m/%d").date()

        if os.path.exists("{0}.xml".format(codice_stazione)):
            os.remove("{0}.xml".format(codice_stazione))
        stationXML = NRLToStationXML(nrl_interface)
        stationXML.set_inventory("INGV-OV")
        stationXML.set_network(code="OV", description="Network Ov")
        with db_session:
            try:
                _stazione = Stazione_Sismica.select(
                    lambda _stazione: _stazione.codice_stazione == codice_stazione).first()
                _localizzazione = Localizzazione.select(lambda _localizzazione:
                                                        _localizzazione.stazione_sismica.codice_stazione == codice_stazione).first()
                stationXML.set_station(p_name=_stazione.codice_stazione,
                                       p_latitude=_localizzazione.latitudine,
                                       p_longitude=_localizzazione.longitudine,
                                       p_elevation=_stazione.altezza_lv_mare,
                                       p_creation_date=obspy.UTCDateTime(_stazione.data_messa_funzione.year,
                                                                         _stazione.data_messa_funzione.month,
                                                                         _stazione.data_messa_funzione.day),
                                       )
                _canali = Canale.select(lambda canale: canale.stazione_sismica.codice_stazione == codice_stazione)
                if da is not None:
                    _canali_attivi = _canali.filter(lambda canale: canale.data_dismessa_canale == None and
                                                                              canale.data_creazione_canale >= da and
                                                                              canale.data_creazione_canale <= a)[:]

                    _canali_overlapping = _canali.filter(lambda canale: canale.data_dismessa_canale != None and
                                                                        (da <= canale.data_dismessa_canale) and
                                                                            (a >= canale.data_creazione_canale) )[:]

                    _canali = _canali_attivi + _canali_overlapping

                for _canale in _canali:
                    stationXML.set_channel(p_location_code=_canale.location_code,
                                           p_start_date=obspy.UTCDateTime(_canale.data_creazione_canale.year,
                                                                          _canale.data_creazione_canale.month,
                                                                          _canale.data_creazione_canale.day),
                                           p_end_date=obspy.UTCDateTime(_canale.data_dismessa_canale.year,
                                                                        _canale.data_dismessa_canale.month,
                                                                        _canale.data_dismessa_canale.day)
                                           if _canale.data_dismessa_canale is not None else None,
                                           p_code=_canale.componente_sensore,
                                           p_latitude=_localizzazione.latitudine,
                                           p_longitude=_localizzazione.longitudine,
                                           p_elevation=(_stazione.altezza_lv_mare - _canale.profondita),
                                           p_depth=_canale.profondita,
                                           p_azimuth=_canale.azimuth,
                                           p_dip=_canale.inclinazione,
                                           p_sample_rate=_canale.sensore.sampling_rate,
                                           p_sensor=_canale.sensore.nrl.getKeys(),
                                           p_datalogger=_canale.acquisitore.nrl.getKeys()
                                           )
                stationXML.make_xml(p_file_name="{0}.xml".format(_stazione.codice_stazione))
            except Exception as ex:
                print(ex)
                return jsonify(operationCode=500, message="Server Error")
        return send_file("{0}.xml".format(_stazione.codice_stazione), as_attachment=True, cache_timeout=0)
