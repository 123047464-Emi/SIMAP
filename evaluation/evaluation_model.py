import pandas as pd
import numpy as np
import ydf

from sklearn.model_selection import train_test_split
from sklearn.metrics import (accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix, ConfusionMatrixDisplay)
import matplotlib.pylab as plt

ModeloPath = "models/Modelo_Entrenado_ydf2"

Target = "CONTEXT"
TEST_SIZE = 0.2
RANDOM_STATE = 42

# Cargar dataset
data = pd.read_csv("C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset.csv")

# Igual que en entrenamiento
data = data.dropna(subset=[Target])

# Variables
X = data.drop(columns=[Target])
y = data[Target]

# División
_, X_test, _, y_test = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
    stratify=y
)

# Cargar modelo
model = ydf.load_model(ModeloPath)


print("\nModelo cargado correctamente")

# Predicciones
probs = model.predict(X_test)
print("\nClases del dataset:")
print(sorted(y.unique()))

print("\nPrimeras 5 probabilidades:")
print(probs[:5]) 

# Obtener clases del dataset
clases = np.array(sorted(y.unique()))

# Convertir probabilidades a etiquetas
y_pred = clases[np.argmax(probs, axis=1)]

# Métricas
print("\nMetricas de evaluación")

accuracy = accuracy_score(y_test, y_pred)
print(f"\nAccuracy: {accuracy:.4f}")

precision = precision_score(
    y_test,
    y_pred,
    average="weighted",
    zero_division=0
)
print(f"\nPrecision: {precision:.4f}")

recall = recall_score(
    y_test,
    y_pred,
    average="weighted",
    zero_division=0
)
print(f"\nRecall: {recall:.4f}")

f1 = f1_score(
    y_test,
    y_pred,
    average="weighted",
    zero_division=0
)
print(f"\nF1 Score: {f1:.4f}")

print("\nReporte")
print(classification_report(y_test, y_pred))

print('\n Matriz de confución\n')

cm=confusion_matrix(y_test, y_pred)
print(cm)

display=ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=clases)

display.plot()
plt.show()
