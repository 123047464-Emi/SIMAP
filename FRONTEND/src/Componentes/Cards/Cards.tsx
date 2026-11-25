import './Cards.css'

type CardProps={
    titulo: string;
    valor: number;
    color: string;
};

function Cards({titulo, valor, color}: CardProps){
    return(
        <div className="card" style={{borderTop: `3px solid ${color}`}}>
            <h3>{titulo}</h3>
            <h2>{valor}</h2>
        </div>
    );
}

export default Cards;