import { useState } from 'react'
import './App.css'
import Header from "../src/Componentes/Header/Header"
import Menu from "../src/Componentes/Menu/Menu"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Header/>

      {/*Contenedor para menu */}
      <div className='app-body'>
        <Menu/>
        <main className='main-content'>
        </main>
      </div>

    </div>
  )
}

export default App
