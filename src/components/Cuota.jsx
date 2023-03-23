import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Context/Context";
import "../styles/cuotaSocio.css";
import Cobro from "../images/cobro.png";


import PdfModal from "./PdfModal";
import { Document, Page, Text, View, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


const Cuota = (item) => {
    const { modal, cerraBanderaModal, propsModal, banderaModal, cobrarCuota } = useContext(CartContext);

    //cargamos los datos del modal
    function editar_modal(props) {
        cerraBanderaModal();
        modal(props)
    }
    var date = new Date(item.item.fecha);
    //var date = new Date(propsModal.fecha);
    return (
        <div>
            <table className="table table-hover">
                <tbody key={item.dni}>
                    <tr>
                        <td className="col-2">{item.item.ncuota}</td>
                        <td className="col-2">{item.item.año}</td>
                        <td className="col-2">${item.item.monto}</td>
                        <td className="col-2">{item.item.pagado == "Adeuda" ? "Adeuda" : "Pagado"}</td>
                        <td className="col-2">
                            {item.item.pagado == "Adeuda" ? "-" : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
                        </td>
                        <td className="col-2">

                            {item.item.pagado == "Adeuda" ?
                                <div className="contenedorIconoCuota" onClick={() => editar_modal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal"> <img className="iconosCuota"
                                    src={Cobro} alt="red social intagram" title="redes sociales" />
                                </div> :
                                <div className="contenedorIconoCuotaPaga" onClick={() => editar_modal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal"><img className="iconosCuota"
                                    src={Cobro} alt="red social intagram" title="redes sociales" />
                                </div>}
                        </td>
                    </tr>
                </tbody>
            </table>
            {banderaModal ? <></> :
                <div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Resumen Cuota</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Nombre: {banderaModal ? <small>cargando</small> : <b>{propsModal.nombre} </b>}
                                    <br />
                                    N° Socio: {banderaModal ? <small>cargando</small> : <b>{propsModal.dni} </b>}
                                    <br /><hr />
                                    Cuota N°: {banderaModal ? <small>cargando</small> : <b>{propsModal.ncuota} </b>}
                                    <br />
                                    Año: {banderaModal ? <small>cargando</small> : <b> {propsModal.año} </b>}
                                    <br />
                                    Estado: {banderaModal ? <small>cargando</small> : <b> {propsModal.pagado} </b>}
                                    <br /><hr />
                                    Monto: <b>$</b>{banderaModal ? <small>cargando</small> : <b>{propsModal.monto} </b>}
                                    <br />
                                    Intereses: <b>$</b>{banderaModal ? <small>cargando</small> : <b>{propsModal.intereses}</b>}
                                    <br />
                                    Monto Final: <b>$</b>{banderaModal ? <small>cargando</small> : <b>{propsModal.intereses + propsModal.monto} </b>}
                                    <br /><hr />
                                    Fecha Pago: {banderaModal ? 
                                    <small>cargando</small> : 
                                    <div> {propsModal.fecha ? 
                                    <b>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</b> :
                                    <small>-</small>} </div>}
                                    <br />
                                    Cobrada por: {banderaModal ? <small>cargando</small> : propsModal.cobrador}
                                    <br />
                                    ID Transacción: {banderaModal ? <small>cargando</small> : propsModal.id}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                                    {
                                        propsModal.pagado == "Adeuda" ? <button type="button" id="btncobrar" className="btn btn-primary" onClick={() => cobrarCuota(propsModal)}>Cobrar</button>
                                            :
                                            <PDFDownloadLink
                                                document={<PdfModal props={propsModal} />}
                                                fileName={"Cuota N° " + propsModal.ncuota + " - " + propsModal.nombre}
                                            >
                                                <button type="button" id="btncobrar" className="btn btn-primary">Descargar</button>
                                            </PDFDownloadLink>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default Cuota;