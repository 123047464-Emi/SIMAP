import CardMaquinas from "../Componentes/Maquinas/Card_Maquinas";


function Maquinas(){
    return(
        <div className="maquinas">
            <h1>Máquinas</h1>
            <div className="maquina-card">
                <CardMaquinas titulo="Alerta en atornillador" estado="Alerta" color="#ffd426"/>
            </div>

        </div>
    );
}

export default Maquinas;
