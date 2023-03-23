import React, { useContext, useState } from "react";
import '../styles/admin.css';
import wallpaper from '../images/wallpaper.jpg';
import AgregarSocio from "./AgregarSocio";
import BuscarSocio from "./BuscarSocio";
import MenuAdmin from "./MenuAdmin";
import PerfilSocio from "./PerfilSocio";
import ListadoSocios from './ListadoSocios';
import CuotasSociales from "./CuotasSociales";
import Login from './Login';
import { CartContext } from "./Context/Context";


/*******/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Estadisticas from "./Estadisticas";
import CuotaSocio from "./CuotaSocio";
import MenuDesplegable from "./MenuDesplegable";

const Admin = () => {
    const { conexion } = useContext(CartContext);
    const [menudesplegable, setmMnudesplegable] = useState(false)
    return (
        <>
            <div className="contenedorWallpapar">
                <img src={wallpaper} className="wallpapar" />

            </div>

            <div className="contenedorAdministracion">

                {conexion ? <Login /> :
                    <BrowserRouter>
                        {menudesplegable ?
                            <MenuDesplegable />
                            : <>
                                <div className="col-3 menu">
                                    <MenuAdmin />
                                </div>
                                <div className="col-9 panelAdmin">
                                    <Routes>
                                        <Route path='/informacionsocio/:dni' element={<PerfilSocio />} />
                                        <Route exact path='/buscarsocio' element={<BuscarSocio />} />
                                        <Route exact path='/agregarsocio' element={<AgregarSocio />} />
                                        <Route exact path='/listadosocios' element={<ListadoSocios />} />
                                        <Route exact path='/estadisticas' element={<Estadisticas />} />
                                        <Route exact path='/cuotasocial' element={<CuotasSociales />} />
                                        <Route path='/cuotasocio/:dni' element={<CuotaSocio />} />
                                    </Routes>
                                </div>
                            </>
                        }
                    </BrowserRouter>
                }
            </div>

        </>
    )
}

export default Admin;