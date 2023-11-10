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

//CHAKRA
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react'


const Footer = () => {
    return (
        <div className="footerContainer">
            <footer className="footerEsponsor">
                <div className="aa col-3">
                    <a href="https://www.adidas.com.ar/" target="_blank"><img className="esponsor adidas" src={ImgAdidas}
                        alt="esponsor adidas" title="esponsor" /></a>

                </div>
                <div className="aa col-3">
                    <a href="https://www.quilmes.com.ar/agegate/" target="_blank"><img className="esponsor quilmes"
                        src={ImgQuilmes} alt="esponsor quilmes" title="esponsor" /></a>

                </div>
                <div className="aa col-3">
                    <a href="https://www.bancodelapampa.com.ar/" target="_blank"><img className="esponsor cooprol"
                        src={ImgCooprol} alt="esponsor cooperativa rolon" title="esponsor" /></a>

                </div>
                <div className="aa col-3">
                    <a href="https://www.bancodelapampa.com.ar/" target="_blank"><img className="esponsor bancoPampa"
                        src={ImgBancoPampa} alt="esponsor banco pampa" title="esponsor" /></a>

                </div>

            </footer>
            <footer className="footer">
                <div className="logoFooter">
                    <Image
                        boxSize='70px'
                        objectFit='cover'
                        src={ImgEscudo}
                        alt='Dan Abramov'
                        title="Escudo"
                    />
                </div>
                <div className="iconosRedes">
                    <AvatarGroup spacing='1rem'>
                        <a href="https://www.facebook.com/" target="_blank"> <Avatar m={2} w={[10, 20, 30]} h={[10, 20, 30]} src={ImgFacebook} title="Facebook"/></a>
                        <a href="https://www.instagram.com/" target="_blank"><Avatar m={2} w={[10, 20, 30]} h={[10, 20, 30]} src={ImgInstragram} title="Instagram"/></a>
                        <a href="pages/contacto.html" target="_blank"><Avatar m={2} w={[10, 20, 30]} h={[10, 20, 30]} src={ImgUbicacion} title="Ubicacion"/></a>
                    </AvatarGroup>
                </div>
            </footer>
        </div>
    )
}
export default Footer;