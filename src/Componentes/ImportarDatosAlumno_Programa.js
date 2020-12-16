import React, { Component } from "react";
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";

class ImportarDatosAlumno_programa extends Component {
  gradoObtenido = React.createRef();
  nombreTitulo = React.createRef();
  centroEstudios = React.createRef();
  facultad = React.createRef();
  fechaInicio = React.createRef();
  fechaFin = React.createRef();
  checkboxVerificacion = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      codigo: this.props.params.codigo,
      dni: "",
      programa: [],
      listaFormacion:[]
    };
    console.log(this.state.codigo);
  }

  componentWillMount() {
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
         console.log("La lista de formacion es: ",listaFormacion);
         console.log(typeof listaFormacion);
         this.setState({
           listaFormacion:listaFormacion
         })
         
         return fetch(
          CONFIG + "/mse/alumno/conProgramaPorCodigo/" + this.state.dni
        );
      })
      .then(response => {
        return response.json();
      })
      .then(progs => {
        console.log("estos son los cursos ->>>>>>", progs);
        this.setState({
          programa: progs
        });

        let programa=this.state.programa[0];
         this.state.listaFormacion.forEach(elemento=>{
           if(elemento.id_programa===programa.id_programa){
             this.setState({
               programa: []
             })
           }
           
         })
       })
       .catch(error=>{
         console.log("Hubo un error",error);
       })



  }

  render() {
      let programas=this.state.programa;
      console.log(programas);
    return (
      <form onSubmit={this.formacionSanMarcos}>
        <div className="container bg-white text-primary">
          <h1 className="w-100 text-center"> Formacion Academica</h1>
          <hr />
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Codigo Alumno</th>
                <th scope="col">Sigla del programa</th>
                <th scope="col">Nombre del Programa</th>
                <th scope="col">Anio de Ingreso</th>
                <th scope="col">Anio de Egreso</th>
                <th scope="col">Marcar</th>
              </tr>
            </thead>
            <tbody>
              
                {Object.keys(programas).map(programa=>(
    
                  <tr key={programa}>
                        <td>{parseInt(programa)+1} </td>   
                        <td>{programas[programa].codAlumno}</td>   
                        <td>{programas[programa].siglaPrograma}</td>   
                        <td>{programas[programa].nomPrograma}</td>   
                        <td>{programas[programa].anioIngreso}</td>   
                        <td>{programas[programa].anioEgreso}</td>   
                        <td>
                            <div className="custom-control custom-checkbox">
                                
                                <input ref={this.checkboxVerificacion} type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1"> Marcar</label>
                            </div>
                        </td>   
                  </tr>
                ))}
              
              
            </tbody>
          </table>

          <div className="container bg-white text-center">
            <button type="submit" className="btn btn-primary mr-2">
              Registrar
            </button>
            <button
              onClick={this.cerrarVentana}
              type="button"
              className="btn btn-warning ml-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      </form>
    );
  }

  cerrarVentana = e => {
    e.preventDefault();
    window.close();
  };
  formacionSanMarcos = e => {
    e.preventDefault();
    console.log(
      "Funciona el boton Que funciona  para importar de  la tabla alumno_programa"
    );
    let programa=this.state.programa[0];
    console.log(programa);
    if(this.checkboxVerificacion.current.checked){
        //Se debe enviar toda la inforamcion para que se almacene en la tabla formacion
        

        fetch(CONFIG + "mse/persona/guardarFormacion/", {
            method: "POST",
            body: JSON.stringify({
              persona_id: this.state.id,
              id_programa:programa.id_programa,
              nivel_id:1,
              formacion_calumno: this.state.codigo,
              modalidad:0
            //   formacion_fingreso:programa.anioIngreso

            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            swal("Importado Correctamente", "", "success");
            
          })
          .catch(error => {
            swal("No se importo Correctamente", "", "warning");
            console.log(error);
          });
    }else{
        //no se hace nada
        console.log("No se hizo nada")
    }
    
  };
}
export default ImportarDatosAlumno_programa;
