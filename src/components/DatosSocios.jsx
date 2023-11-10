import React, { useContext } from "react";
import Editar from "../images/lapiz.png";
import { CartContext } from "./Context/Context";


const DatosSocios = (items) => {

    const { modEditarSocio } = useContext(CartContext);
    var date = new Date(items.items.seasocio);
    return (
        <div className="DatosSocio">
            <ul>
                <li>
                    <span className="js-btn-menu datosSocios">
                        <div className="ico-cont">
                            <i className="fas fa-user"></i>
                        </div>
                        Nombre: {items.items.nombre}
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu datosSocios">
                        <div className="ico-cont">
                            <i className="fas fa-user"></i>
                        </div>
                        Apellido: {items.items.apellido}
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu datosSocios">
                        <div className="ico-cont">
                            <i className="fas fa-user"></i>
                        </div>
                        DNI: {items.items.dni}
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu datosSocios">
                        <div className="ico-cont">
                            <i className="fas fa-user"></i>
                        </div>
                        Genero: {items.items.genero}
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu datosSocios">
                        <div className="ico-cont">
                            <i className="fas fa-user"></i>
                        </div>
                        Fecha Nacimiento:  {items.items.nacimiento}
                    </span>
                    <hr />
                </li>
                <li >
                    <span className="js-btn-menu spanDatosSocio datosSocios">
                        Telefono: {items.items.cel}
                        <img className="iconoeditar" src={Editar} alt="editar" title="Editar telefono"  onClick={() => modEditarSocio()}/>
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu spanDatosSocio datosSocios">
                        Correo: {items.items.mail}
                        <img className="iconoeditar" src={Editar} alt="editar" title="Editar correo"  onClick={() => modEditarSocio()}/>
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu spanDatosSocio datosSocios">
                        Direccion: {items.items.direccion}
                        <img className="iconoeditar" src={Editar} alt="editar" title="Editar direccion"  onClick={() => modEditarSocio()}/>
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu spanDatosSocio datosSocios">
                        Ciudad:  {items.items.ciudad}
                        <img className="iconoeditar" src={Editar} alt="editar" title="Editar ciudad"  onClick={() => modEditarSocio()} />
                    </span>
                    <hr />
                </li>
                <li>
                    <span className="js-btn-menu datosSocios">
                        Fecha Acreditacion: {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
                    </span>
                    <hr />
                </li>
            </ul>
        </div>
    )
}

export default DatosSocios;