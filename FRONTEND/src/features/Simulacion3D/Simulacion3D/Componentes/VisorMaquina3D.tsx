
import { useRef, useEffect } from "react";
import * as THREE from "three";
import './VisorMaquina3D.css';
import GapFiller from "../Maquinas/GapFiller/GapFiller";

function VisorMaquina3D() {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contenedorRef.current) return;

    // Escena
    const escena = new THREE.Scene();
    escena.background = new THREE.Color("#f1f2f3");

    // Cámara
    const camara = new THREE.PerspectiveCamera(
      45,
      600 / 400,
      0.1,
      1000
    );

    camara.position.set(10, 8, 12);
    camara.lookAt(0, 0, 0);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(600, 400);

    // Evita acumular lienzos si el efecto vuelve a ejecutarse.
    contenedorRef.current.replaceChildren(renderer.domElement);

    // Piso
    const gpiso = new THREE.PlaneGeometry(20, 20);
    const materialpiso = new THREE.MeshStandardMaterial({
      color: "#DCE3EA"
    });

    const piso = new THREE.Mesh(gpiso, materialpiso);
    piso.rotation.x = -Math.PI / 2;
    piso.position.y = -1;
    escena.add(piso);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    escena.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 4, 7);
    escena.add(directionalLight);

    // Creamos la Gap Filler
    const maquina = GapFiller();

    //Separamos en el eje x, la base mide 5 de ancho
    //maquina1.position.x=-3;

    escena.add(maquina);

    // Animación
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(escena, camara);
    };
    
    animate();

    // Limpieza
    return () => {
      cancelAnimationFrame(animationId);
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
    <div
      ref={contenedorRef}
      className="visor-maquina-3D"
    />
  );
}

export default VisorMaquina3D;
