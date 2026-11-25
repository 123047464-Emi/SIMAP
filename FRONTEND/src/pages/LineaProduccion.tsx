import Cards from "../Componentes/Cards/Cards";
import './pages.css'
import LeyendaEstado from "../Componentes/Leyendas/LeyendaEstado";
import { IoSettingsSharp } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { GiAlarmClock } from "react-icons/gi";

function LineaProduccion(){
    return(
        <div className="card-line">
            <h1>BMW EVO</h1>
            <div className="card-style">
                <Cards titulo= 'Maquinas' valor= {6} color="#00A6CE" icono={<IoSettingsSharp/>}/>
                <Cards titulo='En funcionamiento' valor={6} color= "#19c70c" icono={<CiCircleCheck />} />
                <Cards titulo="Con alarma" valor={0} color= "#ffd426" icono={<GiAlarmClock />}/>
            </div>
            <LeyendaEstado/>
        </div>
    );
}

export default LineaProduccion;