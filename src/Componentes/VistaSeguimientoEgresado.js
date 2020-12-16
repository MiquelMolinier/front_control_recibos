import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {browserHistory} from 'react-router-3';
import VistaDatosPersonales from './VistaDatosPersonales';
import VistaRegistroEgresados from './VistaRegistroEgresados';
import VistaEjercicioProfesional from './VistaEjercicioProfesional';
import VistaAltaResponsabilidad from './VistaAltaResponsabilidad';
import CONFIG from '../Configuracion/Config'
import './prueba.css';
import VistaValorarServiciosUniv from './VistaValorarServiciosUniv';

class VistaSeguimientoEgresado extends React.Component {
    constructor(props) {
        super(props);
        dni: '',
        this.state = {
            form1: true,
            form2: false,
            form3: false,
            form4: false,
            form5: false,
            codigo: this.props.params.name,
        }
        
        this.Regresar=this.Regresar.bind(this);
    }

    componentWillMount() {

        fetch(CONFIG + 'mse/alumno/buscar/'+this.state.codigo)
        .then((response) => {
            return response.json();
        })
        .then((alumno) => {
            console.log("---DNI---");
            console.log(alumno);
            console.log(alumno['dni']);
            if(alumno['dni']){

                this.setState({ dni: alumno['dni'] })
                console.log("VALOR DEL STATE DNI: " + this.state.dni);
            }else{
                
                this.setState({ dni: this.state.codigo })
                console.log("VALOR DEL STATE DNI: ES EL CODIGO PORQUE ES DNI=NULL");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    Formulario1=(e)=>{
        this.setState({
            form1: true,
            form2: false,
            form3: false,
            form4: false,
            form5: false,
        });
        e.preventDefault();
        
    }
    Formulario2=(e)=>{
        this.setState({
            form1: false,
            form2: true,
            form3: false,
            form4: false,
            form5: false,
        });
        e.preventDefault();
    }
    Formulario3=(e)=>{
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            form5: false,
        });
        e.preventDefault();
    }
    Formulario4=(e)=>{
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: true,
            form5: false,
        });
        e.preventDefault();
    }
    Formulario5=(e)=>{
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: false,
            form5: true,
        });
        e.preventDefault();
    }

    Regresar=(e)=>{
        browserHistory.push('/'+this.state.codigo);
        e.preventDefault();
    }

    render() {
        return (
            <div className="">

                <h3>FACULTAD DE INGENIERIA DE SISTEMAS E INFORMATICA
                <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
                </ul>
                </h3>

                <div className="">
                    <main className="content-menu">
                        <div className="collection collection-left content-menu-left">
                            <a href="#" onClick={this.Formulario1} className={`collection-item ${ this.state.form1 ? 'active': '' }`}><i className="small material-icons left">home</i>DATOS PERSONALES</a>
                            <a href="#" onClick={this.Formulario2} className={`collection-item ${ this.state.form2 ? 'active': '' }`}><i className="small material-icons left">home</i>FORMACIÓN ACADÉMICA EN POSGRADO</a>
                            <a href="#" onClick={this.Formulario3} className={`collection-item ${ this.state.form3 ? 'active': '' }`}><i className="small material-icons left">home</i>EJERCICIO PROFESIONAL O DOCENTE</a>
                            <a href="#" onClick={this.Formulario4} className={`collection-item ${ this.state.form4 ? 'active': '' }`}><i className="small material-icons left">home</i>ALTA RESPONSABILIDAD</a>
                           <a href="#" onClick={this.Formulario5} className={`collection-item ${ this.state.form5 ? 'active': '' }`}><i className="small material-icons left">home</i>VALORAR SERVICIOS UNIV</a>
                        </div>
                        <div className="content-menu-right">
                            {this.state.form1 ? (
                                <div>
                                    <VistaDatosPersonales codigo={ this.state.codigo } dni={ this.state.dni } />
                                </div>
                            ) : (null)}
                            {this.state.form2 ? (
                                <div>
                                    <VistaRegistroEgresados codigo={ this.state.codigo } dni={ this.state.dni } />
                                </div>
                            ) : (null)}
                            {this.state.form3 ? (
                                <div>
                                    <VistaEjercicioProfesional codigo={ this.state.codigo } />
                                </div>
                            ) : (null)}
                            {this.state.form4 ? (
                                <div>
                                <VistaAltaResponsabilidad codigo={ this.state.codigo } />
                                </div>
                            ) : (null)}
                            {this.state.form5 ? (
                                <div>
                                <VistaValorarServiciosUniv codigo={ this.state.codigo } />
                                </div>
                            ) : (null)}
                        </div>
                    </main>

                </div>
            </div>
        );
    }
}

export default VistaSeguimientoEgresado;