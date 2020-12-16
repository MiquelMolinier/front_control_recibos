import React from 'react'
import CodigoList from './codigo-list'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';

//importar alumnoglobal

class VistaIntermediaLoginAlumno extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:this.props.params.name,
            cod:this.props.params.cod,
            alumnos:[]
        }
        this.Regresar=this.Regresar.bind(this);
    }


    componentWillMount() {

    fetch(CONFIG+'/recaudaciones/alumno/concepto/listar_codigoslog/'+ this.state.name + "/" + this.state.cod)
    .then((response)=>{
        return response.json()
    })
    .then((alumno)=>{
        console.log("alumnosxd");
            console.log(alumno);
        this.setState({alumnos:alumno})
        //guardar data en el store global
    })
    .catch(error=>{
        console.error(error)

    });

    
}

render() {
    return (
      <div className="">
            <h3>Selección de codigo
            <ul id="nav-mobile" className="right  hide-on-med-and-down">
            <li ><a className="seleccionar" onClick={this.Regresar} >Salir<i className="material-icons right">reply</i></a></li>
        </ul>
            </h3>
          
        <hr />

      <div className="row center-xs centrar">
          <div className="center-xs-12 margin_top ">
              <CodigoList lista={this.state.alumnos} />
          </div>
      </div>
        <footer>
          <div className="row center-xs centrar color">
          Proyecto SIGAP © 2019 v.1.4
          </div>
          </footer>

      </div>
    )
  }

    Regresar=(e)=>{
    //cambiar estado de alumnos a vacio
    browserHistory.push('/');
    e.preventDefault();

    }


}



export default VistaIntermediaLoginAlumno