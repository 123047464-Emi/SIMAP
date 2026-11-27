
import * as THREE from 'three';

import {ANCHO,FONDO,ALTO_VITRINA,Y_VITRINA,Y_TECHO,caja,etiqueta} from '../Piezas/Materiales'

// Función para crear la estructura de la vitrina superior
function Estructura() {

    // Creamos un grupo para guardar todas las piezas de la estructura
    const estructura = new THREE.Group();

    // Calculamos las posiciones y medidas que vamos a utilizar
    const centroVitrina = Y_VITRINA + ALTO_VITRINA / 2;
    const mitadAncho = ANCHO / 2;
    const mitadFondo = FONDO / 2;

    // Definimos el grosor y color de los perfiles
    const perfil = 0.12;
    const aluminio = '#e8eaec';


    // Creamos el piso interior de la vitrina
    const pisoInterior = caja(
        ANCHO - 0.1,
        0.04,
        FONDO - 0.1,
        '#2b2f33',
        0,
        Y_VITRINA + 0.02,
        0
    );

    estructura.add(pisoInterior);


    // Creamos la tapa superior de la vitrina
    const tapaSuperior = caja(
        ANCHO,
        0.06,
        FONDO,
        aluminio,
        0,
        Y_TECHO + 0.03,
        0
    );

    estructura.add(tapaSuperior);


    // Creamos los cuatro postes de las esquinas
    // Utilizamos dos ciclos para colocar uno en cada esquina
    for (const x of [-1, 1]) {
        for (const z of [-1, 1]) {

            const posicionX = x * (mitadAncho - perfil / 2);
            const posicionZ = z * (mitadFondo - perfil / 2);

            // Poste de aluminio
            const poste = caja(
                perfil,
                ALTO_VITRINA,
                perfil,
                aluminio,
                posicionX,
                centroVitrina,
                posicionZ
            );

            estructura.add(poste);

            // Franja negra del poste
            const franjaFrontal = caja(
                0.03,
                ALTO_VITRINA,
                0.01,
                '#111214',
                posicionX,
                centroVitrina,
                posicionZ + z * (perfil / 2 + 0.002)
            );

            estructura.add(franjaFrontal);

            // Segunda franja negra del poste
            const franjaLateral = caja(
                0.01,
                ALTO_VITRINA,
                0.03,
                '#111214',
                posicionX + x * (perfil / 2 + 0.002),
                centroVitrina,
                posicionZ
            );

            estructura.add(franjaLateral);
        }
    }


    // Creamos las barras superiores e inferiores de la vitrina
    for (const posicionY of [Y_VITRINA + 0.08, Y_TECHO - 0.08]) {

        // Barras del frente y de la parte trasera
        for (const z of [-1, 1]) {

            const barra = caja(
                ANCHO,
                0.1,
                perfil,
                aluminio,
                0,
                posicionY,
                z * (mitadFondo - perfil / 2)
            );

            estructura.add(barra);
        }

        // Barras de los costados
        for (const x of [-1, 1]) {

            const barra = caja(
                perfil,
                0.1,
                FONDO,
                aluminio,
                x * (mitadAncho - perfil / 2),
                posicionY,
                0
            );

            estructura.add(barra);
        }
    }


    // Creamos el poste central que separa las dos puertas
    const posteCentral = caja(
        0.12,
        ALTO_VITRINA,
        0.1,
        aluminio,
        0,
        centroVitrina,
        mitadFondo - 0.05
    );

    estructura.add(posteCentral);

    // Agregamos la franja negra del poste central
    const franjaCentral = caja(
        0.03,
        ALTO_VITRINA,
        0.01,
        '#111214',
        0,
        centroVitrina,
        mitadFondo + 0.002
    );

    estructura.add(franjaCentral);


    // Creamos los vidrios de las puertas y los costados
    // La opacidad permite que podamos ver el interior de la máquina
    const vidrio = { opacidad: 0.16 };

    const altoVidrio = ALTO_VITRINA - 0.3;

    for (const x of [-1, 1]) {

        // Vidrios de las dos puertas frontales
        const puerta = caja(
            mitadAncho - 0.22,
            altoVidrio,
            0.02,
            '#bfe3ef',
            x * (mitadAncho / 2 + 0.03),
            centroVitrina,
            mitadFondo - 0.03,
            vidrio
        );

        estructura.add(puerta);

        // Vidrios de los costados
        const vidrioLateral = caja(
            0.02,
            altoVidrio,
            FONDO - 0.3,
            '#bfe3ef',
            x * (mitadAncho - 0.03),
            centroVitrina,
            0,
            vidrio
        );

        estructura.add(vidrioLateral);
    }


    // Creamos el fondo opaco de la vitrina
    // Esto ayuda a darle profundidad al interior de la máquina
    const fondoInterior = caja(
        ANCHO - 0.2,
        altoVidrio,
        0.04,
        '#dfe3e6',
        0,
        centroVitrina,
        -mitadFondo + 0.1
    );

    estructura.add(fondoInterior);


    // Creamos las dos manijas negras de las puertas
    for (const x of [-1, 1]) {

        const manija = caja(
            0.05,
            0.55,
            0.07,
            '#1b1d1f',
            x * 0.12,
            centroVitrina,
            mitadFondo + 0.03
        );

        estructura.add(manija);
    }


    // Creamos las bisagras de las puertas
    // Cada puerta tendrá tres bisagras
    for (const x of [-1, 1]) {
        for (const posicionY of [-1.0, 0, 1.0]) {

            const bisagra = caja(
                0.07,
                0.18,
                0.05,
                '#aeb4b9',
                x * (mitadAncho - 0.03),
                centroVitrina + posicionY,
                mitadFondo + 0.04,
                {
                    metalness: 0.8,
                    rugosidad: 0.35
                }
            );

            estructura.add(bisagra);
        }
    }


    // Agregamos los nombres de las puertas
    const nombrePuerta1 = etiqueta(
        'DOOR 1',
        0.5,
        0.3,
        '#f4f4f4',
        '#222222',
        -mitadAncho / 2,
        Y_TECHO - 0.5,
        mitadFondo - 0.08
    );

    estructura.add(nombrePuerta1);

    const nombrePuerta2 = etiqueta(
        'DOOR 2',
        0.5,
        0.3,
        '#f4f4f4',
        '#222222',
        mitadAncho / 2,
        Y_TECHO - 0.5,
        mitadFondo - 0.08
    );

    estructura.add(nombrePuerta2);


    // Creamos la iluminación interior de la vitrina
    const luzInterior = caja(
        ANCHO - 0.5,
        0.03,
        0.25,
        '#ffffff',
        0,
        Y_TECHO - 0.06,
        0,
        {
            emisivo: '#ffffff'
        }
    );

    estructura.add(luzInterior);


    // Regresamos el grupo con todas las piezas de la estructura
    return estructura;
}

export default Estructura;
