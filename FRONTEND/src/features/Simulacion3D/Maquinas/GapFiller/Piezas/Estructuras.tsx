import * as THREE from 'three';

function Estructura(){
    const estructura =new THREE.Group();
    const materialEstructura = new THREE.MeshStandardMaterial({color : '#bddcf3'})

    const pilares= new THREE.BoxGeometry(0.25, 2.75, 0.25);

    //Creamos barras laterales
    const geometriaLateral = new THREE.BoxGeometry(5,  0.25,  0.25);
    const geometriaFrontal = new THREE.BoxGeometry(0.25, 0.25, 0.25);

    const BarraFrontal = new THREE.Mesh(geometriaLateral, materialEstructura);
    BarraFrontal.position.set(2,3);
    BarraFrontal.add(BarraFrontal); // barraFrontal

    const barraTrasera = new THREE.Mesh(geometriaFrontal, materialEstructura);
    barraTrasera.position.set(1,2);
    barraTrasera.add(barraTrasera);

    const barraIzquierda = new THREE.Mesh(geometriaLateral, materialEstructura);
    barraIzquierda.position.set(4,5);
    barraIzquierda.add(barraIzquierda);

    const barraDerecha = new THREE.Mesh(geometriaLateral, materialEstructura);
    barraDerecha.position.set(6,7);
    barraDerecha.add(barraDerecha);
    
    //const estructura = new THREE.Mesh(figEstructura, materialEstructura)
    estructura.position.y=0;

    return estructura;
}

export default Estructura;
