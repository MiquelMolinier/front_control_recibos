import React from 'react'
import CONFIG from '../Configuracion/Config'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'

class AR_CodigoAsignacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          objProgramas: [],
          detalle: {
              codigo: '',
              nombre: '',
              programa: ''
          },
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle = (e) => {
        let id_alum = this.props.recibo[0].idAlum;
        console.log(id_alum);
            fetch(CONFIG + 'alumnoalumnoprograma/buscar/' + id_alum)
                .then((response) => {
                    return response.json();
                })
                .then((asignado) => {
                    if(asignado.length != 0){
                        fetch(CONFIG + '/programa/buscarPrograma/' + asignado.idPrograma)
                            .then((response) => {
                                return response.json();
                            })
                            .then((programas) => {
                                console.log("---Programas---");
                                console.log(programas);
                                this.setState({
                                    objProgramas: programas,
                                });
                                console.log("---ObjProgramas---");
                                console.log(this.state.objProgramas);
                                if(this.state.objProgramas.length != 0){
                                    this.setState({
                                        detalle: {
                                            codigo: this.props.alumno[0].codAlumno,
                                            nombre: this.props.recibo[0].apeNom,
                                            programa: this.state.objProgramas.siglaPrograma,
                                        },
                                        modal: !this.state.modal
                                    });
                                }else{
                                    console.log("--NO ENTRÓ--");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    } else{
                        console.log("NO ENTRA :(");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        e.preventDefault();
    }

    render(){
        if(this.props.codAlum != ""){// ANTHONY
            return(
                <div>
                    {this.props.codAlum} 
                </div>
            )
        } else{
            return(
                <div>
                    
                </div>
            )
        }
    }

}

export default AR_CodigoAsignacion