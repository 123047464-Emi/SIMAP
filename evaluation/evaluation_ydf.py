# evaluation_model.py

import pandas as pd
import ydf
from sklearn.model_selection import train_test_split


# CONFIGURACIÓN

MODELO_PATH = "models/RandomForestEntrenado"

TARGET = "objetivo"
TEST_SIZE = 0.2
RANDOM_STATE = 42

DATASET_PATH = (
    "C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_unido.csv"
)



# CARGA DEL DATASEt

print("\nCargando dataset...")

data = pd.read_csv(DATASET_PATH)

# Igual que durante el entrenamiento
data = data.dropna(subset=[TARGET])

print(f"Registros encontrados: {len(data)}")


# PREPARACIÓN DE DATOS

X = data.drop(columns=[TARGET])
y = data[TARGET]

_, X_test, _, y_test = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
    stratify=y
)

# Dataset de prueba para YDF
df_test = X_test.copy()
df_test[TARGET] = y_test

# CARGA DEL MODELO

print("\nCargando modelo...")

model = ydf.load_model(MODELO_PATH)

print("Modelo cargado correctamente")

print("EVALUACIÓN DEL MODELO")

resultado = model.evaluate(df_test)

print(resultado)