import pandas as pd

datos_procesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_proceso3.csv")

datos_pesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_pesos.csv")

# Conversion de fechas

datos_procesos["fecha"] = pd.to_datetime(datos_procesos["fecha"])

datos_pesos["fecha"] = pd.to_datetime(datos_pesos["fecha"],format="%m/%d/%Y %I:%M:%S %p")

#Eliminar filas vacias 
columnas_analisis = ['B_CPOS', 'B_RPOS', 'B_VEL', 'B_TOR', 'B_PRES','CONTEXT','W_CPOS', 'W_RPOS', 'W_VEL', 'W_TOR', 'W_PRES']

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
        "Normal"
datos_pesos["categoria"] = datos_pesos["peso_promedio"].apply(categoria_peso)


print("\nDistribución de categorías de peso")
print(datos_pesos["categoria"].value_counts())
