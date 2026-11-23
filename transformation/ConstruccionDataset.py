import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

datos_procesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/procesos_unidos.csv")

datos_pesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_pesos.csv")

# Conversion de fechas

datos_procesos["fecha"] = pd.to_datetime(datos_procesos["fecha"])

datos_pesos["fecha"] = pd.to_datetime(datos_pesos["fecha"],format="%m/%d/%Y %I:%M:%S %p")

#Eliminar filas vacias 
columnas_analisis = ['B_CPOS', 'B_RPOS', 'B_VEL', 'B_TOR', 'B_PRES','W_CPOS', 'W_RPOS', 'W_VEL', 'W_TOR', 'W_PRES']

filas_vacias = datos_procesos[datos_procesos[columnas_analisis].isna().all(axis=1)]
print(f"Cantidad de filas vacías: {len(filas_vacias)}")
print(filas_vacias.head())


#Crear categoria de pesos(alto, bajo, normal)
def categoria_peso(peso):
    if peso<0.90:
        return "Bajo"
    elif peso>1.10:
        return "Alto"
    else:
        return "Normal"

datos_pesos["categoria"] = datos_pesos["peso_promedio"].apply(categoria_peso)


print("\nDistribución de categorías de peso")
print(datos_pesos["categoria"].value_counts())

#print(datos_pesos.head())
#print(datos_procesos.head())

#Creamos nuestr dataset final, vacio
DatasetFinal=[]

print(pd.DataFrame(DatasetFinal).head())
#Recorremos todos los registros
for _, peso in datos_pesos.iterrows():
    fecha_peso = peso["fecha"]
    print(fecha_peso)


#Buscamos registros de dos horas anteriores
fecha_inicio=fecha_peso -pd.Timedelta(hours=2)

#Filtramos los registros de procesos dentro del rango de tiempo
ventana=datos_procesos[(datos_procesos["fecha"] >= fecha_inicio) & (datos_procesos["fecha"] <= fecha_peso)]

print("\n Ventana de registros de procesos para el peso en la fecha:")

print(fecha_inicio, ventana.shape)

print("\n Información de la ventana:")

print(ventana["B_PRES"].describe())

print(datos_pesos.head())

#fecha_comun = pd.Timestamp("2026-09-23")

#datos_pesos = datos_pesos[datos_pesos["fecha"] >= fecha_comun]

#Revisar comportamiento de las variables en ese periodo de timpo
#----------------------------------------------------------------------------------------------------
contador=0
for _, peso in datos_pesos.iterrows():

    fecha_peso = peso["fecha"]

    inicio = fecha_peso - pd.Timedelta(hours=2)

    ventana = datos_procesos[
        (datos_procesos["fecha"] >= inicio)
        &
        (datos_procesos["fecha"] <= fecha_peso)
    ]

    contador +=1

    print(f"\n Calculando promedios y desviacion estandar del peso:{contador}")
    promedio_w_pres=ventana["W_PRES"].mean()
    promedio_w_tor=ventana["W_TOR"].mean()
    promedio_B_pres=ventana["B_PRES"].mean()
    promedio_B_tor=ventana["B_TOR"].mean()

    desviacion_w_pres=ventana["W_PRES"].std()
    desviacion_w_tor=ventana["W_TOR"].std()
    desviacion_B_pres=ventana["B_PRES"].std()
    desviacion_B_tor=ventana["B_TOR"].std()


    fila={
        "fecha": fecha_peso,
        "modelo":peso["modelo"],
        "peso_promedio": peso["peso_promedio"],
        "categoria": peso["categoria"],
        "promedio_W_PRES": promedio_w_pres,
        "promedio_W_TOR": promedio_w_tor,
        "promedio_B_PRES": promedio_B_pres,
        "promedio_B_TOR": promedio_B_tor,
        "desviacion_W_PRES": desviacion_w_pres,
        "desviacion_W_TOR": desviacion_w_tor,
        "desviacion_B_PRES": desviacion_B_pres,
        "desviacion_B_TOR": desviacion_B_tor
    }

    print(fila)

    DatasetFinal.append(fila)
    print(f"\nTamaño del dataset final: {len(DatasetFinal)}")




DatasetFinal = pd.DataFrame(DatasetFinal)
    #Convertir la lista de diccionario en una tabla
print(DatasetFinal.head(20))
print(DatasetFinal.shape)
#DatasetFinal.to_csv("Ejemplo.csv",index=False)

print("-----------")
promedio=DatasetFinal['promedio_W_PRES'].max()
print(promedio)

print("\n Filas vacías")

columnas_analisis = [ "peso_promedio", "categoria", "promedio_W_PRES", "promedio_W_TOR", "promedio_B_PRES", "promedio_B_TOR", "desviacion_W_PRES", "desviacion_W_TOR", "desviacion_B_PRES", "desviacion_B_TOR" ]

# Filas completamente vacías
filas_vacias = DatasetFinal[DatasetFinal[columnas_analisis].isna().all(axis=1)]

print(f"Cantidad de filas vacías: {len(filas_vacias)}")
print(filas_vacias.head())

# Crear una copia para trabajar sin modificar el original
Dataset_limpio =DatasetFinal[DatasetFinal[columnas_analisis].notna().all(axis=1)].copy()

print("\n Después de eliminar filas vacías")
print(Dataset_limpio.shape)
print(Dataset_limpio.head(20))

print("----------------------------------")

DatasetFinal = DatasetFinal.drop(columns=["categoria"])

DatasetFinal["modelo"]=(DatasetFinal["modelo"]=="ML12").astype(int)
correlation_matrix=DatasetFinal.corr(method='spearman')
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