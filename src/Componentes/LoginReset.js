import React from 'react';

import swal from 'sweetalert';
import { browserHistory } from 'react-router-3';
import CONFIG from '../Configuracion/Config';
import '../sass/_loginSty.css';



class LoginReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ' ',
      email: ' ',
      errors: [],
      alum:[]
    };

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
      return { errors: newArr };
    });
  }


  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
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

    fetch(CONFIG + 'usuario/alumnoprograma/cambiar/' + this.state.email + "/" + this.state.username)
        .then(Response => Response.json())
        .then(tourJson => {this.setState({alu:tourJson})
        console.log("el usuario cambio de contraseña");
        console.log(this.state.alu);
        if(this.state.alu.userName == this.state.username){
          swal("se restauro la contraseña correctamente!" ,"", "success").then(
            this.VistaNueva2)
        }else{
          
          swal("Usuario no esta registrado!!", "", "info");
            
        }
      })
        .catch(error => {

            swal("Oops, Algo salió mal!", "","error")
            console.error(error)
        });

  }


  render() {
    let usernameErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "usuario") {
        usernameErr = err.msg;
      }
      if (err.elm == "email") {
        emailErr = err.msg;
      }

    }

    return (
      <div className="vista">
        <div className="inner-container">
          Recuperar contraseña

                <br /><br />
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Ingrese su usuario"
            onChange={this
              .onUsernameChange
              .bind(this)}
          />
          <small className="danger-error">{usernameErr
            ? usernameErr
            : ""}
          </small>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="su-email@email.com"
            onChange={this
              .onEmailChange
              .bind(this)}
          />
          <small className="danger-error">{emailErr
            ? emailErr
            : ""}
          </small>
          <button
            type="button"
            className="login-btn"
            onClick={this
              .submitCambiar
              .bind(this)}
          >Recuperar
          </button>
        </div>
      </div>


    )
  }

}






export default LoginReset;