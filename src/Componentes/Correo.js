import React, { Component } from 'react';

class Correo extends Component{

    
    borrarCorreo = e=>{
        e.preventDefault();
        this.props.eleccionBorrarCorreoElectronico(this.props.correo);
        
    }
     notification = numero =>  {
        switch(numero) {
          case 1:
            return "Correo Personal"
          case 2:
            return "Correo Laboral" ;
          case 3:
            return "Correo Institucional";
          default:
            return null;
        }
      }

    render(){
        let correo=this.props.correo;
        let tipo=this.props.tipo;
        let nombreTipo=this.notification(parseInt(tipo));
        
        return(
            <tr> 
                <td className="td">{nombreTipo}</td>
                <td className="td">{correo}</td>
                <td className="td">
                <button onClick={this.borrarCorreo} type="button" className="bg-white">
                    <i className="far fa-trash-alt fa-2x"></i>
                  </button>  
                </td>
            </tr>
        )
    }
}
export default Correo;