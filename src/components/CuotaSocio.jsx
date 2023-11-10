import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { CartContext } from "./Context/Context";
import "../styles/cuotaSocio.css"
import Cuota from "./Cuota";
import { Link } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'

import { Probando } from "./Probando";


const CuotaSocio = () => {

    const { dni } = useParams();
    //tremos del contexto socios y cuotas
    const { sociosAlternativo, cuotasocio } = useContext(CartContext);

    const [items, setItems] = useState();
    const [itemsCuotas, setItemCuotas] = useState();

    //banderas condicionales
    const [loading, setLoading] = useState(true);
    const [hayCoutas, setHayCuotas] = useState(false);
    const [dato, setDato] = useState(0)


    /////////////////////
    const { loading1, items1 } = Probando(dni)

    useEffect(() => {

        /* const promise = new Promise((resolve, reject) => {
             setLoading(true)
             const socio = sociosAlternativo.filter(b => b.dni == dni);
             resolve(socio)
         });
         promise
             .then(socio => (setItems(socio[0]), console.log(socio)))
             .catch(error => console.error(error))
             .finally(() => setLoading(false), cuotas())
 */

    }, [dni, cuotasocio, items]);

    //filtramos las cuotas del socio seleccionado
    const cuotas = () => {
        new Promise((resolve) => {
            const cuota = cuotasocio.filter(b => b.dni == dni);
            resolve(cuota);

            // ordenamos las cuotas por año
            cuota.sort(function (a, b) {
                if (a.año < b.año) {
                    return 1;
                }
                if (a.año > b.año) {
                    return -1;
                }
                return 0;
            });

            setItemCuotas(cuota);
            setDato(dato + 1)
            if (cuota.length != 0) {
                setHayCuotas(true)
            }
        });
    };

    return (
        <div>
            <div className="movimientoPagos col-10">
                <div className="encabezadoPagos">
                    {loading1 ? <Spinner color='blue.500' /> : <p className="titoloEncabezado">{items1.nombre} {items1.apellido}</p>}
                </div>
                <br />
                <div className="movimientosCerrar">
                    <h5 style={{ color: "black" }}>Movimientos</h5>
                    {loading ? <></> :
                        <Link to={`/informacionsocio/${items.dni}`} className="cerrar">
                            <h5 style={{ color: "red" }}><b>CERRAR</b></h5>
                        </Link>
                    }
                </div>
                <hr />
                {loading ? <></> :
                    hayCoutas ?
                        <div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-2">Cuota</th>
                                        <th scope="col" className="col-2">Año</th>
                                        <th scope="col" className="col-2">Monto</th>
                                        <th scope="col" className="col-2">Estado</th>
                                        <th scope="col" className="col-2">Detalle</th>
                                    </tr>
                                </thead>
                            </table>
                            {
                                itemsCuotas.map(item => (
                                    <Cuota item={item} key={item.id} dato={dato} />
                                ))
                            }
                        </div>
                        : <h5>Sin cuotas</h5>
                }
            </div>
        </div>
    )
}


export default CuotaSocio;