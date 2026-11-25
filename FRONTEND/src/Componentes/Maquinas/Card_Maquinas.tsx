import './Card_Maquinas.css'

type MaquinasProps={
    titulo:string
    estado: string
    color:  string

}

function CardMaquinas({titulo, estado, color}:MaquinasProps){
    return(
    <div className='maquina-card' style={{ borderTop: `3px solid ${color}` }}>
        <h2>{titulo}</h2>
        <h3>{estado}</h3>
    </div>
    );
}

export default CardMaquinas;