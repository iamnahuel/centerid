import React, { useContext } from "react";
import '../styles/menuDesplegable.css';
import perfil from '../images/perfil.jpg';
import { Link } from 'react-router-dom';
import { CartContext } from "./Context/Context"

const MenuDesplegable = () => {
    const { desconectarse, datosAdmin } = useContext(CartContext);
    //tomamos los datos del administrador y los parseamos de json a objeto
    const admin = JSON.parse(datosAdmin)

    return (
        <>
           <div class="menuDesplegable">
                <p className="titulo">CENTER <b className="taxtoId">ID</b></p>
                <br />
                <div className="datosPerfil">
                    <div>
                        <h1 className="nombre">{admin[0].nombre} {admin[0].apellido}</h1>
                        <h1 className="tipoSocio">Administrador N° {admin[0].dni}</h1>
                    </div>
                    <div className=".d-none .d-lg-block .d-xl-none">
                        <img src={perfil} alt="" className="imgPerfil .d-none .d-lg-block .d-xl-none" />
                    </div>
                </div>
                <br />
                <div className="menu">
                    <ul className="ulMenu">
                        <Link to={"/listadosocios"} className="link">  <li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Socios
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li> </Link>
                        <Link to={"/agregarsocio"} className="link"><li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Agregar Socio
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li> </Link>
                        <Link to={"/buscarsocio"} className="link">  <li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Buscar Socio
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
                        <Link to={"/cuotasocial"} className="link"><li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Cuota Social
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
                        <Link to={"/estadisticas"} className="link">  <li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Comisión Directiva
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
                        <Link to={"/estadisticas"} className="link">  <li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Contactos
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
                        <Link to={"/estadisticas"} className="link">  <li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Estadisticas
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
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
            </div >

        </>
    )
}

export default MenuDesplegable;