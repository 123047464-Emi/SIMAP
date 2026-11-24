import { useState } from 'react';
//import type { ReactNode } from 'react';

import Header from './Componentes/Header/Header';
import Menu, {type Seccion} from './Componentes/Menu/Menu';

// Importamos las ventanas que vamos a crear.
import LineaProduccion from './pages/LineaProduccion';
import Alertas from './pages/Alertas';
import Historial from './pages/Historial';

function App() {

  // Guardamos cuál es la sección seleccionada.
  const [seccionActiva, setSeccionActiva] =
    useState<Seccion>('Línea de producción');

  // Seleccionamos qué ventana se debe mostrar.
  const ventanas = {
    'Línea de producción': <LineaProduccion />,
    'Alertas': <Alertas />,
    'Historial': <Historial />
  };

  return (
    <div className="app">

      {/* Encabezado superior */}
      <Header />

      <div className="app-body">

        {/* Menú lateral */}
        <Menu
          seccionActiva={seccionActiva}
          onCambiarSeccion={setSeccionActiva}
        />

        {/* Ventana correspondiente a la opción seleccionada */}
        <main className="main-content">
          {ventanas[seccionActiva]}
        </main>

      </div>

    </div>
  );
}

export default App;