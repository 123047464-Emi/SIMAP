from services.model_loader import modelLoader

#cargar modelo 
modelLoader.load_model()

#recuperar el modelo
modelo=modelLoader.get_model()

#Obtener información del modelo
print("Informacion del modelo\n")
print(modelo.describe())