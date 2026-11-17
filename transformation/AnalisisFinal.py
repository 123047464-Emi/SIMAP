from sklearn.preprocessing import LabelEncoder
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

datos_procesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_proceso3.csv")

datos_pesos = pd.read_csv(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_pesos.csv")

# Conversion de fechas

datos_procesos["fecha"] = pd.to_datetime(datos_procesos["fecha"])

datos_pesos["fecha"] = pd.to_datetime(datos_pesos["fecha"],format="%m/%d/%Y %I:%M:%S %p")

print("\nDataset procesos:")
print(datos_procesos.shape)
print(datos_procesos.head())

print("\nDataset pesos:")
print(datos_pesos.shape)
print(datos_pesos.head())

print("\nTipo de datos de proceso")
print(datos_procesos.dtypes)

print("\nTipo de datos de pesos")
print(datos_pesos.dtypes)

print("\n Rango de fechas de procesos")
print(f"Fecha maxima: {datos_procesos['fecha'].max()}")
print(f"Fecha minima: {datos_procesos['fecha'].min()}")

print("\n Rango de fechas de procesos")
print(f"Fecha maxima: {datos_pesos['fecha'].max()}")
print(f"Fecha minima: {datos_pesos['fecha'].min()}")

print("\n Frecuencia de captura")
df_proceso = datos_procesos.sort_values("fecha")

df_proceso["delta"] = df_proceso["fecha"].diff()

print(df_proceso["delta"].value_counts().head(20))

print("\n Distribucion de context")

print(df_proceso["CONTEXT"].value_counts())

print("\nDistribucion de filas de procesos")

print(df_proceso.groupby("fecha").size().value_counts().sort_index())

print("\n Distribucion de fechas")

conteo = df_proceso.groupby("fecha").size().sort_values(ascending=False)

print(conteo.head(10))

print("\n Fecha con 4 registros")
conteo = df_proceso.groupby("fecha").size()

fecha_4 = conteo[conteo == 4].index[0]

print(fecha_4)

print(df_proceso[df_proceso["fecha"] == fecha_4])


print("\n Fecha con 8 registros")
conteo = df_proceso.groupby("fecha").size()

fecha_8 = conteo[conteo == 8].index[0]

print(fecha_8)

print(df_proceso[df_proceso["fecha"] == fecha_8])


print("\n---ANALISIS (EDA)---")

print("\n Variables de procesos")
print("\n Valores nulos en procesos")
nulos =datos_procesos.isnull().sum().T
nulos["Valores nulos"]=datos_procesos.isna().sum()
print(nulos)

print("\n Variables de pesos")
print("\n Valores nulos en pesos")
nulos =datos_pesos.isnull().sum().T
nulos["Valores nulos"]=datos_pesos.isna().sum()
print(nulos)

print("\n Filas vacías")

columnas_analisis = ['B_CPOS', 'B_RPOS', 'B_VEL', 'B_TOR', 'B_PRES','CONTEXT','W_CPOS', 'W_RPOS', 'W_VEL', 'W_TOR', 'W_PRES']

# Filas completamente vacías
filas_vacias = datos_procesos[datos_procesos[columnas_analisis].isna().all(axis=1)]

print(f"Cantidad de filas vacías: {len(filas_vacias)}")
print(filas_vacias.head())

# Crear una copia para trabajar sin modificar el original
datos_procesos_limpio = datos_procesos[~datos_procesos[columnas_analisis].isna().all(axis=1)].copy()

print("\n Después de eliminar filas vacías")
print(datos_procesos_limpio.shape)

print(datos_procesos.shape)

print(datos_procesos["B_PRES"].describe())
print(datos_procesos["W_PRES"].describe())

print(datos_procesos["B_TOR"].describe())
print(datos_procesos["W_TOR"].describe())

print(datos_procesos["B_VEL"].describe())
print(datos_procesos["W_VEL"].describe())

print("\n Rango de presion B de procesos")
print(f"Presion maxima: {datos_procesos['B_PRES'].max()}")
print(f"Presion minima: {datos_procesos['B_PRES'].min()}")

print("\n Rango de presion W de procesos")
print(f"Presion maxima: {datos_procesos['W_PRES'].max()}")
print(f"Presion minima: {datos_procesos['W_PRES'].min()}")

print("\n Rango de torque B de procesos")
print(f"Torque maxima: {datos_procesos['B_TOR'].max()}")
print(f"Torque minima: {datos_procesos['B_TOR'].min()}")

print("\n Rango de torque W de procesos")
print(f"Torque maxima: {datos_procesos['W_TOR'].max()}")
print(f"Torque minima: {datos_procesos['W_TOR'].min()}")

print("\n Graficas")
sns.histplot(
    datos_procesos_limpio["B_PRES"].dropna(),
    bins=50
)

plt.title("Distribución B_PRES")
plt.show()

print("-------------------")
sns.histplot(
    datos_procesos_limpio["B_TOR"].dropna(),
    bins=50
)

plt.title("Distribución B_TOR")
plt.show()

print("-------------------")

sns.histplot(
    datos_procesos_limpio["W_PRES"].dropna(),
    bins=50
)

plt.title("Distribución W_PRES")
plt.show()

print("-------------------")
sns.histplot(
    datos_procesos_limpio["W_TOR"].dropna(),
    bins=50
)

plt.title("Distribución W_TOR")
plt.show()

print("-------------------")
sns.histplot(
    datos_procesos_limpio["W_VEL"].dropna(),
    bins=50
)

plt.title("Distribución W_VEL")
plt.show()

print("-------------------")

sns.histplot(
    datos_procesos_limpio["B_VEL"].dropna(),
    bins=50
)

plt.title("Distribución B_VEL")
plt.show()

print("----------")
sns.boxplot(
    x=datos_procesos_limpio["B_PRES"]
)

print("----------")
sns.boxplot(
    x=datos_procesos_limpio["W_PRES"]
)

print("----------")
sns.boxplot(
    x=datos_procesos_limpio["B_TOR"]
)

print("----------")
sns.boxplot(
    x=datos_procesos_limpio["W_TOR"]
)


