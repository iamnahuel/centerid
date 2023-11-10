import React, { useContext } from "react";
import '../styles/menuDesplegable.css';
import { Link } from 'react-router-dom';
import { CartContext } from "./Context/Context"

import Logo from "../images/logo-1.jpg";
import TextoLogo from "../images/textoEncabezado.png"

const MenuDesplegable = () => {
    const { desconectarse, datosAdmin } = useContext(CartContext);
    //tomamos los datos del administrador y los parseamos de json a objeto
    const admin = JSON.parse(datosAdmin)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div>
                        <p className="fw-bolder titulo">CENTER <b className="taxtoId">ID</b></p>
                        <h1 className="nombre">{admin[0].nombre} {admin[0].apellido}</h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <Link to={"/listadosocios"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Listado Socios</a>
                                </li></Link>
                            <Link to={"/agregarsocio"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Agregar Socio</a>
                                </li></Link>
                            <Link to={"/buscarsocio"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Buscar Socio</a>
                                </li></Link>
                            <Link to={"/cuotasocial"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Cuota Social</a>
                                </li> </Link>
                                <Link to={"/estadisticas"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Estadisticas</a>
                                </li> </Link>
                                <Link to={"/cobros"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Cobras</a>
                                </li> </Link>
                                <Link to={"/comisiondirectiva"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Comision Directiva</a>
                                </li> </Link>
                                <Link to={"/comisiondirectiva"} className="link">
                                <li className="nav-item">
                                    <a className="itemMenu" aria-current="page">Contactos</a>
                                </li> </Link>
                            <li>
                                <span className="js-btn-menu" onClick={() => desconectarse()}>
                                    <div className="ico-cont">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    Cerrar Sesión
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default MenuDesplegable;