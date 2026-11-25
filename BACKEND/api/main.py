from fastapi import FastAPI, Depends
from schemas.request import PredictionRequest
from services.preprocess import PreprocessService
from services.predictor import Predictor
from services.model_loader import modelLoader
from contextlib import asynccontextmanager
from seguridad.seguridad import verif_api_key
from dotenv import load_dotenv

load_dotenv()

#Se inicia el modelo cuando el sistema arranca
@asynccontextmanager
async def lifespan(app: FastAPI):
    modelLoader.load_model()

    yield

    print("Cerrando programa.")


app = FastAPI(
    title="API del Sistema Inteligente para Mantenimiento Predictivo :)",
    lifespan=lifespan
    )

@app.get("/")
def inicio():
    return {
        "mensaje": "Hola, bienvenido a la api de SIMAP, sistema inteligente para el mantenimiento predictivo en equipos :)"
    }


@app.post("/predict")
def prediccion(request: PredictionRequest, _:str=Depends(verif_api_key)):

    df=PreprocessService.transform(request.sensor_data)
    resultado= Predictor.predict(df)

    return {
        "mensaje": "Predicción ejecutada correctamente",
        "resultado":  resultado
    }

@app.get("/status/model")
def ModelStatus():
    modelo=modelLoader.get_model()
    return{
        "loader" :modelo is not None,
        "Model type" : modelLoader.model_type,
        "Model name": modelLoader.model_name,
        "Model version": modelLoader.model_version,
        "Api version" : modelLoader.api_version
    }

@app.get("/health")
def health():
    return{
        "status" : "healthy"
    }

