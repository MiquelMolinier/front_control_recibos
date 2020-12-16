import React,{Component} from 'react';
import FadeTransition from "./FadeTransition";
import '../sass/_loginSty.css';
import Login from './Login';
import LoginCambiar from './LoginCambiar';
import LoginReset from './LoginReset';

class LoginApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      isResetOpen:false
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false, isResetOpen: false});
  }

  showRegisterBox() {
    
    this.setState({isRegisterOpen: true, isLoginOpen: false, isResetOpen: false});
  }

  showResetBox(){

    this.setState({isRegisterOpen: false, isLoginOpen: false,  isResetOpen: true});
  }


  render() {

    return (
      <div className="root-container">
        <h3>Módulo consulta de pagos
        {/*
          <ul id="nav-mobile" className="right  hide-on-med-and-down">
            <li ><a className="seleccionar" href="https://siga-fisi.herokuapp.com/dashboard" >Vista Principal<i className="material-icons right">launch</i></a></li>
          </ul>*/}
        </h3>
        {/*<nav>

          <div className="nav-wrapper azul">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a onClick={this.VistaNueva2} >  <i className="small material-icons right">check_box</i>Asignar Programa</a></li>
            </ul>
          </div>
        </nav>*/}
        <br/>
        <br/>
        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
              <div className="box-container">
                <Login/>
              <div className="login1-reset" onClick={this
                .showResetBox
                 .bind(this)}><i>Olvidé mi contraseña</i></div>
              <div className="login1-cambiar" 
                onClick={this
                .showRegisterBox
                 .bind(this)}><u>Quiero cambiar mi contraseña</u></div>
              </div>
          </FadeTransition>

          <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
              <div className="box-container">
                <LoginCambiar/>
              <div className="login1-iniciarSesion" 
                onClick={this
                .showLoginBox
                 .bind(this)}><u>Quiero iniciar sesión</u></div>
              </div>
          </FadeTransition>

          <FadeTransition isOpen={this.state.isResetOpen} duration={500}>
              <div className="box-container">
                <LoginReset/>
              <div className="login1-iniciarSesion" 
                onClick={this
                .showLoginBox
                 .bind(this)}><u>Quiero iniciar sesión</u></div>
              </div>
          </FadeTransition>

        <br/>
        <footer>
            <div className="row center-xs centrar color">
            Proyecto SIGAP © 2019 v.1.4
            </div>
        </footer>

      </div>
    );

  }

}

export default LoginApp;