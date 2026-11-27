import { OrbitControls } from "three/examples/jsm/Addons.js";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import './VisorMaquina3D.css';
import GapFiller from "../Maquinas/GapFiller";
import Atornillador from "../Maquinas/Atornillador";
import Assembly from "../Maquinas/Assembly";
import Retrabajo from "../Maquinas/Retrabajo";


function VisorMaquina3D() {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contenedorRef.current) return;

    // Escena
    const escena = new THREE.Scene();
    escena.background = new THREE.Color("#ffffff");

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

    renderer.setSize(1450, 600);

    // Evita acumular lienzos si el efecto vuelve a ejecutarse.
    contenedorRef.current.replaceChildren(renderer.domElement);

  //Controlador de la camara
  const controlador = new OrbitControls(camara,  renderer.domElement);
  controlador.enableDamping=true;
  controlador.dampingFactor=0.05;

  controlador.target.set(0,0,0);

    // Piso
    const gpiso = new THREE.PlaneGeometry(150, 80);
    const materialpiso = new THREE.MeshStandardMaterial({
      color: '#1b1b1f'
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
    const GapFiller1 = GapFiller();
    //Creamos la GapFiller 2
    const GapFiller2 = GapFiller();
    //Creamos a GapFiller 3
    const GapFiller3=GapFiller();

    //------------------------------------------------------------------------------

    //Creamos atornilladores
    const Atornillador1=Atornillador();
    const Atornillador2=Atornillador();
    const Atornillador3=Atornillador();

    //------------------------------------------------------------------------------
    //Crear maquinas assembly
    const Assembly1=Assembly();
    const Assembly2=Assembly();
    const Assembly3=Assembly();
    
    //------------------------------------------------------------------------------
    //Posicion de maquinas, una detras de otra
    GapFiller1.position.set(-8, 0, 0);
    GapFiller2.position.set(-8, 0, -2); //Cambia la maquina hacia atras de la 1
    GapFiller2.rotation.y = Math.PI;

    GapFiller3.position.set(-5.5, 0, -0.80);
    //------------------------------------------------------------------------------

    Atornillador1.position.set(-0.5, 0, -1);
    Atornillador2.position.set(4.5, 0, 1.5); //Gira la maquina a la izquierda
    Atornillador2.rotation.y=-Math.PI/2;
    
    Atornillador3.position.set(4.5, 0, 6.7); //Gira el atornillador
    Atornillador3.rotation.y=-Math.PI/2;

    //------------------------------------------------------------------------------
    Assembly1.position.set(-3, 0, -1);
    Assembly2.position.set(2,0,-1);
    Assembly3.position.set(4.5,  0,  4.2);
    Assembly3.rotation.y=-Math.PI/2;
    //Separamos en el eje x, la base mide 5 de ancho
    //maquina1.position.x=-3;

    escena.add(GapFiller1,GapFiller2, GapFiller3, Assembly1, Atornillador1, Assembly2, Atornillador2, Assembly3, Atornillador3);

    // Animación
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      controlador.update();

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
