
import * as THREE from 'three';

import {
    ANCHO,
    FONDO,
    Y_PISO,
    ALTO_RUEDA,
    ALTO_GABINETE,
    Y_GABINETE,
    caja,
    cilindro
} from '../Piezas/Materiales';


// Función para crear el gabinete inferior de la máquina
function Gabinete() {

    // Creamos un grupo para guardar todas las piezas del gabinete
    const gabinete = new THREE.Group();

    // Calculamos las posiciones y medidas que vamos a utilizar
    const centroGabinete = Y_GABINETE + ALTO_GABINETE / 2;
    const mitadAncho = ANCHO / 2;
    const mitadFondo = FONDO / 2;

    // Definimos los colores del gabinete
    const colorCuerpo = '#d9dde0';
    const colorPuerta = '#c9ced2';


    // Creamos el cuerpo principal del gabinete
    const cuerpo = caja(
        ANCHO,
        ALTO_GABINETE,
        FONDO,
        colorCuerpo,
        0,
        centroGabinete,
        0
    );

    gabinete.add(cuerpo);


    // Creamos las dos puertas del frente y sus manijas
    // Utilizamos un ciclo para crear una puerta en cada lado
    for (const x of [-1, 1]) {

        // Puerta del gabinete
        const puerta = caja(
            ANCHO / 2 - 0.1,
            ALTO_GABINETE - 0.2,
            0.03,
            colorPuerta,
            x * (ANCHO / 4),
            centroGabinete,
            mitadFondo + 0.01
        );

        gabinete.add(puerta);

        // Manija negra, cerca del centro de la máquina
        const manija = caja(
            0.04,
            0.3,
            0.05,
            '#1b1d1f',
            x * 0.12,
            centroGabinete + 0.15,
            mitadFondo + 0.045
        );

        gabinete.add(manija);
    }


    // Creamos las cuatro ruedas de la máquina
    // El diámetro de cada rueda es igual a ALTO_RUEDA
    for (const x of [-1, 1]) {
        for (const z of [-1, 1]) {

            const rueda = cilindro(
                ALTO_RUEDA / 2,
                ALTO_RUEDA / 2,
                0.06,
                '#2a2d30',
                x * (mitadAncho - 0.2),
                Y_PISO + ALTO_RUEDA / 2,
                z * (mitadFondo - 0.2)
            );

            // Giramos el cilindro para que quede de lado, como una rueda
            rueda.rotation.z = Math.PI / 2;

            gabinete.add(rueda);
        }
    }


    // Regresamos el grupo con todas las piezas del gabinete
    return gabinete;
}

export default Gabinete;
