import React from 'react'
import PagoList from './Pago-list'
import TableHeader from './Table-Header'
import Alumno from './Alumno'
import AlumnoCodigo from './AlumnoCodigo'
import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App.css';
import PropTypes from 'prop-types';
import Imprimir2 from './imprimir2';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import CONFIG1 from '../Configuracion/Conf'
import FormularioIntermio from './formulario-intermedio';
import ComponenteEditable from './ComponenteEditable'
import ImporteDolar from './ImporteDolar';

import Select from 'react-select';
import {
  ModalFooter, ModalBody, ModalHeader, Modal, Button
} from 'reactstrap';


//ESTA ES LA VISTA PRINCIPAL POR NOMBRES Y APELLIDOS

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      seleccionado:false,
      validado:false,
      datosformulario:[],
      aparecer:true,
      todos:false,
      checkbox_:[],
      filtros: [],
      pagocero: [],
      pagocerovalidado: [],
      pagos: [],
      name: this.props.params.name,
      pageOfItems: [],
      estado:0,
      filtroDel:new String(""),
      filtroAl:new String(""),
      filtroNumeros: [],
      alumno: {},
      conceptos:[],
      configuraciones:[],
      costosP: {},
      costosP2: {},
      concepto:[],
      datos:[],
      monedas:[],
      monedasvl:[],
      ubicaciones:[],
      ubicacionesv1:[],

      tipo_recaudacion:[],
      
      /**
       * Aca entran las repitencias
       */
      repitenciav1:[
        {value:"N",label:"NO"},
        {value:"S",label:"SI"},
      ],

      tipos:[],
      tiposv1:[],
      defuncion: 1,
      NroModal: 0,
      estadoAlumno:"",
      idPrograma:'',
      presupuestoActual:"",//nuevo
      presupuesto:"", //nuevo
      mostrar:true,
      mostrar_benef:true,//nuevo
      mostrar_costo_final:true,//nuevo
      valor: true,
      detallePresupuesto:{},
      estadoAlumnoInput:{value:"-1",label:"Seleccione un nuevo estado"},
      TipopresupuestoInput:{value:"-1",label:"Seleccione un presupuesto"},
      optionsEstadoAlumno:[{value:"casado",label:"Casado"},
      {value:"soltero",label:"Soltero"},
      {value:"divorciado",label:"Divorciado"},
      {value:"viudo",label:"Viudo"},
      {value:"separado",label:"Separado"},
      {value:"conviviente",label:"Conviviente"},
      {value:"fallecido",label:"Fallecido"}
      ],
    optionsProgramas:[],
    optionsTipoPrograma:[],
    showModalConfiguracion:false,
    beneficios:[],
    idProgramaOriginal:0,
    suma: true
    }
    this.clase='';
    this.alumno = '';
    this.importe = 0;
    this.FiltrarFecha = this.FiltrarFecha.bind(this);
    this.showboolean = true;

    this.FiltrarNumeros = this.FiltrarNumeros.bind(this);
    this.filtrarConcepto = this.filtrarConcepto.bind(this);
    this.SeleccionFechaAl = this.SeleccionFechaAl.bind(this);
    this.SeleccionFechaDel = this.SeleccionFechaDel.bind(this);
    this.Filtrar = this.Filtrar.bind(this);
    this.reporte_ciclo = this.reporte_ciclo.bind(this);
    this.reporte_credito = this.reporte_credito.bind(this);
 //   this.arreglosReporte = this.arreglosReporte.bind(this);

    this.select = [];
    this.onChangePage = this.onChangePage.bind(this);
    this.seleccionar=this.seleccionar.bind(this);
    this.enviar=this.enviar.bind(this);
    this.Funcion=this.Funcion.bind(this);
    this.Regresar2=this.Regresar2.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.show_or_hide = this.show_or_hide.bind(this);
  }
componentDidUpdate(){
  console.log("Esto es segundo");
    if(this.state.estado!=0){
      var checks=document.getElementsByClassName("checkbox1");
      for(let i=0;i<checks.length;i++){
         var id=checks[i].id;
         for(let j=0;j<this.state.pagocero.length;j++){
             var codigo=this.state.pagocero[j].idRec;
             if(this.state.pagocero[j].check==true){
               if(id==codigo){
                 checks[i].checked=true;
               }
             }
        }

        }
       }
       else{
         this.setState({estado:1})
        }

    
 }

 hallarBeneficios=(codigo)=>{
   fetch(CONFIG+'beneficio/listar/' + codigo)
  .then(response=>{
    return response.json()
  })
  .then(beneficios=>{
    this.setState({
      beneficios
    })
  })
 }

  colocar=()=>{
    var check=document.getElementById("observacion").checked;
    if(check){
      this.setState({

        seleccionado:true
      })
    }
    if(!check){

      this.setState({
        seleccionado:false
      })
    }
  }

  validado=()=>{
    var check=document.getElementById("validar").checked;
    if(check){
      this.setState({
        validado:true
      })
    }
    if(!check){
      this.setState({
        validado:false
      })
    }
  }

  //nuevo
  mostrarOcultar=()=>{
    if(this.state.mostrar){    
      document.getElementById('mostrar-ocultar').style.display = 'block';
      this.setState({
        mostrar:false
      })
    }
    else{
      document.getElementById('mostrar-ocultar').style.display = 'none';
      this.setState({
        mostrar:true
      })

    }
  }

  //nuevo
  mostrarCostoFinal=()=>{
    if(this.state.mostrar_costo_final){    
      document.getElementById('costo-final').style.display = 'flex';
      this.setState({
        mostrar_costo_final:false
      })
    }
    else{
      document.getElementById('costo-final').style.display = 'none';
      this.setState({
        mostrar_costo_final:true
      })

    }
  }

  //nuevo
  mostrarBeneficio = () =>{
    if(this.state.mostrar_benef){    
      document.getElementById('tabla-beneficios').style.display = 'block';
      this.setState({
        mostrar_benef:false
      })
    }
    else{
      document.getElementById('tabla-beneficios').style.display = 'none';
      this.setState({
        mostrar_benef:true
      })

    }
  } 


  componentWillMount() {
    console.log("esto es primero");


    fetch(CONFIG+"tiposRecaudacion/listar")
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      console.log("los tipos de racaudacion",data)
      this.setState({
        tipo_recaudacion: data.tipoRecaudaciones
      })
    })

      setTimeout(() => {
        
    console.log("Este es el id del programa",this.state.idPrograma)
    fetch(CONFIG+'alumno/alumnoprograma/programa/'+this.state.idPrograma)
   .then((response)=>{
     return response.json();
   })
   .then((programa)=>{
     console.log(programa)
     this.setState({
       presupuestoActual : programa.nomPrograma,
       optionsTipoPrograma : [{value : programa.idPrograma,label:this.state.idPrograma+" - "+programa.nomPrograma}]/**/ 
     })
   })
   .catch(error=>{
     console.log(error)
   })
   console.log(this.state.optionsTipoPrograma)

   let option=[];
   let a = {}
   fetch(CONFIG+'alumno/alumnoprograma/programa/presupuesto/'+this.state.idPrograma)
   .then((response)=>{
     return response.json();
    })
    .then((programa)=>{
      console.log(programa)
  for(let i=0;i<programa.length;i++){
    a={
      value : programa[i].programa_presupuesto,
      label : programa[i].tarifa+'--Ciclo: '+programa[i].ciclo
    }
    option.push(a)
  }
  console.log(option)

    })
    .catch(error=>{
      console.log(error)
    })
    
    this.hallarBeneficios(this.state.alumno.apeNom);
  }, 2000);


  
    console.log("El pago cero es: ",this.pagocero)

    this.pageOfItems = this.pagocero;
    console.log("El page of items es: ",this.pageOfItems)
    var checkbox_selec=[];

    var nombres = this.state.name;
    console.log("los nombres son -> ",nombres);
    var checks=document.getElementsByClassName("checkbox1");
    var checks_normales=Array.from(checks);
    checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);
     }
   });
