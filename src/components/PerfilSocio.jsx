import React, { useContext, useState, useEffect } from "react";
import "../styles/perfilSocio.css";
import { useParams } from 'react-router-dom';
import { CartContext } from "./Context/Context";
import DatosSocios from "./DatosSocios";
import UpdateSocio from "./UpdateSocio";
import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup, Spinner } from '@chakra-ui/react'





const PerfilSocio = () => {
    const { dni } = useParams();
    const { sociosAlternativo, selecTipoSocio, tipoSocioSelect, buscarDeudas, hayDeuda, pausarSocio, editarSocio, recategorizar, uploadFile } = useContext(CartContext);
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getSocios = setTimeout(() => {
            new Promise((resolve) => {
                const socio = sociosAlternativo.filter(b => b.dni == dni);
                resolve(socio);
                setItems(socio[0]);

                //buscar la forma de sacar el setTime out
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            });
        });
    }, [dni, sociosAlternativo]);





    // comprobamos que el socio no tenga deudas, para permitir recategorizarlo
    useEffect(() => {
        const getSocios = setTimeout(() => {
            new Promise((resolve) => {
                buscarDeudas(dni)
            });
        }, 300);
    }, []);


    // MODAL carga automaticamente los tipos de socios en un estado
    (async () => {
        setTimeout(() => {
            selecTipoSocio()
        }, 200)
    })();

    const [selectSocios, setSelectSocios] = useState(["Tipo Socio"])
    const [tipoSocio, setTipoSocio] = useState([]);
    const tSocios = () => {
        const optionSocios = JSON.parse(tipoSocioSelect)
        setSelectSocios(optionSocios)
        if (tipoSocio == "") {
            setTipoSocio(optionSocios[0])
        }

    }

    //Recategorizar socio
    function recategorizarSocio() {
        const props = [tipoSocio, items.id]
        recategorizar(props)
    }


    return (
        <>
            <div className="PerfilSocio">
                <div className="col-4">
                    <div className="PortadaSocio">
                        <div>

                            <input type="file" className="inputfile" name="file-6" id="file-6" onChange={e => uploadFile((e.target.files[0]), (dni))} accept="image/*" onBlur='LimitAttach(this,1);' />
                            <label for="file-6">
                                <figure>
                                    <Avatar _hover={{ opacity: ("80") }} cursor={"pointer"} w={[55, 90, 120]} h={[55, 90, 120]} name='Segun Adebayo' src={`https://firebasestorage.googleapis.com/v0/b/center-id.appspot.com/o/${dni}?alt=media&token=feb04684-4813-4f8f-b107-2b453e2f12b0`} />
                                </figure>
                            </label>


                            {/* pasamos la variable dni para usarla como nombre de la imagen cuando la subimos al servidor*/}

                        </div>
                        {loading ? <Spinner color='blue.500' /> :
                            <div>
                                <h4 className="nombrePerfilSocio">{items.nombre}, {items.apellido}</h4>
                                <h5 className="datosTipoSocio">{items.tsocio}  | {items.estado ? "Activo" : "Inactivo"}</h5>
                                <button className="btn btn-danger btnPortadaSocio" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => buscarDeudas(items.dni)}>Categoria Socio</button>
                                <Link to={`/cuotasocio/${items.dni}`} className="link">
                                    <button className="btn btn-danger btnPortadaSocio">Cuota Social</button>
                                </Link>
                                <button className="btn btn-danger btnPortadaSocio" onClick={() => pausarSocio(items)}>{items.estado ? "Socio Inactico" : "Socio Activo"}</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-8">
                    {loading ? <Spinner color='blue.500' /> :
                        editarSocio ? <DatosSocios items={items} /> : <UpdateSocio items={items} />
                    }
                </div>
            </div >
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tipo Socio</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Categoria: {loading ? <></> : <b>{items.tsocio}</b>}
                            <br />
                            Recategorizar:
                            <select id="inputTipoSocioSelect" className="form-control" onClick={() => tSocios()} onInput={(e) => setTipoSocio(e.target.value)} >
                                {selectSocios.map((props) => {
                                    return (
                                        <option value={props}  >
                                            <b>{props}</b>
                                        </option>
                                    );
                                })}
                            </select>
                            <br /><hr />
                            {hayDeuda ? <small style={{ color: "red" }}>A la fecha posee Deudas mayores a un año</small> : <small>A la fecha no posee Deudas mayores a un Año</small>}
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            {loading ? <small>cargando</small> :
                                <div>
                                    {hayDeuda ? <Link to={`/cuotasocio/${items.dni}`} className="link"><button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cobrar</button></Link> : <div> {tipoSocio == "" ? <button type="button" disabled id="btncobrar" className="btn btn-primary">Actualizar</button> : <button type="button" id="btncobrar" className="btn btn-primary" onClick={() => recategorizarSocio()}>Actualizar</button>} </div>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PerfilSocio;