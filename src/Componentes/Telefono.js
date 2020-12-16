import React, { Component } from 'react';

class Telefono extends Component{

    borrarTelefono = e=>{
        e.preventDefault();
        this.props.eleccionBorrarTelefono(this.props.numero);
        
    }
    notification = numero =>  {
        switch(numero) {
          case 1:
            return "Celular Personal"
          case 2:
            return "Celular Laboral" ;
          case 3:
            return "Fijo Laboral";
          case 4:
            return "Fijo Hogar";
          default:
            return "entro a null";
        }
      }


    render(){
        let numero=this.props.numero;
        let tipo=this.props.tipo;
        let nombreTipo=this.notification(parseInt(tipo));
        return(
            <tr> 
                <td className="td">{nombreTipo}</td>
                <td className="td">{numero}</td>
                <td className="td">
                <button onClick={this.borrarTelefono} type="button" className="bg-white">
                    <i className="far fa-trash-alt fa-2x"></i>
                  </button>  
                </td>
            </tr>
        )
    }
}
export default Telefono;