//aqui van los conceptos
   var array=[];

   fetch(CONFIG+'/concepto/conceptos')
   .then((response)=>{
       return response.json()
   })
   .then((listas)=>{

       this.setState({
         datos:listas
       })
       listas.forEach(function(element) {

         var e={value:element.concepto,label:element.concepto};
         array.push(e);
       });


   })
   .catch(error=>{
       console.error(error)
   });
   console.log("valores de las weas");
   console.log(array)

   this.setState({
     concepto:array
   })

   console.log("link configuraciones")
    console.log(CONFIG+'configuracion/listar/')

    fetch(CONFIG+'configuracion/listar/')
      .then((response) => {
        return response.json()
      })
      .then((listas) => {
        console.log("configuraciones")
        console.log(listas);
        this.setState({
          configuraciones: listas
        },
        );
      })
      .catch(error => {
        console.error(error)
      });


//aqui terminan los conceptos


//aqui van las moneditas
    var array2=[];
    fetch(CONFIG+'/concepto/monedas')
    .then((response)=>{
        return response.json()
    }).then((listas)=>{
        console.log("moneditas---------")
        console.log(listas)

        this.setState({
          monedas: listas
        })
        listas.forEach(function(element) {

          var e={value:element.moneda,label:element.moneda};
          array2.push(e);
        });


    })
    .catch(error=>{
        console.error(error)
    });

    console.log("valores de las weas de monedas");
    console.log(array2)

    this.setState({
      monedasvl:array2
    })


//aqui terminan las moneditas

//aqui van las ubicaciones
var array3=[];
fetch(CONFIG+'/concepto/ubicaciones')
.then((response)=>{
    return response.json()
}).then((listas)=>{
    console.log("ubicaciones---------")
    console.log(listas)

    this.setState({
      ubicaciones: listas
    })
    listas.forEach(function(element) {
      var e={value:element.descripcion,label:element.descripcion};
      array3.push(e);
    });


})
.catch(error=>{
    console.error(error)
});

console.log("valores de las weas de monedas");
console.log(array3)

this.setState({
  ubicacionesv1:array3
})

//------

//aqui van los tipos
var array4=[];
fetch(CONFIG+'/concepto/cuentas')
.then((response)=>{
    return response.json()
}).then((listas)=>{
    console.log("cuentas---------")
    console.log(listas)

    this.setState({
      cuentas: listas
    })
    listas.forEach(function(element) {
      var e={value:element.descripcion,label:element.descripcion};
      array4.push(e);
    });


})
.catch(error=>{
    console.error(error)
});

console.log("valores de las weas de monedas");
console.log(array4)

this.setState({
  cuentasv1:array4
})

//------


    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombres.split(separador);
    console.log("el arreglo de subcadenas es  ->",arregloDeSubCadenas);
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }

    console.log("el arreglo luego de pasar por el for es ->",arreglo);

    var nombrenuevo = arreglo.join(" & ");  //esto es 18207001
    
    var nombreAlumno = arreglo.join(" ");
    console.log("El nombre del alumno es ->",nombreAlumno);//esto es 18207001
    //por la weba hizo el for este weon : > desde la linea 467 hasta la 481 esta por las puras.
