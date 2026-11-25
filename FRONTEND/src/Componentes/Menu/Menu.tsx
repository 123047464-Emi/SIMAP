import './Menu.css';
import type { ReactNode } from 'react';
import { LuLayoutDashboard, LuBell,  LuHistory, LuSettings} from "react-icons/lu";

// Definimos los nombres de las secciones disponibles.
export type Seccion =
  | 'Línea de producción'
  | 'Alertas'
  | 'Maquinas'
  | 'Historial'

// Definimos qué información recibirá el menú desde App.tsx.
type SidebarProps = {
  seccionActiva: Seccion;
  onCambiarSeccion: (seccion: Seccion) => void;
};

function Menu({ seccionActiva, onCambiarSeccion }: SidebarProps) {

  // Opciones que tendrá nuestro menú.
  const opciones: { nombre: Seccion, icono: ReactNode }[] = [
    { nombre: 'Línea de producción', icono:<LuLayoutDashboard/>},
    { nombre: 'Alertas', icono:<LuBell/>},
    { nombre: 'Maquinas', icono: <LuSettings/>},
    { nombre: 'Historial', icono:<LuHistory/>}
  ];

  return (
    <aside className="sidebar">

      <nav className="sidebar-menu">

        {/* Recorremos las opciones para crear un botón por cada una. */}
        {opciones.map((opcion) => (

          <button
            type="button"
            key={opcion.nombre}

            // Si la opción coincide con la seleccionada, tendrá la clase active.
            className={`menu-item ${
              seccionActiva === opcion.nombre ? 'active' : ''
            }`}

            // Cuando se pulse, avisamos a App.tsx qué sección se eligió.
            onClick={() => onCambiarSeccion(opcion.nombre)}
          >
            <span></span>
            <p>{opcion.nombre}</p>

          </button>

        ))}

      </nav>

    </aside>
  );
}

export default Menu;