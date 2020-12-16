import React from 'react'

class AR_tableHeaderCobranza extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return(
            <thead>
                <tr>
                    <th className="th">Nro</th>
                    <th className="th">cod_alumno</th>
                    <th className="th">ape_paterno</th>
                    <th className="th">ape_materno</th>
                    <th className="th">nom_alumno</th>                    
                    <th className="th">sigla_programa</th>                    
                    <th className="th">max_anio_estudio</th>                    
                    <th className="th">beneficio_otorgado</th>                    
                    <th className="th">autorizacion</th>                    
                    <th className="th">moneda</th>                    
                    <th className="th">n_prioridad</th>                    
                    <th className="th">concepto</th>                    
                    <th className="th">descripcion_min</th>                    
                    <th className="th">importe_pagado</th>                    
                    <th className="th">importe_xpagar</th>                    
                    <th className="th">deuda</th>                    
                </tr>
            </thead>
        )
    }

}
export default AR_tableHeaderCobranza