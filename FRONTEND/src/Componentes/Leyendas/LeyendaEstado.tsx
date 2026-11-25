import './LeyendaEstado.css'

function LeyendaEstado(){
    return(
        <div className='leyenda-estado'>
            <div className='estado'>
                <span className='indicador normal'></span>
                <p>Normal</p>
            </div>
            <div className='estado'>
                <span className='indicador alerta'></span>
                <p>Alerta</p>
            </div>
        </div>
    );
}

export default LeyendaEstado;