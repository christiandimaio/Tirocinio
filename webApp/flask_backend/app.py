import sys
from flask import Flask
from flask_restful import Api
from pony.flask import Pony

sys.path.append('./myPackage/Utils/')
sys.path.append('./myPackage/NrlWrap/')
sys.path.append('./Model/')
sys.path.append('./Controllers/')
sys.path.append('./cfg/')

from Controllers.OperatoreController import *
from Controllers.StazioneSismicaController import *
from Controllers.LogInController import *
from Controllers.NrlController import *
from Controllers.ComponenteController import *
from Controllers.ComponenteGpsController import *
from Model import Log_In,Operatore
from connection import db
from LoginManager import *



db.generate_mapping(create_tables=True)
app = Flask(__name__)
api = Api(app)
app.config["SECRET_KEY"]=os.getenv('SECRET_KEY')
Pony(app)

login_manager = createManager(app)

@login_manager.user_loader
def load_user(user_id):
    return Log_In.get(id=user_id)

"""----------------------------------------------------------------------------"""
"""Rotte Componente"""

api.add_resource(GetComponente,'/api/Componente/<string:seriale>')

"""----------------------------------------------------------------------------"""
"""ROTTE MODELLO GPS"""
api.add_resource(GetGps,'/api/Componente/Gps/<string:seriale>')

"""----------------------------------------------------------------------------"""
"""ROTTE MODELLO LOG_IN"""


api.add_resource(Auth,'/api/login')

api.add_resource(DeAuth,'/api/logout')



"""----------------------------------------------------------------------------"""
"""Modello Operatore"""


api.add_resource(GetTipologieOperatore,'/api/Operatori/type')
api.add_resource(InsertOperatore,'/api/Operatore/insert')
api.add_resource(GetOperatori,'/api/Operatori')
api.add_resource(GetOperatoriListed,'/api/Operatori/selecter')
"""----------------------------------------------------------------------------"""
"""Modello Stazione sismica"""

api.add_resource(PostStazioneSismica,'/api/Stazione')
api.add_resource(GetStazioneSismicaInfo,'/api/Stazioni/info')
api.add_resource(GetOperazioniStazione,"/api/Stazione/<string:codice_stazione>/Operazioni")
api.add_resource(GetComponenteStazione,'/api/Stazione/<string:codice_stazione>/Componenti/<string:seriale>')
"""______----------------------------------------------------------------------"""
"""    NRL    """


api.add_resource(CheckIfNrlIsUpdating,'/api/NRL/update/status')
api.add_resource(UpdateNrl,"/api/NRL/update")
api.add_resource(GetStationXML,"/api/Stazioni/<string:codice_stazione>/StationXml")
routes = [
        "/api/NRL/<string:request_type>",
        "/api/NRL/<string:request_type>/<string:level_1>",
        "/api/NRL/<string:request_type>/<string:level_1>/<string:level_2>",
        "/api/NRL/<string:request_type>/<string:level_1>/<string:level_2>/<string:level_3>",
        "/api/NRL/<string:request_type>/<string:level_1>/<string:level_2>/<string:level_3>/<string:level_4>",
]
api.add_resource(GetNrlIndex,*routes)



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
