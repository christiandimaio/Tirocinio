import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from filelock import FileLock
from NRLWrap import NRLWrap
import os
import Utils


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