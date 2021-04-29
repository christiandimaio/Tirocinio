import obspy
from obspy.core.inventory import Inventory, Network, Station, Channel, Site
from obspy.clients.nrl.client import LocalNRL
from NRLWrap import NRLWrap
from obspy import read
import json
import os
import numpy


class StationXMLMaker:
    """
    La classe usata per rappresentare una stazione secondo lo standard StationXml
    """

    def __init__(self, nrl_wrap):
        self.my_nrl = nrl_wrap

    def get_channels(self):
        raise NotImplementedError

    def get_inventory(self):
        raise NotImplementedError

    def get_network(self):
        raise NotImplementedError

    def get_station(self):
        raise NotImplementedError

    def set_network(self):
        raise NotImplementedError

    def set_inventory(self):
        raise NotImplementedError

    def set_station(self):
        raise NotImplementedError

    def set_channel(self):
        raise NotImplementedError

    def make_xml(self, p_format="stationxml", p_validate=True, p_file_name="debug.xml"):
        '''
        Crea lo StationXml
        :param p_format: standard da utilizzare per il file di output
        :param p_validate: booleno per indicare che il file e' stato validato
        :param p_file_name: nome del file da utilizzare
        :return:
        '''
        self.network.stations.append(self.station)
        self.inventory.networks.append(self.network)
        self.inventory.write(p_file_name, format=p_format, validate=p_validate)


class JsonToStationXML(StationXMLMaker):
    '''
        Classe che permette di tradurre un file json in uno StationXml
        NON UTILIZZATA
    '''

    def __init__(self, p_json_file):
        '''
        Costruttore della classe
        :param p_json_file: json caricato
        '''
        super(JsonToStationXML, self).__init__()
        reader = json.load(p_json_file)
        self.json_station = reader["Station"]
        # Initialization of attribute's station
        self.inventory = None
        self.network = None
        self.station = None
        self.channels = None
        # Initialization raw information about every attributes
        self.inventory_raw = None
        self.network_raw = None
        self.station_raw = None
        self.channels_raw = None
        #
        self.set_inventory()
        self.set_station()
        self.set_channel()
        self.set_network()


    def get_channels(self):
        '''
        Ritorna tutti i canali della stazione
        :return:
        '''
        return self.json_station["channels"]

    def get_inventory(self):
        return self.json_station["inventory"]

    def get_network(self):
        return self.json_station["network"]

    def get_station(self):
        return self.json_station["station"]

    def set_network(self):
        self.network_raw = self.get_network()
        self.network = Network(code=self.network_raw["code"], stations=[], description=self.network_raw["description"])

    def set_inventory(self):
        self.inventory_raw = self.get_inventory()
        self.inventory = Inventory(networks=[], source=self.inventory_raw["creator"])

    def set_station(self):
        self.station_raw = self.get_station()
        self.station = Station(code=self.station_raw["name"], latitude=self.station_raw["latitude"],
                               longitude=self.station_raw["longitude"], elevation=self.station_raw["elevation"],
                               creation_date=obspy.UTCDateTime(self.station_raw["creation_date"]),
                               site=Site(name=self.station_raw["site_name"]))

    def set_channel(self):
        '''
        Crea i canali per lo station xml
        :return:
        '''
        self.channels = []
        self.channels_raw = self.get_channels
        p_datalogger = ()
        p_sensor = ()
        for channel in self.channels_raw:
            temp_channel = Channel(code=channel["code"], location_code=channel["location_code"],
                                   latitude=channel["latitude"], longitude=channel["longitude"],
                                   elevation=channel["elevation"], depth=channel["depth"],
                                   azimuth=channel["azimuth"], dip=channel["dip"], sample_rate=channel["sample_rate"])

            temp_list = []
            for value in channel["datalogger"].values():
                if not value is None:
                    temp_list.append(value)
            p_datalogger = tuple(temp_list)
            temp_list.clear()
            for value in channel["sensor"].values():
                if not value is None:
                    temp_list.append(value)
            p_sensor = tuple(temp_list)
            temp_channel.response = self.my_nrl.get_response(datalogger_keys=p_datalogger, sensor_keys=p_sensor)
            self.station.channels.append(temp_channel)


