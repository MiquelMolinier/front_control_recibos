import React from 'react'
import '../App.css';
class TableHeader extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
        <th className="th">SELECT</th>
        <th className="th">N°</th>
        <th className="th">CICLO</th>
        <th className="th ancho">CONCEPTO</th>
        <th className="th">Nº RECIBO</th>
        <th className="th">FECHA</th>
        <th className="th ancho">MONEDA</th>
        <th className="th">IMPORTE</th>
        <th className="th ancho" id = "tipo_recaudacion_header" style={{display: 'none'}}>TIPO RECAUDACION</th>
        <th className="th" id = "banco_header" style={{display: 'none'}}>CTA BANCO</th>
        <th className="th ancho" id = "ubicacion_header" style={{display: 'none'}}>UBICACION</th>
        <th className="th" id = "validar_header">VALIDAR</th>
        <th className="th" id = "search_header">OBS.UPG</th>
        <th className="th" id = "show_header_EC">OBS.EC</th>
        <th className="th" id = "edit_header">EDITAR</th>
        <th className="th" id = "save_header">GUARDAR</th>
        <th className="th">TIPO</th>
      </tr>
	</thead>
    )
  }
}

export default TableHeader