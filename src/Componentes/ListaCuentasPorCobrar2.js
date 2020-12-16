import React,{Component} from 'react';
import {
    ModalFooter, ModalBody, ModalHeader, Modal, Button,Input, Container, Row, Col, Label 
  } from 'reactstrap';
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListaCuentasPorCobrar2 extends Component{ 


    constructor(props){
        super(props)
        this.state={
            correoEnvio:'upg.fisi@unmsm.edu.pe',
            mostrarModal:false,
            filasSelec:[],
            notificacionCorre:{},
            numNotifi: 0,
            numCorrelativo:0, //este es el numero con el que se empieza
            //asuntoEnvio:'UPG - NOTIFICACION DEUDA  N°',
            asuntoEnvio:'UPG - ESTADO DE PAGOS  N°',
            descripcionEnvio: '',
            //footerEnvio:'*Una vez realizado el pago debe entregar el recibo en la Oficina de la Unidad de Posgrado. \n \n \n Atte,Unidad de Posgrado',
            footerEnvio:'*Una vez realizado el depósito debe registrarlo en el formulario electrónico: https://bit.ly/35fp6SW. \n \n \n Atte, Unidad de Posgrado',
            fechaEnvio:'',

            agregarDias:0,
            loading:false

                
        }
    }
/****************************************** */
    componentWillMount =() =>{
        this.recogerNotificacionCorrelativos();
        let aumentarDias=0;
        //const mensajeAntesFecha = 'Previo cordial saludo, le informamos que mantiene deuda pendiente de pago a la Unidad de Posgrado de la Facultad de Ingeniería de Sistemas e Informatica.Por lo expuesto le exhortamos a realizar la cancelación de deuda según se indica, teniendo como plazo máximo el día ';
        const mensajeAntesFecha = 'Previo cordial saludo, le informamos que mantiene deuda pendiente de pago a la Unidad de Posgrado de la Facultad de Ingeniería de Sistemas e Informatica. según se detalla: ';
        let fecha = "--Fecha--";
        fecha=this.sumarDias(aumentarDias);
        //const mensajePostFecha=' pasado el plazo indicado se procederá a informar a las dependencias pertinentes con fines de cobranza.\n\n'
        const mensajePostFecha=' Por la emergencia sanitaria puede realizar sus pagos en la cuenta BCP de la UNMSM Cta. Cte. N° 191-0215772014 / CCI N° 002-191-00021577201451 mediante transferencia bancaria, interbancaria, depósitos en ventanilla, cajero, o agente. En el voucher debe reflejar su dni, código de estudiante. Los pagos errados son de entera responsabilidad del estudiante. Asimismo puede continuar realizando sus pagos en agencia (ventanilla, no agente) del Banco Pichincha al número de cuenta UNMSM: 270016684 y conceptos según corresponda, al acercarse a la ventanilla del banco, brinde su código de estudiante del programa que estudia, antes de retirarse de la ventanilla revise su voucher. Los pagos a conceptos errados son de entera responsabilidad del estudiante.'
        //const body = mensajeAntesFecha+fecha+mensajePostFecha;
        const body = mensajeAntesFecha+mensajePostFecha;

        this.setState({
            descripcionEnvio:body,

        })
    }

    // aplicarNuevaFecha = e=>{
    //     const mensajeAntesFecha = 'Previo cordial saludo, le informamos que mantiene deuda pendiente de pago a la Unidad de Posgrado de la Facultad de Ingeniería de Sistemas e Informatica.Por lo expuesto le exhortamos a realizar la cancelación de deuda según se indica, teniendo como plazo máximo el día ';
    //     let fechaSinFormato=this.state.fechaEnvio;
    //     let fechaConFormato=this.sumarDias();
    //     const mensajePostFecha=' pasado el plazo indicado se procederá a informar a las dependencias pertinentes con fines de cobranza.\n\n'
    // }
/****************************************** */
     sumarDias = (dias)=>{
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
        var f=new Date();
        f.setDate(f.getDate() + parseInt( dias));
        let fechaFormateada=diasSemana[f.getDay()] + ", " + (f.getDate()) + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
        
        return fechaFormateada;
      }
      

      mostrarAgregarDias = (dias) => {
        
        //const mensajeAntesFecha = 'Previo cordial saludo, le informamos que mantiene deuda pendiente de pago a la Unidad de Posgrado de la Facultad de Ingeniería de Sistemas e Informatica.Por lo expuesto le exhortamos a realizar la cancelación de deuda según se indica, teniendo como plazo máximo el día ';
        const mensajeAntesFecha = 'Previo cordial saludo, le informamos que mantiene deuda pendiente de pago a la Unidad de Posgrado de la Facultad de Ingeniería de Sistemas e Informatica. según se detalla: ';
        let fecha = "--Fecha--";
        fecha=this.sumarDias(dias);
        
        //const mensajePostFecha=' pasado el plazo indicado se procederá a informar a las dependencias pertinentes con fines de cobranza.\n\n'

        const mensajePostFecha=' Por la emergencia sanitaria puede realizar sus pagos en la cuenta BCP de la UNMSM Cta. Cte. N° 191-0215772014 / CCI N° 002-191-00021577201451 mediante transferencia bancaria, interbancaria, depósitos en ventanilla, cajero, o agente. En el voucher debe reflejar su dni, código de estudiante. Los pagos errados son de entera responsabilidad del estudiante. Asimismo puede continuar realizando sus pagos en agencia (ventanilla, no agente) del Banco Pichincha al número de cuenta UNMSM: 270016684 y conceptos según corresponda, al acercarse a la ventanilla del banco, brinde su código de estudiante del programa que estudia, antes de retirarse de la ventanilla revise su voucher. Los pagos a conceptos errados son de entera responsabilidad del estudiante.'

        //const body = mensajeAntesFecha+fecha+mensajePostFecha;
        const body = mensajeAntesFecha+mensajePostFecha;        

        this.setState({
            descripcionEnvio:body,

        })
      }

/****************************************** */
      enviarMensaje = () =>{
        this.setState({loading:true})
        fetch(CONFIG+"mail/sendMail",{
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                from: this.state.correoEnvio,
                to: " ",
                subject: this.state.asuntoEnvio,
                body: this.state.descripcionEnvio,
                datos: JSON.stringify(this.state.filasSelec).toString(),
                footer:this.state.footerEnvio,
            })
            } )
            .then(()=>{
                swal("Enviado exitoso!", "", "success")
                this.setState({loading:false})
            })
            .catch((error)=>{
                swal("Hubo un error", "", "error")
            })

        
    }
