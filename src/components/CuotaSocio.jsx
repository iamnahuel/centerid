import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { CartContext } from "./Context/Context";
import "../styles/cuotaSocio.css"
import Cuota from "./Cuota";
import { Link } from 'react-router-dom';




const CuotaSocio = () => {

    const { dni } = useParams();
    //tremos del contexto socios y cuotas
    const { sociosAlternativo, cuotasocio } = useContext(CartContext);

    const [items, setItems] = useState();
    const [itemsCuotas, setItemCuotas] = useState();

    //banderas condicionales
    const [loading, setLoading] = useState(true);
    const [loadingCuotas, setLoadingCuotas] = useState(true);
    const [hayCoutas, setHayCuotas] = useState(false);

    const [dato, setDato] = useState(0)
    const [dato2, setDato2] = useState(0)

    //filtramos el socio seleccionado a traves del parametro dni
    useEffect(() => {
        const getSocios = setTimeout(() => {
            new Promise((resolve) => {
                const socio = sociosAlternativo.filter(b => b.dni == dni);
                resolve(socio);
                setItems(socio[0]);
                setLoading(false)
            });
        }, 300);
    }, [dni]);


    //filtramos las cuotas del socio seleccionado
    useEffect(() => {
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
            setLoadingCuotas(false)
        });
    }, [dni, cuotasocio]);

    return (
        <div>
            <div className="movimientoPagos col-8">
                <div className="encabezadoPagos">
                    {loading ? <small>cargando</small> : <p className="titoloEncabezado">{items.nombre} {items.apellido}</p>}

                </div>
                <br />
                <div className="movimientosCerrar">
                    <h5  style={{ color: "black" }}>Movimientos</h5>
                    {loading ? <></> :
                        <Link to={`/informacionsocio/${items.dni}`} className="cerrar">
                            <h5  style={{ color: "red" }}><b>CERRAR</b></h5>
                        </Link>
                    }
                </div>
                <hr />
                {loadingCuotas ? <></> :
                    hayCoutas ?
                        <div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-2">Cuota</th>
                                        <th scope="col" className="col-2">Año</th>
                                        <th scope="col" className="col-2">Monto</th>
                                        <th scope="col" className="col-2">Estado</th>
                                        <th scope="col" className="col-2">Fecha Pago</th>
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