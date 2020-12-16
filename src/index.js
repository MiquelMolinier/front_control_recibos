import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Componentes/App';
//import AppCodigo from './Componentes/AppCodigo';
import AppNueva from './Componentes/AppNueva';
import AppNueva2 from './Componentes/AppNueva2';
import LoginFormNombreApellidos from './Componentes/LoginFormNombreApellidos';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router-3';
import LoginForm from './Componentes/LoginForm';
import LoginApp from './Componentes/LoginApp';
import VistaTablaNuevo from './Componentes/VistaTablaNueva';
import VistaIntermedia from './Componentes/seleccion-intermedia';
import VistaIntermediaLoginAlumno from './Componentes/seleccion_intermedia_login_alumno';
import ComponenteEditable from './Componentes/ComponenteEditable';
import Formulario from './Componentes/formulario';
import VistaSeguimientoEgresado from './Componentes/VistaSeguimientoEgresado';
import AsignarPresupuesto from './Componentes/AsignarPresupuesto';
import ImportePagos from './Componentes/Importe-Pagos';
import RegistroCostoPrograma from './Componentes/RegistroCostoPrograma';
import RegistroPresupuesto from './Componentes/RegistroPresupuesto';

class Index extends React.Component {
    render() {
        return(
            <Router history={browserHistory}>
            <Route
                component={() => <LoginApp />} //LoginForm
                path="/">
            </Route>
            
            <Route path="/:name" component={App}></Route>
            <Route path="/filtro/:name" component={VistaIntermedia}></Route>
            <Route path="/filtro/:name/:cod" component={VistaIntermediaLoginAlumno}></Route>
            <Route path="/vista/programas" component={VistaIntermediaLoginAlumno}></Route>
            <Route path="/vista/nueva" component={AppNueva}></Route>
            <Route path="/vista/nueva2" component={AppNueva2}></Route>
            <Route path="/vista/tabla" component={ VistaTablaNuevo}></Route>
            <Route path="/vista/loginNyA" component={LoginFormNombreApellidos}></Route>
            <Route path="/vista/imprimir" component={ComponenteEditable}></Route>
            <Route path="/formulario/:codigo" component={Formulario}></Route>          
            <Route path="/:name/vista/egresado" component={VistaSeguimientoEgresado}></Route>
			<Route path="/:name/vista/importe" component={ImportePagos}></Route>
            <Route path="/vista/loginFormAdmi" component={LoginForm}></Route>
            <Route path="/vista/loginApp" component={LoginApp}></Route>
		    <Route path="/vista/presupuesto" component={AsignarPresupuesto}></Route>
			<Route path="/vista/presupuestoRegistro" component={RegistroPresupuesto}></Route>
	

          </Router>
          )
      }
      
}

ReactDOM.render(
    <Index/>, document.getElementById('root'));
//ReactDOM.render(<RegistroCostoPrograma />, document.getElementById('root'));

registerServiceWorker();