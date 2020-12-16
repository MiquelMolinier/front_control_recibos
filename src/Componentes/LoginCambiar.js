import React from 'react';

import '../sass/_loginSty.css';
import { browserHistory } from 'react-router-3';
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'

//LOGIN DE CODIGO

class LoginCambiar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:'',
            contraseña: '',
            contraseñanuevo: '',
            alumno:[],
            errors: []
           // pwdState: null
        };

    }


    onSubmit = (e) => {

    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
          errors: [
            ...prevState.errors, {
              elm,
              msg
            }
          ]
        }));
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

      onEmailChange(e) {
        this.setState({email: e.target.value});
        this.clearValidationErr("email");
      }

      onPasswordChange(e) {
        this.setState({contraseña: e.target.value});
        this.clearValidationErr("contraseña");
       {/*
        this.setState({pwdState: "weak"});
        if (e.target.value.length > 8) {
          this.setState({pwdState: "medium"});
        } else if (e.target.value.length > 12) {
          this.setState({pwdState: "strong"});
        }*/}
    
      }
    
      onPassworNuevodChange(e) {
        this.setState({contraseñanuevo: e.target.value});
        this.clearValidationErr("contraseñanuevo");
       {/*}
        this.setState({pwdState: "weak"});
        if (e.target.value.length > 8) {
          this.setState({pwdState: "medium"});
        } else if (e.target.value.length > 12) {
          this.setState({pwdState: "strong"});
        } */}
    
      }
    
      openPopup(e) {
        console.log("Hello world!");
      }

    handleChange = e =>{
        this.setState({
          [e.target.name]: e.target.value ,
       })
     }

     VistaNueva2=(e)=>{
    
      browserHistory.push('/vista/loginApp');
      // console.log("Vista nueva 2");
      //e.preventDefault();
      
    }
    
      submitCambiar(e) {
    
        console.log(this.state);
    
        if (this.state.username == "") {
          this.showValidationErr("usuario", "Usuario no debe estar vacio!");
        }
        if (this.state.email == "") {
          this.showValidationErr("email", "Email no debe estar vacio!");
        }
        if (this.state.contraseña == "") {
          this.showValidationErr("contraseña", "contraseña no puede estar vacio!");
        }
        if (this.state.contraseñanuevo == "") {
          this.showValidationErr("contraseñanuevo", "contraseña nuevo no puede estar vacio!");
        }

        if(this.state.contraseña!=this.state.contraseñanuevo){
          swal("Las contraseñas deben coincidir", "", "info");
          return;   
        }

        fetch(CONFIG + 'usuario/alumnoprograma/actualizar/' + this.state.username + "/" + this.state.email + "/" + this.state.contraseña)
            .then(Response => Response.json())
            .then(tourJson => {this.setState({alumno:tourJson})
            console.log("el usuario cambio de contraseña");
            console.log(this.state.alumno);
            //estadoup = this.state.usuario.estadoUp;
            //idperfil = this.state.usuario.idPerfil;
            if(this.state.alumno.userName == this.state.username){
              swal("se cambio la contraseña correctamente!" ,"", "success").then(
                this.VistaNueva2)
            }else{
              this.state.input.username
              this.setState({email: ''}),
              this.setState({contraseña:''}),
              this.setState({contraseñanuevo:''})
              swal("Usuario no esta registrado!!", "", "info");
              //this.setState({})
               // this.setState({email: ''}),
                //this.setState({contraseña:''}),
               //this.setState({contraseñanuevo:''})
              
              //aqui pongo?
            }
          })
            .catch(error => {

                swal("Oops, Algo salió mal!", "","error")
                console.error(error)
            });
    
      }

    render() {
        let usernameErr = null,
            emailErr = null,
            passwordErr = null,
            passwordNuevoErr = null;
            

        for (let err of this.state.errors) {
            if (err.elm == "username") {
                usernameErr = err.msg;
            }
            if (err.elm == "email") {
                passwordErr = err.msg;
            }
            if (err.elm == "contraseña") {
                passwordNuevoErr = err.msg;
            }
            if(err.elm == "contraseñanuevo"){
              emailErr = err.msg;
            }
        }
{/*
        let pwdWeak = false,
            pwdMedium = false,
            pwdStrong = false;

        if (this.state.pwdState == "weak") {
            pwdWeak = true;
        } else if (this.state.pwdState == "medium") {
            pwdWeak = true;
            pwdMedium = true;
        } else if (this.state.pwdState == "strong") {
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        }*/}
        return (
                <div className="vista">
                    <div className="inner-container">
                         Cambiar contraseña
                        <br/><br/>
                        <div className="box">
                            <div className="input-group">
                            <input
                                    type="text"
                                    name="username"
                                    className="login-input"
                                    placeholder="Ingrese su usuario"
                                    onChange={this
                                    .onUsernameChange
                                    .bind(this)}/>
                                <small className="danger-error">{usernameErr
                                    ? usernameErr
                                    : ""}
                                </small>
                            </div>

                            <div className = "input-group">
                                <input
                                    type="email"
                                    name="email"
                                    className="login-input"
                                    placeholder="su-email@email.com"
                                    onChange={this
                                    .onEmailChange
                                    .bind(this)}/>
                                <small className="danger-error">{emailErr
                                    ? emailErr
                                    : ""}
                                </small>
                            </div>
  
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="contraseña"
                                    className="login-input"
                                    placeholder="Nueva contraseña"
                                    onChange={this
                                    .onPasswordChange
                                    .bind(this)}/>
                                <small className="danger-error">{passwordErr
                                    ? passwordErr
                                    : ""}
                                </small>
                            </div>
  
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="contraseñanuevo"
                                    className="login-input"
                                    placeholder="Confirmar nueva contraseña"
                                    onChange={this
                                    .onPassworNuevodChange
                                    .bind(this)}/>
                                <small className="danger-error">{passwordNuevoErr
                                    ? passwordNuevoErr
                                    : ""}
                                </small>
  
                               {/* {this.state.password && <div className="password-state">
                                    <div
                                        className={"pwd pwd-weak " + (pwdWeak
                                        ? "show"
                                        : "")}>
                                    </div>
                                    <div
                                        className={"pwd pwd-medium " + (pwdMedium
                                        ? "show"
                                        : "")}>
                                    </div>
                                    <div
                                        className={"pwd pwd-strong " + (pwdStrong
                                        ? "show"
                                        : "")}>
                                    </div>
                                        </div>}*/}
                            </div>
                            <button
                                type="button"
                                className="login-btn"
                                onClick={this
                                .submitCambiar
                                .bind(this)}>Cambiar
                            </button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default LoginCambiar;