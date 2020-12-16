import React, { Component } from "react";
import Paises from "./Paises";
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";


class AgregarDatosFormacionAcademica extends Component {
  nivel = React.createRef();
  gradoObtenido = React.createRef();
  nombreTitulo = React.createRef();
  centroEstudios = React.createRef();
  pais = React.createRef();
  facultad = React.createRef();
  fechaInicio = React.createRef();
  fechaFin = React.createRef();
  tipoInstitucion=React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      codigo:this.props.params.codigo ,
      id:0,
      dni:0,
      niveles: [],
      paises: [],
      tiposInstitucion: [],
      tipoGrado:[]

    };
    console.log(this.state.codigo);
  }

  state = {
    
  };

  componentWillMount() {
    fetch(
      "https://raw.githubusercontent.com/apilayer/restcountries/master/src/main/resources/countriesV1.json"
    )
      .then(response => {
        return response.json();
      })
      .then(paises => {
        let arrayPaises = [];
        console.log("Esta es la lista de los paises", paises);
        paises.forEach(pais => {
          arrayPaises.push(pais.name);
        });
        console.log("El arreglo de paises es  ->>>>>>", arrayPaises);
        this.setState({
          paises: arrayPaises
        });
      })
      .catch(error => {
        console.error(error);
      });

      console.log("****************************");
      fetch(CONFIG + "mse/persona/buscar/" + this.state.codigo)
      .then(response => {
        return response.json();
      })
      .then(persona => {
        this.setState({
          id: persona.id,
          dni: persona.dni
        })
      });  
      console.log("****************************");

    fetch(CONFIG + "mse/persona/listaNivel")
      .then(response => {
        console.log("Entro a la respuesta");
        return response.json();
      })
      .then(result => {
        console.log(result);
        console.log("aqui esta el resultado", result);
        this.setState({
          niveles: result
        });
      })
      .catch(error => {
        console.error(error);
      });

    console.log("****************************");

    fetch(CONFIG + "/mse/persona/listarInstitucion/")
      .then(response => {
        return response.json();
      })
      .then(tipoInstitucion => {
        this.setState({
          tiposInstitucion: tipoInstitucion
        });
        console.log(
          "estos son los tipos de institucion ->>>>>>->>>>>>->>>>>>",
          tipoInstitucion
        );
      })
      .catch(error => {
        console.error(error);
      });

      fetch(CONFIG + "/mse/programa/listarTipoGrado/")
      .then(response => {
        return response.json();
      })
      .then(tipoGrado => {
        this.setState({
          tipoGrado: tipoGrado
        });
        console.log(
          "estos son los tipos de grado ->>>>>>->>>>>>->>>>>>",
          tipoGrado
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    let paises = this.state.paises;
    let niveles = this.state.niveles;
    let tiposInstitucion = this.state.tiposInstitucion;
    let tipoGrado=this.state.tipoGrado;
    console.log(
      "Los tipos de institucion dentro del render son :>>>>>",
      tiposInstitucion
    );
    return (
      <form onSubmit={this.formacionAcademica}>
        <div className="container bg-white text-primary">
          <div className="row">
            <h1 className="w-100 text-center"> Formacion Academica Externa </h1>
            <hr />
            <br />
            <br />
            <div className="col col-md-6">
              <div className="container bg-white mt-2">
                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Nivel</label>

                    <select
                      className="form-control col col-md-8"
                      ref={this.nivel}
                      name=""
                      id=""
                      onChange={this.cambioNivel}
                    >
                      <option value="null">--Seleccione--</option>
                      {Object.keys(niveles).map(nivel => (
                        <option key={nivel} value={niveles[nivel].nivel_id}>
                          {niveles[nivel].nivel_desc}
                        </option>
                        //    <option>{nivel}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Grado obtenido</label>
                    <select
                      className="form-control col col-md-8"
                      ref={this.gradoObtenido}
                      name=""
                      id=""
                    >
                      <option>--Seleccione--</option>
                      {Object.keys(tipoGrado).map(tipo=>(
                      <option key={tipo} value={tipoGrado[tipo].id}>{tipoGrado[tipo].nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Nombre Titulo o Programa</label>
                    <input
                      type="text"
                      className="form-control col col-md-8"
                      ref={this.nombreTitulo}
                      placeholder="ingrese el nombre del titulo"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Tipo de institucion</label>

                    <select className="form-control col col-md-8" name="" id="" ref={this.tipoInstitucion}>
                      <option value="null">--Seleccione--</option>
                      {Object.keys(tiposInstitucion).map(tipo => (
                        <option key={tipo} value={tiposInstitucion[tipo].id}>
                          {tiposInstitucion[tipo].descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col col-md-4">Centro de estudios</label>
                  <input
                    type="text"
                    className="form-control col col-md-8"
                    ref={this.centroEstudios}
                    placeholder="ingrese el centro de estudios"
                  />
                </div>
                <br />
                <br />
                <br />

                <div className="form-group">
                  <label className="col col-md-4">Pais</label>
                  <select
                    className="form-control col col-md-8"
                    ref={this.pais}
                    name=""
                    id=""
                  >
                    <option>--Seleccione--</option>
                    {Object.keys(paises).map(pais => (
                      <Paises key={pais} pais={paises[pais]} />
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col col-md-6">
              <div className="container bg-white mt-2">
                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Facultad</label>
                    <input
                      type="text"
                      className="form-control col col-md-8"
                      ref={this.facultad}
                      placeholder="ingrese su facultad"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Fecha de inicio</label>
                    <input
                      type="date"
                      ref={this.fechaInicio}
                      className="form-control col col-md-8"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <label className="col col-md-4">Fecha de Fin</label>
                    <input
                      type="date"
                      ref={this.fechaFin}
                      className="form-control col col-md-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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

  formacionAcademica = e => {
    e.preventDefault();
    console.log("Se ha disparado la funcionAcademica");
    let timestamp = new Date().getUTCMilliseconds();
    console.log(timestamp)
    let infoDatos = {
      nivel:this.nivel.current.value,
      gradoObtenido: this.gradoObtenido.current.value,
      nombreTitulo: this.nombreTitulo.current.value,
      tipoInstitucion:this.tipoInstitucion.current.value,
      centroEstudios: this.centroEstudios.current.value,
      pais: this.pais.current.value,
      facultad: this.facultad.current.value,
      fechaInicio: this.fechaInicio.current.value,
      fechaFin: this.fechaFin.current.value
    };
    console.log(infoDatos);

    fetch(CONFIG + "mse/persona/guardarInstitucion/", {
        method: "POST",
        body: JSON.stringify({
            id:timestamp,
            idTipoInst:this.tipoInstitucion.current.value,
            instDesc: this.centroEstudios.current.value,
            
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }

       
      })
      .then(()=>{
        console.log("Ha entrado para guardar el programa");
        let palabra=this.nombreTitulo.current.value;
        let separador=" ";
        let arrayPalabras=palabra.toUpperCase().split(separador);
        console.log("El array de palabras es: ->",arrayPalabras);
        let sigla="";
        for(let i=0;i<arrayPalabras.length;i++){
           sigla+=arrayPalabras[i].charAt(0);
        }
        console.log("La sigla es: ",sigla);
      
        return fetch(CONFIG + "mse/programa/agregarPrograma/", {
          method: "POST",
          body: JSON.stringify({
              nombre:this.nombreTitulo.current.value,
              sigla:sigla,
              tipoGrado:this.gradoObtenido.current.value

              
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }

      })
    } )
      .then(()=>{
        console.log("Ingreso a la parte donde debo jalar el id dado por la base de datos");
        return fetch(CONFIG+"mse/programa/listarProgramas")
        
      })
      .then((result)=>{
        return result.json();
      })
      .then((resultado)=>{
          console.log("El resultado es: ",resultado);
          let nombre=this.nombreTitulo.current.value;
          let identificadorPrograma;
          resultado.forEach(element => {
            if(element.nombre===nombre){
                identificadorPrograma=element.id;
            }
          });

          console.log("Ha entrado a la parte del guardarFormacion");


          console.log(JSON.stringify({
            persona_id:this.state.id,
            nivel_id:this.nivel.current.value,
            id_programa:identificadorPrograma,
            formacion_calumno:this.state.codigo,
            formacion_fingreso:this.fechaInicio.current.value,
            formacion_fegreso:this.fechaFin.current.value ,
            modalidad:0,
            institucion_id:timestamp //aqui va el id de la universidad nacional mayor de san marcos
         } ) );

          
         return fetch(CONFIG+"mse/persona/guardarFormacion/",{
          method: "POST",
          body: JSON.stringify({
              persona_id:this.state.id,
              nivel_id:this.nivel.current.value,
              grado:this.gradoObtenido.current.value,
              id_programa:identificadorPrograma,
              formacion_calumno:this.state.codigo,
              formacion_fingreso:this.fechaInicio.current.value,
              formacion_fegreso:this.fechaFin.current.value ,
              modalidad:0,
              institucion_id:timestamp //aqui va el id de la universidad nacional mayor de san marcos
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    } )
    } )
      .then(()=>{
        swal("Guardado Correctamente", "", "success");
      })
      .catch(error => {
          swal("Algo salió mal", "", "warning");
          console.log(error);
      });
  }
  cambioNivel = e => {
    e.preventDefault();
    let nivel = this.nivel.current.value;
    var timestamp = new Date().getUTCMilliseconds();
    console.log(timestamp)

    switch (nivel) {
      case "1":
        console.log("Escogio el uno");
        this.gradoObtenido.current.disabled = false;
        break;
      case "2":
        console.log("escogio el 2");
        this.gradoObtenido.current.disabled = true;
        break;
      case "3":
        console.log("escogio el 3");
        this.gradoObtenido.current.disabled = true;
        break;
      case "4":
        console.log("escogio el 4");
        this.gradoObtenido.current.disabled = true;
        break;
      case "5":
        console.log("escogio el 5");
        this.gradoObtenido.current.disabled = true;
        break;
      default:
        return null;
    }
  };
}
export default AgregarDatosFormacionAcademica;
