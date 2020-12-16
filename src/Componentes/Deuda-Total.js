import React from 'react'

class DeudaTotal extends React.Component {
  
     render() {
      let tipoMoneda= this.props.tipoMoneda;
    let simboloMoneda = (tipoMoneda == "108") ? 'S/.' : '$' ;
      return(
        <div className="col">
          <b className="importe"  text-align= "center">DEUDA TOTAL: {simboloMoneda}{ this.props.deuda}</b>
        </div>
      )
    }   
}
export default DeudaTotal;
