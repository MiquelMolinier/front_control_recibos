import React from "react";
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ImporteRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desabilitar: true,
      desabilitar2: true,
      desabilitar3: true,
      desabilitar4: true,
      desabilitar5: true,
      selectedOption: null,
      selectedOption2: null,
      selectedOption3: null,
      selectedOption4: null,
      idconcepto: "",
      idmoneda: "",
      array: this.props.datos,
      moneda: "",
      estado: "",
      isChecked: false,
    };
  }

  componentDidMount() {
    this.setState({
      selectedOption: {
        value: this.props.pago.concepto,
        label: this.props.pago.concepto,
      },
      idconcepto: this.idconcepto(this.props.pago.concepto),
      selectedOption2: {
        value: this.props.pago.moneda2,
        label: this.props.pago.moneda2,
      },
      selectedOption3: {
        value: this.props.pago.descripcion_ubi,
        label: this.props.pago.descripcion_ubi,
      },
      selectedOption4: {
        value: this.props.pago.descripcion_tipo,
        label: this.props.pago.descripcion_tipo,
      },
      idmoneda: this.idmoneda(this.props.pago.moneda2),
      estado: this.setEstado(this.props.pago.estado),
      isChecked: this.props.pago.validado,
    });

    if (this.props.pago.moneda2 == "DOL") {
      this.setState({
        moneda: "$. ",
      });
    } else {
      this.setState({
        moneda: "S/. ",
      });
    }
  }

  idconcepto(valor) {
    let id_concepto = "";

    for (let i = 0; i < this.props.datos.length; i++) {
      if (valor == this.props.datos[i].concepto) {
        id_concepto = this.props.datos[i].idConcepto;
      }
    }
    return id_concepto;
  }

  idmoneda(valor) {
    let id_moneda = "";

    for (let i = 0; i < this.props.datosmonedas.length; i++) {
      if (valor == this.props.datosmonedas[i].moneda) {
        id_moneda = this.props.datosmonedas[i].id_moneda;
      }
    }
    return id_moneda;
  }

  setEstado(valor) {
    if (valor == null) {
      return "REMITIDO";
    } else {
      return "DIGITADO";
    }
  }

  componentWillUpdate() {}

  handleChange = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption: selectedOption,
        idconcepto: this.idconcepto(selectedOption.value),
      });
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  };
  handleChange2 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption2: selectedOption,
        idmoneda: this.idmoneda(selectedOption.value),
      });

      if (selectedOption.value == "DOL") {
        this.setState({
          moneda: "$. ",
        });
      } else {
        this.setState({
          moneda: "S/. ",
        });
      }
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  };

  handleChange3 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption3: selectedOption,
      });
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  };

  handleChange4 = (selectedOption) => {
    if (selectedOption != null) {
      this.setState({
        selectedOption4: selectedOption,
      });
    } else {
      swal("Seleccione una opcion", "", "info");
    }
  };

  colocar = () => {
    var checkbox = document.getElementById(this.props.pago.idRec);
    var checkboxID = checkbox.id;
    this.props.Funciones(checkboxID);
  };

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  editarFila = () => {
    var estadoAlumno;
    estadoAlumno = this.props.pago.estado;

    var digitado = "N";
    var remitido = "N";

    for (let x = 0; x < this.props.configuraciones.length; x++) {
      if (this.props.configuraciones[x].idConfiguracion == 5) {
        remitido = this.props.configuraciones[x].estado;
      } else if (this.props.configuraciones[x].idConfiguracion == 6) {
        digitado = this.props.configuraciones[x].estado;
      }
    }

    if (estadoAlumno == "M" && digitado == "S") {
      var editConcepto;
      editConcepto =
        this.props.pago.idRec.toString() + this.props.pago.concepto;

      var conceptoEdit = this.props.pago.concepto;

      //document.getElementById(editConcepto).value= conceptoEdit;
      //document.getElementById(editConcepto).disabled = false;
      //document.getElementById(editConcepto).style.background='#F2F2F2';

      this.setState({
        desabilitar: false,
      });

      this.setState({
        desabilitar2: false,
      });

      var editFecha;
      var fechaEdit = this.props.pago.fecha;
      var anioFecha = fechaEdit.substring(0, 4);

      var mesFecha = fechaEdit.substring(5, 7);
      var diaFecha = fechaEdit.substring(8, 10);

      var fechaVolteada = diaFecha + "-" + mesFecha + "-" + anioFecha;

      editFecha =
        this.props.pago.idRec.toString() + this.props.pago.idAlum.toString();
      document.getElementById(editFecha).value = fechaVolteada;
      document.getElementById(editFecha).disabled = false;
      document.getElementById(editFecha).style.background = "#F2F2F2";

      var editCiclo;
      var num = 250296;
      editCiclo = this.props.pago.idRec.toString() + num.toString();
      var _ciclo_ = this.props.pago.ciclo;

      document.getElementById(editCiclo).value = _ciclo_;
      document.getElementById(editCiclo).disabled = false;
      document.getElementById(editCiclo).style.background = "#F2F2F2";
      document.getElementById(editCiclo).focus();

      var editImporte;
      var num = 250296;
      editImporte =
        this.props.pago.idRec.toString() + num.toString() + "importe";
      var _importe_ = this.props.pago.importe;

      document.getElementById(editImporte).value = _importe_;
      document.getElementById(editImporte).disabled = false;
      document.getElementById(editImporte).style.background = "#F2F2F2";
      document.getElementById(editImporte).focus();

      /*var editCuentaBanco;
      var num = 250296;
      editCuentaBanco = this.props.pago.idRec.toString() + num.toString() + "ctabanco";
      var __cuentabanco__ = this.props.pago.descripcion_tipo;
      document.getElementById(editCuentaBanco).value = __cuentabanco__;
      document.getElementById(editCuentaBanco).disabled = false;
      document.getElementById(editCuentaBanco).style.background = '#F2F2F2';
      document.getElementById(editCuentaBanco).focus();*/

      this.setState({
        desabilitar3: false,
      });

      this.setState({
        desabilitar4: false,
      });

      this.setState({
        desabilitar5: false,
      });
      /*var editUbicacion;
      var num = 250296;
      editUbicacion = this.props.pago.idRec.toString() + num.toString() + "ubicacion";
      var __ubicacion__ = this.props.pago.descripcion_ubi;
      document.getElementById(editUbicacion).value = __ubicacion__;
      document.getElementById(editUbicacion).disabled = false;
      document.getElementById(editUbicacion).style.background = '#F2F2F2';
      document.getElementById(editUbicacion).focus();*/

      var numRecibo;
      numRecibo = this.props.pago.idRec.toString() + this.props.pago.numero;
      var numReciboEdit;
      numReciboEdit = this.props.pago.numero;
      document.getElementById(numRecibo).value = numReciboEdit;
      document.getElementById(numRecibo).disabled = false;
      document.getElementById(numRecibo).style.background = "#F2F2F2";
    } else {
      //no haga ni pincho
    }
    if (estadoAlumno != "M" && remitido == "S") {
      var editCiclo;
      var num = 250296;
      editCiclo = this.props.pago.idRec.toString() + num.toString();

      document.getElementById(editCiclo).disabled = false;
      document.getElementById(editCiclo).style.background = "#F2F2F2";
      document.getElementById(editCiclo).focus();

      var editFecha;
      var fechaEdit = this.props.pago.fecha;
      var anioFecha = fechaEdit.substring(0, 4);

      var mesFecha = fechaEdit.substring(5, 7);
      var diaFecha = fechaEdit.substring(8, 10);

      var fechaVolteada = diaFecha + "-" + mesFecha + "-" + anioFecha;

      editFecha =
        this.props.pago.idRec.toString() + this.props.pago.idAlum.toString();
      document.getElementById(editFecha).value = fechaVolteada;
      document.getElementById(editFecha).disabled = false;
      document.getElementById(editFecha).style.background = "#F2F2F2";

      /*var editImporte;
      var num = 250296;
      editImporte = this.props.pago.idRec.toString() + num.toString() + "importe";
      var _importe_ = this.props.pago.importe;
      document.getElementById(editImporte).value = _importe_;
      document.getElementById(editImporte).disabled = false;
      document.getElementById(editImporte).style.background = '#F2F2F2';
      document.getElementById(editImporte).focus();*/

      //document.getElementById(conceptos)

      this.setState({
        desabilitar3: false,
      });

      this.setState({
        desabilitar4: false,
      });

      this.setState({
        desabilitar5: false,
      });
    } else {
      //no haga ni pincho
    }
    //swal("No es posible realizar cambios", "", "info");
  };

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
  };

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
  };

  SeleccionFecha = () => {
    var stringss;
    var prueba;
    stringss =
      this.props.pago.idRec.toString() + this.props.pago.idAlum.toString();
    prueba = document
      .getElementById(stringss)
      .value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g, "$3-$2-$1");

    if (prueba == "") {
      prueba = this.props.pago.fecha.replace(
        /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,
        "$3-$2-$1"
      );
    } else {
      return prueba;
    }

    return prueba;
  };

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
  };

  SeleccionImporte = () => {
    var num = 250296;
    var stringss;
    var importe;
    stringss = this.props.pago.idRec.toString() + num.toString() + "importe";
    importe = document.getElementById(stringss).value;

    if (importe == "") {
      importe = 0;
    } else {
      return importe;
    }

    return importe;
  };

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
  };

  SeleccionCtaBanco = () => {
    var num = 250296;
    var stringss;
    var ctabanco = this.state.selectedOption4.value;
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
  };

  editarObservacion = () => {
    var obs = this.props.pago.observacion;
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
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          closeOnClickOutside: false,
          closeOnEsc: false,

          content: {
            element: "input",
            attributes: {
              value: obs,
            },
          },
        }).then((value) => {
          if (value != "") {
            fetch(
              CONFIG +
                "recaudaciones/alumno/concepto/obs/" +
                value +
                "/" +
                idRecG
            )
              .then((resp) => {
                if (!(resp == true)) {
                  swal("Editado exitoso!", "", "success").then(function () {
                    // te descubri abel fake :v
                    window.location.reload();
                  });
                } else {
                  swal("Oops, Algo salió mal!!", "", "error").then(function () {
                    // te descubri abel fake :v
                    window.location.reload();
                  });
                }
              })
              .catch((error) => {
                swal("Oops, Algo salió mal!!", "", "error");
                console.error(error);
              });
          } else {
            swal("No se hizo ningún cambio", "", "info");
          }
        });
      } else {
      }
    });
  };

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
  };

  SeleccionIdConceptoG = () => {
    var stringss;

    stringss = this.props.pago.idconcepto;

    if (stringss == null) {
      stringss = null;
    } else {
      return stringss;
    }

    return stringss;
  };

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

      var ubicacion = "";
      ubicacion = this.SeleccionUbicacion();

      var ctabanco = "";
      ctabanco = this.SeleccionCtaBanco();

      var validado = null;
      validado = String(this.state.isChecked);

      fetch(CONFIG + "recaudaciones/alumno/concepto/actualizar", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          idRec: idRecG,
          ciclo: cicloG,
          concepto: conceptoG,
          recibo: numeroReciboG,
          fecha: fechaG,
          id_concepto: this.state.idconcepto,
          id_moneda: this.state.idmoneda,
          importe: importe,
          ubicacion: ubicacion,
          ctabanco: ctabanco,
          validado: validado,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          if (resp == true) {
            swal("Editado exitoso!", "", "success").then(function () {
              window.location.reload();
            });
          } else {
            swal("Oops, el editado no se concreto", "", "info");
          }
        })
        .catch((error) => {
          swal("Oops, Algo salió mal!!", "", "error");
          console.error(error);
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

      var importe = "";
      importe = this.SeleccionImporte();

      var ubicacion = "";
      ubicacion = this.SeleccionUbicacion();

      var ctabanco = "";
      ctabanco = this.SeleccionCtaBanco();

      var validado = null;
      validado = String(this.state.isChecked);

      fetch(CONFIG + "recaudaciones/alumno/concepto/actualizar", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          idRec: idRecG,
          ciclo: cicloG,
          concepto: conceptoG,
          recibo: numeroReciboG,
          fecha: fechaG,
          id_concepto: this.state.idconcepto,
          id_moneda: this.state.idmoneda,
          importe: importe,
          ubicacion: ubicacion,
          ctabanco: ctabanco,
          validado: validado,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          if (resp == true) {
            swal("Editado exitoso!", "", "success").then(function () {
              window.location.reload();
            });
          } else {
            swal("Oops, el editado no se concreto", "", "info");
          }
        })
        .catch((error) => {
          swal("Oops, Algo salió mal!!", "", "error");
          console.error(error);
        });

      /*
          swal("No es posible realizar cambios", "", "info");*/
    }
  };

  render() {
    return (
      <tr>
        {/*}
        <td className="td" id={"selects" + (this.props.numero + 1)} style={{display: 'none'}}>
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
    */}
        <td
          className="td"
          id={"numeros" + (this.props.numero + 1)}
          style={{ display: "none" }}
        >
          {this.props.numero + 1}
        </td>

        <td className="td_" id={"ciclo" + (this.props.numero + 1)}>
          <form action="#">
            <label className="center-xs color_white">
              {this.props.pago.ciclo}
            </label>
          </form>
        </td>

        <td className="td" id={"numConceptos" + (this.props.numero + 1)}>
          <form action="#">
            <label className="row center-xs color_white">
              {this.props.pago.concepto}
            </label>
          </form>
          {/*
          <Select
            id="conceptos"
            className="conceptos"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.props.conceptos}
            disabled={this.state.desabilitar}
          //autofocus
          /> */}
        </td>

        <td className="td" id={"recibos" + (this.props.numero + 1)}>
          <form action="#">
            <label className="center-xs color_white">
              {this.props.pago.numero}
            </label>
          </form>
        </td>

        <td className="td" id={"dates" + (this.props.numero + 1)}>
          <form action="#">
            <label className=" center-xs color_white">
              {this.props.pago.fecha.replace(
                /^(\d{4})-(\d{2})-(\d{2})$/g,
                "$3-$2-$1"
              )}
            </label>
          </form>
        </td>

        <td className="td" id={"coins" + (this.props.numero + 1)}>
          <form action="#">
            <label className="center-xs color_white">
              {this.props.pago.moneda2}
            </label>
          </form>
        </td>

        <td className="td" id={"imports" + (this.props.numero + 1)}>
          <form action="#">
            <label className="center-xs color_white">
              {this.state.moneda} {this.props.pago.importe}
            </label>
          </form>
        </td>

        <td className="td">
          <label className="row center-xs color_white">
            <input
              type="checkbox"
              className="checkbox2"
              checked={this.state.isChecked}
              disabled
            />
            <span></span>
          </label>
        </td>
        {/*
        <td className="td" id={"bancos" + (this.props.numero + 1)} style={{display: 'none'}}>
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
        <td className="td" id={"ubicacions" + (this.props.numero + 1)} style={{display: 'none'}}>
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
  
        <td className="td" id={"checks" + (this.props.numero + 1)} style={{display: 'none'}}>
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
        <td className="td" id={"searchs" + (this.props.numero + 1)} style={{display: 'none'}}>
          <button
            onClick={this.editarObservacion}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">search</i>
          </button>
        </td>
        <td className="td" id={"edits" + (this.props.numero + 1)} style={{display: 'none'}}>
          <button
            onClick={this.editarFila}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">edit</i>
          </button>
        </td>
        <td className="td" id={"saves" + (this.props.numero + 1)} style={{display: 'none'}}>
          <button
            onClick={this.GuardarFecth}
            className="waves-effect waves-light btn-small">
            <i className="large material-icons center">save</i>
          </button>
        </td>
        <td className="td" id={"states" + (this.props.numero + 1)} style={{display: 'none'}}>
          {this.state.estado}
        </td>
        */}
      </tr>
    );
  }
}

export default ImporteRow;
