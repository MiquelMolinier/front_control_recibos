import React, { Component } from 'react';
class Distritos extends Component {
    render(){
       let  distrito=this.props.distrito;
       let id=this.props.id;
       
       
        return(
            <option value={id}>{distrito}</option>


        )
    }
}
export default Distritos;