// JavaScript source code
import React from 'react'
import Select from 'react-select'
import AR_tableHeaderCobranza from './AR_TableHeaderCobranza';

class AR_Cobranza extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            objObservacion: this.props.listObservacion,
        }
    }

    render() {
        return (
            <div>
                <table className="table">
                    <AR_tableHeaderCobranza />
                    <tbody>
                        {
                            this.props.listObservacion.map((recaudaciones, key) => {
                                return (
                                    <tr>
                                        <td className="td1">{key + 1}</td>
                                        <td className="td1">{recaudaciones.cod_alumno}</td>
                                        <td className="td1">{recaudaciones.ape_paterno}</td>
                                        <td className="td1">{recaudaciones.ape_materno}</td>
                                        <td className="td1">{recaudaciones.nom_alumno}</td>
                                        <td className="td1">{recaudaciones.sigla_programa}</td>
                                        <td className="td1">{recaudaciones.max_anio_estudio}</td>
                                        <td className="td1">{recaudaciones.beneficio_otorgado}</td>
                                        <td className="td1">{recaudaciones.autorizacion}</td>
                                        <td className="td1">{recaudaciones.moneda}</td>
                                        <td className="td1">{recaudaciones.n_prioridad}</td>
                                        <td className="td1">{recaudaciones.concepto}</td>
                                        <td className="td1">{recaudaciones.descripcion_min}</td>
                                        <td className="td1">{recaudaciones.importe_pagado}</td>
                                        <td className="td1">{recaudaciones.deuda}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}
export default AR_Cobranza
