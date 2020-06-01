from pony.orm import *
from connection import db

class NRL(db.Entity):
    id_ft = PrimaryKey(int, auto=True)
    livello_1 = Optional(str, 100)
    livello_2 = Optional(str, 100)
    livello_3 = Optional(str, 100)
    livello_4 = Optional(str, 100)
    sensori = Optional('Sensore')
    acquisitori = Optional('Acquisitore')

    def getKeys(self) -> []:
        keys=[]
        if self.livello_1 is not None:
            keys.append(self.livello_1)
        if self.livello_2 is not None:
            keys.append(self.livello_2)
        if self.livello_3 is not None:
            keys.append(self.livello_3)
        if self.livello_4 is not None:
            keys.append(self.livello_4)
        return keys
