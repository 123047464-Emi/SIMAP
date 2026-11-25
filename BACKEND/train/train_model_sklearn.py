#Antes ya habiamos comenzado con esta parte, pero no se que mas sigue y ya me lo habias explicado que significaba cada cosa
import pandas as pd
import numpy as np
import sklearn 
from sklearn import metrics

from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split #Esta libreria nos ayuda a dividir automaticamente los registros
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt
import joblib 

df=pd.read_excel('C:/Users/EmilyHernand/Documents/Modelo prediccion/Datasets/dataset_pruebas_preparado.xlsx')
data_original=pd.read_excel('C:/Users/EmilyHernand/Documents/Modelo prediccion/Datasets/dataset_pruebas.xlsx') 

X=df
y=data_original["anomaly"]

X_train, X_test, y_train, y_test=train_test_split(X, y, random_state=42, test_size=0.2, stratify=y)

modelo = RandomForestClassifier(
    n_estimators=100, 
    random_state=42
)

modelo.fit(X_train, y_train)
print("Modelo entrenado correctamente")

joblib.dump(modelo, "models/modelo_entrenado.pkl") 


