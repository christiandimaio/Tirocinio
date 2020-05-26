import psycopg2
from flask import request,jsonify,send_file
from flask_restful import Resource
from filelock import FileLock
from NRLWrap import NRLWrap
import os
import Utils
from StationXMLMaker.StationXMLMaker import NRLToStationXML
import obspy
from connection import db,db_session, commit
from Model import Stazione_Sismica,Localizzazione
from Model import Canale

nrl_update_lock = FileLock(os.path.join(Utils.retrieve_config_value(["application", "lock_folder"]),
                                            Utils.retrieve_config_value(
                                                ["application", "module_configuration", "NRLWrap",
                                                 "update_in_progress_lock_file"])
                                            ))
nrl_interface = NRLWrap(Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "root"]))

class UpdateNrl(Resource):
    @staticmethod
    def get():
        """
        CODE RESPONSE : 201 = UPDATE IS ALREADY CALLED
                        199 = SOME ERROR HAS OCCURRED
                        200 = OK, UPDATED
        """
        try:
            if nrl_update_lock.is_locked:
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
        if os.path.exists("temp_xml.xml"):
            os.remove("temp_xml.xml")
        stationXML = NRLToStationXML(nrl_interface)
        stationXML.set_inventory("INGV-OV")
        stationXML.set_network(code="OV",description="Network Ov",start_date=obspy.UTCDateTime(2020,5,26))
        with db_session:
            stazione = Stazione_Sismica.select(lambda _stazione: _stazione.codice_stazione==codice_stazione).first()
            localizzazione = Localizzazione.select(lambda _localizzazione:
                                                   _localizzazione.stazione_sismica.codice_stazione==codice_stazione).first()
            stationXML.set_station(p_name=stazione.codice_stazione,
                                   p_latitude=localizzazione.latitudine,
                                   p_longitude=localizzazione.longitudine,
                                   p_elevation=stazione.altezza_lv_mare,
                                   p_creation_date=obspy.UTCDateTime(stazione.data_messa_funzione.year,
                                                                     stazione.data_messa_funzione.month,
                                                                     stazione.data_messa_funzione.day),
                                   )
            canali = Canale.select(lambda canale: canale.stazione_sismica.codice_stazione==codice_stazione)

            for canale in canali:
                stationXML.set_channel(p_code=canale.componente_sensore,
                                       p_latitude=localizzazione.latitudine,
                                       p_longitude=localizzazione.longitudine,
                                       p_elevation=stazione.altezza_lv_mare,
                                       p_depth=canale.profondita,
                                       p_azimuth=canale.azimuth,
                                       p_dip=canale.azimuth,
                                       p_sample_rate=canale.sensore.sampling_rate,
                                       p_sensor=canale.sensore.nrl.getKeys(),
                                       p_datalogger=canale.acquisitore.nrl.getKeys()
                                       )
            stationXML.make_xml(p_file_name="{0}.xml".format(stazione.codice_stazione))
            return send_file("{0}.xml".format(stazione.codice_stazione),as_attachment=True)

