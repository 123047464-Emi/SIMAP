#lee las credenciales de env sin tener que escribirlos en todos los archivos
import os
from dotenv import load_dotenv #permite cargar configuraciones del archivo .env

#Carga las variables de .env
load_dotenv()

bucket= os.getenv("INFLUXDB_BUCKET")
token= os.getenv("INFLUXDB_TOKEN")
org = os.getenv("INFLUXDB_ORG")
url= os.getenv("INFLUXDB_URL")


if __name__=="__main__":
    print("ConFiguraciones")
    print(f"token: {token}")
    print(f"url: {url}")