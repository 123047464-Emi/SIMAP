
import * as THREE from 'three';

// Medidas generales de la máquina
// Las utilizaremos para que todas las piezas mantengan las mismas proporciones
export const ANCHO = 2.4;
export const FONDO = 1.9;

// Alturas de cada sección de la máquina
export const Y_PISO = -1.0;
export const ALTO_RUEDA = 0.12;
export const ALTO_GABINETE = 1.2;
export const ALTO_VITRINA = 3.0;

// Calculamos la altura donde comienza cada sección
// Así no tenemos que escribir las posiciones manualmente
export const Y_GABINETE = Y_PISO + ALTO_RUEDA;
export const Y_VITRINA = Y_GABINETE + ALTO_GABINETE;
export const Y_TECHO = Y_VITRINA + ALTO_VITRINA;


// Opciones que podemos utilizar para modificar los materiales
type OpcionesMaterial = {
    metalness?: number;
    rugosidad?: number;
    opacidad?: number;
    emisivo?: string;
};


// Función para crear los materiales de las piezas
function crearMaterial(color: string, opciones: OpcionesMaterial = {}) {

    // Revisamos si el material tendrá transparencia
    const transparente = opciones.opacidad !== undefined;

    // Creamos el material con las características que necesitamos
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: opciones.metalness ?? 0.1,
        roughness: opciones.rugosidad ?? 0.6,
        transparent: transparente,
        opacity: opciones.opacidad ?? 1,
        depthWrite: !transparente,
        emissive: opciones.emisivo ?? '#000000',
        emissiveIntensity: opciones.emisivo ? 1 : 0,
    });

    return material;
}


// Función para configurar la posición y las sombras de una pieza
function preparar(pieza: THREE.Mesh, opciones: OpcionesMaterial, x: number, y: number, z: number) {

    // Colocamos la pieza en las coordenadas indicadas
    pieza.position.set(x, y, z);

    // Indicamos si la pieza puede proyectar sombras
    pieza.castShadow = opciones.opacidad === undefined;

    // Permitimos que la pieza reciba sombras
    pieza.receiveShadow = true;

    return pieza;
}


// Función para crear piezas rectangulares
export function caja(
    ancho: number,
    alto: number,
    fondo: number,
    color: string,
    x = 0,
    y = 0,
    z = 0,
    opciones: OpcionesMaterial = {}
) {
    // Creamos la geometría rectangular con sus medidas
    const geometria = new THREE.BoxGeometry(ancho, alto, fondo);

    // Creamos el material que tendrá la pieza
    const material = crearMaterial(color, opciones);

    // Unimos la geometría con el material
    const pieza = new THREE.Mesh(geometria, material);

    // Configuramos su posición y sus sombras
    return preparar(pieza, opciones, x, y, z);
}


// Función para crear piezas cilíndricas
export function cilindro(
    radioSuperior: number,
    radioInferior: number,
    alto: number,
    color: string,
    x = 0,
    y = 0,
    z = 0,
    opciones: OpcionesMaterial = {}
) {
    // Creamos la geometría del cilindro
    const geometria = new THREE.CylinderGeometry(
        radioSuperior,
        radioInferior,
        alto,
        32
    );

    // Creamos el material de la pieza
    const material = crearMaterial(color, opciones);

    // Unimos la geometría con el material
    const pieza = new THREE.Mesh(geometria, material);

    // Configuramos su posición y sus sombras
    return preparar(pieza, opciones, x, y, z);
}


// Función para crear etiquetas con texto
export function etiqueta(
    texto: string,
    ancho: number,
    alto: number,
    colorFondo: string,
    colorTexto: string,
    x = 0,
    y = 0,
    z = 0
) {
    // Creamos un lienzo para dibujar el texto
    const lienzo = document.createElement('canvas');

    // Definimos el tamaño del lienzo
    lienzo.width = 256;
    lienzo.height = Math.max(32, Math.round(256 * (alto / ancho)));

    // Obtenemos el espacio donde dibujaremos
    const contexto = lienzo.getContext('2d')!;

    // Dibujamos el fondo de la etiqueta
    contexto.fillStyle = colorFondo;
    contexto.fillRect(0, 0, lienzo.width, lienzo.height);

    // Definimos el color del texto
    contexto.fillStyle = colorTexto;

    // Calculamos el tamaño del texto para que quepa en la etiqueta
    const tamano = Math.min(
        lienzo.height * 0.6,
        (lienzo.width * 0.9) / Math.max(1, texto.length * 0.62)
    );

    // Configuramos la apariencia y alineación del texto
    contexto.font = `bold ${Math.round(tamano)}px sans-serif`;
    contexto.textAlign = 'center';
    contexto.textBaseline = 'middle';

    // Dibujamos el texto en el centro del lienzo
    contexto.fillText(
        texto,
        lienzo.width / 2,
        lienzo.height / 2 + 2
    );

    // Convertimos el lienzo en una textura para Three.js
    const textura = new THREE.CanvasTexture(lienzo);
    textura.colorSpace = THREE.SRGBColorSpace;

    // Creamos la superficie donde se mostrará la etiqueta
    const geometria = new THREE.PlaneGeometry(ancho, alto);
    const material = new THREE.MeshBasicMaterial({
        map: textura
    });

    // Unimos la geometría y el material
    const pieza = new THREE.Mesh(geometria, material);

    // Colocamos la etiqueta en la posición indicada
    pieza.position.set(x, y, z);

    return pieza;
}
