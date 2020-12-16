import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { browserHistory } from "react-router-3";
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";
import Swal from 'sweetalert2';
import Select from "react-select";
import { KeyObject } from "crypto";
import Distritos from "./Distritos";
import Telefono from "./Telefono";
import Correo from "./Correo";
import TiposTelefono from "./TiposTelefono";
import TiposCorreo from "./TiposCorreo";

class VistaDatosPersonales extends React.Component {

  
  numeroIdentificador=5;
  constructor(props) {
    super(props);


       this.botonEditarCampos = React.createRef();
       this.codigo = React.createRef();
       this.dni = React.createRef();
       this.apePaterno =React.createRef();
       this.apeMaterno = React.createRef();
       this.nombre =React.createRef();
       this.fechaNacimiento =React.createRef();
       this.botonTelefono=React.createRef();
       this.botonCorreo=React.createRef();

      //
      
    
      this.state = {
        codigo: this.props.codigo,
        dni: this.props.dni,
        id:0,
        apePaterno: "",
        apeMaterno: "",
        nombre: "",
        fechaNacimiento:"",
        domicilioActual: "",
        distrito: "",
        ubigeo: "",
        nTelefono:"",
        nTelefFijo: "",
        nTelefCelular: "",
        tipoTelefono:"",
        nombreCorreo:"",
        tipoCorreo:"",
        arrayCorreos:[],
        correoPersonal: "",
        correoLaboral: "",
        arrayDistritosLima: [],
        arrayTiposTelefono:[],
        arrayTelefonos:[],
        arrayTiposCorreo:[],
        estadoDomicilio: false,
        
      };
      
      
      

    // this.onSubmitDatosPersonales = this.onSubmitDatosPersonales.bind(this);
  }


  //RENDERIZADO INFINITO
  componentDidMount() {
    this.botonEditarCampos.current.disabled=true;
    this.botonTelefono.current.disabled=true;
    this.botonCorreo.current.disabled=true;

    fetch(CONFIG + "mse/persona/aperturaConcepto/"+this.numeroIdentificador)
    .then((response)=>{
      return response.json();
    })
    .then((respuesta)=>{
      console.log("La respuesta de la peticion get es: ",respuesta);
      
      
      let editarCampos=respuesta.estadoConcepto;
      console.log(editarCampos);
      
      if(editarCampos=="S"){
        console.log("entro a editar campos");
        
        this.botonEditarCampos.current.disabled=false;

      }else{
        console.log("No se podra editar campos");
        
      }
      

    })

    //buscar persona segun su codigo
    fetch(CONFIG + "mse/persona/buscar/" + this.state.codigo)
      .then(response => {
        return response.json();
      })
      .then(persona => {
        this.setState({
          id:persona.id,
          dni:persona.dni,
          apePaterno: persona.apellidoPaterno,
          apeMaterno: persona.apellidoMaterno,
          nombre: persona.nombres,
          fechaNacimiento: persona.fechaNac
        
        });

        return fetch(CONFIG + "mse/domicilio/buscar/" + this.state.id);
      })
      .then(response => {
        return response.json();
        })
      .then(alumnoDomicilio => {
        this.setState({
          domicilioActual: alumnoDomicilio.domicilio,
          ubigeo: alumnoDomicilio.ubigeo.trim(),
          estadoDomicilio: true
        });
        return fetch(CONFIG+"mse/telefono/telefonos/"+this.state.id);
      }) 
      .then(respuesta=>{
          return respuesta.json();
      })
      .then(telefonos=>{
          this.setState({
          arrayTelefonos:telefonos
        })
        return fetch(CONFIG+"mse/correo/correos/"+this.state.id);
      })  
      .then(respuesta=>{
        return respuesta.json();
      })
      .then(correos=>{
        this.setState({
          arrayCorreos:correos
        })
      })
      .catch(error => {
        swal("No se encontro algun dato", "", "warning");
        console.log(error);
      });
  
      //Buscar tipos de telefono ej: fijo-mobil
      fetch(CONFIG + "mse/telefono/tipotelefono/")
      .then(response => {
        return response.json();
      })
      .then(tipoTelefono => {
        this.setState({
          arrayTiposTelefono:tipoTelefono
        })
      
      })
      .catch(error => {
        swal("Algo salió mal con el tipo de telefono", "", "warning");
        console.log(error);
      });


      //Buscar tipos de correo
      fetch(CONFIG + "mse/correo/tipoCorreo/")
      .then(response => {
        return response.json();
      })
      .then(tipoCorreo => {
        this.setState({
          arrayTiposCorreo:tipoCorreo
        })
      })
      .catch(error => {
        swal("Algo salió mal con el tipo de correo", "", "warning");
        console.log(error);
      });
      //buscar ubigeo de la provincia de lima
      let urlApi =
      "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/master/json/ubigeo_peru_2016_distritos.json";
    fetch(urlApi)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(respuesta2 => {
        let distritosLima = this.buscarLima(respuesta2);
        if (distritosLima === null) {
        } else {
          this.setState({
            arrayDistritosLima: distritosLima
          });
        }
      });
  }

