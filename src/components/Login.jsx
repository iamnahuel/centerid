import React, { useContext, useState } from "react";
import '../styles/login.css';
import imgLogin from "../images/imgLogin.jpg";
import { CartContext } from "./Context/Context"


const Login = () => {

    const { conectarse } = useContext(CartContext);
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");


    return (
        <div className="containerLogin">

            <div className="col-md-6 login">
                <p className="titulo">CENTER <b className="taxtoId">ID</b></p>
                <br />
                <h2 className="col-md-8 subtitulo"><b>Toda la informacion sobre nuestros socios en un solo lugar</b></h2>
                <br />
                <div class="col-12">
                    <i class="ri-fingerprint-line mr-2 ingreseasucuenta">Ingresá a tu cuenta:</i>
                </div>
                <br />
                <form className="formulario">
                    <div className="form-group row">
                        <div class="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onInput={(e) => setCorreo(e.currentTarget.value)} />
                        </div>
                    </div>
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Contraseña" onInput={(e) => setClave(e.currentTarget.value)} />
                        </div>
                    </div>
                    <label for="inputPassword3" className="col-sm-2 col-form-label">Contraseña</label>
                    <br />
                    <div className="form-group row fromBtn">
                        <div className="col-sm-10">
                            <button className="btn btn-lg btn-elegant m-0 btn-block btnIngresar" type="submit" onClick={() => conectarse(correo, clave)}>Ingresar</button>
                        </div>
                    </div>
                    <div className="contenedorContraseñaOlvidada">
                        <a href="" className="contraseñaOlvidada">¿Olvidaste tu contraseña?</a>
                    </div>

                </form>
            </div>
            <div className="col-md-6 contenedorImgLogin">
                <img src={imgLogin} alt="" className="imgLogin" />
            </div>

        </div>
    )
};

export default Login;