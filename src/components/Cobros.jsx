import React, { useContext, useState, useEffect } from "react";
import "../styles/estadisticasCobros.css"
import { CartContext } from "./Context/Context";
import { Link } from 'react-router-dom';

const Cobros = (item) => {
    const { sociosAlternativo, cuotasocio } = useContext(CartContext);

    // filtramos cobrador
    const cobrador = sociosAlternativo.filter(e => e.dni == item.item.idcobrador)
  
    //sumar el dinero obtenido por este cobrador
    //primero filtramos las cuotas cobradas por el id de este cobrador, y despues sumamos el monto final
    //usamos userEffect para ver si cargamos las cuotas de un año espesifico y si cargamos todos los años
    const [suma, setSuma] = useState();
    const [cuotasCobradas, setCuotasCobradas] = useState();
    const [banderaCobros1, setBandera] = useState(true);
    useEffect(() => {
        new Promise((resolve) => {
            //sacamos las cuotas que todavia no se cobraron
            const cuotasCobradass = cuotasocio.filter(e => e.pagado == true);
            if (item.año != "Todos") {
                const cuotasCobradas = cuotasCobradass.filter(e => e.idcobrador == item.item.idcobrador && e.año == item.año)
                setCuotasCobradas(cuotasCobradas)
                const suma = cuotasCobradas.map(item => item.montoFinal).reduce((prev, curr) => prev + curr, 0);
                setSuma(suma)
                setBandera(false)
            } else {
                const cuotasCobradas = cuotasCobradass.filter(e => e.idcobrador == item.item.idcobrador)
                setCuotasCobradas(cuotasCobradas)
                const suma = cuotasCobradas.map(item => item.montoFinal).reduce((prev, curr) => prev + curr, 0);
                setSuma(suma)
                setBandera(false)
            }
        });
    }, [item.año]);

    return (
        <div className="terjetCobrador">
            {banderaCobros1 ? "cargando" :
                <Link to={`/detallescobrador/${cobrador[0].dni}$${item.año}`} className="link" >
                    <div className="nombreCobrador">
                        <h5>ID cobrador: <b>{cobrador[0].nombre} {cobrador[0].apellido}</b></h5>
                    </div>
                    <div className="contendedorCobrosDetalles">
                        <div className="cobrosDetalles">
                            Recaudacion
                            <br />
                            <div className="detallesNumerosCobros">
                                {banderaCobros1 ? "cargando" : suma}

                            </div>
                        </div>
                        <div className="cobrosDetalles">
                            Cuotas cobradas
                            <br />
                            <div className="detallesNumerosCobros">
                                {banderaCobros1 ? "cargando" : cuotasCobradas.length}
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </div>
    )
}

export default Cobros;
