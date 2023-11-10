import React, { useContext } from "react";
import '../styles/admin.css';
import perfil from '../images/perfil.jpg';
import { Link } from 'react-router-dom';
import { CartContext } from "./Context/Context";

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'


const MenuAdmin = () => {
    const { desconectarse, datosAdmin } = useContext(CartContext);
    //tomamos los datos del administrador y los parseamos de json a objeto
    const admin = JSON.parse(datosAdmin)

    return (
        <>
            <div class="navbar-nav">
                <div className="datosPerfil">
                    <div className="col-8">
                        <h1 className="nombre">{admin[0].nombre} {admin[0].apellido}</h1>
                        <h1 className="tipoSocio">Administrador</h1>
                        <h1 className="tipoSocio">N° {admin[0].dni}</h1>
                    </div>
                    <div className="col-4 .d-none .d-lg-block .d-xl-none">
                        <Avatar size='xl' name='Christian Nwamba' src={`https://firebasestorage.googleapis.com/v0/b/center-id.appspot.com/o/${admin[0].dni}?alt=media&token=feb04684-4813-4f8f-b107-2b453e2f12b0`} />{' '}
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
                                Estadisticas
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
                        <Link to={"/cobros"} className="link">  <li>
                            <span className="js-btn-menu">
                                <div className="ico-cont">
                                    <i className="fas fa-user"></i>
                                </div>
                                Cobros
                            </span>
                            <span className="flechaMenu">
                                ❯
                            </span>
                            <hr />
                        </li></Link>
                        <Link to={"/comisiondirectiva"} className="link">  <li>
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

export default MenuAdmin;