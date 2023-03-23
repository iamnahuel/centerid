import React from "react";
import "../styles/footer.css";
import ImgBancoPampa from "../images/bancoPampa.png";
import ImgAdidas from "../images/adidas.png";
import ImgQuilmes from "../images/quilmes.png";
import ImgCooprol from "../images/cooprol.png";
import ImgEscudo from "../images/logoFooter.png";
import ImgFacebook from "../images/icono-facebook.jpg";
import ImgInstragram from "../images/icono-instagram.jpg";
import ImgUbicacion from "../images/icono-ubicacion.jpg";


const Footer = () => {
    return (
        <>
            <footer className="footerEsponsor">
                <div class="iconosEsponsor">
                    <a href="https://www.adidas.com.ar/" target="_blank"><img className="esponsor adidas" src={ImgAdidas}
                        alt="esponsor adidas" title="esponsor" /></a>
                    <a href="https://www.quilmes.com.ar/agegate/" target="_blank"><img className="esponsor quilmes"
                        src={ImgQuilmes} alt="esponsor quilmes" title="esponsor" /></a>
                    <a href="https://www.bancodelapampa.com.ar/" target="_blank"><img className="esponsor cooprol"
                        src={ImgCooprol} alt="esponsor cooperativa rolon" title="esponsor" /></a>
                    <a href="https://www.bancodelapampa.com.ar/" target="_blank"><img className="esponsor bancoPampa"
                        src={ImgBancoPampa} alt="esponsor banco pampa" title="esponsor" /></a>
                </div>
            </footer>
            <footer className="footer">
                <div className="logoFooter">
                    <img className="imagenFooter" src={ImgEscudo} alt="icono footer" title="icono footer" />
                </div>
                <div className="iconosRedes">
                    <a href="https://www.facebook.com/" target="_blank"><img className="iconosFooter"
                        src={ImgFacebook} alt="red social facebook" title="redes sociales" /></a>
                    <a href="https://www.instagram.com/" target="_blank"><img className="iconosFooter"
                        src={ImgInstragram} alt="red social intagram" title="redes sociales" /></a>
                    <a href="pages/contacto.html" target="_blank"><img className="iconosFooter" src={ImgUbicacion}
                        alt="Ubicacion del Club" title="ubicacion" /></a>
                </div>
            </footer>
        </>
    )
}
export default Footer;