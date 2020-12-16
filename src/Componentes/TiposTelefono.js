import React, { Component } from 'react';
class TiposTelefono extends Component{
    render(){
        let id=this.props.id;
        let tipoTelefono=this.props.tipotelefono_desc;
        return(
            <option value={id}>{tipoTelefono}</option>
        )
    }
}
export default TiposTelefono;
