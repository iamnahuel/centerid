import React, { useContext, useState, useEffect } from "react";
import "../styles/detallesCobrador.css"
import { CartContext } from "./Context/Context";
import { useParams } from 'react-router-dom';



const DetallesCobrador = () => {
    const { sociosAlternativo, cuotasocio } = useContext(CartContext);
    const { dni } = useParams();

    //en el parametro viene el dni y el año seleccionado par mostrar el detalle
    // hay que separarlo y combertilo a numerico
    //lo sepramos en el $, primero obtenemos el dni del cobrador
    const usuario = dni.split('$')[0];

    //luego obtenemos el año seleccionado que puede ser todo o uno espesifico
    const año = dni.split('$')[1]

    // filtramos cobrador
    const cobrador = sociosAlternativo.filter(e => e.dni == usuario)

    //filtramos todos los cobros de este usuario y el año seleccionado
    const [cuotasCobradas, setCuotasCobradas] = useState([]);
    useEffect(() => {
        new Promise((resolve) => {
            if (año != "Todos") {
                const cuotasCobradas = cuotasocio.filter(e => e.idcobrador == usuario && e.año == año)
                setCuotasCobradas(cuotasCobradas)
            } else {
                const cuotasCobradas = cuotasocio.filter(e => e.idcobrador == usuario)
                setCuotasCobradas(cuotasCobradas)
            }
        });
    }, []);

    return (
        <section>
           
            <h1 className="h11">Periodo correspondiente a {año}</h1>

            <div className="contenedorTabla">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">Apellido</th>
                            <th scope="col" className="col-2">Nombre</th>
                            <th scope="col" className="col-2">DNI</th>
                            <th scope="col" className="col-2">T. Socio</th>
                            <th scope="col" className="col-2">Cel.</th>
                        </tr>
                    </thead>
                </table>

                <table className="table table-dark table-striped">
                    {cuotasCobradas.map(item => (
                        <tbody key={item.id}>
                            <tr className="datosSocio">
                                <td className="col-2">{item.id}</td>
                                <td className="col-2">{item.monto}</td>
                                <td className="col-2">{item.año}</td>
                                <td className="col-2">{item.idcobrador}</td>
                                <td className="col-2">{item.ncuota}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div >
        </section>
    )
}

export default DetallesCobrador;