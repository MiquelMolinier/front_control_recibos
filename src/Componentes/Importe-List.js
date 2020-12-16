import React from 'react'
import ImporteRow from './Importe-Row'
import CONFIG from '../Configuracion/Config'
class ImporteList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      concepto:[],
      datos:[]
    }
  }



  render() { 
    console.log("CONCEPTOS XD");
    console.log(this.state.concepto)
    console.log("listas");
    console.log(this.state.datos)
    return (
      
      <React.Fragment>
          {
            this.props.listado.map((pago,key) => {
              return <ImporteRow Funciones={this.props.funcion} key={pago.idRec} numero={key}
                                  pago={pago} conceptos={this.props.conceptos} datos={this.props.datos}
                                  datosmonedas={this.props.datosMonedas} monedas={this.props.monedas}
                                   ubicaciones={this.props.ubicaciones}  cuentas={this.props.cuentas} configuraciones={this.props.configuraciones}/>
            })
          }
      </React.Fragment>
        
    )
  }
}

export default ImporteList