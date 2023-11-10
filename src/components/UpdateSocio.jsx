import react, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Context/Context";


const UpdateSocio = (items) => {

    //llamamos al contexto
    const { modEditarSocio, sociosAlternativo, updateSocio } = useContext(CartContext);

    //Cargamos datos en los input
    const [cel, setCel] = useState();
    const [correo, setCorreo] = useState();
    const [direccion, setDireccion] = useState();
    const [ciudad, setCiudad] = useState();
    useEffect(() => {
        const getSocios = setTimeout(() => {
            setCel(items.items.cel);
            setCorreo(items.items.mail);
            setDireccion(items.items.direccion);
            setCiudad(items.items.ciudad);
        }, 300);
    }, []);

    //Verificamos si los datos cargados son correctos para actualizar
    const [incompleto, setIncompleto] = useState("");
    const ValidarCamposSocio = () => {
        if (cel === "" || correo === "" || direccion === "" || ciudad === "") {
            setIncompleto("Debes completar todos los campos");
        } else {
            setIncompleto();
            //creamos objeto con sus modificaciones
            const socio = { cel: cel, mail: correo, direccion: direccion, ciudad: ciudad, dni: items.items.dni, id: items.items.id }
            //comrpobamos si no existe un socio con mismo cel o mail
            validadDatos(socio)
        }
    }

    //validad datos
    const validadDatos = (socio) => {
        new Promise((resolve) => {
            console.log(sociosAlternativo);
            //quitamos el socio que estamos modificando para que no nos de error en los filtros de mail y celular
            const sociosFiltrado = sociosAlternativo.filter(b => b.dni != socio.dni);
            console.log(sociosFiltrado);
            const socioMail = sociosFiltrado.filter(b => b.mail == socio.mail);
            resolve(socioMail);
            const socioCel = sociosFiltrado.filter(b => b.cel == socio.cel);
            resolve(socioCel);
            if (socioMail.length != 0) {
                setIncompleto("El Mail " + socio.mail + " ya se encuentra registrado")
            } else {
                if (socioCel.length != 0) {
                    setIncompleto("El Celular " + socio.cel + " ya se encuentra registrado")
                } else {
                    updateSocio(socio);
                }
            }
        })
    }



    return (
        <div className="contUpdateSocio">
            <span className="introUpdateSocio">Tu nombre, apellido, DNI, nacionalidad, género, fecha de nacimiento y dirección fueron
                validados con el Registro Nacional de las Personas. En caso de que hayas actualizado
                algunos de estos datos frente a dicho organismo, hacé click aquí para actualizarlos
                en tu Center ID.</span>
            <div className="updateSocio">
                <p className="oIcompleto">{incompleto}</p>
                <label className="labelModalCuota">Cel:</label>
                <input type="number" className="form-control" id="inputMonto" value={cel} onChange={event => { setCel(event.target.value) }} />
                <br />
                <label className="labelModalCuota">Correo:</label>
                <input type="text" className="form-control" id="inputDocumento" value={correo} onChange={event => { setCorreo(event.target.value) }} />
                <br />
                <label className="labelModalCuota">Direccion:</label>
                <input type="text" className="form-control" id="inputDocumento" value={direccion} onChange={event => { setDireccion(event.target.value) }} />
                <br />
                <label className="labelModalCuota">Ciudad:</label>
                <input type="text" className="form-control" id="inputDocumento" value={ciudad} onChange={event => { setCiudad(event.target.value) }} />
                <br />
                <hr />
                <div className="btnUpdateSocio">
                    <button onClick={() => modEditarSocio()} className="btn btn-primary col-3 btnUpdateSocios" >Cerrar</button>
                    <br />
                    <button onClick={() => ValidarCamposSocio()} className="btn btn-primary col-4 btnUpdateSocios" >Actualizar</button>
                </div>
            </div>

        </div >
    )

}

export default UpdateSocio;