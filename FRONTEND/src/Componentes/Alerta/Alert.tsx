import './Alert.css'

// Definimos la información que recibirá el componente.
type AlertProps = {
    titulo: string;
    contenido: string;
    color: string;
}

function Alert({ titulo, contenido, color }: AlertProps) {

    return (
        <div className='alert-style' style={{ borderLeft: `5px solid ${color}` }}>
            {/* Información de la alerta */}
            <div className='alert-info'>
                <h2>{titulo}</h2>
                <h3>{contenido}</h3>
            </div>

            {/* Botón de la alerta */}
            <button className='alerta-boton'>Ver máquina</button>
        </div>
    );
}

export default Alert;