/****************************************** */

  
    openModal = () => {
        this.setState({
            
          mostrarModal:true
        });
      }  

/****************************************** */
    closeModal = () => {
        this.setState({
          mostrarModal:false
        });
      }
    
/****************************************** */
    seleccionarOrDesseleccionar = () =>{
    var lista = this.props.listaCuentasPorCobrar;
    console.log("la lista es ->",lista[0]);
    var checks=document.getElementsByClassName("checkbox1");
    let isSelected=false;

    for (let index = 0; index < checks.length; index++) {
        checks[index].checked=!checks[index].checked;
        isSelected=checks[index].checked;    
        if(isSelected){ // si lo tenemos seleccionado entonces agregemos el row
                
                this.agregarRow(lista[index]);
                
            
        }else{ // si no lo tenenmos seleccionado entonces quitemos el row
            
                this.quitarRow(lista[index]);
            
        }
    }   

    
        console.log("el state acutal es ->",this.state.filasSelec);
    
    
   }

/****************************************** */
   notificacionesElectronicas = () =>{

    
    this.openModal();
    
   }

/****************************************** */
  recogerNotificacionCorrelativos = () =>{
        fetch(CONFIG+"notificacion_correlativos/listar")
        .then(response=>{
            return response.json();
        })
        .then(respuesta=>{
            respuesta=respuesta[respuesta.length-1];
            let numCorrelativo=respuesta.n_correlativo;
            let anio=respuesta.anio;

            let numNotifi=numCorrelativo+anio;
            this.setState({
                notificacionCorre:respuesta,
                numNotifi,
                numCorrelativo
            })
        })
        .catch(error=>{
            console.err("hubo un error");
        })

    }

    
