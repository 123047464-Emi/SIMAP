import { useState, useEffect } from 'react';
import './Header.css';

// Creamos el componente Header.
// Un componente es una parte de la interfaz que podemos reutilizar.
function Header() {

  //Obtenemos la hora actual del equipo
  const [hora, setHora]=useState(new Date())
  //Agregamos la actualizacion de fecha
  useEffect(()=>{
    //Actualizamos la hora cada segundo
    const intervalo=setInterval(()=>{
      setHora(new Date())
    }, 1000);

    return () => clearInterval(intervalo);
  })

  //
  const horario = hora.toLocaleTimeString('es-MX', {
    hour12: false
  });

  // return indica qué elementos se van a mostrar en pantalla.
  return (

    // Encabezado principal de SIMAP.
    <header className="header">
      {/* Contenedor que agrupa el icono y el nombre */}
      <div className="header-logo">
        <div className='header-text'>
          {/* Nombre del sistema */}
          <h1>SIMAP</h1>
          <p>Sistema inteligente de mantenimiento preventivo para equipos de producción</p>
        </div>
      </div>


      {/* SECCIÓN DE INFORMACIÓN */}
      {/* Agrupa el estado, el reloj y la fuente de datos */}
      <div className="header-info">

        {/* Reloj del sistema */}
        <div className="header-clock">
          {horario}
        </div>

      </div>

    </header>

  );
}

// Exportamos el componente para poder utilizarlo en App.tsx.
export default Header;