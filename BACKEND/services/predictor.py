#Archivo encargado de cargar el modelo de SIMAP
from .model_loader import modelLoader

class Predictor():
    @staticmethod #Noa ayuda para poder ejecutar una clase sin crear un objeto
    def predict(df):
        modelo=modelLoader.get_model()
        #obtenemos el tipo de clase
        clase=modelo.label_classes()

        #Obtenemos la probabilidad de cada clase
        prob_normal=float(modelo.predict(df)[0])
        prob_anormal=float(modelo.predict(df)[0])

        prob_normal = 1- prob_anormal
        #Clasificación

        clasificacion=("Anormal" if prob_anormal > prob_normal else "Normal" )

        return {
            "clasificacion" : clasificacion,
            "probabilidad normal": round(prob_normal, 4),
            "probabilidad anormal": round(prob_anormal, 4)
        }