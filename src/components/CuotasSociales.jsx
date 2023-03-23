import React, { useContext, useState, useEffect } from "react";
import "../styles/cuotasSociales.css"
import Cuotas from "./Cuotas";
import { CartContext } from "./Context/Context";
import wallpaperCuota from "../images/wallpaperSocios.jpg"

const CuotaSocial = () => {
    //tremos del contexto tipos de cuotas
    const { tipoCuota } = useContext(CartContext);
   
    return (
        <div className="contenedorCuotasSociales">
            <div className="wallpaperCuotasSociales">
                <img src={wallpaperCuota} alt="" className="wallpaperSocios" />
                <div className="tituloCuotasSociales"><p><b> UN PLAN A TU MEDIDA </b></p></div>
            </div>
            <div className="contenedorCuotas">
                {tipoCuota.map(item => (
                    <Cuotas props={item} key={item.id}/>
                ))}
            </div>
        </div>
    )
}

export default CuotaSocial;