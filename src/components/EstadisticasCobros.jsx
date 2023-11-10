import React, { useContext, useState, useEffect } from "react";
import "../styles/estadisticasCobros.css"

import { CartContext } from "./Context/Context";
import Cobros from "./Cobros";


const EstadisticasCobros = () => {

    const { sociosAlternativo, cuotasocio } = useContext(CartContext);
    //sacamos solo las cuotas que se encuentra pagas
    const cuotasocioPagadas = cuotasocio.filter(b => b.pagado == true); 
    const [PPP, setPPP] = useState(cuotasocio);


    //////////// funcion para seleccionar un año de   //////
    const [año, setAño] = useState("Todos");
    let minOffset = 0, maxOffset = 20;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }
    const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) });
    ////////////////////////////////////////////


    //////////// filtramos las cuotas por el año seleccionado //////

    useEffect(() => {
        new Promise((resolve) => {
            if (año == "Todos") {
                const socio = cuotasocioPagadas;
                resolve(socio);
                setPPP(socio);
            } else {
                const socio = cuotasocioPagadas.filter(b => b.año == año);
                resolve(socio);
                setPPP(socio);
            }

        });
    }, [año]);

    ////////////////////////////////////////////

    //////////// funcion para filtrar el numero de cobradores activos de ese año  //////
    function elementoRepite(valor) {
        let vecesRepetidas = 0;
        for (let i of sinDuplicados) {
            if (i.idcobrador == valor) {
                vecesRepetidas++;
                if (vecesRepetidas > 0) {
                    return true;
                    break;
                }
            }
        }
        return false;
    }
    const sinDuplicados = [];

    PPP.forEach(i => {

        if (!elementoRepite(i.idcobrador)) {
            sinDuplicados.push(i);
        }
    })
    ////////////////////////////////////////////
    return (
        <div className="">
            <div className="añosCobros">
                <label >Año: {año} </label>
                <br />
                <select onInput={(e) => setAño(e.target.value)}>
                    <option value="Todos">Todos</option>
                    {yearList}
                </select>
            </div>
            <div className="estadisticasCobros">
                {
                    sinDuplicados.map(item => (
                        <Cobros item={item} año={año} />
                    ))
                }
            </div>
        </div>
    )
}

export default EstadisticasCobros;
