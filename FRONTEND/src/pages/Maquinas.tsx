
import CardMaquinas from "../Componentes/Maquinas/Card_Maquinas";
import type { MaquinasProps } from "../Componentes/Maquinas/Card_Maquinas";
import { TiPipette } from "react-icons/ti";

import "./pages.css";

// Datos de las máquinas.
const maquinas: MaquinasProps[] = [
    {
        modelo: "M-01",
        nombre: "Gap filler 1",
        icono: <TiPipette />,
        estado: "Normal",
        presion: "127",
        torque: "0.52",
        pesos: "0.98",
        riesgo: 9,
        salud: 92
    },
    {
        modelo: "M-02",
        nombre: "Gap Filler 2",
        icono: <TiPipette />,
        estado: "Normal",
        presion: "125",
        torque: "0.5",
        pesos: "0.94",
        riesgo: 8,
        salud: 92
    },
    {
        modelo: "M-03",
        nombre: "Gap filler 3",
        icono: <TiPipette />,
        estado: "Normal",
        presion: "143",
        torque: "0.52",
        pesos: "0.92",
        riesgo: 7,
        salud: 93
    }
];

function Maquinas() {

    return (
        <div className="maquinas">

            {/* Encabezado */}
            <div className="maquinas-encabezado">
                <h1>Máquinas</h1>

                <p>
                    Máquinas disponibles en la línea de producción BMW EVO.
                    Selecciona una para abrir su dashboard de monitoreo
                    y mantenimiento predictivo.
                </p>
            </div>

            {/* Contenedor de las tarjetas */}
            <div className="maquinas-grid">

                {maquinas.map((maquina) => (
                    <CardMaquinas
                        key={maquina.modelo}
                        {...maquina}
                    />
                ))}

            </div>

        </div>
    );
}

export default Maquinas;
