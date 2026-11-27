import {cilindro,  Y_VITRINA, caja} from '../Piezas/Materiales';
import * as THREE from 'three';

function BrazoRobot(){
    //creamos un propo, para reunir todas las piezas
    const robot=new THREE.Group();
    //calculamos la altura de la vitrina
    const alturaVitrina=Y_VITRINA+0.4;

    //Colocamos el robot en su pocision
    robot.position.set(0, alturaVitrina, -0.1);
    //Definimos los colores del robot
    const naranja='#F23F1F';
    const blanco='#ffffff';
    const gris='#6e6e6e';

    //Cilindro de una articulación
    function crearArticulacion(radio:number){
        const articulacion=cilindro(
            radio,
            radio,
            0.22,
            naranja,
            0,
            0,
            0,
            {
                metalness:0.3
            }
        );

        articulacion.rotation.y=Math.PI/2;

        return articulacion;
    }

    //Base fija del robot
    const plataforma=cilindro(0.3,0.3,0.1, gris, 0, 0.05, 0, {metalness:0.6});
    const base=cilindro(0.22,0.25,0.2, blanco, 0,0.2,0);

    robot.add(plataforma,base)

    //
}

export default BrazoRobot;