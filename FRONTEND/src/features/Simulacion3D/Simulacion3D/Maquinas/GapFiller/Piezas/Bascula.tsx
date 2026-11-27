
import * as THREE from 'three';

import {
    Y_VITRINA,
    caja,
    etiqueta
} from '../Piezas/Materiales';


// Función para crear la báscula donde se pesa la pasta dosificada
function Bascula() {

    // Creamos un grupo para guardar todas las piezas de la báscula
    const bascula = new THREE.Group();

    // Definimos las medidas de la báscula
    const anchoBase = 0.9;
    const altoBase = 0.12;
    const fondoBase = 0.6;

    // Definimos su posición dentro de la vitrina
    // 0.04 es el grosor del piso interior de la vitrina
    const posicionZ = 0.1;
    const alturaBase = Y_VITRINA + 0.04 + altoBase / 2;


    // Creamos la base de la báscula
    const base = caja(
        anchoBase,
        altoBase,
        fondoBase,
        '#3a3f44',
        0,
        alturaBase,
        posicionZ
    );

    bascula.add(base);


    // Creamos el plato metálico donde se coloca la pasta
    const plato = caja(
        anchoBase - 0.2,
        0.03,
        fondoBase - 0.15,
        '#c9ced2',
        0,
        alturaBase + altoBase / 2 + 0.015,
        posicionZ,
        {
            metalness: 0.7,
            rugosidad: 0.4
        }
    );

    bascula.add(plato);


    // Creamos la pantalla que muestra el peso
    // La colocamos en el frente de la base
    const pantalla = etiqueta(
        '0.00 g',
        0.4,
        0.09,
        '#0b1a0b',
        '#7cfc00',
        0,
        alturaBase,
        posicionZ + fondoBase / 2 + 0.005
    );

    bascula.add(pantalla);


    // Regresamos el grupo con todas las piezas de la báscula
    return bascula;
}

export default Bascula;