/****************************************** */
   guardarCambios = () =>{
    //   this.actualizarNotifiCorrelativos();
      this.enviarMensaje();
   }
   /****************************************** */
   
   actualizarNotifiCorrelativos = () =>{
    
    fetch(CONFIG+"notificacion_correlativos/actualizar",{
         headers: {
         'Content-Type': 'application/json'
         },
         method: "PUT",
         body: JSON.stringify({
             n_correlativo:this.state.numCorrelativo+1,
             anio:this.state.notificacionCorre.anio,
             l_ultimo:this.state.notificacionCorre.l_ultimo
         })
         } 
     )
     .catch(error=>{
         alert("Hubo un error");
     })
}
/****************************************** */
   insertarNotificacionDeudas = () =>{
    //    alert("se insertará en la tabla notificacion deudas");
    //    fetch(CONFIG+"notificacion_deudas/insertar",{
    //         headers: {
    //         'Content-Type': 'application/json'
    //         },
    //         method: "POST,
    //         body: JSON.stringify({
    //             cod_alumno:,
    //             id_programa:,
    //             n_notificacion:,
    //             anio_notificacion:,
    //             fecha_notificacion:,
    //             id_moneda:,
    //             id_concepto:,
    //             importe_deuda:,
    //             l_ultimo:,
    //         })
    //         } 
    //     )
    //     .catch(error=>{
    //         alert("Hubo un error");
    //     })
   }
   /****************************************** */

   agregarRow = (row) =>{
    this.setState((state) =>{
        return {filasSelec:[...state.filasSelec,row]};
    })
    
}
/****************************************** */
    quitarRow = (row) =>{
    // const filasSelecActuales= [...this.state.filasSelec];
    this.setState((state)=>{
        return {filasSelec:[...state.filasSelec].filter(fila=> JSON.stringify(row) != JSON.stringify(fila) )}
    })
}
/****************************************** */
    agregarOquitarRow = (row) =>{
        let isChecked=this.state.filasSelec.includes(row)
        if(!isChecked){
            this.agregarRow(row);
            
        }else{
            this.quitarRow(row);
        }
    }
/****************************************** */
setField = (e) => {
    this.setState({ [e.target.name]: e.target.value })
}
/****************************************** */
   modal = () =>{
       const {loading} = this.state;
        return (
            <Modal className="modal-lg" isOpen={this.state.mostrarModal} toggle={this.closeModal}  
                      aria-labelledby="contained-modal-title-vcenter">
                      <div>
                      <ModalHeader toggle={this.closeModal}>Notificaciones Electronicas</ModalHeader>
                        <ModalBody>
                            
                                <Row>
                                    <Col sm="3">
                                        <h6><b>Asunto</b></h6>
                                    </Col>
                                    <Col sm="9">
                                        <Input type="text" name="asuntoEnvio" defaultValue={this.state.asuntoEnvio} onChange={(e)=>this.setField(e)} /> 
                                    </Col>
    
                                </Row>
                                
                                
                                <Row> 
                                    <h6 align="left" className=""><b>Descripcion</b></h6>
                                    <Input type="textarea" rows="10" name="descripcionEnvio"  value={this.state.descripcionEnvio} onChange={(e)=>this.setField(e)}/>
                                </Row>
                                <br />
                                <br />
                                <Row> 
                                    <Col sm="3" >
                                    <Label><h6 align="left" className=""><b>Agregar Dias</b></h6></Label>
                                    </Col>
                                    <Col sm="3">
                                    <Input type="number" name="descripcionEnvio" name="agregarDias" value={this.state.agregarDias} onChange={(e)=>this.setField(e)} />     
                                    </Col>
                                    <Col sm="3">
                                    <Button className="btn btn-danger" onClick={()=>this.mostrarAgregarDias(this.state.agregarDias)}>Agregar</Button>
                                    </Col>
                                </Row>
                          
                          
                        </ModalBody>
                        <ModalFooter>
                          <Button color="green" onClick={this.guardarCambios} disabled={this.state.loading}>
                            {  loading && <span>Cargando ....</span>}
                            {  !loading && <span>Enviar</span>}
                              </Button><p></p>
                          <Button color="secondary" onClick={this.closeModal}>Salir</Button>
                      </ModalFooter>
                    </div>      
                  </Modal>
    
    
           )
       }
       
   

   
