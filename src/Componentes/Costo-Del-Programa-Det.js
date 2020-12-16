import React from "react";
import "../App.css";
class CostoDelProgramaDet extends React.Component {
  render() {
    return (
      <div>
        {/* <h6 align="center" className="Alumno">
          <b>Costo Detalle del Programa:</b>
        </h6> */}

        <table className="tableScroll">
          <thead>
            <tr>
              <th className="th">N°</th>
              <th className="th">CICLO</th>
              <th className="th">CONCEPTO</th>
              <th className="th">DESCR. MIN</th>
              <th className="th">MONEDA</th>
              <th className="th">IMPORTE</th>
            </tr>
          </thead>
          <tbody>
            {this.props.costoxciclo.map((data, key) => (
              <tr key={key}>
                <td className="td">{key + 1}</td>
                <td className="td">{data.ciclo}</td>
                <td className="td">{data.concepto}</td>
                <td className="td">{data.descripcion_min}</td>
                <td className="td">{data.moneda}</td>
                <td className="td">{data.importe}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*<h6 align="center" className="Alumno"><b>Datos del Beneficio:</b></h6>
      
      <table>
      <tr>      
        
        <th className="th">BENEFICIO</th>
        <th className="th">AUTORIZACIÓN</th>
        <th className="th">CONDICIÓN</th>
        <th className="th">FECHA</th>
        <th className="th">RESOLUCIÓN</th>
        
      </tr>

        
      {this.props.datosPrograma.map((data)=>
        <tr>
            <td className="td">{data.benef_otrogado}%</td>
            <td className="td">{data.autorizacion}</td>
            <td className="td">{data.condicion}</td>
            <td className="td">{data.fecha}</td>
            <td className="td">{data.resolucion}</td>
        </tr>
      )}
      </table>*/}
      </div>
    );
  }
}

export default CostoDelProgramaDet;
