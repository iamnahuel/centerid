import React, { useContext } from "react";
import Logo from "../images/logo-1.jpg";
import TextoLogo from "../images/textoEncabezado.png"
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { CartContext } from "./Context/Context"


const Header = () => {
    
const { desconectarse, datosAdmin } = useContext(CartContext);

    return (
        <>

            <section className="header1">
                <div>
                    <img className="logoEncabezado" src={Logo} alt="" />
                </div>
                <div class="divTextoLogo">
                    <img className="textoEncabezado" src={TextoLogo} alt="" />
                </div>
               
                
            </section>

        </>
    )
}
export default Header;