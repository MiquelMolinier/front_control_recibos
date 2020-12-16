import React, { Component } from 'react';
class TiposCorreo extends Component{
    render(){
        let id=this.props.id;
        let correo=this.props.correo;
        return(
            <option value={id}>{correo}</option>
        )
    }

}
export default TiposCorreo;