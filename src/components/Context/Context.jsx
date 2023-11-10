import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { getFirestore, getDocs, collection, query, where, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Await } from "react-router-dom";

export const CartContext = createContext();

const Provider = ({ children }) => {
    //////////////////////////////CONEXION SISTEMA//////////////////////////////
    //---------------conexion db administrador
    const [administrador, setAdministrador] = useState([])
    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "administracion");
        getDocs(itemsCollection).then(snapShot => {
            setAdministrador(snapShot.docs.map(item => ({ id: item.id, ...item.data() })))

        });
    }, []);


    const [conexion, setConexion] = useState(true);
    const [datosAdmin, setDatosAdmin] = useState([]);
    //---------------Comprobar si no esta la secion cargada en el local storage
    useEffect(() => {
        if (localStorage.getItem("loadin") != null) {
            //llamamos a la funcion de carga de los datos que estan en el localstorage y cambiamos la bandera de conexion
            cargarDatosAdmin();
        }
    }, []);
    const cargarDatosAdmin = () => {
        const b = localStorage.getItem("loadin");
        setDatosAdmin(b);
        setConexion(false);
    }

    //---------------funcion para conectarse al sistema
    const conectarse = (correo, clave) => {
        if (correo != "") {
            const x = administrador.filter(b => b.correo == correo);
            if (x != "") {
                const b = x.filter(b => b.clave == clave)
                if (b != "") {
                    //cargamos el local storage para mantener secion iniciada y guardamos los datos del usuario en formato json
                    const usuarioJson = JSON.stringify(b)
                    localStorage.setItem("loadin", usuarioJson)
                    //cargamos datos del usuario en el contexto
                    setDatosAdmin(usuarioJson)
                    //cambiamos la bandera conexion
                    setConexion(false)
                }
            }
        } else {

        }
    }

    //---------------Cerrar seccion
    const desconectarse = () => {
        //vaciamos el local storage
        localStorage.removeItem("loadin")
        setConexion(true)
    }

    //////////////////////////////SOCIOS//////////////////////////////
    const [recargarCuota, setRecargarCuota] = useState(0)
    //---------------conexion db socios
    const [sociosAlternativo, setSociosAlternativo] = useState([])

    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "socios");
        getDocs(itemsCollection).then(snapShot => {
            setSociosAlternativo(snapShot.docs.map(item => ({ id: item.id, ...item.data() })))
        });
    }, [recargarCuota]);
    //---------------vuelve a cargar el estado con socios 
    const listadoSocios = () => {
        const db = getFirestore();
        const itemsCollection = collection(db, "socios");
        getDocs(itemsCollection).then(snapShot => {
            setSociosAlternativo(snapShot.docs.map(item => ({ id: item.id, ...item.data() })))
        });
    }

    //---------------Agregar Socio
    const addSocio = (props) => {
        const db = getFirestore();
        const orderCollection = collection(db, "socios");
        addDoc(orderCollection, props).then((data) => {
            // setOrderId(data.id);
        })
        listadoSocios()
    }
    //---------------Modificar Socio
    const [editarSocio, setEditarSocio] = useState(true)
    const modEditarSocio = () => {
        setEditarSocio(!editarSocio)
    }
    async function updateSocio(props) {
        console.log(props);
        //nos conectamos a la base de datos socio
        const dbsocio = getFirestore();
        //modificamos el campo pagado del la bases de datos socio con el id pasado
        const socio = doc(dbsocio, "socios", props.id);
        await updateDoc(socio, {
            mail: props.mail,
            cel: props.cel,
            ciudad: props.ciudad,
            direccion: props.direccion
        });
        setRecargarCuota(recargarCuota + 1)
    }
    //---------------Cargar Select de tipo socio
    const [tipoSocioSelect, setTitpoSocio] = useState([]);
    const selecTipoSocio = () => {
        //le vamos sumando los valores al array
        const valor = [];
        for (let index = 0; index < tipoCuota.length; index++) {
            valor.push(tipoCuota[index].categoria)
        }
        //convertimos el array obtenido a json para cargarlo a un estado
        const x = JSON.stringify(valor)
        setTitpoSocio(x)
    }
    //---------------Pausar Socio
    async function pausarSocio(props) {
        //nos conectamos a la base de datos socio
        const dbsocio = getFirestore();
        //modificamos el campo pagado del la bases de datos socio con el id pasado
        const socio = doc(dbsocio, "socios", props.id);
        await updateDoc(socio, {
            estado: !props.estado
        });
        setRecargarCuota(recargarCuota + 1)
    }

    //---------------Recategorizar Socio
    async function recategorizar(props) {

        //nos conectamos a la base de datos socio
        const dbsocio = getFirestore();
        //modificamos el campo pagado del la bases de datos socio con el id pasado
        const socio = doc(dbsocio, "socios", props[1]);
        await updateDoc(socio, {
            tsocio: props[0]
        });
        setRecargarCuota(recargarCuota + 1)
    }

    //---------------Listar Socios
    const [socios, setSocios] = useState([])
    const listaSocios = () => {
    }
    //---------------buscarSocio
    const [socioBuscado, setSocioBuscado] = useState([]);
    function buscarSocio(documento) {
        //filtrar por dni
        if (documento != "") {
            const p = sociosAlternativo.filter(b => b.dni == documento);
            setSocioBuscado(p);
        }
    }

    //---------------cargar foto perfil usuario
    const storage = getStorage();
    //const nameme = "Fernanda"
    function uploadFile(file, nombre) {
        
        const storageRef = ref(storage, nombre);
        uploadBytes(storageRef, file).then(snapShot => {
            // console.log(snapShot);
        })
        setRecargarCuota(recargarCuota + 1)
    }

    //////////////////////////////CUOTAS SOCIOS//////////////////////////////

    //---------------crear cuota social
    const crearCuota = (props) => {
        const db = getFirestore();
        const orderCollection = collection(db, "cuotasocio");
        var y = new Date().getFullYear();
        const monto = calcularCuota(props.tsocio);

        const datos = { pagado: false, dni: props.dni, año: y, fecha: Date.now(), ncuota: 1,  monto: monto, intereses: 0, montoFinal: 0, tsocio: props.tsocio }
        addDoc(orderCollection, datos).then((data) => {

        })
        setRecargarCuota(recargarCuota + 1)

    }
    //---------------conexion db coutasocio
    const [cuotasocio, setCuotasocio] = useState([])
    useEffect(() => {
        const dbsocio = getFirestore();
        const itemsCollection = collection(dbsocio, "cuotasocio");
        getDocs(itemsCollection).then(snapShot => {
            setCuotasocio(snapShot.docs.map(item => ({ id: item.id, ...item.data() })))
        });
    }, [recargarCuota]);
    //---------------Cobrar cuota Socio
    async function cobrarCuota(props) {
        //datos del administrador para saber quien cobro la factura
        const admin = JSON.parse(datosAdmin)
        //nos conectamos a la base de datos cuotasocio
        const dbsocio = getFirestore();
        //modificamos el campo pagado del la bases de datos cuotasocio con el id pasado
        const cuota = doc(dbsocio, "cuotasocio", props.id);
        await updateDoc(cuota, {
            pagado: "Pagado",
            idcobrador: admin[0].dni,
            montoFinal: props.intereses + props.monto,
            intereses: props.intereses,
            fecha: Date.now()
        });
        setRecargarCuota(recargarCuota + 1)
        alert("Cobro exitoso")
    }

    //------------------Datos modal cuota del socio
    const [propsModal, setPropsModal] = useState();
    const [banderaModal, setBanderaModal] = useState(true)
    const modal = (props) => {
        //armar if donde si la cuota se cobro, cargue lo datos de fecha y cobrador e intereses ya guardados
        // y si la cuota no esta cobrarda, llamar a una funcion para calcular los intereses, pasandole como parametro el monto y el año.

        //cargamos nombre socio
        const socio = sociosAlternativo.filter(b => b.dni == props.item.dni)
        if (props.item.pagado === "Pagado") {

            //cargamos nombre cobrador
            const cobrador = administrador.filter(b => b.dni == props.item.idcobrador)
            setPropsModal({ ...props.item, nombre: socio[0].nombre + " " + socio[0].apellido, cobrador: cobrador[0].nombre + " " + cobrador[0].apellido })
        } else {
            const intereses = interesesCuota(props.item)
            setPropsModal({ ...props.item, intereses: intereses, nombre: socio[0].nombre + " " + socio[0].apellido })
        }
        setBanderaModal(false)
    }

    const cerraBanderaModal = () => {
        setBanderaModal(true)
    }

    //------------------Modificar tipo de socio
    async function editTSocio(props) {
        //nos conectamos a la base de datos tsocio
        const dbsocios = getFirestore();
        const socio = doc(dbsocios, "socios", props.id);
        await updateDoc(socio, {
            tsocio: props.valor,
        });
    }

    //------------------Calcular si posee deuda a la fecha
    const [b, setB] = useState([]);
    const [hayDeuda, setHayDeuda] = useState(true);
    function buscarDeudas(props) {
        setB([])
        setB(cuotasocio.filter(b => b.dni == props & b.pagado == "Adeuda" & b.año != (new Date().getFullYear())))

        if (b.length != 0) {
            setHayDeuda(true)
        } else {
            setHayDeuda(false)
        }

        return hayDeuda;
    };

    //////////////////////////////CUOTAS SISTEMA//////////////////////////////
    //------------------conexion db tipocuotas
    const [tipoCuota, setTipoCuota] = useState([])
    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "tipocuota");
        getDocs(itemsCollection).then(snapShot => {
            setTipoCuota(snapShot.docs.map(item => ({ id: item.id, ...item.data() })))
        });
    }, []);

    //------------------calcular cuota deptendiendo tipo socio
    const calcularCuota = (props) => {
        const x = tipoCuota.filter(b => b.categoria == props);
        const valorCuota = x[0].valor;
        return valorCuota;
    }

    //------------------calcular intereses por demora en las cuotas
    const interesesCuota = (props) => {
        const valorIntereses = props.monto * ((new Date().getFullYear() - props.año) * 1);
        return valorIntereses;
    }
    //------------------bandera modal cuotas
    const [banderaModalCuotas, setBanderaModalCuotas] = useState(true)
    const cerraBanderaModalCuotas = () => {
        setBanderaModalCuotas(false)
    }
    //------------------Datos modal modificar tipo de cuota
    const [propsModalModificarCuota, setPropsModalModificarCuota] = useState();
    const modalModificarCuota = (props) => {
        setPropsModalModificarCuota(props)
        //  setBanderaModal(false)
    }
    //------------------Modificar tipo de cuota
    async function editCuota(props) {
        //nos conectamos a la base de datos cuotasocio
        const dbtipocuota = getFirestore();
        //modificamos el campo pagado del la bases de datos cuotasocio con el id pasado
        const cuota = doc(dbtipocuota, "tipocuota", props.id);
        await updateDoc(cuota, {
            valor: props.valor,
            beneficio1: props.beneficio1,
            beneficio2: props.beneficio2,
            beneficio3: props.beneficio3,
            beneficio4: props.beneficio4,
            modificacion: Date()

        });

    }

    //////////////////////////////ESTADISTICAS//////////////////////////////
    const [datoEstadistico, setDatoEstadistico] = useState();
    //declaramos estados para estadisticas
    const [Masculino, setMasculino] = useState([1]);
    const [Femenino, setFemenino] = useState([1]);
    const [Menos5, setMenos5] = useState(4);
    const [de6a18, setDe6a18] = useState(5);
    const [de19a45, setDe19a45] = useState(6);
    const [Masde45, setMasde45] = useState(7);

    const [pracha, setPercha] = useState(0)
    useEffect(() => {


        const p = sociosAlternativo;
        //const M = p.filter(b => b.genero == "Masculino").length;

        // console.log(M);
        setMasculino(p.filter(b => b.genero == "Masculino"))
        setFemenino(p.filter(b => b.genero == "Femenino"))





        const datosEstadisticos = { masculino: Masculino, femenino: Femenino, menos5: Menos5, de6a18: de6a18, de19a45: de19a45, mas45: Masde45 }
        setDatoEstadistico(datosEstadisticos)
        setPercha(datosEstadisticos)

    }, [1], 2000);

    return (
        <CartContext.Provider value={{
            selecTipoSocio, tipoSocioSelect, conectarse, desconectarse,
            datosAdmin, tipoCuota, cobrarCuota, crearCuota, modal, cerraBanderaModal,
            propsModal, banderaModal, banderaModalCuotas, cerraBanderaModalCuotas, addSocio, pausarSocio, recategorizar, conexion,
            listaSocios, sociosAlternativo, cuotasocio, modalModificarCuota, editCuota, propsModalModificarCuota
            , recargarCuota, buscarDeudas, hayDeuda,
            modEditarSocio, updateSocio, editarSocio, datoEstadistico, uploadFile
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default Provider;