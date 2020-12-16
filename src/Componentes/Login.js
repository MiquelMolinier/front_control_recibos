import React from 'react';
import '../sass/_loginSty.css';
import swal from 'sweetalert';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';
//LOGIN DE USUARIO
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        contraseña: ' ',
        errors:[],
        usuario:null,
        pwdstate: null,
        perfil:false
    }; 
  }
  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
    this.clearValidationErr("username");
  }

  onPasswordChange(e) {
    this.setState({contraseña: e.target.value});
    this.clearValidationErr("email");
  }


  async submitLogin2(e){
    var estadoup = '';
    if(this.state.perfil){
        fetch(CONFIG + 'usuario/perfil/buscar/' + this.state.username + "/" + this.state.contraseña)
          .then(Response => Response.json())
          .then(tourJson => {this.setState({usuario:tourJson})
            estadoup = this.state.usuario.estadoUp;
            if(estadoup){
              swal("Usuario administrador encontrado !" ,"", "success").then(
                this.VistaNueva2)
            }else{
              swal("Usuario no esta registrado como administrador o no esta activo!!", "", "info");
            }
          }).catch(error => {

            swal("Oops, Algo salió mal!", "","error")
            console.error(error)
          });

        e.preventDefault();

    }else{
      console.log(CONFIG+'usuario/alumnoprograma/buscar/' + this.state.username +"/"+ this.state.contraseña);
      await fetch(CONFIG+'usuario/alumnoprograma/buscar/' + this.state.contraseña +"/"+ this.state.username)
              .then(Response => Response.json())
              .then(tourJson => {
                              this.setState({usuario:tourJson});
                })
                .catch(error => {
                  swal("Oops, Algo salió mal!", "","error")
                  console.error(error)
            });

        await  fetch(CONFIG + 'recaudaciones/alumno/concepto/listar_codigoslog/'+this.state.usuario.apePaterno+ "/" + this.state.usuario.codAlumno)
                  .then(Response => Response.json())
                  .then((tourJson)=> {
                    if(tourJson.length == 1){
                      swal("Alumno solo tiene un programa!" ,"", "success").then(
                         //browserHistory.push('/'+this.state.usuario.codAlumno))
                         browserHistory.push('/'+ this.state.usuario.codAlumno +'/vista/importe'))
                    }else if(tourJson.length >1){                
                      swal("Alumno tiene mas de un programa!" ,"", "success").then(
                        browserHistory.push('/filtro/'+ this.state.usuario.apePaterno + "/" + this.state.usuario.codAlumno))
                    }else {
                      swal("No se encontraron programas del alumno, usuario no esta matriculado", "", "info");
                    }
                  })
                  .catch(error => {
                    swal("Oops, Algo salió mal!", "","error")
                    console.error(error)
              });

           e.preventDefault();

    }
    
  }

  VistaNueva=(e)=>{
    
    browserHistory.push('/vista/nueva');
    //e.preventDefault();
    
  }

  VistaNueva2=(e)=>{
    browserHistory.push('/vista/loginFormAdmi');
  }

  handleChange = e =>{
   this.setState({
     [e.target.name]: e.target.value ,
  })
}

  render() {
    return (
        <div className="vista">
            <div className="inner-container">
                Iniciar sesión <br/>
                <div className= "header">
                  <select name="perfil" onChange={this.handleChange} required className="browser-default"> 
                    <option value="false">Alumno</option>
                    <option value="true">Administrativo</option>
                  </select> 
                </div>
               <br/>
                <div className="box">
                  <div className="input-group">
                        {/*<label htmlFor="username"  className = "login-label">Usuario</label>*/}
                        <input
                            type="text"
                            name="username"
                            className="login-input"
                            placeholder="Ingrese su usuario"
                            onChange={this
                            .onUsernameChange
                            .bind(this)}/>
                    </div>
  
                    <div className="input-group">
                        {/*<label htmlFor="contraseña"  className="login1-label">Contraseña</label>*/}
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Ingrese su contraseña"
                            onChange={this
                            .onPasswordChange
                            .bind(this)}/>
                    </div>
  
                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                        .submitLogin2
                        .bind(this)}>Consultar
                    </button>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;