
import * as THREE from 'three';

import {
    ANCHO,
    Y_TECHO,
    cilindro
} from '../Piezas/Materiales';


// Estados que puede tener la máquina
// GapFiller.tsx también utiliza este tipo
export type EstadoMaquina = 'normal' | 'advertencia' | 'falla';


// Función para crear la torre de luz que indica el estado de la máquina
function TorreLuz() {

    // Creamos un grupo para guardar todas las piezas de la torre
    const torre = new THREE.Group();

    // Calculamos la altura donde comienza la torre
    // 0.06 es el grosor de la tapa superior de la vitrina
    const alturaTorre = Y_TECHO + 0.06;

    // Colocamos toda la torre en una esquina de la tapa superior
    torre.position.set(ANCHO / 2 - 0.3, 0, -0.3);


    // Creamos el soporte metálico de la torre
    const soporte = cilindro(
        0.04,
        0.04,
        0.3,
        '#8f969c',
        0,
        alturaTorre + 0.15,
        0,
        {
            metalness: 0.7
        }
    );

    torre.add(soporte);


    // Función para crear cada lámpara de la torre
    // Recibe el color encendido, el color apagado y su altura
    function crearLampara(colorEncendido: string, colorApagado: string, altura: number) {

        // Usamos el color encendido como emisivo para que la lámpara brille
        const lampara = cilindro(
            0.07,
            0.07,
            0.14,
            colorApagado,
            0,
            altura,
            0,
            {
                emisivo: colorEncendido
            }
        );

        // Comenzamos con la lámpara apagada
        fijarLampara(lampara, false, colorEncendido, colorApagado);

        return lampara;
    }


    // Función para encender o apagar una lámpara
    function fijarLampara(
        lampara: THREE.Mesh,
        encendida: boolean,
        colorEncendido: string,
        colorApagado: string
    ) {

        // Obtenemos el material de la lámpara para poder modificarlo
        const material = lampara.material as THREE.MeshStandardMaterial;

        // Cambiamos el color según esté encendida o apagada
        material.color.set(encendida ? colorEncendido : colorApagado);

        // Si está encendida emite luz, si está apagada no emite nada
        material.emissiveIntensity = encendida ? 1.5 : 0;
    }


    // Definimos los colores de cada lámpara
    const verdeEncendido = '#22ee55';
    const verdeApagado = '#14502a';
    const amarilloEncendido = '#ffd21f';
    const amarilloApagado = '#5c4c10';
    const rojoEncendido = '#ff2a2a';
    const rojoApagado = '#5a1414';

    // Creamos las tres lámparas: verde abajo, amarilla en medio y roja arriba
    const lamparaVerde = crearLampara(verdeEncendido, verdeApagado, alturaTorre + 0.37);
    const lamparaAmarilla = crearLampara(amarilloEncendido, amarilloApagado, alturaTorre + 0.51);
    const lamparaRoja = crearLampara(rojoEncendido, rojoApagado, alturaTorre + 0.65);

    torre.add(lamparaVerde, lamparaAmarilla, lamparaRoja);


    // Creamos la tapa negra que cierra la parte superior
    const tapa = cilindro(
        0.05,
        0.07,
        0.04,
        '#1b1d1f',
        0,
        alturaTorre + 0.74,
        0
    );

    torre.add(tapa);


    // Función para actualizar las lámparas según el estado de la máquina
    // Recibe el estado y el tiempo transcurrido en segundos
    torre.userData.actualizar = (estado: EstadoMaquina, tiempoActual: number) => {

        // La luz roja parpadea: cambia entre encendida y apagada varias veces por segundo
        const parpadeo = Math.sin(tiempoActual * 8) > 0;

        // Normal: solo la luz verde permanece encendida
        fijarLampara(lamparaVerde, estado === 'normal', verdeEncendido, verdeApagado);

        // Advertencia: solo la luz amarilla permanece encendida
        fijarLampara(lamparaAmarilla, estado === 'advertencia', amarilloEncendido, amarilloApagado);

        // Falla: la luz roja parpadea
        fijarLampara(lamparaRoja, estado === 'falla' && parpadeo, rojoEncendido, rojoApagado);

    };


    // Regresamos el grupo con toda la torre y su función de actualización
    return torre;
}

export default TorreLuz;
