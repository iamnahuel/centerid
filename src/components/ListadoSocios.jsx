import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "./Context/Context";
import { Link } from 'react-router-dom';
import "../styles/listadoSocios.css"


const ListadoSocios = (busqueda) => {
    const { sociosAlternativo } = useContext(CartContext);
    //cargamos los socios del contexto con un retraso de 500 mls
    const [items, setItems] = useState([]);
      // ordenamos las cuotas por año
      sociosAlternativo.sort(function (a, b) {
        if (a.apellido > b.apellido) {
            return 1;
        }
        if (a.apellido < b.apellido) {
            return -1;
        }
        return 0;
    });


    //cargamos o datos generales o datos de la busqueda de socios
    setTimeout(() => {
        if (busqueda.busqueda == null) {
            setItems(sociosAlternativo)
        } else {
            setItems(busqueda.busqueda)
        }
    }, 500);

    return (

        <div className="contenedorTabla">
            <p className="numeroresultado">N° de resultados: {items.length}</p>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col" className="col-1">Apellido</th>
                        <th scope="col" className="col-1">Nombre</th>
                        <th scope="col" className="col-1">DNI</th>
                        <th scope="col" className="col-1">T. Socio</th>
                        <th scope="col" className="col-1">Cel.</th>

                    </tr>
                </thead>
            </table>


            <table className="table table-hover table-dark">

                {items.map(item => (
                    <tbody key={item.id}>
                        <Link to={`/informacionsocio/${item.dni}`} className="link" >
                            <tr className="datosSocio">
                                <td className="col-1">{item.apellido}</td>
                                <td className="col-1">{item.nombre}</td>
                                <td className="col-1">{item.dni}</td>
                                <td className="col-1">{item.tsocio}</td>
                                <td className="col-1">{item.cel}</td>

                            </tr>
                        </Link>
                    </tbody>
                ))}
            </table>



        </div >
    )
}

export default ListadoSocios;