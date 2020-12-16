import React, {Component} from 'react';
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";
import Nivel from './Nivel';

class AgregarDatosFormacionAcademicaSanMarcos extends Component {

    
    
    centroEstudios=React.createRef();
    facultad=React.createRef();
    fechaInicio=React.createRef();
    fechaFin=React.createRef();
    nivel=React.createRef();
    programa=React.createRef();

    constructor(props) {
        super(props);
        this.state = {
          codigo:this.props.params.codigo ,
          id:0,
          dni:0,
          niveles: [],
          programas:[],
          tiposInstitucion:[],
          listaInstitucion:[]

        };
        console.log(this.state.codigo);
      }



    componentWillMount(){

        fetch(CONFIG + "mse/persona/buscar/" + this.state.codigo)
      .then(response => {
        return response.json();
      })
      .then(persona => {
        this.setState({
          id: persona.id,
          dni: persona.dni
        });
        
        return fetch(
            CONFIG + "/mse/alumno/conProgramas/" + this.state.dni
        );
      })
      .then(response=>{
          return response.json();
      })
      .then(programas=>{
          console.log("Esta es la lista de programas->>>>>>>>>>>>>>>>>>>>>>>Qie se deben hacer",programas);
          this.setState({
              programas:programas
          })
      })
      .catch(error=>{
          console.log(error);
      })

        

        fetch(CONFIG+"mse/persona/listaNivel")
        .then(response=>{
            console.log("Entro a la respuesta");
            return response.json()
        })
        .then(result=>{
            console.log(result)
            console.log("aqui esta el resultado",result);
            this.setState({
                niveles:result
            })
        })
        .catch(error=>{
            console.error(error);
        })


        fetch(CONFIG + "/mse/alumno/conProgramaPorCodigo/" + this.state.dni)
      .then(response => {
        return response.json();
      })
      .then(progs => {
        this.setState({ cursos: progs });
        console.log("estos son los cursos ->>>>>>", this.state.cursos);
        // console.log(alumno);
      })
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error);
      });

      


      console.log("*************************************************")
      fetch(CONFIG + "/mse/persona/listarInstitucion/")
      .then(response => {
        return response.json();
      })
      .then(tipoInstitucion => {
        this.setState({ 
          tiposInstitucion: tipoInstitucion
        });
        console.log("estos son los tipos de institucion ->>>>>>->>>>>>->>>>>>", tipoInstitucion);
        
      })
      .catch(error => {
        console.error(error);
      });

      //Aqui tenemos la lista de Instituciones

    }

    render(){
        let niveles=this.state.niveles;
        let programas=this.state.programas;
        if(niveles.length==0){
            console.log("No hay niveles")
        }else{
            console.log(niveles);
        }
        
        return(
            <form onSubmit={this.formacionSanMarcos}>
            <div className="container bg-white text-primary">
                <div className="row">
                    <h1 className="w-100 text-center"> Formacion Academica San Marcos</h1>
                    <hr/><br/><br/>
                    <div className="col col-md-6">
                        <div className="container bg-white mt-2">

                        <div className="form-group">
                          <div className="row">
                              <label className="col col-md-4">Nivel</label> 
                              <input type="text" className="form-control col col-md-8" ref={this.nivel} value="Universitario" placeholder="" disabled />
                                 {/* <select className="form-control col col-md-8" ref={this.nivel} name="" id="">
                                   <option>--Seleccione--</option>
                                   {Object.keys(niveles).map(nivel=>(
                                   <option key={nivel} value={niveles[nivel].nivel_id}>{niveles[nivel].nivel_desc}</option>
                                //    <option>{nivel}</option>
                                   ))}
                                 </select>
                                */}
                           </div>  
                           
                        </div>

                        <div className="form-group">
                          <div className="row">
                              <label className="col col-md-4">Programa Cursado</label> 
                                 <select className="form-control col col-md-8" ref={this.programa} name="" id="">
                                   <option>--Seleccione--</option>
                                   {Object.keys(programas).map(programa=>(
                                   <option key={programa} value={programas[programa].value}>{programas[programa].label}</option>
                                //    <option>{nivel}</option>
                                   ))}
                                 </select>
                               
                           </div>  
                           
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Facultad</label> 
                                <input type="text" className="form-control col col-md-8" ref={this.facultad}/>
                            </div>
                        </div>
            
                        {/* <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Centro de estudios</label> 
                                <input type="text" className="form-control col col-md-8" ref={this.centroEstudios} value="Universidad Nacional Mayor de San Marcos" placeholder="ingrese el centro de estudios" disabled/>
                            </div>
                        </div> */}
                      </div>
                      
                    </div>

                    <div className="col col-md-6">
                       <div className="container bg-white mt-2">

                       <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">institucion</label> 
                                <input type="text" className="form-control col col-md-8" ref={this.institucion} value="Universidad Nacional Mayor de San Marcos" disabled/>
                            </div>
                        </div>

                       {/* <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Facultad</label> 
                                <input type="text" className="form-control col col-md-8" ref={this.facultad} value="Ingenieria de Sistemas e Informatica" disabled/>
                            </div>
                        </div> */}


                        <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Fecha de inicio</label> 
                                <input type="date" ref={this.fechaInicio} className="form-control col col-md-8" />
                            </div>
                            
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Fecha de Fin</label> 
                                <input type="date" ref={this.fechaFin} className="form-control col col-md-8" />
                            </div>
                            
                        </div>      
                       </div> 
                        
                    </div>
                </div>

                <div className="container bg-white text-center">
                    <button type="submit" className="btn btn-primary mr-2">Registrar</button>
                    <button onClick={this.cerrarVentana} type="button" className="btn btn-warning ml-2">Cerrar</button>

                </div>

            </div>

            </form>
        )
    }

    cerrarVentana=e=>{
        e.preventDefault();
        window.close();
    }
    formacionSanMarcos=e=>{   
     e.preventDefault();   

    fetch(CONFIG + "mse/persona/guardarFormacion/", {
        method: "POST",
        body: JSON.stringify({
            persona_id:this.state.id,
            id_programa:this.programa.current.value,
            nivel_id:1,
            formacion_calumno:this.state.codigo,
            formacion_fingreso:this.fechaInicio.current.value,
            formacion_fegreso:this.fechaFin.current.value ,
            modalidad:0,
            institucion_id:1 //aqui va el id de la universidad nacional mayor de san marcos
            
            
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
          swal("Guardado Correctamente", "", "success");
          
      })
      .catch(error => {
          swal("Algo salió mal", "", "warning");
          console.log(error);
      });



    }
}

export default AgregarDatosFormacionAcademicaSanMarcos;