//ANTERIOR LINK
//https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/listar/


    //TRANSFORMANDO PARAMETRO
    var nombresTrans = nombres;
    var pruebita = parseInt(nombresTrans);

    console.log("pruebita es de tipo -> ",typeof(pruebita));
    if(isNaN(pruebita)){
      console.log("pruebita no es un numero");
      this.clase=Alumno;
    fetch(CONFIG+'recaudaciones/alumno/concepto/listar/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {

        var auxPagos = pagos;

      var alumnoDetalle = {
      apeNom: nombreAlumno
      }
        this.setState({
          pagocero: pagos,
          pagos: pagos,
          alumno: alumnoDetalle
        },

        );

      var total=this.state.pagocero;

     this.state.pagocero.map((pago)=>{
       pago.check=false
     })
      // console.log(this.state.pagocero);

      }
      //los pagos son los pagos cero del codigo del alumno
    )
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });
    //LINK ANTERIOR::
    //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
    fetch(CONFIG+'concepto/leer/restringido/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        this.setState({
          conceptos: conceptos,
        }
        );
      })
      .catch(error => {

        console.error(error)
      });

    }
    else{
            this.clase=AlumnoCodigo

            fetch(CONFIG+'/beneficio/listar/' + nombrenuevo)
              .then((response)=>{
                  return response.json()
              }).then((datos)=>{

                console.log("datos del beneficio que posee el alumno");
                console.log(datos);
                this.setState({datosformulario: datos})

              })
              .catch(error=>{
                  console.error(error)
              });

              // El nombre nuevo es el codigo del alumno por favor escribir los nombres de las variables para que tengan sentido
              // console.log("el codigo del alumno es ->",nombrenuevo)
            fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
            .then((response) => {
              return response.json()
            })
            .then((pagos) => {

                      console.log("pagos de la consulta de acuerdo al codigo  ingresado son ->",pagos);
                      console.log(pagos[0].idPrograma)
                      this.setState({
                        idPrograma : pagos[0].idPrograma
                      })

                      console.log("UN IDREC");
                      // console.log(pagos[1].idRec);
                      var auxPagos = pagos

                    var alumnoDetalle = {
                    apeNom: nombreAlumno
                    }
                    /***************************************************************************** */
                      this.setState({
                        pagocero: pagos,
                        pagos: pagos,
                        alumno: alumnoDetalle,
                      });
                      /***************************************************************************** */
                    var total=this.state.pagocero;

                  this.state.pagocero.map((pago)=>{
                    pago.check=false
                  })
                    // console.log(this.state.pagocero); colocar=()=>{

                    fetch(CONFIG+'beneficio/comprobacion/' + nombrenuevo)//CONFIG+'beneficio/breporte/' + nombrenuevo+'/'+auxPagos[0].idPrograma
                    .then((response)=>{
                        return response.json()
                    }).then((comprobacion)=>{//costos
                        console.log(comprobacion);
                        if(this.state.suma){
                          if(this.state.costosP.creditos){
                            this.setState({
                              idProgramaOriginal : pagos[0].idPrograma
                            })
                          }
                        else {
                          this.setState({
                            idProgramaOriginal : 0
                          })
                        }
                        this.setState({
                          suma: false
                        })
                        }
                        if(comprobacion ==  1 ){
                            //console.log("toffe");
                            this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
                            setTimeout(() => {
                              this.setState({
                                costosP2: this.state.costosP
                              })
                              if(this.state.costosP.creditos){
                                this.setState({
                                  idProgramaMostrar : pagos[0].idPrograma
                                })
                              }
                            else {
                              this.setState({
                                idProgramaMostrar : 0
                              })
                            }
                            }, 500);
                        }
                        else if(comprobacion == 2) {
                            console.log("oso");
                            console.log(auxPagos);
                            this.reporte_ciclo(nombrenuevo,auxPagos,2);
                            setTimeout(() => {
                              this.setState({
                                costosP2: this.state.costosP
                              })
                              if(this.state.costosP.creditos){
                                this.setState({
                                  idProgramaMostrar : pagos[0].idPrograma
                                })
                              }
                            else {
                              this.setState({
                                idProgramaMostrar : 0
                              })
                            }
                            }, 500);
                        }
                        else if(comprobacion == 3){
                            if(comprobacion.tipo == "por ciclo"){
                                this.reporte_ciclo(nombrenuevo,auxPagos,0);
                                setTimeout(() => {
                                  this.setState({
                                    costosP2: this.state.costosP
                                  })
                                  if(this.state.costosP.creditos){
                                    this.setState({
                                      idProgramaMostrar : pagos[0].idPrograma
                                    })
                                  }
                                else {
                                  this.setState({
                                    idProgramaMostrar : 0
                                  })
                                }
                                }, 500);
                            }
                            else{
                                this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
                                setTimeout(() => {
                                  this.setState({
                                    costosP2: this.state.costosP
                                  })
                                  if(this.state.costosP.creditos){
                                    this.setState({
                                      idProgramaMostrar : pagos[0].idPrograma
                                    })
                                  }
                                else {
                                  this.setState({
                                    idProgramaMostrar : 0
                                  })
                                }
                                }, 500);
                            }
                        }
                    })
                    .catch(error=>{
                        console.error(error)
                    });

            })
            .catch(error => {
              // si hay algún error lo mostramos en consola
              console.error(error)
            });
          //LINK ANTERIOR::
          //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
              console.log("link conceptos")
              console.log(CONFIG+'concepto/leer/restringido/' + nombrenuevo)

            fetch(CONFIG+'concepto/leer/restringido_cod/' + nombrenuevo)
              .then((response) => {
                return response.json()
              })
              .then((conceptos) => {
                this.setState({
                  conceptos: conceptos
                },
                );
              })
              .catch(error => {
                console.error(error)
              });
    }
/****************************************************************************** */
        /**set array pagos */ 
        fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
        .then((response) => {
        return response.json();
        })
        .then( pagos  =>{
          
          
          console.log(" estado civil ",pagos[0].estado_civil)
          this.setState({
          estadoAlumno:pagos[0].estado_civil,
          })
        });
