import { useState, useEffect, useContext } from "react";
import { CartContext } from "./Context/Context";

export function Probando(dni) {

    //tremos del contexto socios y cuotas
    const { sociosAlternativo, cuotasocio } = useContext(CartContext);

    
    const [items1, setItems] = useState();
    const [loading1, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const promise = new Promise((resolve, reject) => {
            setLoading(true)
            const socio = sociosAlternativo.filter(b => b.dni == dni);
            resolve(socio)
        });
        promise
            .then(socio => (setItems(socio[0]), console.log(socio)))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }, [])
    return {loading1, items1 }
}