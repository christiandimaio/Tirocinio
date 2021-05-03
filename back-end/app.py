import sys
from flask import Flask
from flask_restful import Api
from pony.flask import Pony

sys.path.append('./myPackage/Utils/')
sys.path.append('./myPackage/NrlWrap/')
sys.path.append('./myPackage/NrlWrap/Convert/')
sys.path.append('./myPackage/NrlWrap/StationXMLMaker/')
sys.path.append('./Model/')
sys.path.append('./Model/Componenti/')
sys.path.append('./Controllers/')
sys.path.append('./Controllers/Componenti')
sys.path.append('./cfg/')

from CanaleController import *
from OperazioneController import *
from OperatoreController import *
from StazioneSismicaController import *
from LogInController import *
from NrlController import *
from ComponenteController import *
from GpsController import *
from BatteriaController import *
from AcquisitoreController import *
from SensoreController import *
from Model import Log_In, Operatore
from connection import db
from LoginManager import *

db.generate_mapping(create_tables=True)
app = Flask(__name__)
api = Api(app)
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')
Pony(app)

login_manager = createManager(app)


@login_manager.user_loader
def load_user(user_id):
    return Log_In.get(id=user_id)


"""----------------------------------------------------------------------------"""
"""Rotte Componente"""

api.add_resource(GetComponente, '/api/Componente/<string:seriale>')

"""----------------------------------------------------------------------------"""
"""ROTTE MODELLO GPS"""
api.add_resource(GetGps, '/api/Componente/Gps/<string:seriale>')
api.add_resource(GetGpsMagazzino, '/api/Magazzino/Gps')
"""----------------------------------------------------------------------------"""

"""----------------------------------------------------------------------------"""
"""ROTTE MODELLO Batteria"""
api.add_resource(GetBatterieMagazzino, '/api/Magazzino/Batterie')

"""----------------------------------------------------------------------------"""


"""ROTTE MODELLO SENSORE"""
api.add_resource(PostSensore, '/api/Componente/Sensore/<string:seriale>')

"""----------------------------------------------------------------------------"""
"""ROTTE MODELLO ACQUISITORE"""
api.add_resource(PostAcquisitore, '/api/Componente/Acquisitore/<string:seriale>')


"""----------------------------------------------------------------------------"""
"""ROTTE MODELLO LOG_IN"""

api.add_resource(Auth, '/api/login')

api.add_resource(DeAuth, '/api/logout')

"""----------------------------------------------------------------------------"""
"""Modello Operatore"""

api.add_resource(GetTipologieOperatore, '/api/Operatori/type')
api.add_resource(InsertOperatore, '/api/Operatore/insert')
api.add_resource(GetOperatori, '/api/Operatori')
api.add_resource(GetOperatoriListed, '/api/Operatori/selecter')
"""----------------------------------------------------------------------------"""
"""Modello Stazione sismica"""

api.add_resource(PostStazioneSismica, '/api/Stazione')
api.add_resource(GetStazioneSismicaInfo, '/api/Stazioni/info')
api.add_resource(GetOperazioniStazione, "/api/Stazione/<string:codice_stazione>/Operazioni")
api.add_resource(GetStazione, "/api/Stazione/<string:codice_stazione>")
api.add_resource(InsertOperazione, "/api/Stazione/<string:codice_stazione>/Operazione")
api.add_resource(GetCanali,"/api/Stazione/<string:codice_stazione>/Canali")
api.add_resource(PostCanale,"/api/Stazione/<string:codice_stazione>/Canale")

# Rotte componentistica stazione
api.add_resource(GetComponenteStazione, '/api/Stazione/<string:codice_stazione>/Componente/<string:seriale>')

api.add_resource(GetSensoriStazione,"/api/Stazione/<string:codice_stazione>/Sensori")
api.add_resource(GetAcquisitoriStazione,"/api/Stazione/<string:codice_stazione>/Acquisitori")
api.add_resource(GetBatterieStazione,"/api/Stazione/<string:codice_stazione>/Batterie")
api.add_resource(GetRegolatoriCaricaStazione,"/api/Stazione/<string:codice_stazione>/RegolatoriCarica")
api.add_resource(GetGpsStazione,"/api/Stazione/<string:codice_stazione>/Gps")
api.add_resource(GetMemorieMassaStazione,"/api/Stazione/<string:codice_stazione>/MemorieMassa")
api.add_resource(GetPannelliSolariStazione,"/api/Stazione/<string:codice_stazione>/PannelliSolari")
api.add_resource(GetCaviStazione,"/api/Stazione/<string:codice_stazione>/Cavi")

"""______----------------------------------------------------------------------"""
"""    NRL    """

api.add_resource(CheckIfNrlIsUpdating, '/api/NRL/update/status')
api.add_resource(UpdateNrl, "/api/NRL/update")
api.add_resource(GetStationXML, "/api/Stazione/<string:codice_stazione>/StationXml")
routes = [
    "/api/NRL/<string:request_type>",
    "/api/NRL/<string:request_type>/<string:level_1>",
    "/api/NRL/<string:request_type>/<string:level_1>/<string:level_2>",
    "/api/NRL/<string:request_type>/<string:level_1>/<string:level_2>/<string:level_3>",
    "/api/NRL/<string:request_type>/<string:level_1>/<string:level_2>/<string:level_3>/<string:level_4>",
]
api.add_resource(GetNrlIndex, *routes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=os.getenv('APP_DEBUG'), port=os.getenv('APP_PORT'))
