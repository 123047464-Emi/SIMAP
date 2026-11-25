from sklearn.preprocessing import LabelEncoder
import pandas as pd

print("Cargando datos...")

datos_procesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_proceso3.csv")

datos_pesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_pesos.csv")

# Conversion de fechas

datos_procesos["fecha"] = pd.to_datetime(datos_procesos["fecha"])

datos_pesos["fecha"] = pd.to_datetime(datos_pesos["fecha"],format="%m/%d/%Y %I:%M:%S %p")

print("\nDataset procesos:")
print(datos_procesos.shape)

print("\nDataset pesos:")
print(datos_pesos.shape)

# Limpieza de los registros de pesos

print("\nEliminando outliers de peso...")

outliers = datos_pesos[datos_pesos["peso_promedio"] > 2]

print(f"Outliers encontrados: {len(outliers)}")

datos_pesos = datos_pesos[datos_pesos["peso_promedio"] <= 2].copy()

print(f"Registros válidos: {len(datos_pesos)}")

# Separacion de variables de proceso

print("\nPreparando variables de proceso...")

b = datos_procesos[
    [
        "fecha",
        "B_CPOS",
        "B_RPOS",
        "B_VEL",
        "B_TOR",
        "B_PRES"
    ]
].dropna(
    how="all",
    subset=[
        "B_CPOS",
        "B_RPOS",
        "B_VEL",
        "B_TOR",
        "B_PRES"
    ]
)

w = datos_procesos[
    [
        "fecha",
        "W_CPOS",
        "W_RPOS",
        "W_VEL",
        "W_TOR",
        "W_PRES"
    ]
].dropna(
    how="all",
    subset=["W_CPOS", "W_RPOS", "W_VEL","W_TOR","W_PRES"]
)

# Union de procesos

print("\nUniendo variables B y W...")

datos_union_procesos = pd.merge(
    b,
    w,
    on="fecha",
    how="outer"
)

datos_union_procesos = (datos_union_procesos.sort_values("fecha").ffill())

print(f"Registros de proceso: {datos_union_procesos.shape}")

# UNIÓN CON PESOS

print("\nUniendo procesos y pesos...")

datos_union = pd.merge_asof(
    datos_union_procesos.sort_values("fecha"),
    datos_pesos.sort_values("fecha"),
    on="fecha",
    direction="backward",
    tolerance=pd.Timedelta("2h")
)

datos_union["Disponibilidad de peso"]=(datos_union["peso_promedio"].notna().astype(int))

print(f"Registros con nueva columna: \n")
print(datos_union.head())

print(f"\nShape después de unión: {datos_union.shape}")

#Conservamos los registros con pesos reales

print("\nEliminando registros sin peso...")

#datos_union = datos_union.dropna(subset=["peso_promedio"]).copy()

print(f"Registros finales con peso: {len(datos_union)}")

# Codificación de modelo

print("\nCodificando modelos...")

le = LabelEncoder()
datos_union["modelo"] = le.fit_transform(datos_union["modelo"])

print(type(datos_union))

# Variable objetivo

print("\nCreando variable objetivo...")

# 0 = ANORMAL
# 1 = NORMAL

datos_union["objetivo"] = (
    (((datos_union["peso_promedio"].between(0.9, 1.1)) |
     (datos_union["peso_promedio"].isnull()))&
     (datos_union["B_PRES"].between(75, 175)) &
     (datos_union["W_PRES"].between(75,175) )&
     (datos_union["B_TOR"].between(0.45, 0.59)) &
     (datos_union["W_TOR"].between(0.45, 0.59))
     ).astype(int))

print("\nDistribución de clases:")

print(datos_union["objetivo"].value_counts())

print("\nPorcentaje:")

print(datos_union["objetivo"].value_counts(normalize=True) * 100)

#Analisis para el mantenimiento

print("\nPromedios por clase:")

print(
    datos_union.groupby("objetivo")[
        [
            "B_PRES",
            "W_PRES",
            "B_TOR",
            "W_TOR",
            "peso_promedio"
        ]
    ].mean()
)

# Eliminamos columnas no necesarias para el entrenamiento

columnas_eliminar = [
    "fecha",
    "peso_1",
    "peso_2",
    "peso_3",
    "peso_4",
    "peso_5",
    "B_CPOS",
    "W_CPOS",
    "B_VEL",
    "W_VEL"
]

columnas_existentes = [
    c for c in columnas_eliminar
    if c in datos_union.columns
]

datos_union = datos_union.drop(
    columns=columnas_existentes
)

# Si realmente son constantes
columnas_constantes = [
    "B_VEL",
    "W_VEL",
    "B_CPOS",
    "W_CPOS"
]

columnas_existentes = [
    c for c in columnas_constantes
    if c in datos_union.columns
]

datos_union = datos_union.drop(
    columns=columnas_existentes
)

# Duplicados

print("\nEliminando duplicados...")

datos_union = datos_union.drop_duplicates()

print(f"Registros finales: {len(datos_union)}")

#Dataset

print("\nColumnas finales:")

print(datos_union.columns.tolist())

print("\nPrimeros registros:")

print(datos_union.head())

# Guardar dataset

#datos_union.to_csv("Dataset_Entrenamiento.csv",index=False)

print(f"\nDataset guardado correctamente")