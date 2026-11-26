
import type { ReactNode } from "react";
import "./Card_Maquinas.css";

// Estados posibles de una máquina.
export type EstadoMaquina = "Normal" | "Advertencia" | "Crítico";

// Información que recibirá cada tarjeta.
export type MaquinasProps = {
    modelo: string;
    nombre: string;
    icono: ReactNode;
    estado: EstadoMaquina;
    presion: string;
    torque: string;
    pesos: string;
    riesgo: number;
    salud: number;
};

function CardMaquinas({
    modelo,
    nombre,
    icono,
    estado,
    presion,
    torque,
    pesos,
    riesgo,
    salud
}: MaquinasProps) {

    return (
        <div className={`tarjeta-maquina estado-${estado.toLowerCase()}`}>

            {/* Encabezado */}
            <div className="tarjeta-encabezado">

                <div className="tarjeta-identificacion">
                    <div className="tarjeta-icono">
                        {icono}
                    </div>

                    <div>
                        <span>{modelo}</span>
                        <h3>{nombre}</h3>
                    </div>
                </div>

                <span className="estado-maquina">
                    {estado}
                </span>

            </div>

            {/* Indicadores */}
            <div className="tarjeta-indicadores">

                <div className="indicador">
                    <span>Presión</span>
                    <strong>{presion}</strong>
                </div>

                <div className="indicador">
                    <span>Torque</span>
                    <strong>{torque}</strong>
                </div>
                <div className="indicador">
                    <span>Peso</span>
                    <strong>{pesos}</strong>
                </div>

            </div>

            {/* Riesgo y salud */}
            <div className="tarjeta-resumen">
                <span>Riesgo {riesgo}/100</span>
                <span>Salud {salud}%</span>
            </div>

            {/* Barra de riesgo */}
            <div className="barra-riesgo">
                <div style={{ width: `${riesgo}%` }} />
            </div>

        </div>
    );
}

export default CardMaquinas;
