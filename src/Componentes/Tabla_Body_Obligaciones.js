import React from 'react';
import '../App.css';
import CONFIG from '../Configuracion/Config';
import swal from 'sweetalert';
import Select from 'react-select';



class TablaBodyObligaciones extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      desabilitarEstado: true,
      desabilitarObligacion: true,
      desabilitarMoneda: true,
      desabilitarConcepto: true,
      desabilitar5: true,
      selectedOptionEstado: { value: this.props.data.val_estado, label: this.props.data.val_estado },
      selectedOptionObligacion: { value: this.props.data.val_tipo_oblig, label: this.props.data.val_tipo_oblig },
      selectedOptionMoneda: { value: this.props.data.val_moneda, label: this.props.data.val_moneda },
      selectedOptionConcepto: { value: this.props.data.val_concepto, label: this.props.data.val_concepto },
      idconcepto: '',
      idmoneda: '',
      array: this.props.datos,
      moneda: '',
      estado: '',
      isChecked: false,

     
      optionsEstado : [
        { value:'PENDIENTE', label: 'PENDIENTE' },
        { value:'CANCELADO', label: 'CANCELADO' }
      ],
    
      optionsTipoObligacion : [
        { value:'REPITENCIA', label: 'REPITENCIA' },
        { value:'MULTA', label: 'MULTA' }
      ],

      BD_Estado : [
        { id:1, label: 'PENDIENTE' },
        { id:2, label: 'CANCELADO' }
      ],
    
      BD_TipoObligacion : [
        { id: 1, label: 'REPITENCIA' },
        { id: 2, label: 'MULTA' }
      ],
    }
  }
  /*componentDidMount() {
    this.setState({
      selectedOptionEstado: { value: this.props.data.val_estado, label: this.props.data.val_estado },
      selectedOptionObligacion:{ value: this.props.data.val_tipo_oblig, label: this.props.data.val_tipo_oblig },
      selectedOptionMoneda: { value: this.props.data.val_moneda, label: this.props.data.val_moneda },
      selectedOptionConcepto: { value: this.props.data.val_concepto, label: this.props.data.val_concepto },
      /*selectedOptionEstado: { value: valorEstado, label: valorEstado },
      selectedOptionObligacion:{ value: valorTipoOb, label: valorTipoOb },
      selectedOptionMoneda: { value: valorMoneda, label: valorMoneda },
      selectedOptionConcepto: { value: valorConcepto, label: valorConcepto },
      /*idconcepto: this.idconcepto(this.props.pago.concepto),
      selectedOption2: { value: this.props.pago.moneda2, label: this.props.pago.moneda2 },
      selectedOption3: { value: this.props.pago.descripcion_ubi, label: this.props.pago.descripcion_ubi },
      selectedOption4: { value: this.props.pago.descripcion_tipo, label: this.props.pago.descripcion_tipo },
      idmoneda: this.idmoneda(this.props.pago.moneda2),
      estado: this.setEstado(this.props.pago.estado),
      isChecked: this.props.pago.validado,*//*
    });
  }*/

  ActualizarDatos =()=> {

    var valorTipoOb="";
    var valorConcepto="";
    var valorMoneda="";
    var valorEstado="";

      console.log("Tamaño TipoOblig");
      console.log(this.state.BD_TipoObligacion.length);
      for(let i=0;i<this.state.BD_TipoObligacion.length;i++){
        if(this.props.data.id_tipo_oblig==this.state.BD_TipoObligacion[i].id){
          valorTipoOb=this.state.BD_TipoObligacion[i].label;
          console.log("valorTipoOb");
          console.log(valorTipoOb);
        }
      }
      

      /*console.log("Tamaño Concepto");
      console.log(this.props.dataConcepto.length);
      for(let i=0;i<this.props.dataConcepto.length;i++){
        if(this.props.data.id_concepto==this.props.dataConcepto[i].idConcepto){
          valorConcepto=this.props.dataConcepto[i].concepto;
          console.log("valorConcepto");
          console.log(valorConcepto);
        }
      }*/
      this.props.dataConcepto.map((data)=>
      {if(this.props.data.id_concepto==data.idConcepto){
        valorConcepto=data.concepto;
        console.log("valorConcepto");
        console.log(valorConcepto);
      }}
      )
      /*console.log("Tamaño Moneda");
      console.log(this.props.dataMoneda.length);
      for(let i=0;i<this.props.dataMoneda.length;i++){
        if(this.props.data.id_moneda==this.props.dataMoneda[i].id_moneda){
          valorMoneda=this.props.dataMoneda[i].moneda;
          console.log("valorMoneda");
          console.log(valorMoneda);
        }
      }*/
      this.props.dataMoneda.map((data)=>
      {if(this.props.data.id_moneda==data.id_moneda){
        valorMoneda=data.moneda;
        console.log("valorMoneda");
        console.log(valorMoneda);
      }}
      )
      console.log("Tamaño Estado");
      console.log(this.state.BD_Estado.length);
      for(let i=0;i<this.state.BD_Estado.length;i++){
        if(this.props.data.id_estado==this.state.BD_Estado[i].id){
          valorEstado=this.state.BD_Estado[i].label;
          console.log("valorEstado");
          console.log(valorEstado);
        }
      }

    this.setState({
      selectedOptionEstado: { value: valorEstado, label: valorEstado },
      selectedOptionObligacion:{ value: valorTipoOb, label: valorTipoOb },
      selectedOptionMoneda: { value: valorMoneda, label: valorMoneda },
      selectedOptionConcepto: { value: valorConcepto, label: valorConcepto },
      /*idconcepto: this.idconcepto(this.props.pago.concepto),
      selectedOption2: { value: this.props.pago.moneda2, label: this.props.pago.moneda2 },
      selectedOption3: { value: this.props.pago.descripcion_ubi, label: this.props.pago.descripcion_ubi },
      selectedOption4: { value: this.props.pago.descripcion_tipo, label: this.props.pago.descripcion_tipo },
      idmoneda: this.idmoneda(this.props.pago.moneda2),
      estado: this.setEstado(this.props.pago.estado),
      isChecked: this.props.pago.validado,*/
    });
    

    /*if (this.props.pago.moneda2 == 'DOL') {
      this.setState({
        moneda: '$. '
      })
    }
    else {
      this.setState({
        moneda: 'S/. '
      })
    }*/

  }

  handleChangeEstado = (selectedOptionEstado) => {

    if (selectedOptionEstado != null) {

      this.setState({
        selectedOptionEstado: selectedOptionEstado,
        //idconcepto: this.idconcepto(selectedOption.value)
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idconcepto(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }
  handleChangeObligacion = (selectedOptionObligacion) => {

    if (selectedOptionObligacion != null) {

      this.setState({
        selectedOptionObligacion: selectedOptionObligacion,
        //idconcepto: this.idconcepto(selectedOption.value)
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idconcepto(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }

  handleChangeMoneda = (selectedOptionMoneda) => {

    if (selectedOptionMoneda != null) {

      this.setState({
        selectedOptionMoneda: selectedOptionMoneda,
        //idconcepto: this.idconcepto(selectedOption.value)
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idconcepto(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }
  handleChangeConcepto = (selectedOptionConcepto) => {

    if (selectedOptionConcepto != null) {

      this.setState({
        selectedOptionConcepto: selectedOptionConcepto,
        //idconcepto: this.idconcepto(selectedOption.value)
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idconcepto(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }

 
  EditarObligacion = () =>{
    
    var editDescripcion="Descripcion"+this.props.data.id;
    var editImporte = "Importe"+this.props.data.id;

    this.setState({
      desabilitarEstado: false,
      desabilitarObligacion:false,
      desabilitarMoneda:false,
      desabilitarConcepto:false,
    })

    document.getElementById(editDescripcion).value = this.props.data.descripcion;
    document.getElementById(editDescripcion).disabled = false;
      document.getElementById(editDescripcion).style.background = '#F2F2F2';
      document.getElementById(editDescripcion).focus();

      document.getElementById(editImporte).value = this.props.data.importe;
    document.getElementById(editImporte).disabled = false;
      document.getElementById(editImporte).style.background = '#F2F2F2';
      document.getElementById(editImporte).focus();


  }
  GuardarObligacion= () =>{

   // var conceptoG = "";
     // conceptoG = this.SeleccionConcepto();
     var id_tipo=null;
     var id_concepto=null;
     var id_moneda=null;
     var id_estado=null;
     var valorDescrip="";
     var valorImporte="";

     document.getElementById("Descripcion"+this.props.data.id).disabled = true;
     document.getElementById("Importe"+this.props.data.id).disabled = true;
     this.setState({
      desabilitarEstado: true,
      desabilitarObligacion: true,
      desabilitarMoneda:true,
      desabilitarConcepto:true,
    })
    valorDescrip=document.getElementById("Descripcion"+this.props.data.id).value;
    valorImporte=document.getElementById("Importe"+this.props.data.id).value;


    console.log("Tamaño TipoOblig");
      console.log(this.state.BD_TipoObligacion.length);
      for(let i=0;i<this.state.BD_TipoObligacion.length;i++){
        if(this.state.selectedOptionObligacion.value==this.state.BD_TipoObligacion[i].label){
          id_tipo=this.state.BD_TipoObligacion[i].id;
          console.log("id_tipo");
          console.log(id_tipo);
        }
      }
      console.log("Tamaño Concepto");
      console.log(this.props.dataConcepto.length);
      for(let i=0;i<this.props.dataConcepto.length;i++){
        if(this.state.selectedOptionConcepto.value==this.props.dataConcepto[i].concepto){
          id_concepto=this.props.dataConcepto[i].idConcepto;
          console.log("id_concepto");
          console.log(id_concepto);
        }
      }
      console.log("Tamaño Moneda");
      console.log(this.props.dataMoneda.length);
      for(let i=0;i<this.props.dataMoneda.length;i++){
        if(this.state.selectedOptionMoneda.value==this.props.dataMoneda[i].moneda){
          id_moneda=this.props.dataMoneda[i].id_moneda;
          console.log("id_moneda");
          console.log(id_moneda);
        }
      }
      console.log("Tamaño Estado");
      console.log(this.state.BD_Estado.length);
      for(let i=0;i<this.state.BD_Estado.length;i++){
        if(this.state.selectedOptionEstado.value==this.state.BD_Estado[i].label){
          id_estado=this.state.BD_Estado[i].id;
          console.log("id_estado");
          console.log(id_estado);
        }
      }

      fetch(CONFIG+'importealumnoobligaciones/update',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(
            {
              "id_importe_alumno_obligaciones":this.props.data.id,
              "cod_alumno": this.props.codAlumno,
              "cod_programa": this.props.codPrograma,
              "cod_concepto": id_concepto,
              "importe": valorImporte,
              "id_tipo_obligacion":id_tipo,
              "id_moneda":id_moneda, 
              "id_tobligacion_estado":id_estado,
              "descripcion":valorDescrip,
            }

          )
        }
        ).then((response) => {
          return response.json()
        })
        .catch(error => {

          swal("Oops, Algo salió mal!!", "", "error")
          console.error(error)
        });
        
    console.log("Tipo Oblogacion");
    console.log(this.state.selectedOptionObligacion.value);
    console.log("Descripcion");
    console.log(document.getElementById("Descripcion"+this.props.data.id).value);
    console.log("Concepto");
    console.log(this.state.selectedOptionConcepto.value);
    console.log("Moneda");
    console.log(this.state.selectedOptionMoneda.value);
    console.log("Importe");
    console.log(document.getElementById("Importe"+this.props.data.id).value);
    console.log("Estado");
    console.log(this.state.selectedOptionEstado.value);
        window.location.reload();
  
  }

  SeleccionConcepto = () => {

   

  }

  render() {
    return(
      <tr>
            <td className="td">
              <Select

                id="tipoObligacion"
                className="tipoObligacion"
                value={this.state.selectedOptionObligacion}
                onChange={this.handleChangeObligacion}
                options= {this.state.optionsTipoObligacion}
                disabled={this.state.desabilitarObligacion}
                //autofocus

                />
            </td>
            <td className="td">
              <form action="#" >
                <label className="center-xs color_white">
                  <input
                    id={"Descripcion"+this.props.data.id}
                    placeholder={this.props.data.descripcion}
                    disabled="true"
                    type="text" />
                  <span> </span>
                </label>
              </form>
            </td>
            <td className="td">
              <Select

                id="concepto"
                className="concepto"
                value={this.state.selectedOptionConcepto}
                onChange={this.handleChangeConcepto}
                options= {this.props.conceptoVL}
                disabled={this.state.desabilitarConcepto}
                //autofocus

                />
            </td>
            <td className="td">
              <Select

                id="moneda"
                className="moneda"
                value={this.state.selectedOptionMoneda}
                onChange={this.handleChangeMoneda}
                options= {this.props.monedaVL}
                disabled={this.state.desabilitarMoneda}
                //autofocus

                />
            </td>
            <td className="td">
              <form action="#" >
                <label className="center-xs color_white">
                  <input
                    id={"Importe"+this.props.data.id}
                    placeholder={this.props.data.importe}
                    disabled="true"
                    type="number" />
                  <span> </span>
                </label>
              </form>
            </td>
            <td className="td">
            <Select

                id="estado"
                className="estado"
                value={this.state.selectedOptionEstado}
                onChange={this.handleChangeEstado}
                options= {this.state.optionsEstado}
                disabled={this.state.desabilitarEstado}
                //autofocus

                />
              </td>
            
            <td className="thVacio" >
            <button onClick={this.EditarObligacion} className="waves-effect waves-light btn-small"><i className="large material-icons center">edit</i></button>
            <button onClick={this.GuardarObligacion} className="waves-effect waves-light btn-small"><i className="large material-icons center">save</i></button></td>
        </tr>
    )
  }   
}

export default TablaBodyObligaciones;
