import { useRef, useEffect } from "react";
import * as THREE from "three";
import './VisorMaquina3D.css';
import Base from "../Maquinas/GapFiller/Piezas/Base";
import Estructura from "../Maquinas/GapFiller/Piezas/Estructuras";

function VisorMaquina3D() {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contenedorRef.current) return;

    // Escena
    const escena = new THREE.Scene();
    escena.background = new THREE.Color("#f1f2f3");

    // Cámara
    const camara = new THREE.PerspectiveCamera(45,600 / 400,0.1,1000 );

    camara.position.set(0, 0, 5);
    camara.lookAt(0, 0, 0);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({antialias: true,});

    renderer.setSize(600, 400);

    contenedorRef.current.appendChild(renderer.domElement);

    //Piso 
    const gpiso = new THREE.PlaneGeometry(20, 20);
    const materialpiso= new THREE.MeshStandardMaterial({color: "#DCE3EA"});
    const piso= new THREE.Mesh(gpiso, materialpiso)
    piso.rotation.x = -Math.PI / 2;
    piso.position.y = -1;
    escena.add(piso)

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    escena.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff,2);

    directionalLight.position.set(5, 4, 7);
    camara.lookAt(0, 0, 0); //Hace que la camara mire hacia el centro
    escena.add(directionalLight);

    //Creamos la bse 
    const base = Base();
    escena.add(base);

    const estructura = Estructura();
    escena.add(estructura)

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(escena, camara);
    };

    animate();

    // Limpieza
    return () => {
      renderer.dispose();
      if (
        contenedorRef.current &&
        contenedorRef.current.contains(renderer.domElement)
      ) {
        contenedorRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={contenedorRef}className="visor-maquina-3D"/>
  );
}

export default VisorMaquina3D;