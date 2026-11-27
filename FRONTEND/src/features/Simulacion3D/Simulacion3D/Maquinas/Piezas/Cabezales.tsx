
import * as THREE from 'three';

import {
    ANCHO,
    Y_TECHO,
    caja,
    cilindro,
    etiqueta
} from '../Piezas/Materiales';


// Función para crear los cabezales dosificadores
function Cabezales() {

    // Creamos un grupo para guardar todas las piezas
    const cabezales = new THREE.Group();

    // Calculamos la altura donde estará colocado el riel
    const alturaRiel = Y_TECHO - 0.45;


    // Creamos el riel horizontal donde se desplazarán los cabezales
    const riel = caja(
        ANCHO - 0.4,
        0.12,
        0.14,
        '#b9bec3',
        0,
        alturaRiel,
        -0.1,
        {
            metalness: 0.7,
            rugosidad: 0.4
        }
    );

    cabezales.add(riel);


    // Creamos la caja que contiene los ejes del riel
    const cajaEjes = caja(
        ANCHO - 0.4,
        0.3,
        0.1,
        '#d5d9dc',
        0,
        alturaRiel - 0.1,
        -0.5
    );

    cabezales.add(cajaEjes);


    // Función para crear cada cabezal dosificador
    // Recibe la letra que lo identifica y su posición horizontal
    function crearCabezal(letra: string, posicionX: number) {

        // Creamos un grupo para reunir las piezas del cabezal
        const cabezal = new THREE.Group();

        // Colocamos el cabezal en su posición inicial
        cabezal.position.set(posicionX, 0, 0);


        // Creamos el carro que se desplaza sobre el riel
        const carro = caja(
            0.34,
            0.16,
            0.24,
            '#8f969c',
            0,
            alturaRiel,
            -0.1,
            {
                metalness: 0.6
            }
        );

        cabezal.add(carro);


        // Creamos el adaptador del cabezal
        const adaptador = cilindro(
            0.09,
            0.09,
            0.4,
            '#a9afb4',
            0,
            alturaRiel - 0.28,
            0,
            {
                metalness: 0.7
            }
        );

        cabezal.add(adaptador);


        // Creamos el cuerpo principal del dosificador
        const cuerpo = cilindro(
            0.16,
            0.16,
            0.75,
            '#5b564f',
            0,
            alturaRiel - 0.82,
            0,
            {
                metalness: 0.6,
                rugosidad: 0.5
            }
        );

        cabezal.add(cuerpo);


        // Creamos la aguja por donde sale la pasta
        const aguja = cilindro(
            0.025,
            0.012,
            0.18,
            '#d6d9dc',
            0,
            alturaRiel - 1.28,
            0,
            {
                metalness: 0.9
            }
        );

        cabezal.add(aguja);


        // Agregamos una etiqueta para identificar el cabezal
        const identificador = etiqueta(
            letra,
            0.2,
            0.2,
            '#ffffff',
            '#111111',
            0,
            alturaRiel - 0.7,
            0.165
        );

        cabezal.add(identificador);


        // Regresamos el grupo con todas las piezas del cabezal
        return cabezal;
    }


    // Creamos el cabezal A en el lado izquierdo
    const cabezalA = crearCabezal('A', -0.38);

    // Creamos el cabezal B en el lado derecho
    const cabezalB = crearCabezal('B', 0.38);

    // Agregamos ambos cabezales al grupo principal
    cabezales.add(cabezalA, cabezalB);


    // Creamos la trayectoria curva de la cadena portacables
    const trayectoria = new THREE.CatmullRomCurve3([

        new THREE.Vector3(
            -ANCHO / 2 + 0.3,
            alturaRiel - 0.1,
            -0.45
        ),

        new THREE.Vector3(
            -ANCHO / 2 + 0.45,
            alturaRiel + 0.12,
            -0.3
        ),

        new THREE.Vector3(
            -0.6,
            alturaRiel + 0.1,
            -0.2
        ),

        new THREE.Vector3(
            -0.45,
            alturaRiel - 0.05,
            -0.1
        )
    ]);


    // Creamos la geometría de la cadena siguiendo la trayectoria
    const geometriaCadena = new THREE.TubeGeometry(
        trayectoria,
        24,
        0.05,
        8
    );

    // Definimos el material de la cadena
    const materialCadena = new THREE.MeshStandardMaterial({
        color: '#2a2d30',
        roughness: 0.7
    });

    // Unimos la geometría con el material
    const cadena = new THREE.Mesh(
        geometriaCadena,
        materialCadena
    );

    // Permitimos que la cadena proyecte sombras
    cadena.castShadow = true;

    cabezales.add(cadena);


    // Variables para controlar el movimiento de los cabezales
    let velocidad = 1;
    let tiempo = 0;
    let tiempoAnterior = 0;


    // Función para modificar la velocidad de movimiento
    // 0 = detenido, 1 = velocidad normal, 2 = doble velocidad
    cabezales.userData.fijarVelocidad = (nuevaVelocidad: number) => {

        velocidad = nuevaVelocidad;

    };


    // Función para actualizar el movimiento de los cabezales
    // Recibe el tiempo transcurrido en segundos
    cabezales.userData.actualizar = (tiempoActual: number) => {

        // Calculamos cuánto tiempo ha pasado desde la última actualización
        tiempo += (tiempoActual - tiempoAnterior) * velocidad;

        tiempoAnterior = tiempoActual;


        // Movemos el cabezal A de izquierda a derecha
        cabezalA.position.x =
            -0.38 + Math.sin(tiempo * 0.8) * 0.25;


        // Movemos el cabezal B en dirección contraria
        cabezalB.position.x =
            0.38 + Math.sin(tiempo * 0.8 + Math.PI) * 0.25;


        // Simulamos el movimiento vertical del cabezal A
        cabezalA.position.y =
            Math.max(0, Math.sin(tiempo * 1.6)) * -0.12;


        // Simulamos el movimiento vertical del cabezal B
        cabezalB.position.y =
            Math.max(0, Math.sin(tiempo * 1.6 + Math.PI)) * -0.12;

    };


    // Regresamos el grupo con los dos cabezales y su movimiento
    return cabezales;
}

export default Cabezales;
