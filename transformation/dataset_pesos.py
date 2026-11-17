import re
import pandas as pd
from pathlib import Path

carpeta = Path(r"C:/Users/EmilyHernand/Documents/Modelo prediccion/DatosSucios")

archivos = list(carpeta.glob("*.txt"))

print(f"Archivos encontrados: {len(archivos)}")

registros = []

for archivo in archivos:

    with open(archivo,"r",encoding="utf-8",errors="ignore") as f:
        for linea in f:

            if "WriteWeight" not in linea:
                continue

            fecha = re.search(r"\[(.*?)\]",linea)

            fecha = fecha.group(1)

            match = re.search(r"WriteWeight\(3,\s*(.*?)\|(.*?)\)",linea)

            if not match:
                continue

            modelo = match.group(1)

            pesos = match.group(2).split(",")

            pesos = [float(x) for x in pesos]

            registros.append({
                "fecha": fecha,
                "modelo": modelo,
                "peso_1": pesos[0],
                "peso_2": pesos[1],
                "peso_3": pesos[2],
                "peso_4": pesos[3],
                "peso_5": pesos[4],
                "peso_promedio": sum(pesos) / len(pesos)
            })

df = pd.DataFrame(registros)
df["peso_promedio"]
df.to_csv("Dataset_pesos.csv",index=False)
print(df.head())
print("Dataset de pesos generado correctamente")