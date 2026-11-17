import pandas as pd
from influxdb_client import create_client
from config import url, token, org



def consultar_dator(consulta):
    client=None 

    try:
        client = create_client()

        query_api= client.query_api()

        #Agregar consulta
        resultado=(

        )

        if isinstance(resultado, list):
            if not resultado:
                pd.DataFrame()

            resultado=pd.concat(
                resultado, 
                ignore_index=True
            )

            if resultado.empty:
                print("La consulta no obtuvo ningun dato, esta vacía")

            return resultado

    except Exception as error:
        print (f"Error: {error}")

    finally:
        if client is not None:
            client.close()

