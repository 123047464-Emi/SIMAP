#Archivo encargado de validar, transformar y crear dataframe

import pandas as pd

#Clase para agrupar funciones relacionadas con preprocesamiento 
class PreprocessService:
    @staticmethod
    def transform(sensor_data:dict):
        df=pd.DataFrame([sensor_data])
        return df

    