class NRLToStationXML(StationXMLMaker):
    '''
    Classe per la realizzazione a partire da NRL e informazioni base di un file in standard stationxml
    '''
    def __init__(self, nrl_wrap):
        super(NRLToStationXML, self).__init__(nrl_wrap)
        self.inventory = None
        self.network = None
        self.station = None
        self.channels = None
        # Initialization raw information about every attributes
        self.inventory_raw = None
        self.network_raw = None
        self.station_raw = None
        self.channels_raw = None

        self.channels = []

    def get_channels(self):
        return self.channels

    def get_inventory(self):
        return self.inventory

    def get_network(self):
        return self.network

    def get_station(self):
        return self.station

    def set_network(self, code="", description=""):
        '''
        Metodo per creare la rete di appartenenza della stazione
        :param code: codice della rete
        :param description: piccola descrizione facoltativa
        :return:
        '''
        self.network_raw = {"code": code, "description": description}
        self.network = Network(code=self.network_raw["code"], stations=[], description=self.network_raw["description"])

    def set_inventory(self, p_creator=""):
        '''
        Metodo per definire l'inventory che racchiude tutte le reti
        :param p_creator: creatore dell'inventory
        :return:
        '''
        self.inventory_raw = {"creator": p_creator}
        self.inventory = Inventory(networks=[], source=self.inventory_raw["creator"])

    def set_station(self, p_name="", p_latitude=0, p_longitude=0, p_elevation=0, p_creation_date="2020,2,1,0,0,0.00",
                    p_site_name=""):
        '''
        Metodo che permette di creare la stazione
        :param p_name: codice della stazione
        :param p_latitude: latitudine
        :param p_longitude: longitudine
        :param p_elevation: altezza dal livello mare
        :param p_creation_date: data di creazione
        :param p_site_name: nome del sito
        :return:
        '''
        self.station_raw = {"name": p_name, "latitude": p_latitude, "longitude": p_longitude, "elevation": p_elevation,
                            "creation_date": p_creation_date, "site_name": p_site_name}
        self.station = Station(code=self.station_raw["name"], latitude=self.station_raw["latitude"],
                               longitude=self.station_raw["longitude"], elevation=self.station_raw["elevation"],
                               creation_date=obspy.UTCDateTime(self.station_raw["creation_date"]),
                               site=Site(name=self.station_raw["site_name"]))

    def set_channel(self, p_code="", p_location_code="", p_latitude=0, p_longitude=0, p_elevation=0, p_depth=0,
                    p_azimuth=0, p_dip=0, p_sample_rate=0, p_sensor=None, p_datalogger=None, p_start_date=None,
                    p_end_date=None):
        '''
        Metodo per la creazione di un canale associato alla stazione
        :param p_code: codice canale SEED
        :param p_location_code: location code in base SEED
        :param p_latitude: latitudine canale
        :param p_longitude: longitudine canale
        :param p_elevation: altezza livello mare
        :param p_depth: profondita' dal livello del piano dove si trova la stazione
        :param p_azimuth: azimuth
        :param p_dip: inclinazione
        :param p_sample_rate: sample rate
        :param p_sensor: array con chiavi di accesso al file resp del sensore ["lv_1","lv_2"..]
        :param p_datalogger: array con chiavi di accesso al file resp dell'acquisitore ["lv_1","lv_2"..]
        :param p_start_date: data creazione del canale
        :param p_end_date: EVENTUALE data dismessa del canale
        :return:
        '''
        self.channels_raw = {"code": p_code, "location_code": p_location_code, "latitude": p_latitude,
                             "longitude": p_longitude, "elevation": p_elevation, "depth": p_depth, "azimuth": p_azimuth,
                             "dip": p_dip, "sample_rate": p_sample_rate, "sensor": p_sensor, "datalogger": p_datalogger,
                             "start_date": p_start_date, "end_date": p_end_date}

        temp_channel = Channel(code=self.channels_raw["code"], location_code=self.channels_raw["location_code"],
                               latitude=self.channels_raw["latitude"], longitude=self.channels_raw["longitude"],
                               elevation=self.channels_raw["elevation"], depth=self.channels_raw["depth"],
                               azimuth=self.channels_raw["azimuth"], dip=self.channels_raw["dip"],
                               sample_rate=self.channels_raw["sample_rate"], start_date=self.channels_raw["start_date"],
                               end_date=self.channels_raw["end_date"])
        temp_channel.response = self.my_nrl.get_response(datalogger_keys=p_datalogger, sensor_keys=p_sensor)
        self.channels.append(temp_channel)

    def make_xml(self, p_format="stationxml", p_validate=True, p_file_name="debug.xml"):
        if isinstance(self, NRLToStationXML):
            for temp_channel in self.channels:
                self.station.channels.append(temp_channel)
        super().make_xml(p_format, p_validate, p_file_name)
