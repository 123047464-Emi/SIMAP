
import CardMaquinas from "../Componentes/Maquinas/Card_Maquinas";
import type { MaquinasProps } from "../Componentes/Maquinas/Card_Maquinas";

import {
    FaChartLine,
    FaHammer,
    FaCogs,
    FaMicrochip
} from "react-icons/fa";

import "./pages.css";

// Datos de las máquinas.
const maquinas: MaquinasProps[] = [
    {
        modelo: "M-01",
        nombre: "Alimentador de piezas",
        icono: <FaChartLine />,
        estado: "Normal",
        presion: "4.30 bar",
        torque: "36.1 N·m",
        riesgo: 9,
        salud: 92
    },
    {
        modelo: "M-02",
        nombre: "Prensa hidráulica",
        icono: <FaHammer />,
        estado: "Advertencia",
        presion: "201.85 bar",
        torque: "532.8 N·m",
        riesgo: 51,
        salud: 53
    },
    {
        modelo: "M-03",
        nombre: "Robot de ensamble",
        icono: <FaCogs />,
        estado: "Normal",
        presion: "6.14 bar",
        torque: "64.6 N·m",
        riesgo: 7,
        salud: 93
    },
    {
        modelo: "M-04",
        nombre: "Fresadora CNC",
        icono: <FaMicrochip />,
        estado: "Crítico",
        presion: "6.75 bar",
        torque: "30.7 N·m",
        riesgo: 78,
        salud: 28
    }
];

function Maquinas() {

    return (
        <div className="maquinas">

            {/* Encabezado */}
            <div className="maquinas-encabezado">
                <h1>Máquinas</h1>

                <p>
                    Maquinas disponibles en la linea de produccion.
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
