import React from 'react'
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';
import Select from 'react-select';




class PagoRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      desabilitar: true,
      desabilitar2: true,
      desabilitar3: true,
      desabilitar4: true,
      desabilitar5: true,
      desabilitar6: true,
      desablilitarTipoRecaudacion:true,
      selectedOption: null,
      selectedOption2: null,
      selectedOption3: null,
      selectedOption4: null,
      selectedOption5: null,
      selectedOption6: null,
      selectedIdTipoRecaudacion:null,
      idconcepto: '',
      idmoneda: '',
      array: this.props.datos,
      moneda: '',
      estado: '',
      isChecked: false,
      tipo_recaudacion:[]


    }
  }

    componentWillMount(){
      let id= this.props.pago.id_tipo_recaudacion;
      let tiposRecaudacion=this.props.tipo_recaudacion;
      let tiposConvertidos=[];
      tiposRecaudacion.forEach(element => {
        
          let object = {
            label:element.desc_tipo_recaudacion,
            value:element.id_tipo_recaudacion
          }
          if(id==element.id_tipo_recaudacion){
            this.setState({
              selectedIdTipoRecaudacion:object
          })}

          tiposConvertidos.push(object);
      });

      this.setState({
        tipo_recaudacion:tiposConvertidos
      })

    }



  componentDidMount() {
    // if(this.props.pago.estado=="M"){
    //   this.setState({
    //     desabilitar:false
    //   })


    // }

    this.setState({
      selectedOption: { value: this.props.pago.concepto, label: this.props.pago.concepto },
      idconcepto: this.idconcepto(this.props.pago.concepto),
      selectedOption2: { value: this.props.pago.moneda2, label: this.props.pago.moneda2 },
      selectedOption3: { value: this.props.pago.descripcion_ubi, label: this.props.pago.descripcion_ubi },
      selectedOption4: { value: this.props.pago.descripcion_tipo, label: this.props.pago.descripcion_tipo },
      selectedOption6: { value: this.props.pago.repitencia, label: this.props.pago.repitencia=='S' ? 'SI' : 'NO'},
      
      
      idmoneda: this.idmoneda(this.props.pago.moneda2),
      estado: this.setEstado(this.props.pago.estado),
      isChecked: this.props.pago.validado,
    });

    if (this.props.pago.moneda2 == 'DOL') {
      this.setState({
        moneda: '$. '
      })
    }
    else {
      this.setState({
        moneda: 'S/. '
      })
    }

  }

    idconcepto(valor) {

    let id_concepto = "";
    // console.log("valor:  "+valor);
    // console.log("tamaño " +this.state.array.length)  ;

    for (let i = 0; i < this.props.datos.length; i++) {
      if (valor.trim() == this.props.datos[i].concepto.trim()) {
        id_concepto = this.props.datos[i].idConcepto;
        //  console.log("el valor" +valor +"es igual a"+this.props.datos[i].concepto);
      }

    }
    // console.log("el concepto es : "+id_concepto);
    return id_concepto;
  }

  idmoneda(valor) {
    // console.log("MONEDAS");
    let id_moneda = "";
    // console.log("tamaño " +this.props.datosmonedas.length)  ;
    // console.log("moneda 1" +this.props.datosmonedas[1].moneda)  ;
    // console.log("valor_monedas:  "+valor);

    for (let i = 0; i < this.props.datosmonedas.length; i++) {

      if (valor == this.props.datosmonedas[i].moneda) {
        id_moneda = this.props.datosmonedas[i].id_moneda;
        //  console.log("el valor la moneda" +valor +"es igual a "+this.props.datosmonedas[i].id_moneda);
      }


    }
    // console.log("la moneda es  : "+id_moneda);
    return id_moneda;

  }

  setEstado(valor) {
    if (valor == null) {
      return 'REMITIDO'
    }
    else {
      return 'DIGITADO'
    }
  }

  componentWillUpdate() {
    //console.log("idconcepto : "+this.state.idconcepto);
  }

  handleChange = (selectedOption) => {

    if (selectedOption != null) {

      this.setState({
        selectedOption: selectedOption,
        idconcepto: this.idconcepto(selectedOption.value)
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idconcepto(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }
  handleChange2 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption2: selectedOption,
        idmoneda: this.idmoneda(selectedOption.value)
      });

      if (selectedOption.value == 'DOL') {
        this.setState({
          moneda: '$. '
        })
      }
      else {
        this.setState({
          moneda: 'S/. '
        })

      }


      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idmoneda(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }

  handleChange3 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption3: selectedOption,
      });
       console.log(`Option selected:`, this.state.selectedOption3.value);
      // console.log("idconcepto : "+this.idmoneda(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }

  handleChange4 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption4: selectedOption,
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idmoneda(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }

  handleChange6 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption6: selectedOption,
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idmoneda(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }

  handleChangeIdTipoRecaudacion = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedIdTipoRecaudacion: selectedOption,
      });
      // console.log(`Option selected:`, selectedOption);
      // console.log("idconcepto : "+this.idmoneda(selectedOption.value));
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  }


  colocar = () => {
    var checkbox = document.getElementById(this.props.pago.idRec);
    console.log(checkbox.id);
    var checkboxID = checkbox.id;
    this.props.Funciones(checkboxID);
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  editarFila = () => {

    var estadoAlumno;
    estadoAlumno = this.props.pago.estado;

    var digitado = "N";
    var remitido = "N";

    for(let x = 0; x<this.props.configuraciones.length;x++){
      if(this.props.configuraciones[x].idConfiguracion == 5){
        remitido = this.props.configuraciones[x].estado;
      }
      else if(this.props.configuraciones[x].idConfiguracion == 6){
        digitado = this.props.configuraciones[x].estado;
      }
    }

    console.log("Digitado:" + digitado)
    console.log("Remitido:" + remitido)


    if (estadoAlumno == "M" && digitado == "S") {
      
      this.setState({
        desabilitar: false
      })

      this.setState({
        desabilitar2: false
      })


      var editFecha;
      var fechaEdit = this.props.pago.fecha;
      var anioFecha = fechaEdit.substring(0, 4);
      console.log("AÑO");
      console.log(anioFecha);

      var mesFecha = fechaEdit.substring(5, 7);
      console.log("MES");
      console.log(mesFecha);
      var diaFecha = fechaEdit.substring(8, 10);
      console.log("DIA");
      console.log(diaFecha);

      var fechaVolteada = diaFecha + "-" + mesFecha + "-" + anioFecha;

      editFecha = this.props.pago.idRec.toString() + this.props.pago.idAlum.toString();
      document.getElementById(editFecha).value = fechaVolteada;
      document.getElementById(editFecha).disabled = false;
      document.getElementById(editFecha).style.background = '#F2F2F2';


      var editCiclo;
      var num = 250296;
      editCiclo = this.props.pago.idRec.toString() + num.toString();
      var _ciclo_ = this.props.pago.ciclo;

      document.getElementById(editCiclo).value = _ciclo_;
      document.getElementById(editCiclo).disabled = false;
      document.getElementById(editCiclo).style.background = '#F2F2F2';
      document.getElementById(editCiclo).focus();

      var editImporte;
      num = 250296;
      editImporte = this.props.pago.idRec.toString() + num.toString() + "importe";
      var _importe_ = this.props.pago.importe;

      document.getElementById(editImporte).value = _importe_;
      document.getElementById(editImporte).disabled = false;
      document.getElementById(editImporte).style.background = '#F2F2F2';
      document.getElementById(editImporte).focus();

      this.setState({
        desabilitar3: false
      })

      this.setState({
        desabilitar4: false
      })

      this.setState({
        desabilitar5: false
      })

      this.setState({
        desabilitar6: false
      })

      this.setState({
        desablilitarTipoRecaudacion: false
      })

      var numRecibo;
      numRecibo = this.props.pago.idRec.toString() + this.props.pago.numero;
      var numReciboEdit;
      numReciboEdit = this.props.pago.numero;
      document.getElementById(numRecibo).value = numReciboEdit;
      document.getElementById(numRecibo).disabled = false;
      document.getElementById(numRecibo).style.background = '#F2F2F2';
      console.log(estadoAlumno);
    }
    else{
      //no haga ni pincho
    }
    if(estadoAlumno != "M" && remitido == "S"){
      var editCiclo;
      var num = 250296;
      editCiclo = this.props.pago.idRec.toString() + num.toString();

      document.getElementById(editCiclo).disabled = false;
      document.getElementById(editCiclo).style.background = '#F2F2F2';
      document.getElementById(editCiclo).focus();

      this.setState({
        desabilitar2: false
      })

      var editFecha;
      var fechaEdit = this.props.pago.fecha;
      var anioFecha = fechaEdit.substring(0, 4);
      console.log("AÑO");
      console.log(anioFecha);

      var mesFecha = fechaEdit.substring(5, 7);
      console.log("MES");
      console.log(mesFecha);
      var diaFecha = fechaEdit.substring(8, 10);
      console.log("DIA");
      console.log(diaFecha);

      var fechaVolteada = diaFecha + "-" + mesFecha + "-" + anioFecha;

      editFecha = this.props.pago.idRec.toString() + this.props.pago.idAlum.toString();
      document.getElementById(editFecha).value = fechaVolteada;
      document.getElementById(editFecha).disabled = false;
      document.getElementById(editFecha).style.background = '#F2F2F2';

      this.setState({
        desabilitar3: false
      })

      this.setState({
        desabilitar4: false
      })

      this.setState({
        desabilitar5: false
      })
      this.setState({
        desabilitar6: false
      })

      this.setState({
        desablilitarTipoRecaudacion: false
      })
    }
    else{
      
    }
  }


  SeleccionNumeroRecibo = () => {

    var stringss;
    var prueba;
    stringss = this.props.pago.idRec.toString() + this.props.pago.numero;
    prueba = document.getElementById(stringss).value;

    if (prueba == "") {
      prueba = this.props.pago.numero;
    } else {

      return prueba;
    }

    return prueba;

  }

  SeleccionConcepto = () => {

    var stringss;
    var prueba;
    stringss = this.props.pago.idRec.toString() + this.props.pago.concepto;
    
    //prueba = document.getElementById(stringss).value;

    if (prueba == "") {
      prueba = this.props.pago.concepto;
    } else {

      return prueba;
    }

    return prueba;

  }

  SeleccionFecha = () => {

    var stringss;
    var prueba;
    stringss = this.props.pago.idRec.toString() + this.props.pago.idAlum.toString();
    prueba = document.getElementById(stringss).value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g, '$3-$2-$1');

    console.log(prueba)
    if (prueba == "") {
      prueba = this.props.pago.fecha.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g, '$3-$2-$1');
    } else {

      return prueba;
    }

    return prueba;

  }


  SeleccionCiclo = () => {

    var num = 250296;
    var stringss;
    var prueba;
    stringss = this.props.pago.idRec.toString() + num.toString();
    prueba = document.getElementById(stringss).value;

    if (prueba == "") {
      prueba = 0;
    } else {

      return prueba;
    }

    return prueba;

  }

  SeleccionImporte = () => {

    var num = 250296;
    var stringss;
    var importe=0;
    stringss = this.props.pago.idRec.toString() + num.toString() + "importe";
    console.log("ss",stringss);
    importe = document.getElementById(stringss).value;
    console.log("El nuevo importe es ->",importe );

    if (importe == "") {
      importe = 0;
    } else {

      return importe;
    }

    return importe;

  }

  SeleccionUbicacion = () => {

    var num = 250296;
    var stringss;
    var ubicacion = this.state.selectedOption3.value;
    //stringss = this.props.pago.idRec.toString() + num.toString() + "ubicacion";
    /*var id = this.props.numero + 1;

    try{
      stringss = 'react-select-' + (4*id) + '--value-item'; 
      var ubicacion = document.getElementById(stringss).innerHTML;
    }
    catch(error){
      stringss = 'react-select-' + (4*(id+10)) + '--value-item'; 
      var ubicacion = document.getElementById(stringss).innerHTML;
    }


    if (ubicacion == "") {
      ubicacion = 0;
    } else {

      return ubicacion;
    }
    */
    return ubicacion;

  }

  SeleccionRepitencia = () => {

    var num = 250296;
    var stringss;
    var repitencia = this.state.selectedOption6.value;
    return repitencia;

  }

  SeleccionTipoRecaudacion = () => {

    var num = 250296;
    var tipoRecaudacion = (this.state.selectedIdTipoRecaudacion===null) ? 0 : this.state.selectedIdTipoRecaudacion.value;
    return tipoRecaudacion;
  }

  SeleccionCtaBanco = () => {

    var num = 250296;
    var stringss;
    var ctabanco = this.state.selectedOption4.value;;
    /*var id = this.props.numero + 1;
    try{
      stringss = 'react-select-' + (4*id+1) + '--value-item';
      var ctabanco = document.getElementById(stringss).innerHTML;
    }
    catch(error){
      stringss = 'react-select-' + (4*(id+10)+1) + '--value-item';
      var ctabanco = document.getElementById(stringss).innerHTML;
    }


    if (ctabanco == "") {
      ctabanco = 0;
    } else {

      return ctabanco;
    }*/

    return ctabanco;

  }


  editarObservacion = () => {

    var obs = this.props.pago.observacion_upg;
    console.log("obs: " + obs)
    //var estadoAlumno = this.props.pago.estado;
    var idRecG = "";
    idRecG = this.SeleccionIdRec();

    swal({
      title: "Desea editar la observacion?",
      text: "Observacion: " + obs,
      icon: "warning",
      buttons: true,
      //dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal({
            closeOnClickOutside: false,
            closeOnEsc: false,

            content: {
              element: "input",
              attributes: {
                value: obs
              },
            },
          })
            .then((value) => {
              if (value != '') {
                fetch(CONFIG + 'recaudaciones/alumno/concepto/obs/' + value + '/' + idRecG)
                  .then((resp) => {
                    if (!(resp == true)) {
                      swal("Editado exitoso!", "", "success").then(function () { // te descubri abel fake :v
                        window.location.reload();
                      }
                      );
                    }
                    else {
                      swal("Oops, Algo salió mal!!", "", "error").then(function () { // te descubri abel fake :v
                        window.location.reload();
                      }
                      );
                    }

                  })
                  .catch(error => {
                    swal("Oops, Algo salió mal!!", "", "error")
                    console.error(error)
                  });
              }
              else {
                swal("No se hizo ningún cambio", "", "info");
              }
            });
        } else {

        }
      });
  }

  showObservacion = () => {
    let obs = this.props.pago.observacion;
    if(obs === '' || obs === '0' ){
      swal("Ops! ", `Aun no tiene asignado ninguna observacion`, "warning")
    }else{
      swal("Observacion", `La observacion es : " ${obs} "`, "success")
    }
  }



  SeleccionIdRec = () => {

    var stringss;
    var prueba;
    stringss = this.props.pago.idRec.toString();

    if (stringss == "") {
      stringss = "null";
    } else {

      return stringss;
    }

    return stringss;

  }

  SeleccionIdConceptoG = () => {

    var stringss;

    stringss = this.props.pago.idconcepto;

    if (stringss == null) {
      stringss = null;
    } else {

      return stringss;
    }

    return stringss;

  }



  GuardarFecth = () => {

    var estadoAlumno;
    estadoAlumno = this.props.pago.estado;

    if (estadoAlumno == "M") {
      var cicloG = "";
      cicloG = this.SeleccionCiclo();

      var conceptoG = "";
      conceptoG = this.SeleccionConcepto();

      var numeroReciboG = "";
      numeroReciboG = this.SeleccionNumeroRecibo();

      var fechaG = "";
      fechaG = this.SeleccionFecha();

      var idRecG = "";
      idRecG = this.SeleccionIdRec();

      var idConceptoG = "";
      idConceptoG = this.SeleccionIdConceptoG();

      var importe = "";
      importe = this.SeleccionImporte();

      var repitencia = "";
      repitencia = this.SeleccionRepitencia();

      var seleccionTipoRecaudacion = "";
      seleccionTipoRecaudacion = this.SeleccionTipoRecaudacion();
      

      var ubicacion = "";
      ubicacion = this.SeleccionUbicacion();

      var ctabanco = "";
      ctabanco = this.SeleccionCtaBanco();

      var validado = null;
      console.log("Validado: " + String(this.state.isChecked));
      validado = String(this.state.isChecked);

      console.log("lo que se envia es ->",JSON.stringify({
        "idRec": idRecG,
        "ciclo": cicloG,
        "concepto": conceptoG,
        "recibo": numeroReciboG,
        "fecha": fechaG,
        "id_concepto": this.state.idconcepto,
        "id_moneda": this.state.idmoneda,
        "importe": importe,
        "repitencia":repitencia, //linea que recien se agrega
        "ubicacion": ubicacion,
        "ctabanco": ctabanco,
        "validado": validado,
        "id_tipo_recaudacion":seleccionTipoRecaudacion
      }))

      fetch(CONFIG + "recaudaciones/alumno/concepto/actualizar",
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(
            {
              "idRec": idRecG,
              "ciclo": cicloG,
              "concepto": conceptoG,
              "recibo": numeroReciboG,
              "fecha": fechaG,
              "id_concepto": this.state.idconcepto,
              "id_moneda": this.state.idmoneda,
              "importe": importe,
              "repitencia":repitencia, //linea que recien se agrega
              "ubicacion": ubicacion,
              "ctabanco": ctabanco,
              "validado": validado,
              "id_tipo_recaudacion":seleccionTipoRecaudacion
            }

          )
        })
        .then((response) => {
          return response.json()
        })
        .then((resp) => {
          console.log(resp);
          if (resp == true) {
            swal("Editado exitoso!", "", "success").then(function () {
              window.location.reload();
            }
            );
          } else {
            swal("Oops, el editado no se concreto", "", "info");
          }

        })
        .catch(error => {

          swal("Oops, Algo salió mal!!", "", "error")
          console.error(error)
        });



    } else {

      var cicloG = "";
      cicloG = this.SeleccionCiclo();

      var conceptoG = "";
      conceptoG = this.SeleccionConcepto();

      var numeroReciboG = "";
      numeroReciboG = this.SeleccionNumeroRecibo();

      var fechaG = "";
      fechaG = this.SeleccionFecha();

      var idRecG = "";
      idRecG = this.SeleccionIdRec();

      var idConceptoG = "";
      idConceptoG = this.SeleccionIdConceptoG();

      var fechaG = "";
      fechaG = this.SeleccionFecha();
      console.log("FECHA BIEN FEIK");
      console.log(fechaG);

      var importe = "";
      importe = this.SeleccionImporte();

      var repitencia = "";
      repitencia = this.SeleccionRepitencia();

      var seleccionTipoRecaudacion = "";
      seleccionTipoRecaudacion = this.SeleccionTipoRecaudacion();

      var ubicacion = "";
      ubicacion = this.SeleccionUbicacion();

      var ctabanco = "";
      ctabanco = this.SeleccionCtaBanco();

      var validado = null;
      console.log("Validado: " + String(this.state.isChecked));
      validado = String(this.state.isChecked);

      fetch(CONFIG + "recaudaciones/alumno/concepto/actualizar",
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(
            {
              "idRec": idRecG,
              "ciclo": cicloG,
              "concepto": conceptoG,
              "recibo": numeroReciboG,
              "fecha": fechaG,
              "id_concepto": this.state.idconcepto,
              "id_moneda": this.state.idmoneda,
              "importe": importe,
              "repitencia":repitencia, //linea que recien se agrega
              "ubicacion": ubicacion,
              "ctabanco": ctabanco,
              "validado": validado,
              "id_tipo_recaudacion":seleccionTipoRecaudacion
            }

          )
        })
        .then((response) => {
          return response.json()
        })
        .then((resp) => {
          console.log(resp);
          if (resp == true) {
            swal("Editado exitoso!", "", "success").then(function () {
              window.location.reload();
            }
            );
          } else {
            swal("Oops, el editado no se concreto", "", "info");
          }

        })
        .catch(error => {

          swal("Oops, Algo salió mal!!", "", "error")
          console.error(error)
        });



      /*
          console.log("No tiene permiso para guargar")
          swal("No es posible realizar cambios", "", "info");*/



    }



  }

  render() {
    return (
      <tr>
        <td className="td">
          <form action="#">
            <label className="row center-xs color_white">
              <input
                onClick={this.colocar}
                className="checkbox1"
                id={this.props.pago.idRec}
                type="checkbox" />
              <span> </span>
            </label>
          </form>
        </td>

        <td className="td">
          {this.props.numero + 1}
        </td>

        <td className="td">
          <form action="#" >
            <label className="center-xs color_white">
              <input
                id={this.props.pago.idRec.toString() + "250296"}
                placeholder={this.props.pago.ciclo}
                disabled="true"
                type="text" 
                style ={{width: '15px'}}/>
              <span> </span>
            </label>
          </form>
        </td>

        <td  className="xd">
          {/* <form action="#">
          <label className="row center-xs color_white">
            <input
              placeholder={this.props.pago.concepto}
              id={this.props.pago.idRec.toString()+this.props.pago.concepto}
              disabled = "true"
              type="text" />
              <span> </span>
          </label>
          
        </form> */}

          <Select

            id="conceptos"
            className="conceptos"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.props.conceptos}
            disabled={this.state.desabilitar}
          //autofocus

          />

        </td>


        <td className="td">
          <form action="#">
            <label className="center-xs color_white">
              <input
                name={this.props.pago.idRec.toString() + this.props.pago.numero}
                placeholder={this.props.pago.numero}
                id={this.props.pago.idRec.toString() + this.props.pago.numero}
                disabled="true"
                type="text" />
              <span> </span>
            </label>
          </form>
        </td>

        <td className="td">
          <form action="#">
            <label className=" center-xs color_white"> 
              <input
                name={this.props.pago.idRec.toString() + this.props.pago.idAlum.toString()}
                placeholder={this.props.pago.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3-$2-$1')}
                id={this.props.pago.idRec.toString() + this.props.pago.idAlum.toString()}
                disabled="true"
                type="text" />
              <span> </span>
            </label>
          </form>
        </td>

        <td className="td">
          {/* {this.props.pago.moneda} */}
          
          <Select
            inputId = {this.props.pago.idRec.toString() + "250296" + "moneda"}
            value={this.state.selectedOption2}
            onChange={this.handleChange2}
            options={this.props.monedas}
            disabled={this.state.desabilitar2}
          />
        </td>

        <td className="td">
          <table>
            <td>
              {this.state.moneda}
            </td>
            <td>
              <form action="#">
                <label className="center-xs color_white">
                  <input
                    id={this.props.pago.idRec.toString() + "250296" + "importe"}
                    defaultValue={this.props.pago.importe}
                    disabled="true"
                    type="number" />
                  <span></span>
                </label>
              </form>
            </td>
          </table>
        </td>

        {/* <td className="td" id={"repitencia" + (this.props.numero + 1)} style={{display: 'none'}}>
            <h6 align="left">
            <Select
                inputId = {this.props.pago.idRec.toString() + "250296" + "repitencia"}
                value={this.state.selectedOption6}
                onChange={this.handleChange6}
                options= {this.props.repitencia}
                disabled={this.state.desabilitar6} style ={{width: '100px'}}
              />
              </h6>
        </td> */}

        <td className="td"/*TIPO_RECAUDACION*/ id={"tipo_recaudacion" + (this.props.numero + 1)} style={{display: 'none'}}>
          <Select
                inputId = {this.props.pago.idRec.toString() + "250296" + "tipo_recaudacion"}
                className="conceptos"
                value={this.state.selectedIdTipoRecaudacion}
                onChange={this.handleChangeIdTipoRecaudacion}
                options= {this.state.tipo_recaudacion}
                disabled={this.state.desablilitarTipoRecaudacion} style ={{width: '100px'}}
                
              />
        </td>


        <td className="td"/*CTA BANCO*/ id={"banco" + (this.props.numero + 1)} style={{display: 'none'}}>
            <h6 align="left">
            <Select
                inputId = {this.props.pago.idRec.toString() + "250296" + "ctabanco"}
                value={this.state.selectedOption4}
                onChange={this.handleChange4}
                options= {this.props.cuentas}
                disabled={this.state.desabilitar4} style ={{width: '180px'}}
              />
              </h6>
        </td>

        <td className="td"/*UBICACION*/ id={"ubicacion" + (this.props.numero + 1)} style={{display: 'none'}}>
          <h6 align="left">
          <Select
            inputId = {this.props.pago.idRec.toString() + "250296" + "ubicacion"}
            value={this.state.selectedOption3}
            onChange={this.handleChange3}
            options= {this.props.ubicaciones}
            disabled={this.state.desabilitar3} style ={{width: '145px'}}
          />
          </h6>
        </td>

  {/*Validado*/}
        <td className="td">
          <form action="#">
            <label className="row center-xs color_white">
              <input
                onClick={this.toggleChange}
                className="checkbox2"
                checked = {this.state.isChecked}
                id={this.props.pago.idRec + "validar"}
                type="checkbox"
                disabled={this.state.desabilitar5} />
              <span> </span>
            </label>
          </form>
        </td>

        <td className="td" id={"search" + (this.props.numero + 1)}>
          <button
            onClick={this.editarObservacion}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">search</i>
          </button>
        </td>

        <td className="td" id={"show" + (this.props.numero + 1)}>
          <button
            onClick={this.showObservacion}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">search</i>
          </button>
        </td>


        <td className="td" id={"edit" + (this.props.numero + 1)}>
          <button
            onClick={this.editarFila}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">edit</i>
          </button>
        </td>

        <td className="td" id={"save" + (this.props.numero + 1)}>
          <button
            onClick={this.GuardarFecth}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">save</i>
          </button>
        </td>

        <td className="td">
          {this.state.estado}
        </td>
      </tr>
    )
  }
}

export default PagoRow;
