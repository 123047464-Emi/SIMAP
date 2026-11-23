// Importamos los estilos CSS del encabezado.
import './Header.css';

// Creamos el componente Header.
// Un componente es una parte de la interfaz que podemos reutilizar.
function Header() {

  // return indica qué elementos se van a mostrar en pantalla.
  return (

    // Encabezado principal de SIMAP.
    <header className="header">
      {/* Contenedor que agrupa el icono y el nombre */}
      <div className="header-logo">
        {/* Nombre del sistema */}
        <h1>SIMAP</h1>
      </div>


      {/* SECCIÓN DE INFORMACIÓN */}
      {/* Agrupa el estado, el reloj y la fuente de datos */}
      <div className="header-info">

        {/* Reloj del sistema */}
        <div className="header-clock">
          21:44:12
        </div>

      </div>

    </header>

  );
}

// Exportamos el componente para poder utilizarlo en App.tsx.
export default Header;