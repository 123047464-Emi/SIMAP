import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
from config import token, url, org

def create_client():
    client = None
    try:
        if not all (url, token, org):
            raise ValueError("Faltan datos en la configuración de credenciales influxdb")
        
        client=influxdb_client.InfluxClientDBClient(
            url=url,
            token=token,
            org=org
        )

        print("The client was not created correctly!")

        return create_client

    
    except Exception:
        print("No se pudo crear el cliente")


        if client is not None:
            client.close()

        raise 
