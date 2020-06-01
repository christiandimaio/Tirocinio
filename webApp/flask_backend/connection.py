import os
from pony.orm import *
from dotenv import load_dotenv

load_dotenv()

db = Database()
connection = db.bind(provider='postgres',
                     user=os.getenv('DB_USERNAME'),
                     password=os.getenv('DB_PASSWORD'),
                     host=os.getenv('APP_HOST'),
                     database=os.getenv('DB_DATABASE'))