/****************************************** */

   render(){
    let listaCuenXCob=this.props.listaCuentasPorCobrar;
    return(
        <div className="">
            <button onClick={this.seleccionarOrDesseleccionar} className="waves-effect waves-light btn-small newbotonSeleccionar start mt-1">
            Seleccionar todo<i className="large material-icons left">check</i> ></button>

            <button onClick={this.notificacionesElectronicas} className="waves-effect waves-light btn-small newbotonSeleccionar start mt-1" disabled={this.state.filasSelec.length==0 ? true : false}>
            Notificar<i className="large material-icons left" >check</i> ></button>
            
            <hr></hr>
            <hr></hr>
            {/* ********************************************************** */}
            {this.modal()}
            {/* ********************************************************** */}
            <table className="table">
            <thead>
                <tr>
                    <th className="th">#</th>
                    <th className="th">Cod Alumno</th>
                    <th className="th">Id de Programa</th>
                    <th className="th">Ape. Paterno</th>
                    <th className="th">Ape. Materno</th>
                    <th className="th">Nom. alumno</th>
                    <th className="th">Numero Prioridad</th>
                    <th className="th">Sigla Programa</th>
                    <th className="th">Año de Ingreso</th>
                    <th className="th">Codigo perm</th>
                    <th className="th">Max. años de estudio</th>
                    <th className="th">Beneficio Otorgado</th>
                    <th className="th">Autorizacion</th>
                    <th className="th">Moneda</th>
                    <th className="th">Prioridad</th>
                    <th className="th">Id de Concepto</th>
                    <th className="th">concepto</th>
                    <th className="th">Descrip. minima</th>
                    <th className="th">Importe por Pagar</th>
                    <th className="th">Importe Pagado</th>
                    <th className="th">Deuda</th>
                    <th className="th">Notificacion Deuda</th>
                    <th className="th">Deuda estado</th>
                    <th className="th">verificar</th>
                    <th className="th">estado</th>
                    <th className="th">Correo electronico </th>
                    <th className="th">Correo electronico Personal</th>
                    <th className="th">Telefono movil</th>
                    <th className="th">Telefono Fijo</th>
                    <th className="th">Tipo de  Identidad</th>
                    <th className="th">Doc. Identidad Alumno</th>
                    <th className="th">Dir_tip_via</th>
                    <th className="th">Dir_tip_via_nom</th>
                    <th className="th">Direccion numero Puerta</th>
                    <th className="th">Direccion numero piso</th>
                    <th className="th">Direccion numero Departamento</th>
                    <th className="th">Direccion numero Manzana</th>
                    <th className="th">Direccion numero lote</th>
                    <th className="th">Direccion numero Km</th>
                    <th className="th">Dir tip loc</th>
                    <th className="th">Direccion tip loc nom</th>
                    <th className="th">Departamento</th>
                    <th className="th">Provincia</th>
                    <th className="th">Distrito</th>



                </tr>
            </thead>
            <tbody>
                {listaCuenXCob.map((row,key)=>(
                    <tr key={key}>
                        <td className="td">{key+1}</td>
                        <td className="td">{row.cod_alumno}</td>
                        <td className="td">{row.id_programa}</td>
                        <td className="td">{row.ape_paterno}</td>
                        <td className="td">{row.ape_materno}</td>
                        <td className="td">{row.nom_alumno}</td>
                        <td className="td">{row.n_prioridad}</td>
                        <td className="td">{row.sigla_programa}</td>
                        <td className="td">{row.anio_ingreso}</td>
                        <td className="td">{row.cod_perm}</td>
                        <td className="td">{row.max_anio_estudio}</td>
                        <td className="td">{row.beneficio_otorgado}</td>
                        <td className="td">{row.autorizacion}</td>
                        <td className="td">{row.moneda}</td>
                        <td className="td">{row.n_prioridad2}</td>
                        <td className="td">{row.id_concepto}</td>
                        <td className="td">{row.concepto}</td>
                        <td className="td">{row.descripcion_min}</td>
                        <td className="td">{row.importe_xpagar}</td>
                        <td className="td">{row.importe_pagado}</td>
                        <td className="td">{row.deuda}</td>
                        <td className="td">{row.notificacion_deuda}</td>
                        <td className="td">{row.deuda_estado} {!row.deuda_estado && <span>--</span> }</td>

                        <td className="td">
                        <form action="#">
                            <label className="row center-xs color_white">
                            <input
                                onClick={()=>
                                    {this.agregarOquitarRow(row)}
                                }
                                className="checkbox1"
                                
                                type="checkbox" />
                                <span> </span>
                            </label>
                        </form>
                        </td>

                        <td className="td">{row.estado}</td>
                        <td className="td">{row.coe_alumno}</td>
                        <td className="td">{row.coe_alu_personal}</td>
                        <td className="td">{row.tel_alu_movil}</td>
                        <td className="td">{row.tel_alumno}</td>
                        <td className="td">{row.des_doc_identidad}</td>
                        <td className="td">{row.did_alumno}</td>
                        <td className="td">{row.dir_tip_via}</td>
                        <td className="td">{row.dir_tip_via_nom}</td>
                        <td className="td">{row.dir_num_puerta}</td>
                        <td className="td">{row.dir_num_piso}</td>
                        <td className="td">{row.dir_num_dpto}</td>
                        <td className="td">{row.dir_num_mz}</td>
                        <td className="td">{row.dir_num_lote}</td>
                        <td className="td">{row.dir_num_km}</td>
                        <td className="td">{row.dir_tip_loc}</td>
                        <td className="td">{row.dir_tip_loc_nom}</td>
                        <td className="td">{row.departamento}</td>
                        <td className="td">{row.provincia}</td>
                        <td className="td">{row.distrito}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    
        
        </div>
      )
   }
    
}
export default ListaCuentasPorCobrar2;
