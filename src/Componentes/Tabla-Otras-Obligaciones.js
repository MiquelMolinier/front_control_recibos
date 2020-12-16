import React from 'react';
import '../App.css';
import Select from 'react-select';
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config';
import {
  ModalFooter, ModalBody, ModalHeader, Modal, Button
} from 'reactstrap';
import TablaBodyObligaciones from './Tabla_Body_Obligaciones';

class TablaOtrasObligaciones extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      tipoObligacion:"",
      tipoMoneda:"",
      tipoConcepto:"",
      showAgregarObligacion:false,
      
      tipoConceptoInput:{value:"-1",label:"Escoga un Concepto de Pago"},

      tipoObligacionInput:{value:"-1",label:"Escoga un Tipo de Obligación"},
      optionsTipoObligacion:[{value:"repitencia",label:"Repitencia"},
                            {value:"multa",label:"Multa"}
                             ],

      

      tipoMonedaInput:{value:"-1",label:"Escoga un Tipo de Moneda"},
      

    }
    
    this.mostrarAgregarObligacion=this.mostrarAgregarObligacion.bind(this);
  }

    
    

    mostrarAgregarObligacion = () => {
      this.setState({
        showAgregarObligacion:true
      });
    }
  
    closeModal = () => {
      this.setState({
        showAgregarObligacion:false
      });
    }
    handleChangeSelectTipoObligacion = (tipo) => {
   
      if(tipo!== null){
        this.setState({
          tipoObligacionInput:tipo,
          tipoObligacion:tipo
        });
      }
  
    }
    handleChangeSelectTipoMoneda = (tipo) => {
   
      if(tipo!== null){
        this.setState({
          tipoMonedaInput:tipo,
          tipoMoneda:tipo
        });
      }
  
    }

    handleChangeSelectTipoConcepto = (tipo) => {
   
      if(tipo!== null){
        this.setState({
          tipoConceptoInput:tipo,
          tipoConcepto:tipo
        });
      }
  
    }

    guardarCambios = () => {
      var descripcion =  document.getElementById("descripcion").value;
      var importe =  document.getElementById("importe").value;
      var estado ="Pendiente";
      var id_tipo=0;
      var id_moneda="";
      var id_estado=0;
      var id_concepto=0;

      if(this.state.tipoObligacion.label=="Repitencia"){
        id_tipo=1;
      }else if(this.state.tipoObligacion.label=="Multa"){
        id_tipo=2;
      }
      
      if(estado=="Pendiente"){
        id_estado=1;
      }else if(estado=="Cancelado"){
        id_estado=2;
      }
      console.log("TamañoMoneda");
      console.log(this.props.dataMoneda.length);
      for(let i=0;i<this.props.dataMoneda.length;i++){
        if(this.state.tipoMoneda.value==this.props.dataMoneda[i].moneda){
          id_moneda=this.props.dataMoneda[i].id_moneda;
          console.log("IdMoneda");
          console.log(id_moneda);
        }
      }
      console.log("Tamaño Concepto");
      console.log(this.props.dataConcepto.length);
      for(let i=0;i<this.props.dataConcepto.length;i++){
        if(this.state.tipoConcepto.value==this.props.dataConcepto[i].concepto){
          id_concepto=this.props.dataConcepto[i].idConcepto;
          console.log("IdMoneda");
          console.log(id_concepto);
        }
      }
      /*for(let i=0;i<this.props.dataConcepto.length;i++){
        if(this.state.tipoMoneda.value==this.props.dataConcepto.concepto){
          id_=this.props.dataConcepto.idConcepto;
          console.log(id_moneda);
        }
      }*/
      this.props.dataConcepto.map((data)=>
      {if(this.state.tipoConcepto.value==data.concepto){
        console.log("Concep");
        console.log(data.concepto);
        console.log("IdConcepto");
        console.log(data.idConcepto);
      }}
      )

      console.log("Tipo Oblogacion");
      console.log(this.state.tipoObligacion.label);
      console.log("Descripcion");
      console.log(descripcion);
      console.log("Concepto");
      console.log(id_concepto);
      console.log("Moneda");
      console.log(this.state.tipoMoneda.value);
      console.log("Importe");
      console.log(importe);


          fetch(CONFIG+'importealumnoobligaciones/add',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(
          {
            "id_importe_alumno_obligaciones":1,
            "cod_alumno": this.props.codAlumno,
            "cod_programa": this.props.codPrograma,
            "cod_concepto": id_concepto,
            "importe": importe,
            "id_tipo_obligacion":id_tipo,
            "id_moneda":id_moneda,
            "id_tobligacion_estado":id_estado,
            "descripcion":descripcion

          }

        )
      }
      ).then((response) => {
        return response.json()
        
      }
      )
      

      this.setState({
        showAgregarObligacion:false
      });
      window.location.reload();
    }
    
  render() {
    return(

<div>



              <Modal isOpen={this.state.showAgregarObligacion} toggle={this.closeModal}  
                  aria-labelledby="contained-modal-title-vcenter">
                  <div>
                  <ModalHeader toggle={this.closeModal}>Nuevo Pago</ModalHeader>
                    <ModalBody>
                      <h6 align="left" className="Alumno"><b>Tipo de Obligación:</b></h6>
                      <Select
                            name="tipoObligacionInput"
                            id="tipoObligacionInput"
                            placeholder="Seleccione un tipo de obligación"
                            value={this.state.tipoObligacionInput}
                            onChange={this.handleChangeSelectTipoObligacion}
                            options={this.state.optionsTipoObligacion}
                          />
                      <h6 align="left" className="Alumno"><b>Descripción:</b></h6>
                      <b className="importe"><input id ="descripcion"  type="text" /></b>
                      <h6 align="left" className="Alumno"><b>Concepto:</b></h6>
                      <Select
                            name="tipoConceptoInput"
                            id="tipoConceptoInput"
                            placeholder="Seleccione un tipo de concepto"
                            value={this.state.tipoConceptoInput}
                            onChange={this.handleChangeSelectTipoConcepto}
                            options={this.props.conceptoVL}
                          />
                      <h6 align="left" className="Alumno"><b>Moneda:</b></h6>
                      <Select
                            name="tipoMonedaInput"
                            id="tipoMonedaInput"
                            placeholder="Seleccione un tipo de moneda"
                            value={this.state.tipoMonedaInput}
                            onChange={this.handleChangeSelectTipoMoneda}
                            options={this.props.monedaVL}
                          />
                      <h6 align="left" className="Alumno"><b>Importe:</b></h6>
                      <b className="importe"><input id ="importe"  type="text" /></b>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="green" onClick={this.guardarCambios}>Guardar</Button><p>         </p>
                      <Button color="secondary" onClick={this.closeModal}>Salir</Button>
                  </ModalFooter>
                </div>      
              </Modal>


<table className="tableImporte">

        <tr >
            <th className="thLabel">OTRAS OBLIGACIONES PENDIENTES DE PAGO</th>
        </tr>

        <tr className="trTable">
                  <td className="tdTable">
                    <table className="tableImporte" >

    <thead>
        
        <tr>
            <th className="th">OBLIGACIÓN</th>
            <th className="th">DESCRIPCIÓN</th>
            <th className="th">CONCEPTO</th>
            <th className="th">MONEDA</th>
            <th className="th">IMPORTE</th>
            <th className="th">ESTADO</th>
            <th className="thVacio" >
              {localStorage.getItem('tipo')=='alumno' ? '' : <button onClick={this.mostrarAgregarObligacion} className="waves-effect waves-light btn-small"><i className="large material-icons center">add</i></button>}

                </th>
                  
        </tr>
    </thead>   
    <tbody>
        {/*this.props.datosPrograma.map((data)=>
        <tr>
            <td className="td">{data.benef_otrogado}</td>
            <td className="td">{data.autorizacion}</td>
            <td className="td">{data.condicion}</td>
            <td className="td">{data.fecha}</td>
            <td className="td">{data.resolucion}</td>
            <td className="td">{data.resolucion}</td>
            
            <td className="thVacio" id={data.benef_otrogado}>
            <button onClick={this.CancelarObligacion} className="waves-effect waves-light btn-small"><i className="large material-icons center">coin</i></button>
            </td>
        </tr>
        )*/}

        {
            this.props.otrasObligaciones.map((data) => {
              return <TablaBodyObligaciones data={data} codAlumno={this.props.codAlumno} codPrograma={this.props.codPrograma} dataConcepto={this.props.dataConcepto} conceptoVL={this.props.conceptoVL} dataMoneda={this.props.dataMoneda} monedaVL ={this.props.monedaVL} />
            })
            
          }
          

    </tbody>
    
                    </table>
                  </td>
          </tr>
    </table>
    
    </div>

    )
  }
}

export default TablaOtrasObligaciones