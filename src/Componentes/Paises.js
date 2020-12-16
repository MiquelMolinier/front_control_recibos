import React, { Component } from 'react';
class Paises extends Component{

    render(){
        let pais=this.props.pais;
        return(
        <option>{pais}</option>
        )
    }

}
export default Paises;