
import * as THREE from 'three';

// Importamos las piezas que forman la máquina
import Base from './Piezas/Base';
import Gabinete from './Piezas/Gabinete';
import Estructura from './Piezas/Estructura';
import Cabezales from './Piezas/Cabezales';
import Bascula from './Piezas/Bascula';
import Cartuchos from './Piezas/Cartuchos';
import TorreLuz from './Piezas/TorreLuz';
import type { EstadoMaquina } from './Piezas/TorreLuz';


// Función para construir la máquina Gap Filler
function GapFiller() {

    // Creamos un grupo para reunir todas las piezas de la máquina
    const maquina = new THREE.Group();


    // Creamos los cabezales dosificadores
    const cabezales = Cabezales();

    // Creamos la torre de luz
    const torre = TorreLuz();


    // Agregamos todas las piezas al grupo de la máquina
    // El orden importa porque el visor utiliza la primera pieza (Base)
    maquina.add(Base(),Gabinete(),Estructura(),cabezales,Bascula(),Cartuchos(),torre);

    // Definimos el estado inicial de la máquina
    let estado: EstadoMaquina = 'normal';

    // Función para cambiar el estado de la máquina
    maquina.userData.fijarEstado = (nuevoEstado: EstadoMaquina) => {

        // Actualizamos el estado actual
        estado = nuevoEstado;

        // Definimos la velocidad de los cabezales según el estado
        const velocidades = {
            normal: 1,
            advertencia: 0.5,
            falla: 0
        };

        // Aplicamos la velocidad correspondiente
        cabezales.userData.fijarVelocidad(velocidades[nuevoEstado]);

    };


    // Función para actualizar los movimientos de la máquina
    // Recibe el tiempo transcurrido en segundos
    maquina.userData.actualizar = (tiempoActual: number) => {

        // Actualizamos el movimiento de los cabezales
        cabezales.userData.actualizar(tiempoActual);

        // Actualizamos la torre de luz según el estado de la máquina
        torre.userData.actualizar(estado, tiempoActual);

    };


    // Regresamos el grupo con toda la máquina
    return maquina;
}

export default GapFiller;
