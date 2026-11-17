import logging
import ydf
from configuracion.setting import settings

class modelLoader():
    #Creamos una variable donde le especificamos que no existe un modelo cargado.
    model=None

    model_name="Random Forest"

    model_version="1.0.0"

    api_version= "1.0.0"

    model_type= "YDF Random Forest(Modelo entrenado)"

    @classmethod #Indica que el metodo trabajara sobre su propia clase 
    #Funcion encargada de cargar el modelo
    def load_model(cls):
        try:
            logging.info('Se inicio la carga del modelo')
            #cls.model=('Modelo cargando')
            print("Model path: ", settings.model_path)
            cls.model=ydf.load_model(settings.model_path)
            #cls.model=ydf.load_model('models/RandomForest')
            logging.info('Modelo cargado correctamente ')
        except Exception as e :
            logging.error(f"Error al cargar el modelo: {e}")
            raise
        #cls.model = ydf.load_model("models/Modelo_Entrenado_ydf2")
    
    @classmethod
    #Recuperamos el modelo que esta en memoria
    def get_model(cls):
        return cls.model
    