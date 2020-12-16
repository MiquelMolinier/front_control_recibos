import React from "react";
import Select from "react-select";
// import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import CONFIG from "../Configuracion/Config";
import Paises from './Paises';
import {browserHistory} from 'react-router-3';
import swal from "sweetalert";

class VistaRegistroEgresados extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codigo: this.props.codigo,
      dni: this.props.dni,
      id:0,
      programas: [],
      paises:[],
      listaFormacion:[]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {

     setInterval(()=>{
       
      fetch(CONFIG + "mse/persona/buscar/" + this.state.codigo)
      .then(response => {
        return response.json();
      })
      .then(persona => {
        this.setState({
          id: persona.id,
          dni: persona.dni
        });

        return fetch(CONFIG+"mse/persona/listaFormacion/"+this.state.id);
      })
       .then(respuesta=>{
         return respuesta.json();
       }) 
       .then(listaFormacion=>{
          console.log(listaFormacion);
         this.setState({
           listaFormacion:listaFormacion
         })
       })
       .catch(error=>{
         console.log("Hubo un error",error);
       })


     },1000);

    
     

  }


  handleChange = selectedOption => {
    this.setState({
      value: selectedOption,
      programaValue: selectedOption.value
    });
  };

  


  render() {
    let listaFormacion=this.state.listaFormacion;
    // console.log(listaFormacion);
    return (
      <div className="contenedor">
        <h1>Formacion Academica</h1>
        <hr></hr>
        <div className="container">
          <div className="row">
            <div className="col col-md-6 text-center">
              <button type="button" onClick={this.importarDatosDesdeAlumnoPrograma} className="btn btn-primary">Importar Grados y Titulos</button>            
           </div>
            <div className="col col-md-6 text-center">
              <button onClick={this.agregarDatosDeSanMarcos} type="button" className="btn btn-secondary ">Agregar Datos de San Marcos </button>
            </div>

            <br></br>
            <br></br>
            
            <div className="col col-md-12 text-center">
              <button onClick={this.agregarDatosDeOtraInstitucion} type="button" className="btn btn-success">Agregar Datos de otra institucion  </button>
            </div>

          </div>
          
          
        </div>
        
          

        <table className="table ">
          <thead className="thead thead-dark">
            <tr>
              <th>Codigo</th>
              <th>Centro de estudios</th>
              <th>Titulo</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(listaFormacion).map(formacion=>(
              <tr key={formacion}>
                  <td scope="row">{listaFormacion[formacion].codigoPersona}</td>
                  <td>{listaFormacion[formacion].institucion_desc}</td>
                  <td>{listaFormacion[formacion].nombrePrograma}</td>
                  <td>{listaFormacion[formacion].formacion_fingreso}</td>
                  <td>{listaFormacion[formacion].formacion_fegreso}</td>
                  <td>
                    <button onClick={()=>{this.eleccionBorrarRegistro(listaFormacion[formacion].formacion_id)}}  type="button" className="bg-white" >
                    <i className="far fa-trash-alt fa-2x"></i>
                  </button>  
                  </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  //Metodos

  importarDatosDesdeAlumnoPrograma=e=>{
  
    let urlActual=window.location.href;
    let urlAgregarDatosFormacionAcademica=urlActual+'/importarDatosAlumno_programa/'+this.state.codigo;  
    javascript:window.open(urlAgregarDatosFormacionAcademica,'','width=1200px,height=400px,left=100,top=100,toolbar=yes');
    e.preventDefault();
  }

  agregarDatosDeSanMarcos=e=>{
  
    let urlActual=window.location.href;
    let urlAgregarDatosFormacionAcademica=urlActual+'/agregarDatosFormacionAcademicaSanMarcos/'+this.state.codigo;  
    javascript:window.open(urlAgregarDatosFormacionAcademica,'','width=1200px,height=400px,left=100,top=100,toolbar=yes');
    e.preventDefault();
  }

  agregarDatosDeOtraInstitucion=e=>{
  
    let urlActual=window.location.href;
    let urlAgregarDatosFormacionAcademica=urlActual+'/agregarDatosFormacionAcademica/'+this.state.codigo;
    console.log(urlAgregarDatosFormacionAcademica);
      
    javascript:window.open(urlAgregarDatosFormacionAcademica,'','width=1200px,height=400px,left=100,top=100,toolbar=yes');
    e.preventDefault();
  }
  
  borrarRegistro=(formacion_id)=>{
    
  
    console.log("Se ha borrado el registro",formacion_id);
    const formacionesActuales= [...this.state.listaFormacion];
    
    //borrar el elemento del state
    const formaciones= formacionesActuales.filter(formacion=>formacion.formacion_id!== formacion_id);
    console.log("Los programas restantes son:",formaciones)
    //actualizar el state
    this.setState({
      listaFormacion:formaciones
    })
    //Eliminamos el correo de la base de datos
    fetch(CONFIG + "mse/persona/eliminarFormacion/"+formacion_id,{
      method: "DELETE",
      body: JSON.stringify({
          id:formacion_id
      }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    })
    .catch(error=>{
      console.log(error);
    })
}
  

  eleccionBorrarRegistro=registro=>{
    
    swal({
      title: "¿Estas seguro?",
      text: "Este registro ya no podra ser recuperado?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    })
    .then(willDelete => {
      if (willDelete) {
        this.borrarRegistro(registro);
        swal("Eliminado!", "Tu registro ha sidoo eliminado!", "success");
      }
    });
  }

  



}

export default VistaRegistroEgresados;