/****************************************************************************** */
}


  Regresar=(e)=>{
    try{
      this.closeNav();
    }
    catch(error){
      //Nothing happens
    }
    browserHistory.push('/vista/programas'); //no habia nada solo estaba el slash
    e.preventDefault();

  }

  editarEstado = (e) => {
    e.preventDefault();
    if (this.state.defuncion == 1) {
      this.state.defuncion = 0;
      this.state.estadoAlumno = "Alumno fallecido"
      fetch(CONFIG+'recaudaciones/alumno/concepto/' + this.state.pagos[0].codAlumno  + '/estado_civil_alumno/' + this.state.alumno.estado_civil,
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

      fetch(CONFIG+ 'recaudaciones/alumno/concepto/'+this.state.pagos[0].codAlumno + '/estado_civil_alumno/' + this.state.alumno.estado_civil,
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
  guardarCambios = () => {
  
    let self = this;
    if(this.state.estadoAlumnoInput.value === null || this.state.estadoAlumnoInput.value === "-1"){

      swal("Escoga una opción", "", "error")
    }else{
      fetch(CONFIG+'recaudaciones/alumno/concepto/'+this.state.pagos[0].codAlumno+'/estado_civil_alumno/'+this.state.estadoAlumnoInput.value,
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
        if(defuncion===1){
          swal("Estado del alumno cambiado!", "", "success")
          self.setState({
            estadoAlumnoInput:{value:"0",label:"Seleccione un estado"}
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

  editarConfiguracion = (e) => {
    console.log(e.target.value);
    this.setState({
      showModalConfiguracion:true,
      NroModal:e.target.value
    });
  }

  closeModal = () => {
    this.setState({
      showModalConfiguracion:false
    });
  }

  handleChangeSelectEstadoAlumno = (estado) => {
 
    if(estado!== null){
      this.setState({
        estadoAlumnoInput:estado,
        estadoAlumno:estado.label
      });
    }

  }
  
  actualizarProgramaPresupuesto = (mensaje=true) => {
    //document.getElementById('boton-deshacer').style.display = 'flex';
    this.guardarPresupuesto()
    fetch(CONFIG+'recaudaciones/alumno/concepto/actualizarIdProgramaPrespuesto/'+this.state.idPrograma+'/'+this.state.name,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "PATCH",
        }
      ).then((response) => {
        return response.json();

      })
        .then((defuncion) => {
          if(mensaje){
            swal("Presupuesto Asignado Correctamente","","")
            this.componentWillMount()
          }
            

        })
        .catch(error => {
          // si hay algún error lo mostramos en consola
          swal("Oops, Algo salió mal!!", "", "error")
          console.error(error)
        });
	}

  handleChangeSelectTipoPrograma = (estado) => {
    console.log(estado)
    this.setState({
      TipopresupuestoInput:{value: estado.value,label: estado.label}
    });
    switch(estado.value){
      case 1 : this.setState({
                  detallePresupuesto : { upg: 0, epg:0, derecho:5808, total:5808, valor1:24, valor2:242}
                });
                break;
      case 2 : this.setState({
                  detallePresupuesto : { upg: 0, epg:0, derecho:5808, total:5808, valor1:24, valor2:242}
                });
                break;
      case 3 : this.setState({
                  detallePresupuesto : { upg: 0, epg:0, derecho:5808, total:5808, valor1:24, valor2:242}
                });
                break;
      case 4 : this.setState({
                  detallePresupuesto : { upg: 1816, epg:208, derecho:16488, total:16488, valor1:72, valor2:229}
                });
                break;
      case 5 : this.setState({
                  detallePresupuesto : { upg: 1816, epg:208, derecho:16488, total:16488, valor1:72, valor2:229}
                });
                break;
      case 6 : this.setState({
                  detallePresupuesto : { upg: 1816, epg:208, derecho:16488, total:16488, valor1:72, valor2:229}
                });
                break;
      case 7 : this.setState({
                  detallePresupuesto : { upg: 1816, epg:208, derecho:16488, total:18512, valor1:212, valor2:229}
                });
                break;
      case 8 : this.setState({
                  detallePresupuesto : { upg: 3000, epg:312, derecho:29472, total:32784, valor1:96, valor2:307}
                });
                break;        
    }
  
  }


 handleChangeSelectPrograma = (estado) =>{
   console.log(estado)
      this.setState({
        presupuestosInput : {value: estado.value,label: estado.label}
      });

 }

 sleep=(milliseconds) =>{
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
   if ((new Date().getTime() - start) > milliseconds) {
    break;
   }
  }
 }

 guardarPresupuesto = () => {
   console.log("Ya me guarde :v")
   console.log(this.state.TipoPrograma)

   fetch(CONFIG+'alumno/alumnoprograma/programa/'+this.state.idPrograma)
   .then((response)=>{
     return response.json();
   })
   .then((programa)=>{
     console.log(programa)
     this.setState({
       presupuestoActual : programa.nomPrograma
     })
   })
   .catch(error=>{
     console.log(error)
   })
 }

  render() {
    if (this.state.pagos.length > 0) {
      return (

        <div id="main" className="">
            <Modal isOpen={this.state.showModalConfiguracion}  toggle={this.closeModal}  
                  aria-labelledby="contained-modal-title-vcenter">
                  <div>
                    <ModalHeader toggle={this.closeModal}>Configuración de Estudiante</ModalHeader>
                      <ModalBody>
                        <h6 align="left" className="Alumno"><b>Estado de alumno:</b></h6>
                        <h6  align="center"  className="negro">{this.state.estadoAlumno}</h6> 
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
                        <Button color="green" onClick={this.guardarCambios}>Guardar</Button><p>  </p>
                        <Button color="secondary" onClick={this.closeModal}>Salir</Button>
                    </ModalFooter>
                </div>      
            </Modal>
            
        {this.state.aparecer?(
        <div>
          <h3>Estado de pagos por alumno
          <ul id="nav-mobile" className=" row right  hide-on-med-and-down">

              <li ><a className="seleccionar col" onClick={this.openNav} >Ver todo<i className="material-icons right">apps</i></a></li>
          </ul>
          </h3>
          <hr/>
            <div className="SplitPane row">
              <div className=" col-xs-3">
                        <div className="Panel row">
                          <div className=" col-xs-1">     
                          </div>
                          <div className=" col-xs-5">
                              <this.clase alumno={this.state.alumno} sigla={this.state.pagos[0].sigla_programa}/>
                            </div>
                          <div className=" col-xs-6">
                            <h6 align="center" className="Alumno"><b>Nombres:</b></h6>
                            <h6 align="center" className="negro">{this.state.pagos[0].apeNom}</h6>
                            <h6 align="center" className="Alumno"><b>Estado del alumno:</b></h6>
                            <h6 align="center" className="negro">{this.state.estadoAlumno}</h6>

                            <div  className=" center ">
                              <button  type="submit"  onClick={e => this.editarConfiguracion(e,"value")}  className="waves-effect waves-light btn-small"> Editar estado 
                                  <i className="large material-icons left">edit</i>
                              </button>              
                            </div>
                            
                            <div className="row">
                              <div className="col-xs-8 Alumno"><b>Tiene Beneficio:</b></div>
                              {(this.state.beneficios.length>0)?(<div className="col-xs-1 ">Si</div>):(<div className="col-xs-1">No</div>)}
                            </div>
   
                          </div>
                        </div>
              </div>
              <div className=" col-xs-1">
              </div>
            
              <div className=" col-xs-8">
                <div className="SplitPane row">
                  <div className="inline col-xs-3 ">
                    <div>
                    <label>Del:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaDel} />
                    </div>
                    <div>
                    <label>Al:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaAl} />
                    </div>
                  </div >
                  <div className="col-xs-3 ">

                    <div className="col-xs-12 text-align center">
                      <h4 className="  espacio">Conceptos</h4>
                      <div className="scroll center-xs mt-xs-2 ">
                        <form action="#"><ConceptoList listado={this.state.conceptos} /></form>
                      </div>
                    </div>
                    <div className="col-xs-12 center espacio2">
                      <button onClick={this.Filtrar}  className="waves-effect waves-light btn-small " type="submit">Filtrar<i className="large material-icons left">filter_list</i></button>

                    </div>
                  </div>
                  <div className="centrar col-xs-4">
                    <h4 className=" centrar">Recibo</h4>
                    <div>
                      <NumeroRecibo Numeros={this.FiltrarNumeros} />
                    </div>
                  </div>
                </div>
              </div>
          </div>
          
          <div id="tabla-beneficios">
            <div className="alcentro ">
              <div className="col-xs-11 row">
                <div className="verdeagua cuadro-borde col-xs-1"><b>N°</b></div>
                <div className="verdeagua cuadro-borde col-xs-2"><b>BENEFICIO</b></div>
                <div className="verdeagua cuadro-borde col-xs-2"><b>AUTORIZACION</b></div>
                <div className="verdeagua cuadro-borde col-xs-2"><b>CONDICION</b></div>
                <div className="verdeagua cuadro-borde col-xs-2"><b>FECHA</b></div>
                <div className="verdeagua cuadro-borde col-xs-2"><b>RESOLUCION</b></div>
              </div> 
            </div>
            { (this.state.beneficios.length>0) ?
              Object.keys(this.state.beneficios).map(key=>(
              
              <div className="mb-3 alcentro " key={key}>
                <div className="col-xs-11 row">
                  <div className="cuadro-borde col-xs-1">{key+1}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.beneficios[key].benef_otrogado}%</div>
                  <div className="cuadro-borde col-xs-2">{this.state.beneficios[key].autorizacion}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.beneficios[key].condicion}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.beneficios[key].fecha}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.beneficios[key].resolucion}</div>
                </div>
              </div>
            )) : (<div className="mb-3 alcentro " >
                    <div className="col-xs-11 row">
                        <div className="cuadro-borde col-xs-11">Usted no cuenta con ningun beneficio</div>
                    </div>
                  </div>)}
          </div>
          <div id="mostrar-ocultar">
          <div >
              <div className="mt-3  row">
                <div className="ml-5 alcentro col-xs-2"><b>Presupuesto Actual del Alumno:</b> </div>
                <div className="alaizquierda col-xs-1">{this.state.idProgramaMostrar}</div>
              </div>
          </div>
            <div >
              <br></br>
              <div className="alcentro ml-5">
                <div className="col-xs-12 row">
                  <div className="col-xs-1"></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>MATRICULA UPG</b></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>MATRICULA EPG</b></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>DERECHO DE ENSEÑANZA</b></div>
                  <div className="verdeagua cuadro-borde col-xs-1"><b>TOTAL</b></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>VALOR POR CREDITO</b></div>
                </div> 
              </div>
              <div className="alcentro ml-5">
                <div className="col-xs-12 row">
                  <div className="verdeagua cuadro-borde col-xs-1"><b>COSTO REAL</b></div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.costosP2.upg}</div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.costosP2.epg}</div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.costosP2.total}</div>
                  <div className="cuadro-borde col-xs-1">S/ {this.state.costosP2._Total}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.costosP2.creditos} x {this.state.costosP2.costo_credito}</div>
                  <div >
                    <button onClick={this.mostrarCostoFinal} className="waves-effect waves-light btn-small ml-3 " type="submit">Ver con Beneficios</button>
                  </div>
                </div>
                
              </div>
              <div  className="alcentro ml-5">
                <div id="costo-final" className="col-xs-12 row">
                  <div className="verdeagua cuadro-borde col-xs-1"><b>COSTO FINAL</b></div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.costosP2.d_upg}</div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.costosP2.d_epg}</div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.costosP2.d_total}</div>
                  <div className="cuadro-borde col-xs-1">S/ {this.state.costosP2.d_Total}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.costosP2.creditos} x {this.state.costosP2.costo_credito_d}</div>
                </div>
              </div>

                <br></br>
                <div className="mt-3 row">
                <div className="col-xs-1 alcentro ml-5"><b>Presupuestos</b></div>
                <div className="col-xs-7 ">
                    <Select className=" mb-3 col-xs-10" 
                        name="TipoProgramaInput"
                        id="TipoProgramaInput"
                        placeholder="Seleccione un presupuesto"
                        value={this.state.TipopresupuestoInput}
                        onChange={this.handleChangeSelectTipoPrograma}
                        options={this.state.optionsTipoPrograma}
                      />

                </div>  
              </div>
                <br></br>


              <div className="alcentro ml-5">
                <div className="col-xs-12 row">
                  <div className="col-xs-1"></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>MATRICULA UPG</b></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>MATRICULA EPG</b></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>DERECHO DE ENSEÑANZA</b></div>
                  <div className="verdeagua cuadro-borde col-xs-1"><b>TOTAL</b></div>
                  <div className="verdeagua cuadro-borde col-xs-2"><b>VALOR POR CREDITO</b></div>
                </div> 
              </div>
              <div className="alcentro ml-5">
                <div className="col-xs-12 row">
                  <div className="verdeagua cuadro-borde col-xs-1"><b>COSTO REAL</b></div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.detallePresupuesto.upg}</div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.detallePresupuesto.epg}</div>
                  <div className="cuadro-borde col-xs-2">S/ {this.state.detallePresupuesto.derecho}</div>
                  <div className="cuadro-borde col-xs-1">S/ {this.state.detallePresupuesto.total}</div>
                  <div className="cuadro-borde col-xs-2">{this.state.detallePresupuesto.valor1} x {this.state.detallePresupuesto.valor2}</div>
                  
                </div>
                
                
              </div>
              

              <div className=" mt-2 mb-3 centrar">
                <button  onClick={this.actualizarProgramaPresupuesto} className="waves-effect waves-light btn-small ml-3 " type="submit" >Asignar Presupuesto</button>
                <button id="boton-deshacer" onClick={this.Regresar2}  className="waves-effect waves-light btn-small btn-danger  ml-3 " type="submit" >Deshacer Asignación</button>           
              </div>
              
            </div>           
          </div>


          <div className="margen3">
            <button onClick={this.seleccionar} className="waves-effect waves-light btn-small newbotonSeleccionar start mt-1">
            Seleccionar todo<i className="large material-icons left">check</i>
            </button>
            <button onClick={this.show_or_hide} className="waves-effect waves-light btn-small newbotonSeleccionar start mt-1">
              Mostrar más
            </button>            
            <button type="submit" onClick={this.mostrarBeneficio} className="waves-effect waves-light btn-small newbotonSeleccionar start ml-3 mt-1"> 
              Ver Beneficio 
            </button>                        
            <button onClick={this.mostrarOcultar}  className="waves-effect waves-light btn-small inline-block newbotonSeleccionar start ml-3 mt-1" type="submit"> 
              Presupuesto
            </button>   
            
          </div>

          <div className="row">
            <div className="  col-md-12">
              {/*Inicio*/}
              <div id="mySidebar" class="sidebar">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a>
                {/*<a href="#" onClick={this.seguimientoEgresados}>Seguimiento de Egresados</a>*/}
                <a href="#" onClick={this.enviarFormulario}>Registrar Beneficio</a>
				<a href="#" onClick={this.importePago}>Importe de Pago</a>
                {/*<a href="#" onClick={this.Regresar}>Regresar</a>*/}

                {/* aqui esta el boton de regresar eeeeeeeeeeeeeee*/}
                <a href="#" onClick={this.regresarPaginaPrincipal}>Regresar</a>
              </div>
              {/*Fin*/}
              <table className="table-small">
                <TableHeader   />
               
                <PagoList funcion={this.Funcion} listado={this.state.pageOfItems}  conceptos={this.state.concepto} datos={this.state.datos} datosMonedas={this.state.monedas}  monedas={this.state.monedasvl} ubicaciones={this.state.ubicacionesv1} repitencia={this.state.repitenciav1} cuentas={this.state.cuentasv1} configuraciones={this.state.configuraciones} tipo_recaudacion={this.state.tipo_recaudacion}/>
              </table>
              <div className="margen_top"> <Paginacion items={this.state.pagocero} onChangePage={this.onChangePage}/></div>
              <div className="row">
                <div className="col-md-7">
                  <Importe importe={this.CalcularImporte()} />
                </div>
                <div className="col-md-7">
                
                  <ImporteDolar importe={this.CalcularImporteDolar()} />
                </div>
                <div className="col-md-3">

                </div>
                <div className="col-md-8 "></div>
                <div className="col-md-1 ">
                <form action="#">
                    <label className="row tfuente ">

                      <input
                        onClick={this.colocar}
                        id="observacion"
                        className="obs"
                        type="checkbox" />
                        <span className="tfuente">observacion </span>
                        </label>
                  </form>

                  <form action="#">
                    <label className="row tfuente ">

                      <input
                        onClick={this.validado}
                        id="validar"
                        className="val"
                        type="checkbox" />
                        <span className="tfuente">validado </span>
                        </label>
                  </form>

                </div>
                <div className="col-md-3">

                  <Imprimir2 onClick={this.enviar}  validado = {this.state.validado} seleccionado={this.state.seleccionado} listado={this.state.pagocero} conceptos={this.state.conceptos} alumno={this.state.alumno} costos={this.state.costosP} datos={this.state.datosformulario}/>
                </div>

              </div>
            </div>
          </div>
        </div>
          ):(

            <div>
              <div className="">
                    <h3>
                    Lista de Beneficios
                    <ul id="nav-mobile" className="row right hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.enviarFormulario} >Regresar ee<i className="material-icons right">reply</i></a></li>

                    </ul>
                    </h3>
                </div>

              <FormularioIntermio codigo={this.state.name} idprograma={this.state.pagos[0].idPrograma}/>
            </div>

          )

        }

           <footer>
            <div className="row center-xs centrar color">
            Proyecto SIGAP © 2020 v.1.4.1
            </div>
            </footer>

        </div>
      )
    } else {
      return <p className="text-center">Cargando estado de pagos de alumno</p>
    }
  }


