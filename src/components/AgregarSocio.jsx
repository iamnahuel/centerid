import React from "react";
import "../styles/agregarSocio.css"
import { CartContext } from "./Context/Context"
import { useRef } from "react";
import { useContext, useState, useEffect } from "react";


const AgregarSocio = () => {
    //llamamos al contexto
    const { addSocio, sociosAlternativo, crearCuota, selecTipoSocio, tipoSocioSelect } = useContext(CartContext);
    //declaramos estados
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [genero, setGenero] = useState("Femenino");
    const [tipoSocio, setTipoSocio] = useState("");
    const [selectSocios, setSelectSocios] = useState(["T Socio"])
    const [celular, setCelular] = useState("");
    const [mail, setMail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [incompleto, setIncompleto] = useState("");
    const [nacimiento, setNacimiento] = useState("");


    //carga automaticamente los tipos de socios en un estado
    (async () => {
        setTimeout(() => {
            selecTipoSocio()
        }, 300)
    })();

    const tSocios = () => {
        const optionSocios = JSON.parse(tipoSocioSelect)
        setSelectSocios(optionSocios)
        if (tipoSocio == "") {
            setTipoSocio(optionSocios[0])
        }
    }


    const ValidarCamposSocio = () => {

        if (nombre === "" || apellido === "" || documento === "" || celular === "" || mail === "" || direccion === "" || ciudad === "" || tipoSocio === "") {
            setIncompleto("Debes completar todos los campos");

            if (nombre === "") {
                const elem = document.getElementById("inputNombre");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputNombre");
                elem.style.border = 'none';
            }
            if (apellido === "") {
                const elem = document.getElementById("inputApellido");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputApellido");
                elem.style.border = 'none';
            }
            if (documento === "") {
                const elem = document.getElementById("inputDocumento");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputDocumento");
                elem.style.border = 'none';
            }
            if (tipoSocio === "") {
                const elem = document.getElementById("inputTipoSocioSelect");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputTipoSocioSelect");
                elem.style.border = 'none';
            }
            if (celular === "") {
                const elem = document.getElementById("inputCel");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputCel");
                elem.style.border = 'none';
            }
            if (mail === "") {
                const elem = document.getElementById("inputEmail");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputEmail");
                elem.style.border = 'none';
            }
            if (direccion === "") {
                const elem = document.getElementById("inputAddress");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputAddress");
                elem.style.border = 'none';
            }
            if (ciudad === "") {
                const elem = document.getElementById("inputCity");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputCity");
                elem.style.border = 'none';
            } if (nacimiento === "") {
                const elem = document.getElementById("inputNacimiento");
                elem.style.border = 'solid 2px red';
            } else {
                const elem = document.getElementById("inputNacimiento");
                elem.style.border = 'none';
            }
        } else {
            //creamos objeto socio
            const socio = { nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1), apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1), dni: documento, tsocio: tipoSocio, cel: celular, mail: mail, direccion: direccion.charAt(0).toUpperCase() + direccion.slice(1), ciudad: ciudad.charAt(0).toUpperCase() + ciudad.slice(1), seasocio: Date.now(), genero: genero, estado: true, nacimiento: nacimiento }
            //comrpobamos si no existe un socio con mismo dni, mail
            socioIneccistente(socio)

        }
    }

    //comprobar socio existente
    const socioIneccistente = (socio) => {
        const sociosExistente = sociosAlternativo;
        const socioAgregar = socio;
        new Promise((resolve) => {
            const socioDni = sociosExistente.filter(b => b.dni == socioAgregar.dni);
            resolve(socioDni);
            const socioEmail = sociosExistente.filter(b => b.mail == socioAgregar.mail);
            resolve(socioEmail);
            if (socioDni.length != 0) {
                setIncompleto("El Numero de DNI " + socioAgregar.dni + " ya se encuentra registrado")
                const elem = document.getElementById("inputDocumento");
                elem.style.border = 'solid 2px red';

            } else {
                setIncompleto("")
                const elem = document.getElementById("inputDocumento");
                elem.style.border = 'none';

                if (socioEmail.length != 0) {
                    const elem = document.getElementById("inputEmail");
                    elem.style.border = 'solid 2px red';
                    setIncompleto("El correo electronico " + socioAgregar.mail + " ya se encuentra registrado")

                } else {
                    const elem = document.getElementById("inputEmail");
                    elem.style.border = 'none';
                    setIncompleto("socio agregado");
                    //llamamos al metodo agregar socio del contexto y crea la primer cuota de socio impaga
                    addSocio(socioAgregar);
                    crearCuota(socioAgregar)
                    limpiarCampos();
                }

            }
        });
    }

    //limpiar input
    const limpiarCampos = () => {
        setNombre("");
        document.getElementById("inputNombre").value = "";
        setApellido("");
        document.getElementById("inputApellido").value = "";
        setDocumento("");
        document.getElementById("inputDocumento").value = "";
        setCelular("");
        document.getElementById("inputCel").value = "";
        setMail("");
        document.getElementById("inputEmail").value = "";
        setDireccion("");
        document.getElementById("inputAddress").value = "";
        setCiudad("");
        document.getElementById("inputCity").value = "";
        setTipoSocio("");
        document.getElementById("inputTipoSocioSelect").value = "";
    }

    return (

        <div className="contenedorAgregarSocio">
            <div className="col-md-9">
                <label className="infoFormulario">Para formar parte, necesitamos validar tu identidad. Por favor, completá los siguientes datos:</label>
                <form onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className="form-row formularios">
                        <div className="form-group col-12">
                            <p className="oIcompleto">{incompleto}</p>
                            <label for="inputNombre">Nombre</label>
                            <input type="text" className="form-control" id="inputNombre" placeholder="Nombre" onInput={(e) => setNombre(e.currentTarget.value)} />
                        </div>
                        <div className="form-group col-12">
                            <label for="inputApellido">Apellido</label>
                            <input type="text" className="form-control" id="inputApellido" placeholder="Apellido" onInput={(e) => setApellido(e.currentTarget.value)} />
                        </div>
                        <div className="form-group col-12 campoCompartido">
                            <div className="form-group col-8">
                                <label for="inputDocumento">Documento</label>
                                <input type="number" className="form-control" id="inputDocumento" placeholder="Documento" onInput={(e) => setDocumento(e.currentTarget.value)} />
                            </div>
                            <div className="col-4  nacimiento">
                                <label for="inputDocumento">Nacimiento</label>
                                <input type="date" name="fechaesperada" id="inputNacimiento" className="form-control" onInput={(e) => setNacimiento(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <label for="inputGenero">Genero</label>
                            <select id="inputGereroSelect" className="form-control" onInput={(e) => setGenero(e.target.value)} >
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                            </select>

                        </div>
                        <div className="form-group col-12">
                            <label for="inputTipoSocio">Tipo Socio</label>
                            <select id="inputTipoSocioSelect" className="form-control" onClick={() => tSocios()} onInput={(e) => setTipoSocio(e.target.value)} >
                                {selectSocios.map((props) => {
                                    return (
                                        <option value={props}>
                                            {props}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>
                        <div className="form-group col-12 campoCompartido">
                            <div className="col-6 inputCel">
                                <label for="inputCel">Cel</label>
                                <input type="number" className="form-control" id="inputCel" placeholder="Celular" onInput={(e) => setCelular(e.currentTarget.value)} />
                            </div>
                            <div className="col-6">
                                <label for="inputEmail">Email</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email" onInput={(e) => setMail(e.currentTarget.value)} />
                            </div>
                        </div>
                        <div className="form-group col-12 campoCompartido">
                            <div className="form-group col-6 inputDireccion">
                                <label for="inputAddress">Direccion</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Direccion" onInput={(e) => setDireccion(e.currentTarget.value)} />
                            </div>
                            <div className="form-group col-6">
                                <label for="inputCity">Ciudad</label>
                                <input type="text" className="form-control" id="inputCity" placeholder="Ciudad" onInput={(e) => setCiudad(e.currentTarget.value)} />
                            </div>

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary col-12" onClick={ValidarCamposSocio}>CONTINUAR</button>
                </form>

            </div >
        </div >
    )
}

export default AgregarSocio;