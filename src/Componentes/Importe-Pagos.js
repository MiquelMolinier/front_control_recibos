import React from "react";
import ImporteList from "./Importe-List";
import TableImporteHeader from "./Table-Importe-Header";
import TableImporteFooter from "./Table-Importe-Footer";
import Alumno from "./Alumno";
import AlumnoCodigo from "./AlumnoCodigo";
import "../App.css";
import PropTypes from "prop-types";
import Imprimir2 from "./imprimir2";
import { browserHistory } from "react-router-3";
import swal from "sweetalert";
import CONFIG from "../Configuracion/Config";
import CostoDelPrograma from "./Costo-Del-Programa";
import DeudaTotal from "./Deuda-Total";
import CostoDelProgramaDet from "./Costo-Del-Programa-Det";

import Select from "react-select";
import { ModalFooter, ModalBody, ModalHeader, Modal, Button } from "reactstrap";
import ImprimirImportePago from "./Imprimir-Importe-Pago";
import TablaOtrasObligaciones from "./Tabla-Otras-Obligaciones";

import jsPDF from "jspdf";
import "jspdf-autotable";
import HistorialMatricula from "./HistorialMatricula";

//import TablaOtrasObligCanceladas from './Tabla_Otras_Oblig_Canceladas'

//ESTA ES LA VISTA PRINCIPAL POR NOMBRES Y APELLIDOS

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
};

