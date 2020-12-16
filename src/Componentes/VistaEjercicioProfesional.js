import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import swal from "sweetalert";
import CONFIG from '../Configuracion/Config';

class VistaEjercicioProfesional extends React.Component {
    constructor(props) {
        super(props);
        
        //Creacion de Referencias
        this.tipoEntidad=React.createRef();
        this.tipoVinculoLaboral=React.createRef();
        

        //Iniciamos el state
        this.state = {
            
            entidad:this.props.codigo,
            tipoEntidad:'',
            cargo:'',
            princFunc:'',
            tipoVinLabo:'',
            fechIni:'',
            fechFin:'',
            nomJefSup:'',
            corrJefSup:'',
            arrayDatos:[]
        }

        }

       componentWillMount(){
           fetch(CONFIG+"mse/ejerprodoc/datosEjerprodoc/"+this.state.entidad)
           .then(result=>{
               return result.json();
           })
           .then(arrayDatos=>{
               console.log("Los datos son ->",arrayDatos);
               this.setState({
                   arrayDatos
               })
           })
       } 
    
   
        //Cambio de estado mientras cambia el value
    setField(e) {
        this.setState({ [e.target.name]: e.target.value });
        
    
    }
    render() {
        let arrayDatos=this.state.arrayDatos;
        return (
            
           <div className="contenedor">
               <h1 className="text-center text-primary">Ejercicio Profesional o Docente</h1> 
               <form name="formulario" onSubmit={this.enviarDatos}>
                    <div className="bg-white  ">
                        <div className="container card card-primary">
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label >Entidad</label>
                                        </div>
                                        <div className="col col-md-8 form-group ">
                                            <input value={this.state.entidad} name="entidad" type="text" className="form-control" onChange={e => this.setField(e)} disabled/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label> Tipo Entidad</label>
                                        </div>
                                        <div className="col col-md-8">
                                            <label className="row w-100">
                                                <input  value="publica" name="tipoEntidad" type="radio"  />
                                                <span className="entidad-input span centrar-label">Publica   </span>
                                                
                                            </label>
                                            
                                            <label className="row w-100">
                                                <input  value="privada"  name="tipoEntidad" type="radio" />
                                                <span className="entidad-input span centrar-label">Privada </span>
                                            </label>
                                            
                                            <label className="row w-100">
                                                <input value="otro" name="tipoEntidad" type="radio" />
                                                <span  className="entidad-input span centrar-label col col-md-5">Otro: </span>
                                                <input ref={this.tipoEntidad}  type="text" className="col col-md-7 form-control" />
                                                
                                                
                                            </label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label>Cargo</label>
                                        </div>
                                        <div className="col col-md-8 form-group">
                                            <input value={this.state.cargo} type="text" name="cargo" className="form-control" onChange={e => this.setField(e)}></input>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label>Principales Funciones</label>
                                        </div>
                                        <div className="col col-md-8 form-group">
                                            <input value={this.state.princFunc} name="princFunc" type="text" className="form-control" onChange={e => this.setField(e)}></input>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label> Tipo Vinculo Laboral </label>
                                        </div>
                                        <div className="col col-md-8">
                                            <label className="row w-100">
                                                <input   value="dependiente" name="tipolaboral" type="radio" />
                                                <span className="entidad-input span centrar-label">Dependiente   </span>
                                                
                                            </label>
                            
                                            <label className="row w-100">
                                                <input   value="independiente" name="tipolaboral" type="radio" />
                                                <span className="entidad-input span centrar-label">Independiente </span>
                                            </label>
                                            
                                            <label className="row w-100">
                                                <input type="radio" value="servicio" name="tipolaboral"  />
                                                <span className="entidad-input span centrar-label">Por Servicio   </span>
                                                
                                            </label>
                                            
                                            <label className="row w-100">
                                               
                                                    <input value="otro" name="tipolaboral" type="radio" />
                                                    <span className="entidad-input span centrar-label col col-md-5">Otro:</span>
                                                    <input ref={this.tipoVinculoLaboral} type="text" className="form-control col col-md-7" />
                                                    
                                                   
                                                
                                                
                                                
                                            </label>
                                            
                                        </div>
                                    </div>

                                    
                                </div>

                                <div className="col col-md-6">
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label>Fecha Inicio</label>
                                        </div>
                                        <div className="col col-md-8 form-group">
                                            <input value={this.state.fechIni} name="fechIni" type="date" className="form-control"  onChange={e => this.setField(e)}/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label>Fecha Fin</label>
                                        </div>
                                        <div className="col col-md-8 form-group">
                                            <input value={this.state.fechFin} name="fechFin" type="date" className="form-control" onChange={e => this.setField(e)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label>Nombre Jefe inmediato Superior</label>
                                        </div>
                                        <div className="col col-md-8 form-group">
                                            <input value={this.state.nomJefSup} name="nomJefSup" type="text" className="form-control" onChange={e => this.setField(e)}></input>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label>Correo del Jefe inmediato Superior</label>
                                        </div>
                                        <div className="col col-md-8 form-group">
                                            <input value={this.state.corrJefSup} name="corrJefSup" type="email" className="form-control" onChange={e => this.setField(e)}></input>
                                        </div>
                                    </div>

                                </div>

                            </div>   
                            
                            <div className="text-right">
                                <button type="submit"  className="btn btn-outline-success"> Guardar </button>
                               
                            </div>         

                        </div>
                    </div>
                </form>

                {/* //Esta parte contendra la tabla que necesito */}

                    <div className="bg-white  ">
                        <div className="container card card-primary">
                            <div className="row">
                            <table className="table">
                                <thead className="thead thead-dark">
                                    <tr>
                                        <th >ENTIDAD</th>
                                        <th >TIPO ENTIDAD</th>
                                        <th >CARGO</th>
                                        <th >FUNCIONES</th>
                                        <th >VINCULO LABORAL</th>
                                        <th >FECHA INICIO</th>
                                        <th >FECHA FIN</th>
                                        <th >JEFE INM SUPERIOR</th>
                                        <th >CORREO JEF INM SUPERIOR</th>
                                        <th >ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(arrayDatos).map(datos=>(
                                        <tr key={datos} >
                                            <th >{arrayDatos[datos].entidad}</th>
                                            <td>{arrayDatos[datos].tipoEntidad}</td>
                                            <td>{arrayDatos[datos].cargo}</td>
                                            <td>{arrayDatos[datos].princFunc}</td>
                                            <th >{arrayDatos[datos].tipoVincLab}</th>
                                            <td>{arrayDatos[datos].fechInic}</td>
                                            <td>{arrayDatos[datos].fechaFin}</td>
                                            <td>{arrayDatos[datos].nomJefInmSup}</td>
                                            <td>{arrayDatos[datos].corrJefInmSup}</td>
                                            <td>
                                             <button  type="button" onClick={()=>{this.eliminarRegistro(arrayDatos[datos].corrJefInmSup)}} className="bg-white">
                                                <i className="far fa-trash-alt fa-2x"></i>
                                             </button>  </td>
                                        </tr>
                                    ))} 
                                    
                                    
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>                        
            </div> 
        );
    }

