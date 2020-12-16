import React,{Component} from 'react';

class ListaCuentasPorCobrar extends Component{

    

   render(){
    let listaCuenXCob=this.props.listaCuentasPorCobrar;
    return(
        <table>
            <thead>
                <tr>
                    <th>Cod Alumno</th>
                    <th>Ape. Paterno</th>
                    <th>Ape. Materno</th>
                    <th>Nom. alumno</th>
                    <th>Sigla Programa</th>
                    <th>cod perm</th>
                    <th>Max. años de estudio</th>
                    <th>Beneficio Otorgado</th>
                    <th>Autorizacion</th>
                    <th>Moneda</th>
                    <th>N. Prioridad</th>
                    <th>concepto</th>
                    <th>Descrip. minima</th>
                    <th>Importe por Pagar</th>
                    <th>Importe Pagado</th>
                    <th>Deuda</th>
                    <th>estado</th>
                </tr>
            </thead>
            <tbody>
                {listaCuenXCob.map((row,key)=>(
                    <tr key={key}>
                        <td>{row.cod_alumno}</td>
                        <td>{row.ape_paterno}</td>
                        <td>{row.ape_materno}</td>
                        <td>{row.nom_alumno}</td>
                        <td>{row.sigla_programa}</td>
                        <td>{row.cod_perm}</td>
                        <td>{row.max_anio_estudio}</td>
                        <td>{row.beneficio_otorgado}</td>
                        <td>{row.autorizacion}</td>
                        <td>{row.moneda}</td>
                        <td>{row.n_prioridad}</td>
                        <td>{row.concepto}</td>
                        <td>{row.descripcion_min}</td>
                        <td>{row.importe_xpagar}</td>
                        <td>{row.importe_pagado}</td>
                        <td>{row.deuda}</td>
                        <td>{row.estado}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
   }
    
}
export default ListaCuentasPorCobrar;