class ImportePagos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: false,
      validado: false,
      datosformulario: [],
      aparecer: true,
      todos: false,
      checkbox_: [],
      filtros: [],
      pagocero: [],
      pagoUno: [],
      pagoDos: [],
      pagoTres: [],
      pagoCuatro: [],
      pagocerovalidado: [],
      pagos: [],
      name: this.props.params.name,
      pageOfItems: [],
      estado: 0,
      filtroDel: new String(""),
      filtroAl: new String(""),
      filtroNumeros: [],
      alumno: {},
      conceptos: [], //Conceptos del Alumno
      configuraciones: [], //Data Configuraciones
      costosP: {},
      concepto: [], // value y label de CONCEPTOS
      datos: [], //Data Conceptos
      monedas: [], //Data Monedas
      monedasvl: [], // value & label de Monedas
      ubicaciones: [], //Data Ubicacion
      ubicacionesv1: [], //value & label Ubicacion
      tipos: [],
      tiposv1: [],
      defuncion: 1,
      estadoAlumno: "",
      nombrePrograma: "", //Nombre del programa del alumno
      codigoPrograma: 0, //Codigo del Programa
      codigoAlumno: "", //Codigo del alumno
      anioIngresoAlumno: 0,
      valorBeneficio: 0, //beneficio del alumno
      importeTabla1: 0,
      importeTabla2: 0,
      importeTabla3: 0,
      importeTabla: [],
      valorDeudaTotal: 0,
      sumaImporteUPG: 0,
      sumaImporteEPG: 0,
      sumaImporteDE: 0,
      showDetCosto: false,
      costoxciclo: [],
      otrasObligaciones: [],
      otrasObligacionesC: [],

      /* Implementacion de mostrar todos o validos */
      mostrarTodo: false,
      pagosUpg: [],
      pagosEpg: [],
      pagosEnsenanza: [],
      pagosRepitencia: [],
      pagosOtros: [],
      pagosUpgValidos: [],
      pagosEpgValidos: [],
      pagosEnsenanzaValidos: [],
      pagosRepitenciaValidos: [],
      pagosOtrosValidos: [],
      /* */

      /* Requerimiento Funcional 65 */
      MostrarHMatricula: false,
      /* Requerimiento Funcional 65 */

      bool1: 0,
      bool2: 0,
      bool3: 0,
      tieneImporteRepitencia: 0,
      diplomado: false,

      valor: true,
      estadoAlumnoInput: { value: "-1", label: "Escoga un nuevo estado" },
      optionsEstadoAlumno: [
        { value: "casado", label: "Casado" },
        { value: "soltero", label: "Soltero" },
        { value: "divorciado", label: "Divorciado" },
        { value: "viudo", label: "Viudo" },
        { value: "separado", label: "Separado" },
        { value: "conviviente", label: "Conviviente" },
        { value: "fallecido", label: "Fallecido" },
      ],
      showModalConfiguracion: false,

      tipoObligacionInput: {
        value: "-1",
        label: "Escoga un Tipo de Obligación",
      },
      optionsTipoObligacion: [
        { value: "repitencia", label: "Repitencia" },
        { value: "multa", label: "Multa" },
      ],

      showAgregarObligacion: false,

      listaRepitencia: [],
      importeRepitencia: 0,
      tiposMoneda: [
        { value: "SOL", label: "SOLES" },
        { value: "DOL", label: "DOLARES" },
      ],
      idMoneda: [],
      tipoMonedaMatriculaUpg: "",
      tipoMonedaMatriculaEpg: "",
      tipoMonedaDerechoEnseñanza: "",
      tipoMonedaRepitencia: "",
      fechaActual: "",
    };
    this.clase = "";
    this.alumno = "";
    this.importe = 0;
    this.showboolean = true;

    this.reporte_ciclo = this.reporte_ciclo.bind(this);
    this.reporte_credito = this.reporte_credito.bind(this);
    //   this.arreglosReporte = this.arreglosReporte.bind(this);

    this.select = [];
    this.onChangePage = this.onChangePage.bind(this);
    this.FuncionUno = this.FuncionUno.bind(this);
    this.FuncionDos = this.FuncionDos.bind(this);
    this.FuncionTres = this.FuncionTres.bind(this);
    this.FuncionCuatro = this.FuncionCuatro.bind(this);
    this.Regresar = this.Regresar.bind(this);
    this.AddCostoImporte = this.AddCostoImporte.bind(this);
    this.UpdateCostoImporte = this.UpdateCostoImporte.bind(this);

    /* Implementacion de mostrar todos o validos */
    this.mostrarTodos = this.mostrarTodos.bind(this);
    this.mostrarSoloValidos = this.mostrarSoloValidos.bind(this);
    /*  */
    /* Requerimiento Funcional 65 */
    this.mostrarPresupuesto = this.mostrarPresupuesto.bind(this);
    this.mostrarHMatriculas = this.mostrarHMatriculas.bind(this);
    /* Requerimiento Funcional 65 */
  }

  pdf = () => {
    var doc = new jsPDF();
    doc.autoTable({ html: "#table" });

    doc.save("table.pdf");
  };

  componentDidUpdate() {
    if (this.state.estado != 0) {
      var checks = document.getElementsByClassName("checkbox1");

      for (let i = 0; i < checks.length; i++) {
        var id = checks[i].id;
        for (let j = 0; j < this.state.pagocero.length; j++) {
          var codigo = this.state.pagocero[j].idRec;
          if (this.state.pagocero[j].check == true) {
            if (id == codigo) {
              checks[i].checked = true;
            }
          }
        }
      }
    } else {
      this.setState({ estado: 1 });
    }
  }

  conseguirFechaActual = () => {
    var date = new Date();
    var dateStr =
      "Fecha:  " +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      "  Hora:  " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    this.setState({
      fechaActual: dateStr,
    });
  };

  componentWillMount() {
    this.conseguirFechaActual();

    this.pageOfItems = this.pagocero;
    var checkbox_selec = [];
    var nombres = this.state.name;
    var checks = document.getElementsByClassName("checkbox1");
    var checks_normales = Array.from(checks);
    checks_normales.map((checkbox) => {
      if (checkbox.checked) {
        checkbox_selec.push(checkbox.id);
      }
    });

    //DATOS DE LOS CONCEPTOS
    var array = [];
    var conceptoResto = [];

    fetch(CONFIG + "/concepto/conceptos")
      .then((response) => {
        return response.json();
      })
      .then((listas) => {
        this.setState({
          datos: listas,
        });

        listas.forEach(function (element) {
          var e = { value: element.concepto, label: element.concepto };
          array.push(e);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      concepto: array,
    });

    //DATOS DE LOS BENEFICIOS
    fetch(CONFIG + "/beneficio/listar/" + this.state.name)
      .then((response) => {
        return response.json();
      })
      .then((beneficio) => {
        this.setState({
          valorBeneficio: beneficio[0].benef_otrogado,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    //FILTRADO DE TABLAS

    var listaImportesTabla = [];

    var concepA = [];
    concepA.push("210010");
    var concepB = [];
    concepB.push("210011", "210024");
    var concepC = [];
    concepC.push("207010");
    var concepD = [
      "210322  ",
      "201158  ",
      "210003",
      "201158  ",
      "210209  ",
      "210059  ",
      "210353  ",
      "210509  ",
      "210308  ",
      "210322  ",
      "201011  ",
      "210104  ",
      "999998  ",
      "207011  ",
      "210508  ",
      "210003  ",
      "207004  ",
      "210154  ",
      "96509700",
      "96509701",
      "210025  ",
      "96509702",
      "210014  ",
      "96509703",
      "201459  ",
      "207007  ",
      "201302  ",
      "210257  ",
      "999999  ",
      "207078  ",
      "210165  ",
      "210169  ",
      "210112  ",
      "210168  ",
      "201169  ",
      "210006  ",
      "210173  ",
      "210105  ",
      "201202  ",
      "210103  ",
      "210071  ",
      "210050  ",
      "210352  ",
      "210086  ",
      "210081  ",
      "210068  ",
      "210023  ",
      "210202  ",
      "210012  ",
      "210013  ",
      "207006  ",
      "207103  ",
      "207081  ",
      "207080  ",
      "207079  ",
    ];

    var filtrodel = "0000-00-00";
    var filtroal = "9999-12-12";

    let nombreFiltro = this.state.name; //18207001 por ejemplo
    var separadorFiltro = " "; // un espacio en blanco
    var arregloDeSubCadenasFiltro = nombreFiltro.split(separadorFiltro);
    var arregloFiltro = [];
    for (let i = 0; i < arregloDeSubCadenasFiltro.length; i++) {
      if (arregloDeSubCadenasFiltro[i] !== "") {
        arregloFiltro.push(arregloDeSubCadenasFiltro[i]);
      }
    }
    var nombrenuevoFiltro = arregloFiltro.join(" & ");

    fetch(
      CONFIG + "recaudaciones/alumno/concepto/listar/filtrar", //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
          nom_ape: nombrenuevoFiltro,
          fechaInicial: filtrodel,
          fechaFinal: filtroal,
          conceptos: concepA,
          recibos: this.state.filtroNumeros,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((pagos) => {
        /* Pagos UPG ################################################################################################################# */
        pagos.forEach((pago) => {
          if (pago.id_tipo_recaudacion != 0) {
            let tipoRecaudacion = pago.id_tipo_recaudacion;
            this.setPago(tipoRecaudacion, pago);
          } else {
            if (pago.validado === true) {
              this.setState((state) => {
                return {
                  pagosUpgValidos: [...state.pagosUpgValidos, pago],
                };
              });
            }
            this.setState((state) => {
              return {
                pagosUpg: [...state.pagosUpg, pago],
              };
            });
          }
        });
      })
      .catch((error) => {
        swal("Oops, Algo2 salió mal!!", "", "error"); // si hay algún error lo mostramos en consola
      });

    fetch(
      CONFIG + "recaudaciones/alumno/concepto/listar/filtrar", //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          nom_ape: nombrenuevoFiltro,
          fechaInicial: filtrodel,
          fechaFinal: filtroal,
          conceptos: concepB,
          recibos: this.state.filtroNumeros,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((pagos) => {
        /* Pagos Enseñanza ########################################################################################################### */
        if (pagos.length > 0) {
          pagos.forEach((pago) => {
            if (pago.id_tipo_recaudacion != 0) {
              let tipoRecaudacion = pago.id_tipo_recaudacion;
              this.setPago(tipoRecaudacion, pago);
            } else {
              if (pago.validado === true) {
                this.setState((state) => {
                  return {
                    pagosEnsenanzaValidos: [
                      ...state.pagosEnsenanzaValidos,
                      pago,
                    ],
                  };
                });
              }
              this.setState((state) => {
                return {
                  pagosEnsenanza: [...state.pagosEnsenanza, pago],
                };
              });
            }
          });
        }
      })
      .catch((error) => {
        swal("Oops, Algo3salió mal!!", "", "error"); // si hay algún error lo mostramos en consola
      });

    fetch(
      CONFIG + "recaudaciones/alumno/concepto/listar/filtrar", //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          nom_ape: nombrenuevoFiltro,
          fechaInicial: filtrodel,
          fechaFinal: filtroal,
          conceptos: concepC,
          recibos: this.state.filtroNumeros,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((pagos) => {
        /* Pagos EPG ################################################################################################################# */
        if (pagos.length > 0) {
          pagos.forEach((pago) => {
            if (pago.id_tipo_recaudacion != 0) {
              let tipoRecaudacion = pago.id_tipo_recaudacion;
              this.setPago(tipoRecaudacion, pago);
            } else {
              if (pago.validado === true) {
                this.setState((state) => {
                  return {
                    pagosEpgValidos: [...state.pagosEpgValidos, pago],
                  };
                });
              }
              this.setState((state) => {
                return {
                  pagosEpg: [...state.pagosEpg, pago],
                };
              });
            }
            // else {
            //   this.setState((state) => {
            //     return {
            //       pagoTres: [...state.pagoTres, pago],
            //     };
            //   });
            // }
          });

          //  this.setState({  pagoTres: pagosMatriculaEPG  });
          //swal("Filtro realizado exitosamente!","","success");
        } else {
          //swal("No se encontraron registros","","info");
        }
      })
      .catch((error) => {
        swal("Oops, Algo4 salió mal!!", "", "error"); // si hay algún error lo mostramos en consola
      });

    fetch(
      CONFIG + "recaudaciones/alumno/concepto/listar/filtrar", //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          nom_ape: nombrenuevoFiltro,
          fechaInicial: filtrodel,
          fechaFinal: filtroal,
          conceptos: concepD,
          recibos: this.state.filtroNumeros,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((pagos) => {
        /* Otros Pagos ############################################################################################################### */
        if (pagos.length > 0) {
          pagos.forEach((pago) => {
            if (pago.id_tipo_recaudacion != 0) {
              let tipoRecaudacion = pago.id_tipo_recaudacion;
              this.setPago(tipoRecaudacion, pago);
            } else {
              if (pago.validado === true) {
                this.setState((state) => {
                  return {
                    pagosOtrosValidos: [...state.pagosOtrosValidos, pago],
                  };
                });
              }
              this.setState((state) => {
                return {
                  pagosOtros: [...state.pagosOtros, pago],
                };
              });
            }
          });
          //  this.setState({  pagoCuatro: pagoOtros  });

          //swal("Filtro realizado exitosamente!","","success");
        } else {
          //swal("No se encontraron registros","","info");
        }
      })
      .catch((error) => {
        // swal("Oops, Algo5 salió mal!!", "", "error")// si hay algún error lo mostramos en consola
      });

    //DATA DE LAS CONFIGURACIONES

    fetch(CONFIG + "configuracion/listar/")
      .then((response) => {
        return response.json();
      })
      .then((listas) => {
        this.setState({
          configuraciones: listas,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    //DATA MONEDAS
    var array2 = [];
    fetch(CONFIG + "/concepto/monedas")
      .then((response) => {
        return response.json();
      })
      .then((listas) => {
        this.setState({
          monedas: listas,
        });
        listas.forEach(function (element) {
          var e = { value: element.moneda, label: element.moneda };
          array2.push(e);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      monedasvl: array2,
    });
    //DATA UBICACIONES
    var array3 = [];
    fetch(CONFIG + "/concepto/ubicaciones")
      .then((response) => {
        return response.json();
      })
      .then((listas) => {
        this.setState({
          ubicaciones: listas,
        });
        listas.forEach(function (element) {
          var e = { value: element.descripcion, label: element.descripcion };
          array3.push(e);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      ubicacionesv1: array3,
    });

    //DATA TIPO DE CUENTA
    var array4 = [];
    fetch(CONFIG + "/concepto/cuentas")
      .then((response) => {
        return response.json();
      })
      .then((listas) => {
        this.setState({
          cuentas: listas,
        });
        listas.forEach(function (element) {
          var e = { value: element.descripcion, label: element.descripcion };
          array4.push(e);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    this.setState({
      cuentasv1: array4,
    });

    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombres.split(separador);
    var arreglo = [];
    for (let i = 0; i < arregloDeSubCadenas.length; i++) {
      if (arregloDeSubCadenas[i] !== "") {
        arreglo.push(arregloDeSubCadenas[i]);
      }
    }
    var nombrenuevo = arreglo.join(" & ");
    var nombreAlumno = arreglo.join(" ");
    //ANTERIOR LINK
    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/listar/

    //TRANSFORMANDO PARAMETRO
    var nombresTrans = nombres;
    var pruebita = parseInt(nombresTrans);

    if (isNaN(pruebita)) {
      this.clase = Alumno;

      fetch(CONFIG + "recaudaciones/alumno/concepto/listar/" + nombrenuevo)
        .then((response) => {
          return response.json();
        })
        .then((pagos) => {
          var auxPagos = pagos;

          var alumnoDetalle = {
            apeNom: nombreAlumno,
          };
          this.setState({
            pagocero: pagos,
            pagos: pagos,
            alumno: alumnoDetalle,
          });
          var total = this.state.pagocero;
          this.state.pagocero.map((pago) => {
            pago.check = false;
          });
          /****************************** */
          fetch(CONFIG + "beneficio/comprobacion/" + nombrenuevo) //CONFIG+'beneficio/breporte/' + nombrenuevo+'/'+auxPagos[0].idPrograma
            .then((response) => {
              return response.json();
            })
            .then((comprobacion) => {
              //costos
              if (comprobacion == 1) {
                this.reporte_credito(comprobacion, nombrenuevo, auxPagos);
              } else if (comprobacion == 2) {
                this.reporte_ciclo(nombrenuevo, auxPagos, 2);
              } else if (comprobacion == 3) {
                if (comprobacion.tipo == "por ciclo") {
                  this.reporte_ciclo(nombrenuevo, auxPagos, 0);
                } else {
                  this.reporte_credito(comprobacion, nombrenuevo, auxPagos);
                }
              }
            })
            .catch((error) => {
              console.error(error);
            });
          /****************************** */
        })
        .catch((error) => {
          // si hay algún error lo mostramos en consola
          console.error(error);
        });

      //LINK ANTERIOR::
      //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
      fetch(CONFIG + "concepto/leer/restringido/" + nombrenuevo)
        .then((response) => {
          return response.json();
        })
        .then((conceptos) => {
          for (let i = 0; i < conceptos.length; i++) {
            if (
              conceptos[i].concepto != "207010  " &&
              conceptos[i].concepto != "210010  " &&
              conceptos[i].concepto != "210011  "
            ) {
              conceptoResto.push(conceptos[i].concepto);
            }
          }
          this.setState({
            conceptos: conceptos,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.clase = AlumnoCodigo;

      fetch(CONFIG + "/beneficio/listar/" + nombrenuevo)
        .then((response) => {
          return response.json();
        })
        .then((datos) => {
          console.log("11111111111111111111111111111111111", datos);
          this.setState({ datosformulario: datos });
        })
        .catch((error) => {
          console.error(error);
        });

      fetch(CONFIG + "recaudaciones/alumno/concepto/listar_cod/" + nombrenuevo)
        .then((response) => {
          return response.json();
        })
        .then((pagos) => {
          var auxPagos = pagos;
          var alumnoDetalle = { apeNom: nombreAlumno };

          this.setState({
            pagocero: pagos,
            pagos: pagos,
            alumno: alumnoDetalle,
          });
          var total = this.state.pagocero;

          this.state.pagocero.map((pago) => {
            pago.check = false;
          });

          fetch(CONFIG + "beneficio/comprobacion/" + nombrenuevo) //CONFIG+'beneficio/breporte/' + nombrenuevo+'/'+auxPagos[0].idPrograma
            .then((response) => {
              return response.json();
            })
            .then((comprobacion) => {
              //costos
              if (comprobacion == 1) {
                this.reporte_credito(comprobacion, nombrenuevo, auxPagos);
              } else if (comprobacion == 2) {
                this.reporte_ciclo(nombrenuevo, auxPagos, 2);
              } else if (comprobacion == 3) {
                if (comprobacion.tipo == "por ciclo") {
                  this.reporte_ciclo(nombrenuevo, auxPagos, 0);
                } else {
                  this.reporte_credito(comprobacion, nombrenuevo, auxPagos);
                }
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          // si hay algún error lo mostramos en consola
          console.error(error);
        });
      //LINK ANTERIOR::
      //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'

      fetch(CONFIG + "concepto/leer/restringido_cod/" + nombrenuevo)
        .then((response) => {
          return response.json();
        })
        .then((conceptos) => {
          for (let i = 0; i < conceptos.length; i++) {
            if (
              conceptos[i].concepto != "207010  " &&
              conceptos[i].concepto != "210010  " &&
              conceptos[i].concepto != "210011  "
            ) {
              conceptoResto.push(conceptos[i].concepto);
            }
          }
          this.setState({
            conceptos: conceptos,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    //
    //DE AQUI SACAMOS LOS DATOS DE LA LISTA DE PAGOS
    //fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
    fetch(
      CONFIG + "recaudaciones/alumno/concepto/listar_validados/" + nombrenuevo
    )
      .then((response) => {
        return response.json();
      })
      .then((pagos) => {
        const diplomatura = "06";
        this.setState({
          estadoAlumno: pagos[0].estado_civil,
          nombrePrograma: pagos[0].sigla_programa,
          codigoPrograma: pagos[0].idPrograma,
          codigoAlumno: pagos[0].codAlumno,
          anioIngresoAlumno: pagos[0].anio_ingreso,
        });
        let identifiTipGrado = pagos[0].id_tip_grado;
        //todo esta data es para el ejemplo 18207001

        //****************************************** */
        //*********************INICIO*************** */
        //****************************************** */
        if (identifiTipGrado == diplomatura) {
          this.setState({
            diplomado: true,
          });

          fetch(
            CONFIG +
              "importealumno/search/" +
              this.state.codigoAlumno +
              "/" +
              this.state.codigoPrograma +
              "/62/3"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              //ESTA TABLA ES LA DE DERECHO DE ENSEÑANZA

              this.setState({
                importeTabla2: data.importe,
                bool2: 1,
                tipoMonedaMatriculaUpg: data.id_moneda,
                tipoMonedaMatriculaEpg: data.id_moneda,
                tipoMonedaDerechoEnseñanza: data.id_moneda,
                tipoMonedaRepitencia: data.id_moneda,
              });
              listaImportesTabla.push(data.importe);

              document.getElementById(
                "costoDos"
              ).value = this.state.importeTabla2;
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          fetch(
            CONFIG +
              "importealumno/search/" +
              this.state.codigoAlumno +
              "/" +
              this.state.codigoPrograma +
              "/9/1"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.setState((state) => {
                return {
                  importeTabla1: data.importe,
                  bool1: 1,
                  tipoMonedaMatriculaUpg: data.id_moneda,
                };
              });
              listaImportesTabla.push(data.importe);

              document.getElementById(
                "costoUno"
              ).value = this.state.importeTabla1;
            })
            .catch((error) => {
              console.error(error);
            });

          fetch(
            CONFIG +
              "importealumno/search/" +
              this.state.codigoAlumno +
              "/" +
              this.state.codigoPrograma +
              "/21/3"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              //ESTA TABLA ES LA DE DERECHO DE ENSEÑANZA
              this.setState((state) => {
                return {
                  importeTabla2: data.importe,
                  bool2: 1,
                  tipoMonedaDerechoEnseñanza: data.id_moneda,
                };
              });
              listaImportesTabla.push(data.importe);

              document.getElementById(
                "costoDos"
              ).value = this.state.importeTabla2;
            })
            .catch((error) => {
              console.error(error);
            });

          fetch(
            CONFIG +
              "importealumno/search/" +
              this.state.codigoAlumno +
              "/" +
              this.state.codigoPrograma +
              "/21/4"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              //ESTA TABLA ES LA DE DERECHO DE ENSEÑANZA
              this.setState((state) => {
                return {
                  importeRepitencia: data.importe,
                  tieneImporteRepitencia: 1,
                  tipoMonedaRepitencia: data.id_moneda,
                };
              });
              listaImportesTabla.push(data.importe);

              document.getElementById(
                "repitencia"
              ).value = this.state.importeRepitencia;
            })
            .catch((error) => {
              console.error(error);
            });

          fetch(
            CONFIG +
              "importealumno/search/" +
              this.state.codigoAlumno +
              "/" +
              this.state.codigoPrograma +
              "/117/2"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.setState((state) => {
                return {
                  importeTabla3: data.importe,
                  bool3: 1,
                  tipoMonedaMatriculaEpg: data.id_moneda,
                };
              });
              listaImportesTabla.push(data.importe);

              document.getElementById(
                "costoTres"
              ).value = this.state.importeTabla3;
            })
            .catch((error) => {
              console.error(error);
            });
        }

        this.setState({
          importeTabla: listaImportesTabla,
        });
        /**Costos x Ciclo */
        // var arrayCostosDet = [];
        var num = 0;
        fetch(
          CONFIG + "/programa_presupuesto/listar/" + this.state.codigoAlumno
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.setState({
              costoxciclo: data,
            });
          })
          .catch((error) => {
            console.error(error);
          });

        //****************************************** */
        //*********************FIN***************** */
        //****************************************** */

        /**OTRAS OBLIGACIONES PENDIENTES DE PAGO */
        var arrayObligacion = [];

        fetch(
          CONFIG +
            "importealumnoobligaciones/search/" +
            this.state.codigoAlumno +
            "/" +
            this.state.codigoPrograma
        )
          .then((response) => {
            return response.json();
          })
          .then((listaOblig) => {
            /*if(listaOblig.length==1){
              var e ={id: num, id_tipo_oblig:listaOblig.id_tipo_obligacion,descripcion:listaOblig.descripcion,id_concepto:listaOblig.cod_concepto,  
                id_moneda:listaOblig.id_moneda,importe:listaOblig.importe,id_estado:listaOblig.id_tobligacion_estado};
               arrayObligacion.push(e);
            }else{*/
            listaOblig.forEach(function (data) {
              var e = {
                id: data.id_importe_alumno_obligaciones,
                id_tipo_oblig: data.id_tipo_obligacion,
                descripcion: data.descripcion,
                id_concepto: data.cod_concepto,
                id_moneda: data.id_moneda,
                importe: data.importe,
                id_estado: data.id_tobligacion_estado,
              };
              arrayObligacion.push(e);
            });

            //}
          })
          .catch((error) => {
            console.error(error);
          });
        this.setState({
          otrasObligaciones: arrayObligacion,
        });
      });

    fetch(
      "https://costoprogramas-back.herokuapp.com/presupuestos?idPrograma=7&idProgramacionPagos=1"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  }
  /***** **** ** ****** ****** ****** ****** *****/
  setPago = (id_tipo_recaudacion, pago) => {
    switch (id_tipo_recaudacion) {
      case 1:
        if (pago.validado === true) {
          this.setState((state) => {
            return {
              pagosUpgValidos: [...state.pagosUpgValidos, pago],
            };
          });
        }
        this.setState((state) => {
          return {
            pagosUpg: [...state.pagosUpg, pago],
          };
        });

        break;
      case 2:
        if (pago.validado === true) {
          this.setState((state) => {
            return {
              pagosUpgValidos: [...state.pagosUpgValidos, pago],
            };
          });
        }
        this.setState((state) => {
          return {
            pagosEpg: [...state.pagosEpg, pago],
          };
        });

        break;
      case 3:
        if (pago.validado === true) {
          this.setState((state) => {
            return {
              pagosEnsenanzaValidos: [...state.pagosEnsenanzaValidos, pago],
            };
          });
        }
        this.setState((state) => {
          return {
            pagosEnsenanza: [...state.pagosEnsenanza, pago],
          };
        });
        break;
      case 4:
        if (pago.validado === true) {
          this.setState((state) => {
            return {
              pagosRepitenciaValidos: [...state.pagosRepitenciaValidos, pago],
            };
          });
        }
        this.setState((state) => {
          return {
            pagosRepitencia: [...state.pagosRepitencia, pago],
          };
        });
        break;
      case 5:
        if (pago.validado === true) {
          this.setState((state) => {
            return {
              pagosOtrosValidos: [...state.pagosOtrosValidos, pago],
            };
          });
        }
        this.setState((state) => {
          return {
            pagosOtros: [...state.pagosOtros, pago],
          };
        });
        break;

      default:
        break;
    }
  };
  /***** **** ** ****** ****** ****** ****** *****/

  //FUNCION PARA REGRESAR A LA VISTA ANTERIOR
  setField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  Regresar = (e) => {
    //browserHistory.push('/'+this.state.name);
    browserHistory.push("/");
    e.preventDefault();
  };

  deudaTotal = (total, upg, epg, enseñanza, repitencia) => {
    let respuesta = total - upg - epg - enseñanza - repitencia;
    return respuesta;
  };

  mostrarTodos = () => {
    this.setState({
      mostrarTodo: true,
    });
  };

  mostrarSoloValidos = () => {
    this.setState({
      mostrarTodo: false,
    });
  };

  /* Requerimiento Funcional 65 */
  mostrarPresupuesto = () => {
    this.setState({
      MostrarHMatricula: false,
    });
  };

  mostrarHMatriculas = () => {
    this.setState({
      MostrarHMatricula: true,
    });
  };
  /* Requerimiento Funcional 65 */

  render() {
    if (this.state.pagos.length > 0) {
      return (
        <div id="main" className="">
          <div>
            <h3>
              <span className="left">
                UPG-FISI-UNMSM &nbsp; {this.state.fechaActual}{" "}
              </span>
              <span className="center mover-izquierda">ESTADO DE PAGOS</span>
              <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                <li>
                  <a
                    className="seleccionar col"
                    onClick={browserHistory.goBack}
                  >
                    Regresar<i className="material-icons right">reply</i>
                  </a>
                </li>
              </ul>
            </h3>
            <hr />
            <div className="SplitPane row">
              <div className=" col-xs-3">
                <h4 className="center">DATOS PERSONALES</h4>
                <div className="center datos">
                  <i className="material-icons medium">account_circle</i>
                </div>

                <h6 align="center" className="Alumno">
                  <b>Nombres:</b>
                </h6>
                <h6 align="center" className="negro">
                  {this.state.pagos[0].apeNom}
                </h6>
                <h6 align="center" className="Alumno">
                  <b>Código:</b>
                </h6>
                <h6 align="center" className="negro">
                  {this.state.pagos[0].codAlumno}
                </h6>
                <h6 align="center" className="Alumno">
                  <b>Programa:</b>
                </h6>
                <h6 align="center" className="negro">
                  {this.state.nombrePrograma}
                </h6>
                <h6 align="center" className="Alumno">
                  <b>Periodo de Ingreso:</b>
                </h6>
                <h6 align="center" className="negro">
                  {this.state.anioIngresoAlumno}
                </h6>
              </div>

              {this.state.showDetCosto ? (
                <div className=" col-xs-3">
                  <CostoDelProgramaDet
                    datosPrograma={this.state.datosformulario}
                    datosCosto={this.state.costosP}
                  />
                </div>
              ) : (
                <div></div>
              )}

              <div className="col-xs-3">
                <div className="btn-tm-container">
                  <button
                    className="waves-effect waves-light btn-small btn-tm"
                    onClick={() => this.mostrarPresupuesto()}
                  >
                    Presupuesto
                  </button>
                  <button
                    className="waves-effect waves-light btn-small btn-tm"
                    onClick={() => this.mostrarHMatriculas()}
                  >
                    Historial de Matrícula
                  </button>
                </div>
                {this.state.MostrarHMatricula ? (
                  <div className="table-content">
                    <HistorialMatricula
                      codigo={this.state.pagos[0].codAlumno}
                    />
                  </div>
                ) : (
                  <div className="table-content">
                    <CostoDelProgramaDet costoxciclo={this.state.costoxciclo} />
                  </div>
                )}
              </div>

              <div className="col-xs-6">
                {/*<h6 align="center" className="Alumno"><b>Costo total del Programa:</b></h6>
                      <h6 align="center" className="negro">S/.</h6>
                  <h6 align="center" className="Alumno"><b>Beneficio:</b></h6>
                      <h6 align="center" className="negro">DSTO {this.state.valorBeneficio}% UNMSM</h6>*/}

                <CostoDelPrograma
                  datosPrograma={this.state.datosformulario}
                  datosCosto={this.state.costosP}
                  tipoMoneda={this.state.tipoMonedaMatriculaUpg}
                />
              </div>
            </div>

            <hr />
            <div className="row">
              <button
                className="ml-4 waves-effect waves-light btn-small btnVer"
                onClick={() => this.mostrarTodos()}
              >
                Ver todos
              </button>
              <button
                className="waves-effect waves-light btn-small btnVer"
                onClick={() => this.mostrarSoloValidos()}
              >
                Ver validados
              </button>
            </div>

            <span>
              {" "}
              <strong>
                Total Cancelado (UPG) :{" "}
                {this.CalcularImporteUno() +
                  this.CalcularImporteDos() +
                  this.CalcularImporteRepitencia()}{" "}
              </strong>{" "}
              &nbsp;{" "}
            </span>
            <span>
              {" "}
              <strong>
                Total Cancelado (UPG,EPG) : {this.calcularSumaImportes()}
              </strong>{" "}
              &nbsp;{" "}
            </span>
            <span>
              <strong>
                Total Adeudado (UPG,EPG) :{" "}
                {(
                  this.state.importeRepitencia +
                  this.state.importeTabla1 +
                  this.state.importeTabla2 +
                  this.state.importeTabla3 -
                  this.calcularSumaImportes()
                ).toFixed(2)}
              </strong>
            </span>

            <div className="row" id="table">
              <div className="col-md-12">
                <table className="tableImportes">
                  <thead>
                    <tr>
                      <th className="thLabel">MATRÍCULA UPG</th>
                      <th className="thLabel">MATRÍCULA EPG</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="trTable">
                      <td className="tdTable">
                        <table className="tableImporte">
                          <thead>
                            <tr>
                              <th className="thVacio"></th>
                              <th className="thVacio"></th>
                              <th className="thVacio">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    name="tipoMonedaMatriculaUpg"
                                    id="tipoMonedaMatriculaUpg"
                                    value={this.state.tipoMonedaMatriculaUpg}
                                    onChange={(e) => this.setField(e)}
                                    disabled
                                  >
                                    <option value="default">
                                      --Seleccione una opcion
                                    </option>
                                    <option value="108">SOLES</option>
                                    <option value="113"> DOLARES</option>
                                  </select>
                                </div>
                              </th>
                              <th className="th">COSTO</th>
                              <th>
                                {" "}
                                {this.state.tipoMonedaMatriculaUpg == "108" ? (
                                  <span>S/.</span>
                                ) : (
                                  <span>$</span>
                                )}{" "}
                                <input
                                  id="costoUno"
                                  disabled="true"
                                  type="number"
                                  color="white"
                                  className="inputCosto"
                                />
                              </th>
                              <th className="thVacio">
                                {localStorage.getItem("tipo") == "alumno" ? (
                                  ""
                                ) : (
                                  <button
                                    onClick={this.EditarCostoUno}
                                    className="waves-effect waves-light btn-small"
                                  >
                                    <i className="large material-icons center">
                                      edit
                                    </i>
                                  </button>
                                )}

                                {localStorage.getItem("tipo") == "alumno" ? (
                                  ""
                                ) : (
                                  <button
                                    onClick={this.GuardarCostoUno}
                                    className="waves-effect waves-light btn-small"
                                  >
                                    <i className="large material-icons center">
                                      save
                                    </i>
                                  </button>
                                )}
                              </th>
                            </tr>
                            <TableImporteHeader />
                          </thead>
                          <tbody>
                            {/* Matricula UPG ####################################################################################### */}
                            <ImporteList
                              funcion={this.FuncionUno}
                              listado={
                                this.state.mostrarTodo
                                  ? this.state.pagosUpg
                                  : this.state.pagosUpgValidos
                              }
                              conceptos={this.state.concepto}
                              datos={this.state.datos}
                              datosMonedas={this.state.monedas}
                              monedas={this.state.monedasvl}
                              ubicaciones={this.state.ubicacionesv1}
                              cuentas={this.state.cuentasv1}
                              configuraciones={this.state.configuraciones}
                            />
                            <TableImporteFooter
                              total={this.CalcularImporteUno()}
                              costo={this.state.importeTabla1}
                              tipoMoneda={this.state.tipoMonedaMatriculaUpg}
                            />
                          </tbody>
                        </table>
                      </td>
                      <td className="tdTable">
                        <table className="tableImporte">
                          <thead>
                            <tr>
                              <th className="thVacio"></th>
                              <th className="thVacio"></th>
                              <th className="thVacio">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    name="tipoMonedaMatriculaEpg"
                                    id="tipoMonedaMatriculaEpg"
                                    value={this.state.tipoMonedaMatriculaEpg}
                                    onChange={(e) => this.setField(e)}
                                    disabled
                                  >
                                    <option value="default">
                                      --Seleccione una opcion
                                    </option>
                                    <option value="108">SOLES</option>
                                    <option value="113"> DOLARES</option>
                                  </select>
                                </div>
                              </th>
                              <th className="th">COSTO</th>
                              <th>
                                {" "}
                                {this.state.tipoMonedaMatriculaEpg == "108" ? (
                                  <span>S/.</span>
                                ) : (
                                  <span>$</span>
                                )}{" "}
                                <input
                                  id="costoTres"
                                  disabled="true"
                                  type="number"
                                  className="inputCosto"
                                />
                              </th>
                              <th className="thVacio">
                                {localStorage.getItem("tipo") == "alumno" ? (
                                  ""
                                ) : (
                                  <span>
                                    <button
                                      onClick={this.EditarCostoTres}
                                      className="waves-effect waves-light btn-small"
                                    >
                                      <i className="large material-icons center">
                                        edit
                                      </i>
                                    </button>
                                    <button
                                      onClick={this.GuardarCostoTres}
                                      className="waves-effect waves-light btn-small"
                                    >
                                      <i className="large material-icons center">
                                        save
                                      </i>
                                    </button>
                                  </span>
                                )}
                              </th>
                            </tr>
                            <TableImporteHeader />
                          </thead>
                          <tbody>
                            {/* Matricula EPG ####################################################################################### */}
                            <ImporteList
                              funcion={this.FuncionTres}
                              listado={
                                this.state.mostrarTodo
                                  ? this.state.pagosEpg
                                  : this.state.pagosEpgValidos
                              }
                              conceptos={this.state.concepto}
                              datos={this.state.datos}
                              datosMonedas={this.state.monedas}
                              monedas={this.state.monedasvl}
                              ubicaciones={this.state.ubicacionesv1}
                              cuentas={this.state.cuentasv1}
                              configuraciones={this.state.configuraciones}
                            />
                            <TableImporteFooter
                              total={this.CalcularImporteTres()}
                              costo={this.state.importeTabla3}
                              tipoMoneda={this.state.tipoMonedaMatriculaEpg}
                            />
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* ************************************************* */}
                <table className="tableImportes">
                  <thead>
                    <tr className="trTable">
                      <th className="thLabel">DERECHO ENSEÑANZA</th>
                      <th className="thLabel">REPITENCIA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="trTable">
                      <td className="tdTable">
                        <table className="tableImporte">
                          <thead>
                            <tr>
                              <th className="thVacio"></th>
                              <th className="thVacio"></th>
                              <th className="thVacio">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    name="tipoMonedaDerechoEnseñanza"
                                    id="tipoMonedaDerechoEnseñanza"
                                    value={
                                      this.state.tipoMonedaDerechoEnseñanza
                                    }
                                    onChange={(e) => this.setField(e)}
                                    disabled
                                  >
                                    <option value="default">
                                      --Seleccione una opcion
                                    </option>
                                    <option value="108">SOLES</option>
                                    <option value="113">DOLARES</option>
                                  </select>
                                </div>
                              </th>
                              <th className="th">COSTO</th>
                              <th>
                                {" "}
                                {this.state.tipoMonedaDerechoEnseñanza ==
                                "108" ? (
                                  <span>S/.</span>
                                ) : (
                                  <span>$</span>
                                )}{" "}
                                <input
                                  id="costoDos"
                                  disabled="true"
                                  type="number"
                                  className="inputCosto"
                                />
                              </th>
                              <th className="thVacio">
                                {localStorage.getItem("tipo") == "alumno" ? (
                                  ""
                                ) : (
                                  <span>
                                    <button
                                      onClick={this.EditarCostoDos}
                                      className="waves-effect waves-light btn-small"
                                    >
                                      <i className="large material-icons center">
                                        edit
                                      </i>
                                    </button>
                                    <button
                                      onClick={this.GuardarCostoDos}
                                      className="waves-effect waves-light btn-small"
                                    >
                                      <i className="large material-icons center">
                                        save
                                      </i>
                                    </button>
                                  </span>
                                )}
                              </th>
                            </tr>
                            <TableImporteHeader />
                          </thead>
                          <tbody>
                            {/* Enseñanza ########################################################################################### */}
                            <ImporteList
                              funcion={this.FuncionDos}
                              listado={
                                this.state.mostrarTodo
                                  ? this.state.pagosEnsenanza
                                  : this.state.pagosEnsenanzaValidos
                              }
                              conceptos={this.state.concepto}
                              datos={this.state.datos}
                              datosMonedas={this.state.monedas}
                              monedas={this.state.monedasvl}
                              ubicaciones={this.state.ubicacionesv1}
                              cuentas={this.state.cuentasv1}
                              configuraciones={this.state.configuraciones}
                            />
                            <TableImporteFooter
                              total={this.CalcularImporteDos()}
                              costo={this.state.importeTabla2}
                              tipoMoneda={this.state.tipoMonedaDerechoEnseñanza}
                            />
                          </tbody>
                        </table>
                      </td>

                      <td className="tdTable">
                        <table className="tableImporte">
                          <thead>
                            <tr>
                              <th className="thVacio"></th>
                              <th className="thVacio"></th>
                              <th className="thVacio">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    name="tipoMonedaRepitencia"
                                    id="tipoMonedaRepitencia"
                                    value={this.state.tipoMonedaRepitencia}
                                    onChange={(e) => this.setField(e)}
                                    disabled
                                  >
                                    <option value="default">
                                      Seleccione opcion
                                    </option>
                                    <option value="108">SOLES</option>
                                    <option value="113"> DOLARES</option>
                                  </select>
                                </div>
                              </th>
                              <th className="th">COSTO</th>
                              <th>
                                {" "}
                                {this.state.tipoMonedaRepitencia == "108" ? (
                                  <span>S/.</span>
                                ) : (
                                  <span>$</span>
                                )}{" "}
                                <input
                                  id="repitencia"
                                  disabled="true"
                                  type="number"
                                  className="inputCosto"
                                />
                              </th>
                              <th className="thVacio">
                                {localStorage.getItem("tipo") == "alumno" ? (
                                  ""
                                ) : (
                                  <span>
                                    <button
                                      onClick={this.EditarRepitencia}
                                      className="waves-effect waves-light btn-small"
                                    >
                                      <i className="large material-icons center">
                                        edit
                                      </i>
                                    </button>
                                    <button
                                      onClick={this.GuardarCostoRepitencia}
                                      className="waves-effect waves-light btn-small"
                                    >
                                      <i className="large material-icons center">
                                        save
                                      </i>
                                    </button>
                                  </span>
                                )}
                              </th>
                            </tr>
                            <TableImporteHeader />
                          </thead>

                          <tbody>
                            {/* Repitencia ########################################################################################## */}
                            <ImporteList
                              funcion={this.FuncionDos}
                              listado={
                                this.state.mostrarTodo
                                  ? this.state.pagosRepitencia
                                  : this.state.pagosRepitenciaValidos
                              }
                              conceptos={this.state.concepto}
                              datos={this.state.datos}
                              datosMonedas={this.state.monedas}
                              monedas={this.state.monedasvl}
                              ubicaciones={this.state.ubicacionesv1}
                              cuentas={this.state.cuentasv1}
                              configuraciones={this.state.configuraciones}
                            />
                            <TableImporteFooter
                              total={this.CalcularImporteRepitencia()}
                              costo={this.state.importeRepitencia}
                              tipoMoneda={this.state.tipoMonedaRepitencia}
                            />
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* ************************************************* */}

                <table className="tableImportes">
                  <thead>
                    <tr className="trTable">
                      <th className="thLabel">OTROS PAGOS</th>
                      <th className="thLabel">OTRAS OBLIGACIONES</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="trTable">
                      <td className="tdTable">
                        <table className="tableImporte">
                          {/* 
                                                  <tr>
                                                    <th className="thVacio"></th><th className="thVacio"></th><th className="thVacio"></th>
                                                    <th className="th">COSTO</th>
                                                    <th className="th" >S/ <input id ="costoCuatro"  disabled="true" type="number" className="th"/></th>
                                                    <th className="thVacio" ><button onClick={this.EditarCostoCuatro} className="waves-effect waves-light btn-small"><i className="large material-icons center">edit</i></button>
                                                    <button onClick={this.GuardarCostoCuatro} className="waves-effect waves-light btn-small"><i className="large material-icons center">save</i></button></th>
                                                    
                                                  </tr> 
                                              */}
                          <thead>
                            <TableImporteHeader />
                          </thead>
                          <tbody>
                            {/* Otros pagos ######################################################################################### */}
                            <ImporteList
                              funcion={this.FuncionCuatro}
                              listado={
                                this.state.mostrarTodo
                                  ? this.state.pagosOtros
                                  : this.state.pagosOtrosValidos
                              }
                              conceptos={this.state.concepto}
                              datos={this.state.datos}
                              datosMonedas={this.state.monedas}
                              monedas={this.state.monedasvl}
                              ubicaciones={this.state.ubicacionesv1}
                              cuentas={this.state.cuentasv1}
                              configuraciones={this.state.configuraciones}
                            />
                          </tbody>
                          {/*<TableImporteFooter total ={this.CalcularImporteCuatro()}/>*/}
                        </table>
                        {/**Aqui iba las tablas obligaciones */}

                        {/**Aqui iba las tablas obligaciones */}
                      </td>
                      <td className="tdTable">
                        {/* Otras Obligaciones ###################################################################################### */}
                        <TablaOtrasObligaciones
                          otrasObligaciones={this.ActualizarObligaciones()}
                          codAlumno={this.state.codigoAlumno}
                          codPrograma={this.state.codigoPrograma}
                          dataConcepto={this.state.datos}
                          conceptoVL={this.state.concepto}
                          dataMoneda={this.state.monedas}
                          monedaVL={this.state.monedasvl}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* *************************************************************** */}
                {/**Aqui Va las tablas obligaciones */}
                {/*<tr className="trTable">
                  <td className="tdTable" >
                  <TablaOtrasObligCanceladas otrasObligaciones={this.ActualizarObligacionesC()} codAlumno={this.state.codigoAlumno} codPrograma={this.state.codigoPrograma} dataConcepto={this.state.datos} conceptoVL={this.state.concepto} dataMoneda={this.state.monedas} monedaVL ={this.state.monedasvl}/>
                  </td>
                  <td className="tdTable" >
                  <TablaOtrasObligaciones otrasObligaciones={this.ActualizarObligaciones()} otrasObligacionesC={this.ActualizarObligacionesC()} codAlumno={this.state.codigoAlumno} codPrograma={this.state.codigoPrograma} dataConcepto={this.state.datos} conceptoVL={this.state.concepto} dataMoneda={this.state.monedas} monedaVL ={this.state.monedasvl}/>
                   
                  </td>
                    </tr>*/}
                {/**Aqui Va las tablas obligaciones */}
                {/* *************************************************************** */}
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-12">
                <DeudaTotal deuda={this.CalcularDeudaTotal()} tipoMoneda = {this.state.tipoMonedaDerechoEnseñanza} />
              </div>
            </div> */}
          </div>
          <hr />
          <footer>
            <div className="row center-xs centrar color">
              Proyecto SIGAP © 2019 v.1.3
            </div>
          </footer>
        </div>
      );
    } else {
      return <p className="text-center">Cargando estado de pagos de alumno</p>;
    }
  }

  ActualizarObligaciones = () => {
    var BD_Estado = [
      { id: 1, label: "PENDIENTE" },
      { id: 2, label: "CANCELADO" },
    ];

    var BD_TipoObligacion = [
      { id: 1, label: "REPITENCIA" },
      { id: 2, label: "MULTA" },
    ];

    var valorTipoOb = "";
    var valorConcepto = "";
    var valorMoneda = "";
    var valorEstado = "";

    var ArrayActualizado = [];

    for (let j = 0; j < this.state.otrasObligaciones.length; j++) {
      for (let i = 0; i < BD_TipoObligacion.length; i++) {
        if (
          this.state.otrasObligaciones[j].id_tipo_oblig ==
          BD_TipoObligacion[i].id
        ) {
          valorTipoOb = BD_TipoObligacion[i].label;
        }
      }

      for (let i = 0; i < this.state.datos.length; i++) {
        if (
          this.state.otrasObligaciones[j].id_concepto ==
          this.state.datos[i].idConcepto
        ) {
          valorConcepto = this.state.datos[i].concepto;
        }
      }

      for (let i = 0; i < this.state.monedas.length; i++) {
        if (
          this.state.otrasObligaciones[j].id_moneda ==
          this.state.monedas[i].id_moneda
        ) {
          valorMoneda = this.state.monedas[i].moneda;
        }
      }

      for (let i = 0; i < BD_Estado.length; i++) {
        if (this.state.otrasObligaciones[j].id_estado == BD_Estado[i].id) {
          valorEstado = BD_Estado[i].label;
        }
      }

      var e = {
        id: this.state.otrasObligaciones[j].id,
        val_tipo_oblig: valorTipoOb,
        descripcion: this.state.otrasObligaciones[j].descripcion,
        val_concepto: valorConcepto,
        val_moneda: valorMoneda,
        importe: this.state.otrasObligaciones[j].importe,
        val_estado: valorEstado,
      };
      ArrayActualizado.push(e);
    }
    return ArrayActualizado;
  };

  //EDITAMOS EL VALOR DEL COSTO
  EditarCostoUno() {
    var costo = "costoUno";
    document.getElementById("tipoMonedaMatriculaUpg").disabled = false;
    document.getElementById(costo).disabled = false;
    document.getElementById(costo).focus();
  }
  EditarCostoDos() {
    var costo = "costoDos";
    document.getElementById("tipoMonedaDerechoEnseñanza").disabled = false;
    document.getElementById(costo).disabled = false;
    document.getElementById(costo).focus();
  }
  EditarRepitencia() {
    var costo = "repitencia";
    document.getElementById("tipoMonedaRepitencia").disabled = false;
    document.getElementById(costo).disabled = false;
    document.getElementById(costo).focus();
  }
  EditarCostoTres() {
    var costo = "costoTres";
    document.getElementById("tipoMonedaMatriculaEpg").disabled = false;
    document.getElementById(costo).disabled = false;
    document.getElementById(costo).focus();
  }
  MostrarImporte(codigoalumno, codigoprograma, codigoconcepto) {
    fetch(CONFIG + "/search/codigoalumno/codigoprograma/codigoconcepto")
      .then((response) => {
        return response.json();
      })
      .then((importe) => {});
  }
  RetornarCostoUno() {
    var costo = document.getElementById("costoUno").value;
    return costo;
  }
  RetornarCostoDos() {
    var costo = document.getElementById("costoUno").value;
    return costo;
  }
  RetornarCostoTres() {
    var costo = document.getElementById("costoUno").value;
    return costo;
  }

  //GUARDAMOS EL COSTO EDITADO
  GuardarCostoUno = (e) => {
    var costo = "costoUno";
    let idMoneda = this.state.tipoMonedaMatriculaUpg;

    document.getElementById(costo).disabled = true;
    document.getElementById("tipoMonedaMatriculaUpg").disabled = true;

    var codConcepto = 9;
    let id_tipo_recaudacion = 1;
    var importePago = document.getElementById(costo).value;

    this.setState({
      importeTabla1: importePago,
    });

    if (this.state.bool1 == 0) {
      this.AddCostoImporte(
        codConcepto,
        importePago,
        id_tipo_recaudacion,
        idMoneda
      );
    } else if (this.state.importeTabla1 >= 0) {
      alert("actualizara el importe");
      this.UpdateCostoImporte(
        codConcepto,
        importePago,
        id_tipo_recaudacion,
        idMoneda
      );

      //this.setState({  bool1: 1  });
    }
  };
  //ANALISIS DEL CODIGO
  GuardarCostoDos = (e) => {
    var costo = "costoDos";
    let idMoneda = this.state.tipoMonedaDerechoEnseñanza;
    document.getElementById(costo).disabled = true;
    document.getElementById("tipoMonedaDerechoEnseñanza").disabled = true;

    //Regresar aqui
    var codConcepto = this.state.diplomado ? 62 : 21;
    var importePago = document.getElementById(costo).value;
    let id_tipo_recaudacion = 3;

    this.setState({
      importeTabla2: importePago,
    });
    if (this.state.bool2 == 0) {
      alert("entro a add importe");
      this.AddCostoImporte(
        codConcepto,
        importePago,
        id_tipo_recaudacion,
        idMoneda
      );
    } else if (this.state.importeTabla2 >= 0) {
      alert("Se actualizará el importe");
      this.UpdateCostoImporte(
        codConcepto,
        importePago,
        id_tipo_recaudacion,
        idMoneda
      );
    }
  };

  GuardarCostoRepitencia = (e) => {
    var idRepitencia = "repitencia";
    let idMoneda = this.state.tipoMonedaRepitencia;
    document.getElementById(idRepitencia).disabled = true;
    document.getElementById("tipoMonedaRepitencia").disabled = true;

    //Regresar aqui
    var codConcepto = this.state.diplomado ? 62 : 21;
    var importeRepitencia = document.getElementById(idRepitencia).value;

    let id_tipo_recaudacion = 4;

    this.setState({
      importeRepitencia,
    });
    if (this.state.tieneImporteRepitencia == 0) {
      alert("entro a add importe");
      this.AddCostoImporte(
        codConcepto,
        importeRepitencia,
        id_tipo_recaudacion,
        idMoneda
      );
    } else if (this.state.importeRepitencia >= 0) {
      alert("Se actualizará el importe");
      this.UpdateCostoImporte(
        codConcepto,
        importeRepitencia,
        id_tipo_recaudacion,
        idMoneda
      );
    }
  };

  GuardarCostoTres = (e) => {
    var costo = "costoTres";
    let idMoneda = this.state.tipoMonedaMatriculaEpg;
    document.getElementById(costo).disabled = true;
    document.getElementById("tipoMonedaMatriculaEpg").disabled = true;

    var codConcepto = 117;
    var importePago = document.getElementById(costo).value;
    let id_tipo_recaudacion = 2;

    this.setState({
      importeTabla3: importePago,
    });

    if (this.state.bool3 == 0) {
      this.AddCostoImporte(
        codConcepto,
        importePago,
        id_tipo_recaudacion,
        idMoneda
      );
    } else if (this.state.importeTabla3 >= 0) {
      this.UpdateCostoImporte(
        codConcepto,
        importePago,
        id_tipo_recaudacion,
        idMoneda
      );

      //this.setState({  bool3: 1  });
    }
  };

  calcularSumaImportes = () => {
    let monto =
      this.CalcularImporteDos() +
      this.CalcularImporteRepitencia() +
      this.CalcularImporteTres() +
      this.CalcularImporteUno();
    return monto;
  };

  CalcularDeudaTotal = (e) => {
    var deudaUpg = this.state.importeTabla1 - this.CalcularImporteUno();
    var deudaEpg = this.state.importeTabla3 - this.CalcularImporteTres();
    var deudaDE = this.state.importeTabla2 - this.CalcularImporteDos();
    var deudaRepitencia =
      this.state.importeRepitencia - this.CalcularImporteRepitencia();
    var deudaTotal = 0;

    if (deudaUpg >= 0) {
      deudaTotal = deudaTotal + deudaUpg;
    }
    if (deudaEpg >= 0) {
      deudaTotal = deudaTotal + deudaEpg;
    }
    if (deudaDE >= 0) {
      deudaTotal = deudaTotal + deudaDE;
    }
    if (deudaRepitencia >= 0) {
      deudaTotal = deudaTotal + deudaRepitencia;
    }

    return deudaTotal;
  };

  AddCostoImporte = (
    codConcepto,
    importePago,
    id_tipo_recaudacion,
    idMoneda
  ) => {
    fetch(CONFIG + "importealumno/add", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        cod_alumno: this.state.codigoAlumno,
        cod_programa: this.state.codigoPrograma,
        cod_concepto: codConcepto,
        importe: importePago,
        id_tipo_recaudacion: id_tipo_recaudacion,
        id_moneda: idMoneda,
      }),
    }).then((response) => {
      return response.json();
    });
  };

  UpdateCostoImporte = (
    codConcepto,
    importePago,
    id_tipo_recaudacion,
    idMoneda
  ) => {
    fetch(CONFIG + "importealumno/update", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        cod_alumno: this.state.codigoAlumno,
        cod_programa: this.state.codigoPrograma,
        cod_concepto: codConcepto,
        importe: importePago,
        id_tipo_recaudacion: id_tipo_recaudacion,
        id_moneda: idMoneda,
      }),
    }).then((response) => {
      return response.json();
    });
    this.setState({ bool1: 1 });
  };

  //PASAR LOS FILTROS A UNA TABLA
  FuncionUno(holas) {
    for (let j = 0; j < this.state.pagoUno.length; j++) {
      if (holas == this.state.pagoUno[j].idRec) {
        if (this.state.pagoUno[j].check == true) {
          this.state.pagoUno[j].check = false;
        } else {
          this.state.pagoUno[j].check = true;
        }
      }
    }
  }
  FuncionDos(holas) {
    for (let j = 0; j < this.state.pagoDos.length; j++) {
      if (holas == this.state.pagoDos[j].idRec) {
        if (this.state.pagoDos[j].check == true) {
          this.state.pagoDos[j].check = false;
        } else {
          this.state.pagoDos[j].check = true;
        }
      }
    }
  }
  FuncionTres(holas) {
    for (let j = 0; j < this.state.pagoTres.length; j++) {
      if (holas == this.state.pagoTres[j].idRec) {
        if (this.state.pagoTres[j].check == true) {
          this.state.pagoTres[j].check = false;
        } else {
          this.state.pagoTres[j].check = true;
        }
      }
    }
  }
  FuncionCuatro(holas) {
    for (let j = 0; j < this.state.pagoCuatro.length; j++) {
      if (holas == this.state.pagoCuatro[j].idRec) {
        if (this.state.pagoCuatro[j].check == true) {
          this.state.pagoCuatro[j].check = false;
        } else {
          this.state.pagoCuatro[j].check = true;
        }
      }
    }
  }

  //LO USA WILL...
  reporte_credito(idx, nombrenuevo, auxPagos) {
    let solicitud =
      CONFIG +
      "beneficio/breporte_cr/" +
      nombrenuevo +
      "/" +
      auxPagos[0].idPrograma +
      "/" +
      idx;

    fetch(
      CONFIG +
        "beneficio/breporte_cr/" +
        nombrenuevo +
        "/" +
        auxPagos[0].idPrograma +
        "/" +
        idx
    )
      .then((response) => {
        return response.json();
      })
      .then((costos) => {
        this.setState({ costosP: costos });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //LO USA WILL...
  reporte_ciclo(nombrenuevo, auxPagos, idx) {
    fetch(
      CONFIG +
        "beneficio/breporte_ci/" +
        nombrenuevo +
        "/" +
        auxPagos[0].idPrograma +
        "/" +
        idx
    )
      .then((response) => {
        return response.json();
      })
      .then((costos) => {
        this.setState({ costosP: costos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //CALCULAR LOS IMPORTES DE LAS TABLAS
  CalcularImporteUno() {
    /* Suma de pagos por UPG ########################################################################################### */
    let pagos = this.state.pagosUpg;
    let importe = 0;
    for (var indice in pagos) {
      if (pagos[indice].moneda == "108" || pagos[indice].moneda == "113") {
        if (!this.state.mostrarTodo) {
          if (pagos[indice].validado) {
            importe = importe + pagos[indice].importe;
          }
        } else {
          importe = importe + pagos[indice].importe;
        }
      }
    }
    //this.setState({  sumaImporteUPG: importe  });
    return importe;
  }
  CalcularImporteDos() {
    /* Suma de pagos por Enseñanza ########################################################################################### */
    let pagoDerechoEnsenanza = this.state.pagosEnsenanza;
    let importe = 0;
    for (var indice in pagoDerechoEnsenanza) {
      if (
        pagoDerechoEnsenanza[indice].moneda == "108" ||
        pagoDerechoEnsenanza[indice].moneda == "113"
      ) {
        if (!this.state.mostrarTodo) {
          if (pagoDerechoEnsenanza[indice].validado) {
            importe = importe + pagoDerechoEnsenanza[indice].importe;
          }
        } else {
          importe = importe + pagoDerechoEnsenanza[indice].importe;
        }
      }
    }
    return importe;
  }
  /************************************************* */
  CalcularImporteRepitencia() {
    /* Suma de pagos por Repitencia ########################################################################################### */
    let pagoRepitencia = this.state.pagosRepitencia;
    let importe = 0;
    for (var indice in pagoRepitencia) {
      if (
        pagoRepitencia[indice].moneda == "108" ||
        pagoRepitencia[indice].moneda == "113"
      ) {
        if (!this.state.mostrarTodo) {
          if (pagoRepitencia[indice].validado) {
            importe = importe + pagoRepitencia[indice].importe;
          }
        } else {
          importe = importe + pagoRepitencia[indice].importe;
        }
      }
    }
    return importe;
  }

  CalcularImporteTres() {
    /* Suma de pagos por EPG ########################################################################################### */
    let pagos = this.state.pagosEpg;
    let importe = 0;
    for (var indice in pagos) {
      if (pagos[indice].moneda == "108" || pagos[indice].moneda == "113") {
        if (!this.state.mostrarTodo) {
          if (pagos[indice].validado) {
            importe = importe + pagos[indice].importe;
          }
        } else {
          importe = importe + pagos[indice].importe;
        }
      }
    }
    //this.setState({  sumaImporteEPG: importe  });
    return importe;
  }

  //USADO PARA LA PAGINACION
  onChangePage(pageOfItems) {
    var total = [];
    var checkbox_selec = [];
    var checks = document.getElementsByClassName("checkbox1");
    var checks_normales = Array.from(checks);
    checks_normales.map((checkbox) => {
      if (checkbox.checked) {
        checkbox_selec.push(checkbox.id);
      }
    });

    for (let i = 0; i < checkbox_selec.length; i++) {
      var id = checkbox_selec[i];
      for (let j = 0; j < this.state.pagocero.length; j++) {
        if (this.state.pagocero[j].idRec == id) {
          total.push(this.state.pagocero[j]);
        }
      }
    }
    // update state with new page of items
    this.setState({
      checkbox_: total,
      pageOfItems: pageOfItems,
    });
  }
}

class Paginacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }
  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    //var pages = _.range(startPage, endPage + 1);
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  render() {
    var pager = this.state.pager;

    return (
      <ul className="pagination row center-xs">
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index + 28}
            className={pager.currentPage === page ? "active" : ""}
          >
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => this.setPage(pager.currentPage + 1)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default ImportePagos;
