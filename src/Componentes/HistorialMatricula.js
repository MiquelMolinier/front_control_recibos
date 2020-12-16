import React from "react";
import "../App.css";
import CONFIG from "../Configuracion/Config";
class HistorialMatricula extends React.Component {
  constructor() {
    super();
    this.state = {
      semestre: [],
      list: [],
      totalCreditos: 0,
    };
  }

  componentWillMount() {
    fetch(CONFIG + "/matricula/listar-historial/" + this.props.codigo)
      .then((resp) => {
        return resp.json();
      })
      .then((list) => {
        this.setState({
          list: list,
        });
        this.TotalCreditos();
      });
  }

  TotalCreditos() {
    let list = this.state.list;
    let suma = 0;
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        const element = list[key];
        suma += element.numeroCreditos;
      }
    }
    this.setState({
      totalCreditos: suma,
    });
  }

  render() {
    return (
      <div>
        <table className="tableScroll">
          <thead>
            <tr>
              <th className="th">N°</th>
              <th className="th">SEMESTRE</th>
              <th className="th">PLAN</th>
              <th className="th">CICLO</th>
              <th className="th">CÓDIGO</th>
              <th className="th">NOMBRE DE LA ASIGNATURA</th>
              <th className="th">TIPO</th>
              <th className="th">CRÉDITOS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((data, key) => (
              <tr key={key}>
                <td className="td">{key + 1}</td>
                <td className="td">{data.codigoSemestre}</td>
                <td className="td">{data.planEstudio}</td>
                <td className="td">{data.ciclo}</td>
                <td className="td">{data.codigoAsignatura}</td>
                <td className="td">{data.nombreCurso}</td>
                <td className="td">{data.tipoCurso}</td>
                <td className="td">{data.numeroCreditos}</td>
              </tr>
            ))}
            <tr>
              <td className="td thVacio"></td>
              <td className="td thVacio"></td>
              <td className="td thVacio"></td>
              <td className="td thVacio"></td>
              <td className="td thVacio"></td>
              <td className="td thVacio"></td>
              <td className="td">
                <strong>Total de Créditos: </strong>
              </td>
              <td className="td">
                <strong>{this.state.totalCreditos}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HistorialMatricula;
