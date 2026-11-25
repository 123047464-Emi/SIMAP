import type { ReactNode } from "react";
import './Cards.css'

type CardProps={
    titulo: string;
    valor: number;
    color: string;
    icono: ReactNode;
};

function Cards({titulo, valor, color, icono}: CardProps){
    return(
    <div className="card" style={{ borderTop: `3px solid ${color}` }}>
        <div className="icono-style">
            {icono}
            <h3>{titulo}</h3>
        </div>
        
        <div className="card-info">
            <h2>{valor}</h2>
        </div>
    </div>
    );
}

export default Cards;