
import * as THREE from 'three';

import {
    Y_VITRINA,
    cilindro
} from '../Piezas/Materiales';


// Función para crear los cartuchos de pasta azul y blanca
function Cartuchos() {

    // Creamos un grupo para guardar los dos cartuchos
    const cartuchos = new THREE.Group();

    // Calculamos la altura del piso interior de la vitrina
    // 0.04 es el grosor del piso interior
    const alturaPiso = Y_VITRINA + 0.04;


    // Función para crear cada cartucho
    // Recibe el color de la pasta y su posición horizontal
    function crearCartucho(color: string, posicionX: number) {

        // Creamos un grupo para reunir las piezas del cartucho
        const cartucho = new THREE.Group();

        // Colocamos el cartucho de pie sobre el piso de la vitrina
        cartucho.position.set(posicionX, alturaPiso, -0.4);


        // Creamos el cuerpo del cartucho, que tiene el color de la pasta
        const cuerpo = cilindro(
            0.1,
            0.1,
            0.5,
            color,
            0,
            0.25,
            0,
            {
                rugosidad: 0.4
            }
        );

        cartucho.add(cuerpo);


        // Creamos el émbolo que cierra la parte inferior
        const embolo = cilindro(
            0.105,
            0.105,
            0.04,
            '#8f969c',
            0,
            0.02,
            0,
            {
                metalness: 0.6
            }
        );

        cartucho.add(embolo);


        // Creamos el cono que une el cuerpo con la boquilla
        // El radio superior es pequeño y el inferior es grande
        const cono = cilindro(
            0.03,
            0.1,
            0.12,
            '#d6d9dc',
            0,
            0.56,
            0
        );

        cartucho.add(cono);


        // Creamos la boquilla por donde sale la pasta
        const boquilla = cilindro(
            0.02,
            0.02,
            0.06,
            '#d6d9dc',
            0,
            0.65,
            0
        );

        cartucho.add(boquilla);


        // Regresamos el grupo con todas las piezas del cartucho
        return cartucho;
    }


    // Creamos el cartucho de pasta azul en el lado izquierdo
    const cartuchoAzul = crearCartucho('#2f6fd0', -0.8);

    // Creamos el cartucho de pasta blanca en el lado derecho
    const cartuchoBlanco = crearCartucho('#f2f2f2', 0.8);

    // Agregamos ambos cartuchos al grupo principal
    cartuchos.add(cartuchoAzul, cartuchoBlanco);


    // Regresamos el grupo con los dos cartuchos
    return cartuchos;
}

export default Cartuchos;
