
import * as THREE from 'three';

function Base (){
    const figbase = new THREE.BoxGeometry(5, 0.4, 2.5);
    const materialBase = new THREE.MeshStandardMaterial({color: '#000536'});
    const base = new THREE.Mesh(figbase, materialBase);

    base.position.y = -1.2;
    return base;
}

export default Base;
