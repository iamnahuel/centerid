import React from "react";
import { CartContext } from "./Context/Context";
import { useContext, useState, useEffect } from "react";
import ListadoSocios from "./ListadoSocios";
import "../styles/buscarSocio.css"


const BuscarSocio = () => {

    //llamamos al contexto
    const { sociosAlternativo } = useContext(CartContext);
    //declaramos estados
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const [incompletoDni, setIncompletoDni] = useState("");
    const [incompletoNombre, setIncompletoNombre] = useState("");

    const [bandera, setBandera] = useState(true)
    const [resultado, setResultado] = useState()
    //funcion para buscar socio por dni previo a validad campos
    const buscardni = () => {
        if (documento == "") {
            setIncompletoDni("Ingresar datos");
        } else {
            setIncompletoDni("");
            const p = sociosAlternativo.filter(b => b.dni == documento);
            if (p == "") {
                setIncompletoDni("Socio inexistente");
            } else {
                setResultado(p)
                console.log(resultado);
                setBandera(false)
                limpiarCampos();
            }
        }
    }

    //funcion para buscar socio por nombre previo a validad campos
    const buscarnombre = () => {
        if (nombre == "" && apellido == "") {
            setIncompletoNombre("Ingresar datos");
        } else {
            setIncompletoNombre("");
            if (nombre == "") {
                const p = sociosAlternativo.filter(b => b.apellido == apellido.charAt(0).toUpperCase() + apellido.slice(1));
                if (p == "") {
                    setIncompletoDni("Socio inexistente");
                } else {
                    setResultado(p)
                    console.log(resultado);
                    setBandera(false)
                    limpiarCampos();
                }
            } else if (apellido == "") {
                const p = sociosAlternativo.filter(b => b.nombre == nombre.charAt(0).toUpperCase() + nombre.slice(1));
                if (p == "") {
                    setIncompletoDni("Socio inexistente");
                } else {
                    setResultado(p)
                    console.log(resultado);
                    setBandera(false)
                    limpiarCampos();
                }
            } else {
                const p = sociosAlternativo.filter(b => b.nombre == nombre.charAt(0).toUpperCase() + nombre.slice(1) && b.apellido == apellido.charAt(0).toUpperCase() + apellido.slice(1));
                if (p == "") {
                    setIncompletoDni("Socio inexistente");
                } else {
                    setResultado(p)
                    console.log(resultado);
                    setBandera(false)
                    limpiarCampos();
                }
            }
        }
    }

    //limpiar campos
    const limpiarCampos = () => {
        setDocumento("");
        setNombre("");
        setApellido("");
        document.getElementById("inputBuscarDocumento").value = "";
        document.getElementById("inputBuscarNombre").value = "";
        document.getElementById("inputBuscarApellido").value = "";
        setIncompletoDni("");
        setIncompletoNombre("")
    }

    return (

        <div className="contenedorBuscarSocio">
            {bandera ?
                <div className="col-md-12">
                    <label className="infoFormulario">Ingrese alguno de los siguientes datos del socio:</label>
                    <form onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <p className="oIcompleto">{incompletoDni}</p>
                        <div className="buscarPorDni">
                            <div class="form-row formularios">
                                <div class="form-group col-12">
                                    <label for="inputDocumento">Documento</label>
                                    <input type="number" class="form-control" id="inputBuscarDocumento" placeholder="Documento" onInput={(e) => setDocumento(e.currentTarget.value)} />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary col-12" onClick={() => buscardni()}>BUSCAR</button>
                        </div>
                        <p className="oIcompleto">{incompletoNombre}</p>
                        <div className="buscarNombre">
                            <div class="form-row formularios">
                                <div class="form-group col-12">
                                    <label for="inputDocumento">Nombre</label>
                                    <input type="text" class="form-control" id="inputBuscarNombre" placeholder="Nombre" onInput={(e) => setNombre(e.currentTarget.value)} />
                                    <label for="inputDocumento">Apellido</label>
                                    <input type="text" class="form-control" id="inputBuscarApellido" placeholder="Apellido" onInput={(e) => setApellido(e.currentTarget.value)} />

                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary col-12" onClick={buscarnombre}>BUSCAR</button>
                        </div>
                    </form>
                </div>
                : <div className="resultadoBusqueda">
                    <p className="h6 cerrarBusqueda" onClick={() => { setBandera(true) }}>REALIZAR OTRA BUSQUEDA</p>
                    <div className="contenedorTabla">
                        <ListadoSocios busqueda={resultado} />
                    </div>
                </div>}
        </div>

    )
}
export default BuscarSocio;