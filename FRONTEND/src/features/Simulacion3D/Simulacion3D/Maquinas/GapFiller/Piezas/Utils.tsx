import* as THREE from 'three';

//Medidas generales de la maquina
export const ANCHO = 2.4;
export const FONDO = 1.9;

//Alturas de las diferentes partes
export const Y_PISO=-1;
export const ALTO_RUEDA= 0.12;
export const ALTO_GABINETE=1.2;
export const ALTO_VITRINA= 3.0;

//Calculamos la posicion de cada seccion, para no hacerlo manual
export const Y_GABINETE= Y_PISO+ALTO_RUEDA;
export const Y_VITRINA=Y_GABINETE+ALTO_GABINETE;
export const Y_TECHO= Y_VITRINA+ALTO_VITRINA;

//Opciones para configurar los materiales
type OpcionesMaterial={
    metalness?: number; //indica si una superficie se comporta como metal
    rugosidad?:number;
    opacidad?:number;
    emisivo?:string; //Propiedad que hace que un material emita luz
}

//Funcion para crear los materiales de las piezas
function MaterialGF(color:string, opciones:OpcionesMaterial={}){
    //Comprobamos si la pieza tendra transparencia
    const transparente = opciones.opacidad !== undefined;

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

//Funcion para preparar las piezas 
function preparar(pieza:THREE.Mesh, opciones: OpcionesMaterial, x:number, y:number, z:number){

    //Establecemos la posicion de la pieza
    pieza.position.set(x,y,z)

    //Sombras
    pieza.castShadow=opciones.opacidad=== undefined;
    pieza.receiveShadow= true;
    
    return pieza;
}

//Funcion para crear piezas rectangurales
export function caja(ancho: number, alto: number, fondo:number, color:string, x=0, y=0, z=0, opciones: OpcionesMaterial={}){
    //Creamos la forma rectangular
    const geometria = new THREE.BoxGeometry(ancho, alto, fondo);
    //Creamos el material
    const material = MaterialGF(color, opciones);
    //usamos la geometria y el material
    const pieza = new THREE.Mesh(geometria, material);

    //Configuramos posicion y sombra
    return preparar(pieza, opciones, x,y,z);
}

//Funcion para crear etiquetas de texto
export function etiqueta(texto: string, alto: number, ancho:number, colorFondo:string, colorTexto:string, x=0, y=0, z=0){
    //Creamos etiqueta 
    const lienzo = document.createElement('canvas');
    lienzo.width= 256;
    lienzo.height= Math.max(32, Math.round(256 * (alto/ancho)));

    //Espacio para dibujar
    const contexto = lienzo.getContext('2d')!;

    //Dibujamos del fondo de la etiqueta
    contexto.fillStyle = colorFondo;
    contexto.fillRect(0,0, lienzo.width, lienzo.height);

    // Configuramos el texto
    contexto.fillStyle = colorTexto;

    const tamaño = Math.min(
        lienzo.height * 0.6,
        (lienzo.width * 0.9) / Math.max(1, texto.length * 0.62)
    );

    contexto.font = `bold ${Math.round(tamaño)}px sans-serif`;
    contexto.textAlign = 'center';
    contexto.textBaseline = 'middle';

    // Dibujamos el texto en el centro
    contexto.fillText(
        texto,
        lienzo.width / 2,
        lienzo.height / 2 + 2
    );

    // Convertimos el lienzo en una textura de Three.js
    const textura = new THREE.CanvasTexture(lienzo);
    textura.colorSpace = THREE.SRGBColorSpace;

    // Creamos una superficie para mostrar la etiqueta
    const geometria = new THREE.PlaneGeometry(ancho, alto);

    const material = new THREE.MeshBasicMaterial({
        map: textura
    });

    const pieza = new THREE.Mesh(geometria, material);

    // Colocamos la etiqueta en la escena
    pieza.position.set(x, y, z);

    return pieza;
}

