import os
from dotenv import load_dotenv

load_dotenv()

class settings():
    api_key=os.getenv("API_KEY")
    model_path=os.getenv("MODEL_PATH")

settings=settings()

if __name__=="__main__":
    print("ConFiguraciones")
    print(f"Api_Key: {settings.api_key}")
    print(f"Modelo: {settings.model_path}")