    enviarDatos=e=>{
        e.preventDefault();
        console.log("estamos enviando datos :=)");
        let inputsTipoEntidad=document.formulario.tipoEntidad;
        let inputsTipoLaboral=document.formulario.tipolaboral;

        let tipo;
        let tipoLaboral;
        inputsTipoEntidad.forEach(input => {
            if(input.checked){
                tipo=input.value;
                if(tipo==='otro'){
                    tipo=this.tipoEntidad.current.value;
                }
            }else{
                console.log("Este no es el input seleccionado");
            }
        });

        inputsTipoLaboral.forEach(input => {
            if(input.checked){
                tipoLaboral=input.value;
                if(tipoLaboral==='otro'){
                    tipoLaboral=this.tipoVinculoLaboral.current.value;
                }
            }else{
                console.log("Este no es el input seleccionado");
            }
        });
        let nuevoDato={
            entidad:this.state.entidad,
            tipoEntidad:tipo,
            cargo:this.state.cargo,
            princFunc:this.state.princFunc,
            tipoVincLab:tipoLaboral,
            fechInic:this.state.fechIni,
            fechaFin:this.state.fechFin,
            nomJefInmSup:this.state.nomJefSup,
            corrJefInmSup:this.state.corrJefSup
            
        }
        
        console.log(nuevoDato);
         const arrayDatos= [...this.state.arrayDatos,nuevoDato];
        this.setState({
          arrayDatos
        })
        // swal("Guardado Correctamente", "", "success");

        fetch(CONFIG+"mse/ejerprodoc/guardar/",{
            method: "POST",
            body: JSON.stringify({
                entidad:this.state.entidad,
                tipoEntidad:tipo,
                cargo:this.state.cargo,
                princFunc:this.state.princFunc,
                tipoVincLab:tipoLaboral,
                fechInic:this.state.fechIni,
                fechaFin:this.state.fechFin,
                nomJefInmSup:this.state.nomJefSup,
                corrJefInmSup:this.state.corrJefSup
            
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        swal("Guardado Correctamente", "", "success");
      })
      .catch(()=>{
          swal("Hubo un error","","error");
      })
        
      }


      eliminarRegistro=correo=>{
        swal({
            title: "¿Estas seguro?",
            text: "Este registro ya no podra ser recuperado?",
            icon: "warning",
            dangerMode: true,
            buttons: true
          })
          .then(willDelete => {
            if (willDelete) {
                const datosActuales= [...this.state.arrayDatos];
                //borrar el elemento del state
                const arrayDatos= datosActuales.filter(dato=>dato.corrJefInmSup!== correo);
                //actualizar el state
                this.setState({
                    arrayDatos
              })

              fetch(CONFIG + "mse/ejerprodoc/eliminar/",{
                method: "DELETE",
                body: JSON.stringify({
                    correo: correo
                }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
          
              }
          
            )
              .then(()=>{
                swal("Eliminado!", "Ha sido eliminado exitosamente!", "success");
              })
              .catch((error) => {
                swal("Ha ocurrido un error", "", "warning");
              })  
              
            }
          });
            
      }
}






export default VistaEjercicioProfesional;