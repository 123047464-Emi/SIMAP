import Alert from "../Componentes/Alerta/Alert";
import './pages.css'

function Alertas(){
    return(
        <div className="alert" >
            <h1>Alertas</h1>
            <div className="alert-list">
                <Alert titulo='Gap Filler 01' contenido="Presion fuera de los rangos normales" color= "#ffd426"/>
                <Alert titulo='Gap Filler 02' contenido="Pesos fuera del rango establecido" color= "#ffd426"/>
                <Alert titulo='Atornillador' contenido="Equipo trabajando correctamente" color= "#19c70c"/>
                <Alert titulo='Atornillador' contenido="Equipo trabajando correctamente" color= "#19c70c"/>
                <Alert titulo='Atornillador' contenido="Equipo trabajando correctamente" color= "#19c70c"/>
            </div>
        </div>
    );
}

export default Alertas;