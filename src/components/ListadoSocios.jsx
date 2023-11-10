import React, { useContext, useState, useEffect, useRef } from "react";
import { useTable, usePagination } from "react-table";
import { CartContext } from "./Context/Context";
import { Link } from 'react-router-dom';
import "../styles/listadoSocios.css";

//paginacion
import Table from "react-bootstrap/Table"
import Pagination from 'react-bootstrap/Pagination';
//
//import {TableWithBrowserPagination, Colum} from 'react-rainbow-components'





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
    useEffect(() => {
        if (busqueda.busqueda == null) {
            setItems(sociosAlternativo)
        } else {
            setItems(busqueda.busqueda)
        }
    });

    //PAGINACION
    //creamos estado donde vamos a ir paginando cada 4 resultados
    const [pagina, setPagina] = useState([]);
    useEffect(() => {
        let paginas = [];
        for (let index = 1; index <= items.length / 4; index++) {
            paginas.push(<Pagination.Item key={index}>{index}</Pagination.Item>)
        }
        setTimeout(() => {
            setPagina(paginas)
        }, 500)
    }, [items])

    //declaramos estado para la pagina
    const [currentPage, setCurrentPage] = useState(0);
    //funcion para adelantar pagination
    const nexPage = () => {
        if (currentPage < items.length - 4) {
            setCurrentPage(currentPage + 4)
        }
    }
    //funcion para retoceder pagination
    const prevPage = () => {
        if (currentPage >= 4) {
            setCurrentPage(currentPage - 4)
        }
    }
    //funcion para saltar a la pagina de la numeracion pagination
    const selecPage = (e) => {
        setCurrentPage((e.key - 1) * 4)
    }

    return (
        <div className="contenedorTabla">
            <p className="h6 numeroresultado">Cantidad: {items.length}</p>
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
                {items.slice(currentPage, currentPage + 4).map(item => (
                    <tbody key={item.id}>
                        <Link to={`/informacionsocio/${item.dni}`} className="link" >
                            <tr className="datosSocio">
                                <td className="col-2">{item.apellido}</td>
                                <td className="col-2">{item.nombre}</td>
                                <td className="col-2">{item.dni}</td>
                                <td className="col-2">{item.tsocio}</td>
                                <td className="col-2">{item.cel}</td>
                            </tr>
                        </Link>
                    </tbody>
                ))}
            </table>

            <div>
                <Pagination>
                    <Pagination.Prev onClick={prevPage} />
                    {pagina?.map(item => (
                        <h5 onClick={(e) => selecPage(item)}>{item}</h5>
                    ))}
                    <Pagination.Next onClick={nexPage} />
                </Pagination>
            </div>
        </div >
    )
}

export default ListadoSocios;