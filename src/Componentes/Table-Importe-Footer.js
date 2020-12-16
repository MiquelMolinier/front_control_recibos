import React from 'react'
import '../App.css';
class TableImporteFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deuda: this.props.total-1000
        }
        
    }


    

  render() {
    let tipoMoneda= this.props.tipoMoneda;
    let simboloMoneda = (tipoMoneda == "108") ? 'S/.' : '$' ;
    let deuda= this.props.costo-this.props.total
    return(

			
      <React.Fragment>
      
          <tr>      
            
            <th className="thVacio"></th>
            <th className="thVacio"></th>
            <th className="thVacio"></th>
            <th className="thVacio"></th>
            <th className="th">TOTAL</th>
            <th className="inputImporte">{simboloMoneda} {this.props.total}</th>
            <th className="thVacio"></th>
            
          </tr>
          <tr>      
            
            <th className="thVacio"></th>
            <th className="thVacio"></th>
            <th className="thVacio"></th>
            <th className="thVacio"></th>
            <th className="th">DEUDA ACTUAL</th>
            <th className="inputDeuda">{simboloMoneda} {(this.props.costo-this.props.total).toFixed(2)}</th>
            <th className="thVacio"></th>
            
          </tr>
      </React.Fragment>
    )
  }
}

export default TableImporteFooter