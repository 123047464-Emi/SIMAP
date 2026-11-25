from sklearn.preprocessing import LabelEncoder
import pandas as pd


datos_procesos = pd.read_csv(r"C:/Users/EmilyHernand\Documents/Modelo prediccion/Dataset_proceso3.csv")

datos_pesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_pesos.csv")
print(f"Variables:\n {datos_procesos.shape}")
# Analisis
#08 del 21, 09 a 21, 09 a 23
#"08 a 24", 08 a 25, 08 a 26, 08 a 27,  08 a 28, 08 a 31, 09 a 1, 09 a 2, 09 a 3, 09 a 4, 09 a 5, 09 a 7, 8, 17, 18, 22, 23, 24, 29, 10 a 3, a 4

print("\nDatos de procesos")

datos_procesos["fecha"] = pd.to_datetime(datos_procesos["fecha"])

print("\nPrimeros registros:")
print(datos_procesos.head())

print("\nDescripción:")
print(datos_procesos.describe())

print("\nColumnas:")
print(datos_procesos.columns.tolist())

print("\nShape:")
print(datos_procesos.shape)

print("\nContextos:")
print(datos_procesos["CONTEXT"].value_counts())

# Anasilis de los registros de pesos

print("\n Datos del dataset de pesos")

datos_pesos["fecha"] = pd.to_datetime(datos_pesos["fecha"], format="%m/%d/%Y %I:%M:%S %p")



print("\nPrimeros registros:")
print(datos_pesos.head())

print("\nDescripción:")
print(datos_pesos.describe())

print("\nColumnas:")
print(datos_pesos.columns.tolist())

print("\nShape:")
print(datos_pesos.shape)

print("\nPrimera fecha:")
print(datos_pesos["fecha"].min())

print("\nÚltima fecha:")
print(datos_pesos["fecha"].max())

# Limpieza

print("\nLimpieza de datos")

outliers = datos_pesos[datos_pesos["peso_promedio"] > 2]

print("\nOutliers encontrados:")
print(outliers[["fecha", "peso_promedio"]])

datos_pesos_limpios = datos_pesos[datos_pesos["peso_promedio"] <= 2].copy()

print(f"\nRegistros después de limpieza: {len(datos_pesos_limpios)}")


print("\nUnion de variables de proceso")

#Separa el dataset de proceso
b = datos_procesos[
    ["fecha", "B_CPOS", "B_RPOS", "B_VEL", "B_TOR", "B_PRES"]].dropna(

    how="all",
    subset=[ "B_CPOS","B_RPOS", "B_VEL", "B_TOR", "B_PRES"]
)

w=datos_procesos[
    [
        "fecha", "W_CPOS",  "W_RPOS",	"W_VEL", "W_TOR", "W_PRES"
    ]].dropna(
        how="all",
        subset=["W_CPOS", "W_RPOS",	"W_VEL", "W_TOR", "W_PRES"]
    )

datos_union_procesos=pd.merge(
    b,
    w,
    on="fecha",
    how="outer"
)

datos_union_procesos = datos_union_procesos.ffill()

print("\nShape del dataset unido:")
print(datos_union_procesos.shape)

print("\nPrimeros registros:")
print(datos_union_procesos.head())

#datos_union_procesos.to_csv("DatosProcesos_unidos.csv",index=False)

print("\nDataset generado correctamente")

print("\nUnion de ambos datasets")

# Union de datasets
datos_union = pd.merge(
    datos_union_procesos.sort_values("fecha"),
    datos_pesos.sort_values("fecha"),
    on="fecha",
    how="outer"
)

datos_union= datos_union.ffill()

print("\nEliminando fecha...")
datos_union=datos_union.drop(columns=["fecha"])

print("\nEstandarización de modelos")
le=LabelEncoder()
datos_union['modelo']=le.fit_transform(datos_union["modelo"])

print("\nShape del dataset unido:")
print(datos_union.shape)

print("\nPrimeros registros:")
print(datos_union.head())

print("\nDuplicados:")
print(datos_union.duplicated().sum())

#Eliminar duplicados
print("\Eliminando duplicados...")
datos_union=datos_union.drop_duplicates()

print("\nDuplicados:")
print(datos_union.duplicated().sum())

# Creamos variable objetivo

print("\nVARIABLE OBJETIVO")

# 0 = normal
# 1 = anormal

datos_union["objetivo"] = (~((datos_union["peso_promedio"] >= 0.90)&(datos_union["peso_promedio"] <= 1.10))).astype(int)

print("\nDistribución de clases:")
print(datos_union["objetivo"].value_counts())

print("------------------------------------------------------------")
print("\nDatos nulos despues de union: ")
datos_union=datos_union.dropna(subset=["modelo","peso_1","peso_2","peso_3","peso_4","peso_5","peso_promedio"])

print(type(datos_union))

print("\nEliminando columnas")
datos_union=datos_union.drop(columns=["peso_1","peso_2","peso_3","peso_4","peso_5", "W_VEL", "B_VEL", "B_CPOS", "W_CPOS"])
print(datos_union.head())


#Guarnamod dataset final

datos_union.to_csv("Dataset_unidoydfSF.csv",index=False)

print("Dataset generado correcamente")


# Vista final del nuevo dataset

print("\nMuestra final:")
print(datos_union[["peso_promedio","objetivo"]].head())