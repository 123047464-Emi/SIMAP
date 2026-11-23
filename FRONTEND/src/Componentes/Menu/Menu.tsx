import './Menu.css'

function Menu(){
    return(
        <aside className="sidebar">
            {/*Lista de opciones del menu*/}
            <div className="sidebar-menu">

                {/*Opción 1*/}
                <div className="sidebar-item active">
                    <span></span>
                    <p>Opciones disponibles</p>
                </div>

                {/*Opción 2*/}
                <div className='menu-item'>
                    <span></span>
                    <p>Línea de producción</p>
                </div>

                {/*Opción 3 */}
                <div className="menu-item">
                    <span></span>
                    <p>Alertas</p>
                </div>

                {/*Opción 4*/}
                <div className="menu-item">
                    <span></span>
                    <p>Historial</p>
                </div>

            </div>
        </aside>
    );
}

export default Menu;