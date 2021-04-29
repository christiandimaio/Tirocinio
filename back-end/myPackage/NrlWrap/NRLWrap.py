from obspy.clients.nrl.client import LocalNRL
import wget
import zipfile
import shutil
import os
import sys
import Utils




class NRLWrap():
    '''
        Classe per la gestione di NRL
    '''
    def __init__(self, root):
        '''
        Costrutture classe
        :param root: Path della root dalla quale si estende la struttura per NRL
        '''
        self._local_nrl = LocalNRL(root)

    def local_nrl(self):
        return self._local_nrl

    def get_response(self, datalogger_keys=None , sensor_keys=None):
        '''

        :param datalogger_keys: le chiavi di accesso al resp file dell'acquisitore
        :param sensor_keys: : le chiavi di accesso al resp file del sensore
        :return: la risposta del sensore + acquisitore
        '''
        return self._local_nrl.get_response(datalogger_keys, sensor_keys)


def update_local_library(url="http://ds.iris.edu/NRL/IRIS.zip"):
    '''
    Permette di aggiornare la struttura nrl locale
    :param url: url da dove scaricare la struttura nrl
    :return: none
    '''
    program_path = Utils.retrieve_config_value(["application", "info", "full_path"])
    dataloggers_path = os.path.join(program_path, Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "dataloggers_folder"]))
    sensors_path = os.path.join(program_path, Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "sensors_folder"]))
    custom_sensors_path = os.path.join(program_path, Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "custom_folder", "sensors"]))
    custom_datalogger_path = os.path.join(program_path, Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "custom_folder", "dataloggers"]))
    iris_download_path = os.path.join(program_path, Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "iris_zip_download"]))
    if os.path.exists(dataloggers_path):
        shutil.rmtree(dataloggers_path)
    if os.path.exists(sensors_path):
        shutil.rmtree(sensors_path)
    wget.download(url, iris_download_path, bar=Utils.custom_bar)

    with zipfile.ZipFile(iris_download_path, "r") as zip_ref: #unzip del file
        for file in zip_ref.namelist():
            if file.startswith("sensors/") or file.startswith("dataloggers/"):
                zip_ref.extract(file, Utils.retrieve_config_value(["application", "module_configuration", "NRLWrap", "root"]))

    # INIZIO FUSIONE DATABASE NRL CON DATABASE INGV
    # DATALOGGER
    with open(os.path.join(custom_datalogger_path,"index.txt"), "r") as custom_datalogger_index:
       with open(os.path.join(dataloggers_path,"index.txt"), "a") as datalogger_index:
            print("Aggiorno gli indici degli acquisitori")
            datalogger_index.write('\n')
            for line in custom_datalogger_index:
                datalogger_index.write(line) # fase di iniezione
    Utils.copy_folders(custom_datalogger_path, dataloggers_path) #copia delle cartelle custom

    # SENSOR
    with open(os.path.join(custom_sensors_path,"index.txt"), "r") as custom_sensor_index:
        with open(os.path.join(sensors_path,"index.txt"), "a") as sensor_index:
            print("Aggiorno gli indici dei sensori")
            sensor_index.write('\n')
            for line in custom_sensor_index:
                sensor_index.write(line)

    Utils.copy_folders(custom_sensors_path, sensors_path)

    os.remove(iris_download_path)