  //asignar  a un atributo del estado el valor del campo
  setField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  //agregar un nuevo telefono
  agregarTelefono=(e) =>{
    if(this.botonTelefono.current.disabled==true){
      console.log("No se hace nada");
      
    }else{

    
    e.preventDefault();
    let nuevoTelefono={
      idPersona:this.state.id,
      idTipoTelefono:this.state.tipoTelefono,
      numeroTelefonico:this.state.nTelefono
    }
     const arrayTelefonos= [...this.state.arrayTelefonos,nuevoTelefono];
     console.log("El arreglo de telefonos es:",arrayTelefonos);
     //asignamos el nuevo telefono a nuestro estado de telefonos
    this.setState({
      arrayTelefonos:arrayTelefonos
    })
    //Guardamos el nuevo telefono en la base de datos
    this.onSubmitGuardarTelefono(e);

    }
  }

  eleccionBorrarTelefono = (numeroTelefono) =>{
    swal({
      title: "¿Estas seguro?",
      text: "Este registro ya no podra ser recuperado?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    })
    .then(willDelete => {
      if (willDelete) {
        this.borrarTelefono(numeroTelefono);
        swal("Eliminado!", "Tu numero telefonico ha sidoo eliminado!", "success");
      }
    });
  }
  eleccionBorrarCorreoElectronico=(correoElectronico)=>{
    swal({
      title: "¿Estas seguro?",
      text: "Este registro ya no podra ser recuperado?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    })
    .then(willDelete => {
      if (willDelete) {
        this.borrarCorreo(correoElectronico);
        swal("Eliminado!", "Tu correo electronico ha sidoo eliminado!", "success");
      }
    });
  }
//Borramos el telefono de la base de datos
  borrarTelefono = numeroTelefono =>{
    
    const telefonosActuales= [...this.state.arrayTelefonos];
    //borrar el elemento del state
    const arrayTelefonos= telefonosActuales.filter(telefono=>telefono.numeroTelefonico!== numeroTelefono);
    //actualizar el state
    this.setState({
      arrayTelefonos
    })

    //Eliminamos el telefono de la base de datos
    fetch(CONFIG + "mse/telefono/eliminar/"+numeroTelefono,{
      method: "DELETE",
      body: JSON.stringify({
          id: numeroTelefono
      }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .catch((errorNumeroTelefono)=>{
    console.log(errorNumeroTelefono);
    
  })
} 
//Agregamos un nuevo correo al state y guardamos el correo en la base de datos
  agregarCorreo=(e)=>{
    if(this.botonCorreo.current.disabled==true){
      console.log("No se hace nada en el correo");
      
    }else{

    
    e.preventDefault();
    let nuevoCorreo={
      id:this.state.id,
      idTipoCorreo:this.state.tipoCorreo,
      correo:this.state.nombreCorreo
    } 
     const arrayCorreos= [...this.state.arrayCorreos,nuevoCorreo];
    this.setState({
      arrayCorreos
    })
    this.onSubmitGuardarCorreo(e);
  }
}

  //Borramos un correo del state y de la base de datos
    borrarCorreo = correoBorrar =>{
        //leer el state
    const correosActuales= [...this.state.arrayCorreos];
    
    //borrar el elemento del state
    const arrayCorreos= correosActuales.filter(correo=>correo.correo!== correoBorrar);
    //actualizar el state
    this.setState({
      arrayCorreos
    })
    //Eliminamos el correo de la base de datos
    fetch(CONFIG + "mse/correo/eliminar/",{
      method: "DELETE",
      body: JSON.stringify({
          correo: correoBorrar
      }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }

    }

  )
    .catch((error) => {
      swal("Ha ocurrido un error", "", "warning");
    })

} 


  render() {
    let distritosLima = this.state.arrayDistritosLima;
    let contenido;
    let arrayTelefonos=this.state.arrayTelefonos;
    let arrayCorreos=this.state.arrayCorreos;
    let arrayTiposTelefono=this.state.arrayTiposTelefono;
    let arrayTiposCorreo=this.state.arrayTiposCorreo;

    if (distritosLima) {
      contenido = (
        <div className="contenedor">
          <div className="">
            <h2 className="titulo">Datos Personales</h2>

            <div className="input-dato">
               <div className="card card-primary">
                <div className="ml-3 mr-3 bg-white">
                  <br></br>
                <div className="bg-light" >
                  <button type="button" className="btn btn-outline-danger" ref={this.botonEditarCampos} onClick={this.cambiarEstadoDatosPersonalesPrivados}  >
                    <i className="fa fa-edit fa-2x"></i>
                  </button> 

                </div>

                  <label className="label-dato">
                    N° DE DOCUMENTO DE IDENTIDAD (DNI O CARNE DE EXTRANJERÍA):
                    <input
                      ref={this.codigo}
                      type="text"
                      name="codigo"
                
                      value={this.state.codigo}
                      onChange={e => this.setField(e)}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    DNI
                    <input
                      ref={this.dni}
                      type="text"
                      name="dni"
                 
                      value={this.state.dni || ''}
                      onChange={e => this.setField(e)}
                       disabled
                    />
                  </label>
                  <label className="label-dato">
                    APELLIDO PATERNO:
                    <input
                      ref={this.apePaterno}
                      type="text"
                      name="apePaterno"
              
                      value={this.state.apePaterno}
                      onChange={e => this.setField(e)}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    APELLIDO MATERNO:
                    <input
                      ref={this.apeMaterno}
                      type="text"
                      name="apeMaterno"
                   
                      value={this.state.apeMaterno}
                      onChange={e => this.setField(e)}
                     disabled
                    />
                  </label>
                  <label className="label-dato">
                    NOMBRES:
                    <input
                      ref={this.nombre}
                      type="text"
                      name="nombre"
                   
                      value={this.state.nombre}
                      onChange={e => this.setField(e)}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    FECHA DE NACIMIENTO:
                    <input
                      ref={this.fechaNacimiento}
                      type="date"
                      name="fechaNacimiento"
                      value={this.state.fechaNacimiento || ''}
                      onChange={e => this.setField(e)}
                      disabled
                    />
                  </label>
                </div>
              </div>

               
              <div className="container bg-white card card-primary ">
                <div className="bg-light">
                  <button type="button" className="btn btn-outline-danger" onClick={this.cambioEstadoCampo}>
                    <i className="fa fa-edit fa-2x"></i>
                  </button>            
                </div>
                 
                <label className="label-dato">
                  DOMICILIO ACTUAL:
                  <input
                    type="text"
                    name="domicilioActual"
                    value={this.state.domicilioActual}
                    id="domicilioActual"
                    onChange={e => this.setField(e)}
                    required
                    disabled
                  />
                </label>
                <label className="label-dato">
                  DISTRITO:
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="ubigeo"
                      value={this.state.ubigeo}
                      id="ubigeo"
                      onChange={e => this.setField(e)}
                      disabled
                    >
                      <option>--Seleccione una opcion--</option>
                      {Object.keys(distritosLima).map(distrito => (
                        <Distritos
                          key={distrito}
                          id={distritosLima[distrito].id}
                          distrito={distritosLima[distrito].nombre}
                        />
                      ))}
                    </select>
                  </div>
                </label>
                <br></br>
                

                <label className="label-dato">TELEFONO</label>
                <div className="ml-3 mr-3">
                  <div className="form-group">
                    <div className="row">
                      <div className="col col-md-3">
                        <select className="form-control" name="tipoTelefono" value={this.state.tipoTelefono} id="tipoTelefono" onChange={e => this.setField(e)} disabled>
                          <option value="DEFAULT">--Escoja una opcion--</option>
                          {Object.keys(arrayTiposTelefono).map(telefono=>(
                            <TiposTelefono 
                            key={telefono}
                            id={arrayTiposTelefono[telefono].idTipoTelefono}
                            tipotelefono_desc={arrayTiposTelefono[telefono].tipoTelefono}
                            
                            />
                          ))}
                        </select>

                      </div>
                      <div className="col col-md-7">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control text-center"
                            name="nTelefono"
                            id="numeroTelefono"
                            aria-describedby="helpId"
                            placeholder="Inserte Numero"
                            onChange={e => this.setField(e)}
                           disabled/>
                        </div>
                      </div>
                      <div className="col col-md-2 text-center">
                        
                        <button className="bg-white" ref={this.botonTelefono} id="btnTelefono" onClick={this.agregarTelefono}>
                          <i className="fa fa-plus-circle fa-3x"></i>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
                

                <div className="ml-3 mr-3"> 
                        
                            <table className="table">
                              <thead className="thead thead-dark">
                                  <tr>
                                    <th className="th1">Tipo</th>
                                    <th className="th1">Numero</th>
                                    <th className="th1">Accion</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {Object.keys(arrayTelefonos).map(telefono=>(
                                  <Telefono 
                                  key={telefono}
                                  tipo={arrayTelefonos[telefono].idTipoTelefono}
                                  numero={arrayTelefonos[telefono].numeroTelefonico}
                                  eleccionBorrarTelefono={this.eleccionBorrarTelefono}
                                  />
                              ))}
                              </tbody>
                              </table>
                          
                </div>



                
                <label className="label-dato">CORREO ELECTRONICO</label>
                <div className="ml-3 mr-3">
                  <div className="form-group">
                    <div className="row">
                      <div className="col col-md-3">
                        <select className="form-control" id="tipoCorreo" name="tipoCorreo" value={this.state.tipoCorreo} id="tipoCorreo" onChange={e => this.setField(e)} disabled>
                          <option value="DEFAULT">--Escoja una opcion--</option>
                          {Object.keys(arrayTiposCorreo).map(correo=>(
                            <TiposCorreo 
                            key={correo}
                            id={arrayTiposCorreo[correo].id}
                            correo={arrayTiposCorreo[correo].tipoCorreo}
                            />
                          ))}
                        </select>
                      </div>
                      <div className="col col-md-7">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control text-center"
                            name="nombreCorreo"
                            id="nombreCorreo"
                            aria-describedby="helpId"
                            placeholder="Inserte correo"
                            onChange={e => this.setField(e)}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col col-md-2 text-center">
                        <button className="bg-white" ref={this.botonCorreo} onClick={this.agregarCorreo}>
                          <i className="fa fa-plus-circle fa-3x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-3 mr-3"> 
                            <table className="table">
                              <thead className="thead-dark">
                                  <tr>
                                    <th className="th1">Tipo</th>
                                    <th className="th1">Correo</th>
                                    <th className="th1">Accion</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {Object.keys(arrayCorreos).map(correo=>(
                                  <Correo 
                                  key={correo}
                                  tipo={arrayCorreos[correo].idTipoCorreo}
                                  correo={arrayCorreos[correo].correo}
                                  eleccionBorrarCorreoElectronico={this.eleccionBorrarCorreoElectronico}
                                  />
                              ))}
                              </tbody>
                              </table>
                </div>  
              </div>

              <div className="row">
                <div className="col col-md-6 col-lg-12 ">
                  <div className="text-right">
                    <input
                      type="submit"
                      value="Registrar"
                      className="btn btn-success right"
                      onClick={this.onSubmitDatosPersonales}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      contenido = <h1>Espere un momento porfavor</h1>;
    }
    return contenido;
  }

 

  //Deshabilitar y habilitar campos
  cambioEstadoCampo = e => {
    console.log("funciona esto");
    
    e.preventDefault();
    let domicilioActual = document.getElementById("domicilioActual");
    let ubigeo = document.getElementById("ubigeo");
    let tipoTelefono = document.getElementById("tipoTelefono");
    let numeroTelefono = document.getElementById("numeroTelefono");
    
    let tipoCorreo = document.getElementById("tipoCorreo");
    let nombreCorreo = document.getElementById("nombreCorreo");
   

    domicilioActual.disabled = !domicilioActual.disabled;
    ubigeo.disabled = !ubigeo.disabled;
    tipoTelefono.disabled=!tipoTelefono.disabled;
    numeroTelefono.disabled=!numeroTelefono.disabled;
    tipoCorreo.disabled=!tipoCorreo.disabled;
    nombreCorreo.disabled=!nombreCorreo.disabled;
    this.botonTelefono.current.disabled=!this.botonTelefono.current.disabled;
    this.botonCorreo.current.disabled=!this.botonCorreo.current.disabled;

  };

  cambiarEstadoDatosPersonalesPrivados= e=>{
      e.preventDefault();

      if(!this.botonEditarCampos.current.disabled){
        this.codigo.current.disabled =!this.codigo.current.disabled; 
       this.dni.current.disabled =!this.dni.current.disabled; 
       this.apePaterno.current.disabled =!this.apePaterno.current.disabled;
       this.apeMaterno.current.disabled =!this.apeMaterno.current.disabled; 
       this.nombre.current.disabled =!this.nombre.current.disabled;
       this.fechaNacimiento.current.disabled =!this.fechaNacimiento.current.disabled;
      }else{
        
        
        console.log("El boton esta deshabilitado");
        
       
      }
  }

  //Metodo para guardar o editar el domicilio de una persona
  onSubmitGeneral = e => {
    e.preventDefault();
    if (this.state.estadoDomicilio) {
      this.onSubmitEditarDomicilio(e);
    } else {
      this.onSubmitGuardarDomicilioPersona(e);
    }
  };

//Metodo para guardar el telefono en la base de datos
  onSubmitGuardarTelefono = e =>{
    e.preventDefault();
    fetch(CONFIG + "mse/telefono/guardar/", {
      method: "POST",
      body: JSON.stringify({
        idPersona: this.state.id ,
        idTipoTelefono: this.state.tipoTelefono,
        numeroTelefonico: this.state.nTelefono
  
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      } 
    })
      .then(response => {
        swal("Guardado Correctamente", "", "success");
      })
  }
  //Metodo para guardar el correo en la base de datos
  onSubmitGuardarCorreo=(e)=>{
    e.preventDefault();
      fetch(CONFIG + "mse/correo/guardar/", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id ,
        idTipoCorreo: this.state.tipoCorreo,
        correo: this.state.nombreCorreo
  
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      } 
    })
      .then(() => {
        swal("Guardado Correctamente", "", "success");
      })
    
  }

  //Metodo para guardar el domicilio de una persona
  onSubmitGuardarDomicilioPersona = e => {
    e.preventDefault();
    fetch(CONFIG + "mse/domicilio/guardar/", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id,
        domicilio: this.state.domicilioActual,
        ubigeo: this.state.ubigeo
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        swal("Guardado Correctamente", "", "success");
        return response.json();
      })
      .then(alumno => {
        console.log("---RESPUESTA---");
        console.log(alumno);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });
  };

  //Metodo para editar el Domicilio
  onSubmitEditarDomicilio = e => {
    e.preventDefault();
    fetch(CONFIG + "mse/domicilio/editar/", {
      method: "PUT",
      body: JSON.stringify({
        id: this.state.id,
        domicilio: this.state.domicilioActual,
        ubigeo: this.state.ubigeo
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        swal("Actualizado Correctamente", "", "success");
        return response.json();
      })
      .then(alumno => {
        console.log("---RESPUESTA---");
        console.log(alumno);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });
  };

  //Metodo para actualizar los datos personales de un alumno
  onSubmitDatosPersonales = e => {

    //De momento este codigo no es utilizado para nada
    e.preventDefault();
    console.log("******************************");
    
    console.log(JSON.stringify({
        id:this.state.id,
          dni:this.state.dni,
          apellidoPaterno: this.state.apePaterno,
          apellidoMaterno: this.state.apeMaterno,
          nombres: this.state.nombre,
          fechaNac: this.state.fechaNacimiento
    }))
    console.log("******************************");
    fetch(CONFIG + "mse/persona/update/", {
      method: "PUT",
      body: JSON.stringify({
          id:this.state.id,
          dni:this.state.dni,
          apellidoPaterno: this.state.apePaterno,
          apellidoMaterno: this.state.apeMaterno,
          nombres: this.state.nombre,
          fechaNac: this.state.fechaNacimiento
          
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        swal("Actualizado Correctamente", "", "success");
        return response.json();
      })
      .then(persona => {
        console.log("---RESPUESTAPersona---");
        console.log(persona);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });

      fetch(CONFIG + "mse/alumno/actualizar/", {
        method: "PUT",
        body: JSON.stringify({
            codigoAlumno:this.state.codigo,
            dni:this.state.dni,
            apellidoPaterno:this.state.apePaterno,
            apellidoMaterno:this.state.apeMaterno,
            nombre:this.state.nombre,
            fechaNacimiento:this.state.fechaNacimiento
            
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          swal("Actualizado Correctamente", "", "success");
          return response.json();
        })
        .then(persona => {
          console.log("---RESPUESTA---");
          console.log(persona);
        })
        .catch(error => {
          swal("Algo salió mal", "", "warning");
          console.log(error);
        });

    //Envior los datos del domicilio y ubigeo
    this.onSubmitGeneral(e);
  };

  //Metodo para buscar a lima desde la API
  buscarLima(valor) {
    let arrayDistritos = [];
    for (let distrito of valor) {
      if (distrito.province_id === "1501") {
        let distritoObjeto = {
          id: distrito.id,
          nombre: distrito.name
        };
        arrayDistritos.push(distritoObjeto);
      }
    }
    return arrayDistritos;
  }
}

export default VistaDatosPersonales;
