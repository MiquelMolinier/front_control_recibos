import React from 'react';
import SelectNuevo2 from './SelectNuevo2';

class PagoRowNuevo2 extends React.Component {
  constructor(props) {
    super(props);
    this.OpcionSeleccionada= this.OpcionSeleccionada.bind(this);
    this.state = { };
  }
  OpcionSeleccionada(opcion,mantener) {
    
      if(opcion != null){   
        var opcionSeleccionada = this.props.pago.alumnoPrograma[opcion];

        var listadoRec = { 
          "idAlumno" : this.props.pago.idAlum,
          "codAlumno" :opcionSeleccionada.codAlumno,
          "idPrograma":opcionSeleccionada.idPrograma
          }
        }
        this.props.Opcion(listadoRec,mantener);
     
  }
  render() {
    return(
    <tr>
      <td className="td1">{this.props.pago.apeNom}</td>
      <td className="td1">{this.props.pago.concepto}</td>
      <td className="td1">{this.props.pago.numero}</td>
      <td className="td1">{this.props.pago.moneda}</td>
      <td className="td1">{this.props.pago.importe}</td>
      <td className="td1">{this.props.pago.fecha}</td>
      <td className="td1"><SelectNuevo2 Opcion={this.OpcionSeleccionada} nombre={this.props.pago.apeNom} listado = {this.props.pago.codigos}/></td>
	</tr>
    )
  }
}

export default PagoRowNuevo2;