//obtenemos la fecha del componente FILTROFECHA1

Regresar2=(e)=>{
  e.preventDefault()
  console.log("Estoy guardando el presupuesto "+this.state.idProgramaOriginal)
  fetch(CONFIG+'recaudaciones/alumno/concepto/actualizarIdProgramaPrespuesto/'+0+'/'+this.state.alumno.apeNom,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "PATCH",
    }
  )
  .then((defuncion) => {
      swal("Presupuesto Desasignado Correctamente","","")  
      this.componentWillMount()
  })
  .catch(error => {
    // si hay algún error lo mostramos en consola
    swal("Oops, Algo salió mal!!", "", "error")
    console.error(error)
  })

  setTimeout(() => {
    this.componentWillMount()
  }, 1000);
}

Filtrar=(e)=>{
  var concep = [];
  concep = this.SeleccionConceptos();
  var filtrodel = this.state.filtroDel;

  var filtroal = this.state.filtroAl;

  if(filtrodel.length == 0){
   // console.log("no hay del ")
    filtrodel = "0000-00-00";
   // console.log(filtrodel)
  }
  if(filtroal.length == 0){
    //console.log("no hay al");
    filtroal = "9999-12-12";
    //console.log(filtroal)
  }
  let nombreFiltro = this.state.name;

  var separadorFiltro = " "; // un espacio en blanco
  var arregloDeSubCadenasFiltro = nombreFiltro.split(separadorFiltro);

  var arregloFiltro = [];
  for (let i = 0; i< arregloDeSubCadenasFiltro.length; i++) {
    if(arregloDeSubCadenasFiltro[i]!==''){
       arregloFiltro.push(arregloDeSubCadenasFiltro[i])
    }
  }

  var nombrenuevoFiltro = arregloFiltro.join(" & "); 
  
  console.log("link filtros")
  console.log(CONFIG+'recaudaciones/alumno/concepto/listar/filtrarAll')
  var json={
    "nom_ape": nombrenuevoFiltro,
    "fechaInicial": filtrodel,
    "fechaFinal": filtroal,
    "conceptos": concep,
    "recibos":this.state.filtroNumeros
  }
  console.log("json enviado");
  console.log(json);
  fetch(CONFIG+'recaudaciones/alumno/concepto/listar/filtrarAll',
  {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      {
        "nom_ape": nombrenuevoFiltro,
        "fechaInicial": filtrodel,
        "fechaFinal": filtroal,
        "conceptos": concep,
        "recibos":this.state.filtroNumeros
      }

    )
  }
  ).then((response) => {
  return response.json()
  })
  .then((pagos) => {
    console.log(pagos)
  if(pagos.length > 0){
  this.setState({
    pagocero: pagos
  });
  console.log("json recibido");
  swal("Filtro realizado exitosamente!","","success");
  }else{
    console.log(pagos);
    swal("No se encontraron registros","","info");
  }
  /*
  console.log("Pagos filtrados que recibo")
  console.log(pagos);*/
  })
  .catch(error => {
  // si hay algún error lo mostramos en consola
  swal("Oops, Algo salió mal!!", "","error")
  console.error(error)
  });

  
  setTimeout(() => {
    this.setState({
      costosP2: this.state.costosP
    })
  }, 500);
  

}

  SeleccionFechaDel(Fecha) {

    var fecha1 = new String(Fecha);
    this.setState({filtroDel: fecha1});

  }
  SeleccionFechaAl(Fecha) {

    var fecha1 = new String(Fecha);
    this.setState({filtroAl: fecha1});

  }
  SeleccionConceptos(){

    var idconcepto = [];
    var checkbox_seleccionados = [];
    var check = [];
    var seleccionados = 0;
    var arrayfiltrado = [];
    check = document.getElementsByClassName("clase_concepto");


    for (var item of check) {
      if (item.checked) {
        checkbox_seleccionados.push(item.name);
      }
    }

    //console.log("Seleccion conceptos: " + checkbox_seleccionados);
    return checkbox_seleccionados;

  }
  Funcion(holas){
    for(let j=0;j<this.state.pagocero.length;j++){
      if(holas==this.state.pagocero[j].idRec){
        if(this.state.pagocero[j].check==true){
          this.state.pagocero[j].check=false;
        }else{
          this.state.pagocero[j].check=true;
        }
      }
    }
  }
