from sklearn.preprocessing import LabelEncoder
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

datos_unidos=pd.read_csv('C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_Entrenamiento.csv')

print("\nPrimeros registros:")
print(datos_unidos.head())
print("\nShape:")
print(datos_unidos.shape)
print('\n Info')
print(datos_unidos.info())
print("\nValores duplicados\n")
duplicados=datos_unidos[datos_unidos.duplicated()]
print(duplicados)
print("\nNulos\n")
nulo=datos_unidos.isnull().sum()
print(nulo.sort_values(ascending=False))
print("\nTipo de datos\n")
print(datos_unidos.dtypes)

print("Valores nulos: \n")
print(datos_unidos.isnull().sum())

"""
print("\nFrecuencia temporal")
datos_unidos["fecha"]=pd.to_datetime(datos_unidos["fecha"])
datos_unidos=datos_unidos.sort_values("fecha")
delta=datos_unidos["fecha"].diff()
print(delta.describe())"""


print("\nEstandarización de modelos")
le=LabelEncoder()
datos_unidos['modelo']=le.fit_transform(datos_unidos["modelo"])

print("\n-------------------------------------------------")
print("\nPrimera presion:")
print(datos_unidos['B_PRES'].min())

print("\nÚltima presion:")
print(datos_unidos['B_PRES'].max())

print("\nPrimer torque:")
print(datos_unidos['W_PRES'].min())

print("\nÚltimo torque:")
print(datos_unidos['W_TOR'].max())

print("Valores nulos en variable de proceso:\n")
nulos=datos_unidos[["B_PRES","B_TOR","W_PRES","W_TOR"]].isnull().sum()
print(nulo)

print("Valores con 0:")
vacios=(datos_unidos[["B_PRES","B_TOR","W_PRES","W_TOR"]]==0).sum()
print(vacios)

print(datos_unidos["objetivo"].value_counts())

#grafica para observar comportamiento entre pesos y procesos

datos_unidos=datos_unidos.drop(columns=['objetivo'])
datos_unidos["modelo"]=(datos_unidos["modelo"]=="ML12").astype(int)
correlation_matrix=datos_unidos.corr(method='kendall')
print ("\n Matríz de correlación  kendall")
plt.figure(figsize=(8, 6))
sns.heatmap(
    correlation_matrix,
    annot=True,        # Mostrar valores numéricos
    fmt=".2f",         # Formato de los números
    cmap="coolwarm",   # Colores
    square=True        # Celdas cuadradas
)
plt.title("Matriz de correlación kendall", fontsize=14)
plt.tight_layout()
plt.show() 

datos_unidos["modelo"]=(datos_unidos["modelo"]=="ML12").astype(int)
correlation_matrix=datos_unidos.corr(method='pearson')
print ("\n Matríz de correlación pearson")
plt.figure(figsize=(8, 6))
sns.heatmap(
    correlation_matrix,
    annot=True,        # Mostrar valores numéricos
    fmt=".2f",         # Formato de los números
    cmap="coolwarm",   # Colores
    square=True        # Celdas cuadradas
)
plt.title("Matriz de correlación pearson", fontsize=14)
plt.tight_layout()
plt.show() 

print("----------------------------------")

datos_unidos["modelo"]=(datos_unidos["modelo"]=="ML12").astype(int)
correlation_matrix=datos_unidos.corr(method='spearman')
print ("\n Matríz de correlación spearman")
plt.figure(figsize=(8, 6))
sns.heatmap(
    correlation_matrix,
    annot=True,        # Mostrar valores numéricos
    fmt=".2f",         # Formato de los números
    cmap="coolwarm",   # Colores
    square=True        # Celdas cuadradas
)
plt.title("Matriz de correlación spearman", fontsize=14)
plt.tight_layout()
plt.show() 

print("----------------------------------")
print("\nHistograma\n")
plt.figure(figsize=(8,4))
datos_unidos["peso_promedio"].hist(bins=50)
plt.xlabel("peso_promedio")
plt.ylabel("Frecuencia")
plt.show()


plt.scatter(data=datos_unidos, x="W_TOR", y="peso_promedio")
plt.title("Scatter Plot")
plt.show()

print("\nBoxPlot\n")
# Creates a boxplot
sns.boxplot(data=datos_unidos)
# Adds title to the boxplot
plt.title('Boxplot') 
plt.show()


columnas = datos_unidos.select_dtypes(include="number").columns
for col in columnas:
    plt.figure(figsize=(6,3))
    datos_unidos.boxplot(column=col,showfliers=True)
    plt.title(f"Boxplot por columna: {col}")
    plt.show()



corr = datos_unidos.corr(numeric_only=True)

#print(corr[objetivo"].sort_values())


