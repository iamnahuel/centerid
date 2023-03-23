import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Context/Context";
import logos from "../images/logos-ticket.png";
import encabezado from "../images/encabezadoTicket.png"



import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const PdfModal = (props) => {

    return (
        <Document>
            <Page
                size="A5"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",

                }}
            >
                <View
                    style={{
                        // display: "flex",
                        //flexDirection: "column",
                        // justifyContent: "center",
                        // alignItems: "center",
                        backgroundColor: "white",
                        padding: 10,
                        border: "1px",
                        borderColor: "#848688",

                    }}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image
                            src={encabezado}
                            alt="random image"
                            style={{
                                maxWidth: "70", maxHeight: "41", marginBottom: 10
                            }}
                        />

                    </View>

                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Socio</Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Mombre: {props.props.nombre}</Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic", marginBottom: 10 }}>DNI: {props.props.dni}</Text>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000000",
                        maxWidth: "130",
                        maxHeight: "6", marginBottom: 10
                    }}>

                    </View>


                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Detalle</Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Tipo socio: {props.props.tsocio}</Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Cuota N°: {props.props.ncuota}</Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Año: {props.props.año} </Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic", marginBottom: 10 }}>Estado: {props.props.pagado} </Text>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000000",
                        maxWidth: "130",
                        maxHeight: "10", marginBottom: 10
                    }}>

                    </View>

                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Pago</Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Monto: ${props.props.monto} </Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic" }}>Intereses: ${props.props.intereses} </Text>
                    <Text style={{ color: "#373435", fontSize: "8px", fontStyle: "italic", marginBottom: 10 }}>Monto total: ${props.props.montoFinal} </Text>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000000",
                        maxWidth: "130",
                        maxHeight: "10", marginBottom: 10
                    }}>

                    </View>

                    <View style={{
                        color: "#848688", fontSize: "6px", fontStyle: "italic", marginBottom: 6
                    }}>
                        <Text>Fecha: </Text>
                        <Text style={{ marginBottom: 3 }}>10/01/2022</Text>
                        <Text>Cobrador:</Text>
                        <Text style={{ marginBottom: 3 }}>{props.props.cobrador}</Text>
                        <Text>ID transaccion:</Text>
                        <Text>{props.props.id}</Text>

                    </View>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{ color: "#848688", fontSize: "6px", fontStyle: "italic", marginBottom: 6 }}>Gracias por su colaboración</Text>
                        <Text style={{ color: "#848688", fontSize: "6px", fontStyle: "italic", marginBottom: 10 }}>Diego B. Moron 278 | Rolón - La Pampa</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image
                            src={logos}
                            alt="random image"
                            style={{
                                maxWidth: "50", maxHeight: "20", marginBottom: 5
                            }}
                        />
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PdfModal