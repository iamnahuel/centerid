import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Context/Context";
import "../styles/cuotasSociales.css";
import iconBeneficios from "../images/iconBeneficios.png";


const Cuotas = (items) => {

    const { modalModificarCuota, banderaModalCuotas, propsModalModificarCuota, editCuota, cerraBanderaModalCuotas } = useContext(CartContext);



    const [monto, setMonto] = useState()
    const [beneficio1, setBeneficio1] = useState()
    const [beneficio2, setBeneficio2] = useState()
    const [beneficio3, setBeneficio3] = useState()
    const [beneficio4, setBeneficio4] = useState()

    const modal = (props) => {
        cerraBanderaModalCuotas()
        modalModificarCuota(props);
        cargarInput(propsModalModificarCuota);
    }

    function cargarInput(propsModalModificarCuota) {
        setMonto(propsModalModificarCuota.valor);
        setBeneficio1(propsModalModificarCuota.beneficio1);
        setBeneficio2(propsModalModificarCuota.beneficio2);
        setBeneficio3(propsModalModificarCuota.beneficio3);
        setBeneficio4(propsModalModificarCuota.beneficio4)
    }

    const editarCuota = (id) => {
        const props = { id: id, valor: monto, beneficio1: beneficio1, beneficio2: beneficio2, beneficio3: beneficio3, beneficio4: beneficio4 }
        editCuota(props)
    }


    return (

        <div className="cuotas">
            <div className="cuota">
                <div className="encabezadoBeneficios">
                    <h3 className="tipoCuota"><b>{items.props.categoria}</b></h3>
                    <h2 className="beneficios"><b>Beneficios</b></h2>
                </div>
                <div className="contenedorBeneficios">
                    <div className="col-6">
                        <div className="col-12">
                            <img className="iconBeneficios" src={iconBeneficios} />
                            <small className="beneficios">{items.props.beneficio1 ? items.props.beneficio1 : "Sin beneficio"}</small><br />
                        </div>
                        <div className="col-12">
                            <img className="iconBeneficios" src={iconBeneficios} />
                            <small className="beneficios">{items.props.beneficio2 ? items.props.beneficio2 : "Sin beneficio"}</small>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="col-12">
                            <img className="iconBeneficios" src={iconBeneficios} />
                            <small className="beneficios">{items.props.beneficio3 ? items.props.beneficio3 : "Sin beneficio"}</small><br />
                        </div>
                        <div className="col-12">
                            <img className="iconBeneficios" src={iconBeneficios} />
                            <small className="beneficios">{items.props.beneficio4 ? items.props.beneficio4 : "Sin beneficio"}</small>
                        </div>
                    </div>
                </div>
                <div className="footerBeneficios">
                    <span className="montoCuot"> <b>${items.props.valor}</b> al año</span>
                    <div>
                    <button type="button" class="btn btn-primary btnEliminar">Eliminar</button>
                    <button type="submit" class="btn btn-primary btnModificar" onClick={() => modal(items.props)} data-bs-toggle="modal" data-bs-target="#modalCuota" >Modificar</button>
                
                    </div>
                   </div>
            </div>


            {banderaModalCuotas ? <></> :
                <div className="modal fade" id="modalCuota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Categoria: {propsModalModificarCuota.categoria}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label className="labelModalCuota">Monto:</label>
                                <input type="number" className="form-control" id="inputMonto" value={monto} onChange={event => { setMonto(event.target.value) }} />
                                <br />
                                <label className="labelModalCuota">Beneficio:</label>
                                <input type="text" className="form-control" id="inputDocumento" value={beneficio1} onChange={event => { setBeneficio1(event.target.value) }} />
                                <br />
                                <label className="labelModalCuota">Beneficio:</label>
                                <input type="text" className="form-control" id="inputDocumento" value={beneficio2} onChange={event => { setBeneficio2(event.target.value) }} />
                                <br />
                                <label className="labelModalCuota">Beneficio:</label>
                                <input type="text" className="form-control" id="inputDocumento" value={beneficio3} onChange={event => { setBeneficio3(event.target.value) }} />
                                <br />
                                <label className="labelModalCuota">Beneficio:</label>
                                <input type="text" className="form-control" id="inputDocumento" value={beneficio4} onChange={event => { setBeneficio4(event.target.value) }} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btnModificar" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-secondary btnModificar" data-bs-dismiss="modal" onClick={() => editarCuota(propsModalModificarCuota.id)}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cuotas;