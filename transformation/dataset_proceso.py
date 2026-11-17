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

            #Conservar solo procesando linea
            if "Procesando línea" not in linea:
                continue

            #Extraer fecha
            extr_fecha=re.search(r"\[(.*?)\]", linea)

            if not extr_fecha:
                continue 

            fecha=extr_fecha.group(1)

            #Extraer datos despues de procesando linea
            coincidencia=re.search(r"Procesando línea:\s*'(.*?)'", linea)

            if not coincidencia:
                continue

            datos=coincidencia.group(1)

            #Separar los elementos del registro
            elementos=[
                elemento.strip()
                for elemento in datos.split(",")
            ]

            #Identificar tipo dee registro
            tipo=elementos[0]

            registro={"fecha": fecha,"tipo_registro": tipo}

            i = 1

            while i < len(elementos) - 1:

                clave = elementos[i].strip()
                valor = elementos[i + 1].strip()
                registro[clave] = valor
                i += 2

            registros.append(registro)

df = pd.DataFrame(registros)

#df.to_csv( "Dataset_proceso.csv",index=False)
print(df.head())
print("Dataset de variables de proceso generado correctamente")