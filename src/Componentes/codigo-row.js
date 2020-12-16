import React from 'react'
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';

import swal from 'sweetalert';
import {
    ModalFooter, ModalBody, ModalHeader, Modal, Button
} from 'reactstrap';

import Select from 'react-select';

class CodigoRow extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            estado: 0,
            //estado
            defuncion: 1,
            estadoAlumno: "",
            valor: true,
            estadoAlumnoInput:{value:"-1",label:"Escoga un nuevo estado"},
            optionsEstadoAlumno:[{value:"casado",label:"Casado"},
            {value:"soltero",label:"Soltero"},
            {value:"divorciado",label:"Divorciado"},
            {value:"viudo",label:"Viudo"},
            {value:"separado",label:"Separado"},
            {value:"conviviente",label:"Conviviente"},
            {value:"fallecido",label:"Fallecido"}
            ],
            showModalConfiguracion: false,
        }
    }

    handleChangeSelectEstadoAlumno = (estado) => {

        if (estado !== null) {
            this.setState({
                estadoAlumnoInput: estado,
                estadoAlumno: estado.label
            });
        }
    }

    Regresar = (e) => {
        browserHistory.push('/vista/loginNyA');
        e.preventDefault();
    }

    validar=(e)=>{
        fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/'+ this.props.alumno.cod_alumno)
        .then((response)=>{
            return response.json()   
        })
        .then((pagos)=>{
            if(pagos.length>0){
                swal("Consulta realizada exitosamente","","success").then(browserHistory.push('/'+ this.props.alumno.cod_alumno))
            }
            else{
                swal("No se encontraron pagon con el nombre ingresado ","","info");
            }


        })
        .catch(()=>{
            swal("Oops,Algo salio mal.!","","error");
            
        });
        e.preventDefault();
    }
    
    guardarCambios = () => {
        let self = this;
        if (this.state.estadoAlumnoInput.value === null || this.state.estadoAlumnoInput.value === "-1") {

            swal("Escoga una opción", "", "error")

        } else {
            fetch(CONFIG+ 'recaudaciones/alumno/concepto/'+ this.props.alumno.cod_alumno + '/estado_civil_alumno/' + this.state.estadoAlumnoInput.value,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "PATCH",
                }
            ).then((response) => {
                return response.json()
            })
                .then((defuncion) => {
                    if (defuncion === 1) {
                        swal("Estado del alumno cambiado!", "", "success")
                        self.setState({
                            estadoAlumnoInput: { value: "0", label: "Seleccione un estado" }
                        })
                    }
                })
                .catch(error => {
                    // si hay algún error lo mostramos en consola
                    swal("Oops, Algo salió mal!!", "", "error")
                    console.error(error)
                });
        }
    }


    editarEstado = (e) => {
        e.preventDefault();
        if (this.state.defuncion == 1) {
            this.state.defuncion = 0;
            this.state.estadoAlumno = "Alumno fallecido"
            fetch(CONFIG+'recaudaciones/alumno/concepto/' + this.state.alumno.nombre_alumno + '/estado_civil_alumno/' + this.state.defuncion,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "PATCH",
                }
            ).then((response) => {

                return response.json()

            })
                .then((defuncion) => {
                    if (this.state.defuncion == 0) {
                        //  swal("¿El alumno falleció?", "", "")
                    }


                })
                .catch(error => {
                    // si hay algún error lo mostramos en consola
                    swal("Oops, Algo salió mal!!", "", "error")
                    console.error(error)
                });
        } else {
            this.state.defuncion = 1;

            fetch(CONFIG +'recaudaciones/alumno/concepto/' + this.props.alumno.nombre_alumno + '/estado_civil_alumno/' + this.state.defuncion,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "PATCH",
                }
            ).then((response) => {
                return response.json()

            })
                .then((defuncion) => {
                    if (this.state.defuncion == 1) {
                        console.log("ptm")
                        console.log(this.state.estadoAlumno)
                        this.state.estadoAlumno = "Alumno fallecido"
                        //  swal("¿Modificar el estado del alumno?", "", "")
                    }
                })
                .catch(error => {
                    // si hay algún error lo mostramos en consola
                    swal("Oops, Algo salió mal!!", "", "error")
                    console.error(error)
                });
        }
        var uno = document.getElementById('FbotonStatus');
        if (this.state.valor) {
            uno.innerText = "";
            this.state.estadoAlumno = uno;
        } else {
            uno.innerText = "";
            this.state.estadoAlumno = uno;
        }

        this.state.valor = !this.state.valor

    }

    editarConfiguracion = () => {
        this.setState({
            showModalConfiguracion: true
        });
    }

    closeModal = () => {
        this.setState({
            showModalConfiguracion: false
        });
    }

    componentWillMount() {
        /**set array pagos */
        fetch(CONFIG + 'recaudaciones/alumno/concepto/listar_cod/' +this.props.alumno.cod_alumno)
            .then((response) => {
                return response.json();
            })
            .then((pagos) => {
                console.log("anyiiiiiiiiiiiiiiiiiiii" + this.state.estadoAlumno)
                this.setState({
                   estadoAlumno: this.props.alumno.estado_civil,
                })
            });
    }


render(){
    return(
        <tr>
             <td className="td">
            <form action="#">
                <label className="center-xs ">
                <button type="submit" onClick={this.validar} className="waves-effect waves-light btn-small">CONSULTAR</button>  
                <span></span>
                </label>
            </form>
            </td> 
            <td className="td">
                    <form action="#">
                        <label className="center-xs ">
                            <button  type="submit"  onClick={this.editarConfiguracion}  className="waves-effect waves-light btn-small "> Editar estado 
                                  <i className="large material-icons left">edit</i>
                            </button>
                            <span></span>
                        </label>
                        <div id="main" className="">
                            <Modal isOpen={this.state.showModalConfiguracion} toggle={this.closeModal}
                                aria-labelledby="contained-modal-title-vcenter">
                                <div>
                                    <ModalHeader toggle={this.closeModal}>Configuración de Estudiante</ModalHeader>
                                    <ModalBody>
                                        <h6 align="center" className="Alumno"><b>Código del alumno:</b></h6>
                                        <h6 align="center" className="negro">{this.props.alumno.cod_alumno}</h6>
                                        <h6 align="center" className="Alumno"><b>Nombre del alumno:</b></h6>
                                        <h6 align="center" className="negro">{this.props.alumno.nombre_alumno}</h6>
                                        <h6 align="center" className="Alumno"><b>Estado del alumno:</b></h6>
                                        <h6 align="center" className="negro">{this.state.estadoAlumno}</h6>

                                        <Select
                                            name="estadoAlumnoInput"
                                            id="estadoAlumnoInput"
                                            placeholder="Seleccione un estado"
                                            value={this.state.estadoAlumnoInput}
                                            onChange={this.handleChangeSelectEstadoAlumno}
                                            options={this.state.optionsEstadoAlumno}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.guardarCambios}>Guardar</Button><p>         </p>
                                        <Button color="secondary" onClick={this.closeModal}>Salir</Button>
                                    </ModalFooter>
                                </div>
                            </Modal>
                        </div>
                    </form>
                </td>

            <td className="td">{this.props.alumno.cod_alumno}</td>
            <td className="td">{this.props.alumno.nombre_alumno}</td>
            <td className="td">{this.props.alumno.nombre_programa}</td>
        
        </tr>
    )
}



}

export default CodigoRow;