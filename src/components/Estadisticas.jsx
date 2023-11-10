import React, { PureComponent } from "react";
import '../styles/estadisticas.css';
import { CartContext } from "./Context/Context"
import { useContext, useState, useEffect } from "react";
import { Progress } from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



ChartJS.register(ArcElement, Tooltip, Legend);


const Estadisticas = () => {
    //llamamos al contexto
    const { datoEstadistico, sociosAlternativo } = useContext(CartContext);

    //filtramos el arrays de socios por genero
    let Masculino = sociosAlternativo.filter((b => b.genero == "Masculino"));
    let Femenino = sociosAlternativo.filter((b => b.genero == "Femenino"));

    //filtramos el arrays de socios por edad
    let Menos5 = sociosAlternativo.filter((b => calcularAños(b.nacimiento) < 5));
    let de5a18 = sociosAlternativo.filter((b => calcularAños(b.nacimiento) < 19 && calcularAños(b.nacimiento) > 4));
    let de19a45 = sociosAlternativo.filter((b => calcularAños(b.nacimiento) < 46 && calcularAños(b.nacimiento) > 18));
    let mas45 = sociosAlternativo.filter((b => calcularAños(b.nacimiento) > 45));


    /////////////////////
    //filtramos socios dependiendo el año que se asociaron
    const [sociosTotales, setSocioPorAño] = useState(sociosAlternativo);

    //buscamos años donde se acreditaron socios
    function elementoRepite(valor) {
        let vecesRepetidas = 0;
        for (let i of sinDuplicados) {
            if (new Date(i.seasocio).getFullYear() == valor) {
                vecesRepetidas++;
                if (vecesRepetidas > 0) {
                    return true;
                    break;
                }
            }
        }
        return false;
    }
    const sinDuplicados = [

        {
            año: 2022,
            cantidad: 5
        },
        {
            año: 2023,
            cantidad: 110
        },
    ];

    sociosTotales.forEach(i => {
        if (!elementoRepite(new Date(i.seasocio).getFullYear())) {
            sinDuplicados.push(i);
        }
    });

    //hasta aca obtuvimos un arreglo con socios con distinto año de acreditacion
    //ahora hay que hacer un for por cada año y ahi sumar los socia dependioendo el año
    //hay que ir crandio bariables dependiendo el largo del arreglo
    setTimeout(() => {
        sinDuplicados.forEach(i => {
            let socioPorAño = sociosAlternativo.filter((b => new Date(b.seasocio).getFullYear() == (new Date(i.seasocio).getFullYear())));
            console.log(new Date(socioPorAño[0].seasocio).getFullYear());
        })
    }, 1500);

    ///////////////////////////////





    function calcularAños(fechaNacimiento) {
        var today = new Date();
        //Restamos los años
        let años = today.getFullYear() - (new Date(fechaNacimiento).getFullYear());

        // Si no ha llegado su cumpleaños le restamos el año por cumplir
        return años;
    }

    //////////////////////////////////

    var options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    var data = {
        labels: ['Menores de 5', 'De 5 a 18', 'De 19 a 45', 'Mas de 45'],
        datasets: [
            {
                label: 'Popularidad en Navidad',
                data: [Menos5.length, de5a18.length, de19a45.length, mas45.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    var genero = {
        labels: ['Femenino', 'Masculino'],
        datasets: [
            {
                label: 'Popularidad en Navidad',
                data: [Femenino.length, Masculino.length],
                backgroundColor: [
                    'rgba(255, 192, 203, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    var tipoSocio = {
        labels: ['Pleno', 'Simple', 'Aderente'],
        datasets: [
            {
                label: 'Popularidad en Navidad',
                data: [35, 20, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    var tipoSocio = {
        labels: ['Pleno', 'Simple', 'Aderente'],
        datasets: [
            {
                label: 'Popularidad en Navidad',
                data: [35, 20, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };







    

    return (<div className="estadisticas">

      


        <div className="grafico">
            <h5 className="titulo"><b>prgogres bar</b></h5>
            {sinDuplicados.map(item => (
                <>
                    <p>{item.año}</p>
                    <p color="white">{item.año}</p><Progress value={item.cantidad} size='xs' colorScheme='blue' margin={"6px"} />
                </>

            ))}

            <h5 className="titulo"><b>Edad</b></h5>
            <Pie data={data} options={options} />
        </div>
        <div className="grafico">
            <h5 className="titulo"><b>Genero</b></h5>
            <Pie data={genero} options={options} />
        </div>
        <div className="grafico">
            <h5 className="titulo"><b>Tipo Socio</b></h5>
            <Pie data={tipoSocio} options={options} />
        </div>
        <div className="grafico">
            <h5 className="titulo"><b>Socio por año</b></h5>
            <Pie data={tipoSocio} options={options} />
        </div>
    </div>
    );
}
export default Estadisticas;