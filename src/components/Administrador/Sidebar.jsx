import React from 'react'
import {BsCart3,BsGrid1X2Fill,BsFillArchiveFill,BsFillGrid3X3GapFill,BsPeopleFill,BsListCheck,BsMenuButtonWideFill,BsFillGearFill,BsQuestionCircleFill} from "react-icons/bs"

function Sidebar({openSidebarToggle,OpenSidebar}) {
    return (
        <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive":""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                   <BsCart3 className='icon_header'/> MARCELLA
                </div>
                <span className='incon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                {/* <li className='sidebar-list-item'>
                    <a href="&">
                        <BsGrid1X2Fill className='icon'/> Dashboard
                    </a>
                </li> */}
                <li className='sidebar-list-item'>
                    <a href="/AdminProductos">
                        < BsFillArchiveFill className='icon'/> Productos
                    </a>
                </li>
                 <li className='sidebar-list-item'>
                    <a href="&">
                        <BsFillGrid3X3GapFill className='icon'/> Categorias
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="&">
                        <BsPeopleFill className='icon'/> Colores
                    </a>
                </li>
                {/* <li className='sidebar-list-item'>
                    <a href="&">
                        <BsListCheck className='icon'/> Inventory
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="&">
                        <BsMenuButtonWideFill className='icon'/> Reports
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="&">
                        <BsFillGearFill className='icon'/> Setting
                    </a>
                </li> * */}
                <li className='sidebar-list-item'>
                    <a href="/Helping">
                        <BsQuestionCircleFill className='icon'/> HELP
                    </a>
                </li>
                

            </ul>
        </aside>
    )
}

export default Sidebar
