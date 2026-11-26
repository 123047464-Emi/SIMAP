import * as THREE from 'three';

function Base (){
    const figbase = new THREE.BoxGeometry();
    const materialBase= new THREE.MeshStandardMaterial({color: '#b5babe'});
    const base = new THREE.Mesh(figbase, materialBase);
    base.position.y=-1,2;
    return base;
}

export default Base;