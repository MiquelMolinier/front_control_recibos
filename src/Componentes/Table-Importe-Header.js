import React from "react";
import "../App.css";
class TableImporteHeader extends React.Component {
  editarCosto() {}
  render() {
    return (
      <tr>
        <th className="th">CICLO</th>
        <th className="th">CONCEPTO</th>
        <th className="th">N° RECIBO</th>
        <th className="th">FECHA</th>
        <th className="th">MONEDA</th>
        <th className="th">AMORTIZACIÓN</th>
        <th className="th">VALIDADO</th>
      </tr>
    );
  }
}

export default TableImporteHeader;
