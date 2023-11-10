import react, { useContext, useState, useEffect } from "react";
import "../styles/comisionDirectiva.css";
import perfil from '../images/perfil.jpg';

const ComisionDirectiva = () => {
    return (
        <div className="comisionDirectiva">

            <div className="centrar">
                <h3 className="tituloDirectivos">Directivos</h3>
            </div>

            <div className="contenedorDirectivos">
                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Victor Daniel Faierman</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Presidente</h6>
                    </div>
                </div>

                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Bruno Leandro Rodriguez</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Secretario</h6>
                    </div>
                </div>

                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Gladys Veatris Arhex</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Tesorero</h6>
                    </div>
                </div>

                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Guillermo Javier Kunz</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Vocal</h6>
                    </div>
                </div>

                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Manuela Santalla</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Vocal</h6>
                    </div>
                </div>

                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Marisa Jacacortejarena</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Vocal</h6>
                    </div>
                </div>

                <div className="directivo">
                    <div className="centrar ">
                        <img src={perfil} alt="" className="imgDirectivo .d-none .d-lg-block .d-xl-none" />
                    </div>
                    <div className="centrar">
                        <p className="nombreDirectivo">Marcelo Sebastian Busch</p>
                    </div>
                    <div className="centrar">
                        <h6 className="tituloCargo">Vocal</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComisionDirectiva;