seleccionar(){
  //console.log("gg agg");
  var checks=document.getElementsByClassName("checkbox1");
  for (let i=0;i<checks.length;i++) {
            if(this.state.todos==false){
              checks[i].checked=true;
            }
            else{
              checks[i].checked=false;
            }
}
 if(this.state.todos==false){
          this.setState({
            todos:true
          })
          this.state.pagocero.map((pago)=>{
            pago.check=true;
          })
        }else{
          this.setState({
            todos:false
          })
          this.state.pagocero.map((pago)=>{
            pago.check=false;
          })
        }
}

openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

show_or_hide() {
  var statusInfo = "";
  if(this.showboolean==true){
    statusInfo = "";
    this.showboolean = false;
  }
  else{
    statusInfo = "none";
    this.showboolean = true;
  }

  var len = this.state.pageOfItems.length;

  document.getElementById("ubicacion_header").style.display = statusInfo;
  document.getElementById("banco_header").style.display = statusInfo;
  // document.getElementById("repitencia_header").style.display = statusInfo;
/************ */
  document.getElementById("tipo_recaudacion_header").style.display = statusInfo;
/************ */
  for(var i=1; i<=len; i++){
    document.getElementById("ubicacion" + i).style.display = statusInfo;  
    document.getElementById("banco" + i).style.display = statusInfo; 
    // document.getElementById("repitencia" + i).style.display = statusInfo; 
    /************ */
    document.getElementById("tipo_recaudacion"+i).style.display = statusInfo;
    /************ */
  }
}

