import React from 'react';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'

//LOGIN DE CODIGO

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombres : ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.VistaNueva = this.VistaNueva.bind(this);
  
  }


  onSubmit=(e)=>{    
    // console.log(this.state.nombres);   
    var nombreValidado = this.ValidarNombre(this.state.nombres);
    var nombres = this.state.nombres.toUpperCase();
    if(nombreValidado){
    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombres.split(separador);    
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }    
    var nombrenuevo = arreglo.join(" & ");
        fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
            .then((response) => {
            return response.json()
            })
            .then((pagos) => {
             if(pagos.length>0){
                
              swal("Consulta realizada exitosamente!" ,"", "success").then(
                 browserHistory.push('/'+this.state.nombres.toUpperCase()))                 
              }
              else{
                swal("No se encontraron pagos con el nombre ingresado", "", "info");
              }

            })
            .catch(error => {

                swal("Oops, Algo salió mal!", "","error")
                console.error(error)
            });
    }
    e.preventDefault();
    
  }
  VistaNueva=(e)=>{
    
    browserHistory.push('/vista/nueva');
    // console.log("Vista nueva");
    e.preventDefault();
    
  }

  AsignacionPresupuesto=(e)=>{

    browserHistory.push('/vista/presupuesto');
    // console.log("Vista presupuesto");
    e.preventDefault();
  }


  NuevoLogin=(e)=>{
    
    browserHistory.push('/vista/loginNyA');
    // console.log("Vista nueva");
    e.preventDefault();
    
  }
  vistaPresupuesto = (e) =>{
    browserHistory.push('/vista/presupuestoRegistro');
    e.preventDefault();
  }
  VistaNueva2=(e)=>{
    
    browserHistory.push('/vista/nueva2');
    // console.log("Vista nueva 2");
    e.preventDefault();
    
  }
  VistaTablaCreada=(e)=>{
    
    browserHistory.push('/vista/Tabla');
    // console.log("Vista nueva 2");
    e.preventDefault();
    
  }
  ValidarNombre(nombres){
    if(!nombres){
      alert("Ingrese un nombre");
      return false;
    }else{
      return true;
    }
  }

  Regresar=(e)=>{
      
    browserHistory.push('/vista/loginFormAdmi'); //se añadio la ruta
    e.preventDefault();
    
  }

  RegresarAdmin=(e)=>{
    
    browserHistory.push('/'); //se añadio la ruta
    e.preventDefault();
    
  }
  onChange(e) {
    this.setState({nombres: e.target.value});
  }

  render() {
    return (
      <div className="">
      <h3>Módulo consulta de pagos

         <ul id="nav-mobile" className="right  hide-on-med-and-down">
              {/*<li ><a className="seleccionar" href="https://siga-fisi.herokuapp.com/dashboard" >Vista Principal<i className="material-icons right">launch</i></a></li>*/}
          </ul>
      </h3>
      <nav>
    <div className="nav-wrapper azul">
      <ul id="nav-mobile" className="right hide-on-med-and-down">
		<li><a onClick={this.vistaPresupuesto} >  <i className="small material-icons right">attach_money</i>Registro Costo Programas</a></li>															 
        <li><a onClick={this.VistaNueva2}><i className="small material-icons right">check_box</i>Asignar Programa</a></li>
        <li><a onClick={this.AsignacionPresupuesto}><i className="small material-icons right">check_box</i>Presupuesto Masivo</a></li>
		<li ><a className="seleccionar" onClick={this.RegresarAdmin} >Salir<i className="material-icons right">reply</i></a></li>																													  
      </ul>
    </div>
  </nav>
      <div className="vista">
      <div className="grupo">
      <h4 className="center h4"><b>Consulte</b></h4>
      <form>
          <div className="center datos">
            <div>
            <i className="material-icons">person</i>
            </div>
            <b>CODIGO:</b>
            <div className="center">
            <input type="text"  value={this.state.nombres} onChange={this.onChange} />
            </div>
            
           <button type="submit" onClick={this.onSubmit} className="waves-effect waves-light btn-small ">CONSULTAR</button>
          </div>
    
      </form>
      <br/>
      
      <u className="colorI">
      <a  onClick={this.NuevoLogin} href="" className="row center-xs centrar colorI">
      Ingresa por tus nombres</a>
      </u>
      </div>
      
      </div>
      <footer>
            <div className="row center-xs centrar color">
            Proyecto SIGAP © 2019 v.1.3
            </div>
            </footer>
      </div>
    );
  }
}

export default LoginForm;