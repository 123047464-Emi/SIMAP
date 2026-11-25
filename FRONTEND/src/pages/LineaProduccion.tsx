import Cards from "../Componentes/Cards/Cards";
import './pages.css'
import LeyendaEstado from "../Componentes/Leyendas/LeyendaEstado";

function LineaProduccion(){
    return(
        <div className="card-line">
            <div className="card-style">
                <Cards titulo= 'Maquinas' valor= {6} color="#00A6CE"/>
                <Cards titulo='En funcionamiento' valor={6} color= "#21ea6e"/>
                <Cards titulo="Con alarma" valor={0} color= "#eaea2f"/>
            </div>
            <LeyendaEstado/>
        </div>
    );
}

export default LineaProduccion;