seguimientoEgresados=(e)=>{
  
  browserHistory.push(this.state.name+'/vista/egresado');
  e.preventDefault();

}
importePago=(e)=>{
  
  browserHistory.push(this.state.name+'/vista/importe');
  e.preventDefault();

}
regresarPaginaPrincipal=(e)=>{
  browserHistory.push("/");
  e.preventDefault();
}
enviarFormulario=(e)=>{
  try{
    this.closeNav();
  }
  catch(error){
    //Nothing happens
  }
  if(this.state.aparecer){
    this.setState({
      aparecer:false,
    });

  }

  else{
    this.setState({
      aparecer:true,
    });
    // window.location.reload();
  }

}

//NUEVOOOOOOOOO
AsignarPresupuesto=(e)=>{
  browserHistory.push(this.state.name+'/vista/presupuesto');
  e.preventDefault();

}

reporte_credito(idx,nombrenuevo,auxPagos){
  console.log(CONFIG+'beneficio/breporte_cr/' + nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
     fetch(CONFIG+'beneficio/breporte_cr/' + nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
     .then((response)=>{
         return response.json();
     }).then((costos)=>{
        console.log("***********************costos-reporte_credito*****************************************");
         console.log("costos");
         console.log(costos);
         this.setState({costosP: costos})
     }) .catch(error=>{
          console.error(error)
      });
 }

 reporte_ciclo(nombrenuevo,auxPagos,idx){
      fetch(CONFIG+'beneficio/breporte_ci/'+ nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
      .then((response)=>{
          return response.json();
      }).then((costos)=>{
          console.log("***********************costos-reporte_ciclo*****************************************");
          console.log(costos);
          this.setState({costosP: costos})
      }) .catch(error=>{
           console.error(error)
       });
  }

enviar(){
   console.log("lo que envio:");
  console.log(this.state.pagocero);
}

enviar2=(e)=>{
  console.log("lo que envio:");
  console.log(this.state.pagocero);
  let flac=false;
  for(let i=0;i<this.state.pagocero.length;i++){

    if(this.state.pagocero[i].check==true){
      flac=true;break
    }

  }


  if(flac){

  if(this.state.aparecer){
    this.setState({
      aparecer:false,
    });

  }
  else{
    this.setState({
      aparecer:true,
    });
    window.location.reload();
  }
}
else{
  swal("Seleccione al menos un estado de pago","","info");
}

}

CalcularImporteDolar() {

  let pagos = this.state.pagocero;
  let importe = 0;
  console.log("ESTOS SON LOS PAGOS BIEN CHIDORIS");
  console.log(pagos)
  for (var indice in pagos) {
    if(pagos[indice].moneda=="113")
        importe = importe + pagos[indice].importe;
  }
  return importe;
}

CalcularImporte() {

    let pagos = this.state.pagocero;
    let importe = 0;
    console.log("ESTOS SON LOS PAGOS BIEN CHIDORIS");
    console.log(pagos)
    for (var indice in pagos) {
      if(pagos[indice].moneda=="108")
      importe = importe + pagos[indice].importe;
    }
    return importe;
}

FiltrarFecha(Fechas) {
    var filtrado = [];
    var del = new String(Fechas.del);
    var al = new String(Fechas.al);
    this.setState({
      filtroDel: del,
      filtroAL : al
    })

  }

  FiltrarNumeros = (listaNumeros) => {
    this.setState({
      filtroNumeros: listaNumeros
     })

  }


  onChangePage(pageOfItems) {

   var total=[];
   var checkbox_selec=[];
   var checks=document.getElementsByClassName("checkbox1");
   var checks_normales=Array.from(checks);
   checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);

     }
   });

   for(let i=0;i<checkbox_selec.length;i++){
    var id=checkbox_selec[i];
    for(let j=0;j<this.state.pagocero.length;j++){
      if(this.state.pagocero[j].idRec==id){
          total.push(this.state.pagocero[j]);
      }
    }
 }
    // update state with new page of items
    this.setState({
      checkbox_:total,
      pageOfItems: pageOfItems });

     console.log("los page of items son: ",pageOfItems)
  }


  filtrarConcepto = (filtrado) => {
    //console.log(filtrado);
    var idconcepto = [];
    var checkbox_seleccionados = [];
    var check = [];
    var seleccionados = 0;
    var arrayfiltrado = [];
    check = document.getElementsByClassName("clase_concepto");


    for (var item of check) {
      if (item.checked) {
        checkbox_seleccionados.push(item.name);
      }
    }

    for (let i = 0; i < this.conceptos.length; i++) {
      idconcepto.push(this.conceptos[i].idConcepto);
    }
   // console.log(checkbox_seleccionados);
    //var arrayflitrado=this.state.pagos.filter(pago => pago.concepto.idConcepto===5);
    if (checkbox_seleccionados.length == 0) {

      arrayfiltrado = filtrado;
    }
    else {
      for (let i = 0; i < checkbox_seleccionados.length; i++) {
        var conceptoactual = checkbox_seleccionados[i];
        for (let j = 0; j < filtrado.length; j++) {
          var concepto_seleccionado = filtrado[j].concepto.idConcepto;
          if (concepto_seleccionado == conceptoactual) {
            arrayfiltrado.push(filtrado[j]);
          }

        }
      }

      if (arrayfiltrado.length == 0) {
        arrayfiltrado = filtrado;
      }
     // console.log(arrayfiltrado);



    }
    var numero_codigos = this.state.filtros;
    //console.log(numero_codigos);
    var filtrofinal = [];
    var listaNumeros_seleccionados = numero_codigos;
    if (listaNumeros_seleccionados.length == 0) {

      this.setState({
        pagocero: arrayfiltrado
      })


    }
    else {
      if (arrayfiltrado.length == 0) {

        this.setState({
          pagocero: arrayfiltrado
        })
      }
      else {

        for (let i = 0; i < listaNumeros_seleccionados.length; i++) {
          var numeroactual = listaNumeros_seleccionados[i];
          for (let j = 0; j < arrayfiltrado.length; j++) {
            var numero_seleccionado = arrayfiltrado[j].numero;
            if (numero_seleccionado == numeroactual) {
              filtrofinal.push(arrayfiltrado[j]);
            }

          }
        }

        if (filtrofinal.length == 0) {
          alert("No hay registros.Se volverán a cargar todos")
          this.setState({
            pagocero: this.state.pagos
          })
        } else {
          this.setState({
            pagocero: filtrofinal
          })
        }
      }
    }

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
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

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
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    return (
      <ul className="pagination row center-xs">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}><i className="material-icons">chevron_left</i></a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index + 28} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default App;
