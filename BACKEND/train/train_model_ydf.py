from sklearn.model_selection import train_test_split
import pandas as pd
import ydf

data = pd.read_csv("C:/Users/EmilyHernand/Documents/Modelo prediccion/Dataset_Entrenamiento.csv")

def entrenar_modelo(
    df=data,
    columna_objetivo="objetivo",
    columna_tiempo=None,
    test_size=0.2
):

    if not isinstance(df, pd.DataFrame):
        raise TypeError(
            "Los datos recibidos no corresponden a un DataFrame"
        )

    if df.empty:
        raise ValueError(
            "El DataFrame está vacío"
        )

    if columna_objetivo not in df.columns:
        raise ValueError(
            f"La columna {columna_objetivo} no existe"
        )

    # eliminar registros sin etiqueta
    df = df.dropna(subset=[columna_objetivo])

    if columna_tiempo is not None:

        if columna_tiempo not in df.columns:
            raise ValueError(
                f"No existe la columna {columna_tiempo}"
            )

        df = df.sort_values(
            by=columna_tiempo
        ).reset_index(drop=True)

    X = df.drop(columns=[columna_objetivo])
    y = df[columna_objetivo]

    if columna_tiempo is not None:

        indice_corte = int(
            len(df) * (1 - test_size)
        )

        X_train = X.iloc[:indice_corte]
        X_test = X.iloc[indice_corte:]

        y_train = y.iloc[:indice_corte]
        y_test = y.iloc[indice_corte:]

    else:

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=test_size,
            random_state=42,
            stratify=y
        )

    df_train = X_train.copy()
    df_train[columna_objetivo] = y_train

    df_test = X_test.copy()
    df_test[columna_objetivo] = y_test

    #learner = ydf.GradientBoostedTreesLearner(label=columna_objetivo, num_trees=300)

    modelo=ydf.RandomForestLearner(label=columna_objetivo,num_trees=300)

    model = modelo.train(df_train)

    print("Modelo entrenado correctamente")

    return model


modelo = entrenar_modelo()
modelo.save("models/Modelo_Entrenado")