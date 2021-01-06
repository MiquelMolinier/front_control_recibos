import React from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {browserHistory} from 'react-router-3';

import CONFIG from '../Configuracion/Config'
import Alumno from './Alumno'
import AlumnoCodigo from './AlumnoCodigo'
import Select from 'react-select';
import swal from 'sweetalert';

class AsignarPresupuesto extends React.Component{

    constructor(props){
        super(props);

        this.state={
            estado:0,
            costosP: {},
            idPrograma:'',
            //valores para los select
            optionsTipoPrograma:[],
            optionsSemestrePrimer:[],
            optionsSemestreSegundo:[],
            programas:[],
            programasBD:[],
            select_programas:[],
            programa_actual:{value:"-1",label:"Seleccione un programa"},
            tipo_programa:[{value:"03",label:"Maestria"},{value:"05",label:"Doctorado"},{value:"06",label:"Diplomatura"}],
            tipo_actual:{value:"-1",label:"Seleccione un tipo"},
            TipopresupuestoInput:{value:"-1",label:"Seleccione un presupuesto"},
            tipo_presupuesto:[],
            programa_presupuesto:[],
            semestreInput1:{value:"-1",label:"Seleccione periodo Inicial"},
            semestreInput2:{value:"-1",label:"Seleccione periodo Final"},
            periodos:[],
            presupuestos:[],
            semestres:[],
            presupuestoss:[],
            vacio:true,
            alumnosM:[],
            arregloAlumnos : [],
            programaSeleccionado : 0,
            alumnosM:[],
            presupuestoM:[],
            cambiar: true,
            arregloProgramaOriginal : [],
            detallePresupuesto : { upg: 0,epg:0,derecho:0,total:0,valor1:0,valor2:0},
            id_programa_presupuesto: 5,
        }

        this.Regresar=this.Regresar.bind(this);
       // this.handleChangeSelectPrograma=this.bind(this);
        this.alumno = '';
    }

    componentWillMount(){

      fetch(CONFIG+'alumno/alumnoprograma/programa/programas')
      .then((response)=>{
        return response.json();
      })
      .then((programa)=>{
        
        this.setState({
          programasBD : programa
        })
      })

      
      

      let arreglo=[];

      fetch(CONFIG+'alumno/alumnoprograma/programa/semestres')
      .then((response)=>{
        return response.json();
      })
      .then((semestres)=>{
        this.setState({
          semestres 
        })

        Object.keys(semestres).map(key=>(
          arreglo.push({value:key,label:semestres[key].semestre})
        ))

        this.setState({
          optionsSemestrePrimer : arreglo, 
          optionsSemestreSegundo :arreglo
        })
      })
   
    }

    handleChangeSelectTipo = (estado) =>{
      this.setState({
        tipo_actual:{value:estado.value,label:estado.label}
      });

      let arreglo = [];
      switch(estado.value){


        case "03" : Object.keys(this.state.programasBD).map(key=>(
            // console.log(this.state.programas[key].label.split(" "[0])),
            (this.state.programasBD[key].nomPrograma.split(" ")[0]=="MAESTRIA") ? (
              arreglo.push({value:this.state.programasBD[key].idPrograma,label:this.state.programasBD[key].nomPrograma})
              )
              : null,

              this.setState({
                programas : arreglo/**/ 
              })
        ))          
        ;break;

        case "05" : Object.keys(this.state.programasBD).map(key=>(
            // console.log(this.state.programas[key].label.split(" "[0])),
            (this.state.programasBD[key].nomPrograma.split(" ")[0]=="DOCTORADO") ? (
              arreglo.push({value:this.state.programasBD[key].idPrograma,label:this.state.programasBD[key].nomPrograma})
              )
              : null,

              this.setState({
                programas : arreglo/**/ 
              })
        ))          
        ;break;

        case "06" : Object.keys(this.state.programasBD).map(key=>(
            // console.log(this.state.programas[key].label.split(" "[0])),
            (this.state.programasBD[key].nomPrograma.split(" ")[0]=="DIPLOMATURA:") ? (
              arreglo.push({value:this.state.programasBD[key].idPrograma,label:this.state.programasBD[key].nomPrograma})
              )
              : null,

              this.setState({
                programas : arreglo/**/ 
              })
        ))          
        ;break;
      }
    }

    handleChangeSelectPrograma = (estado) => {
      //if(estado!== null){
        this.setState({
          programa_actual:{value: estado.value,label: estado.label}
        });
        setTimeout(() => {
          this.obtenerPresupuesto();
        }, 100);

    }

    Regresar=(e)=>{
        browserHistory.push('/');
        e.preventDefault();
    }


    //////////------------

    mostrarAlumnosP=()=>{
        document.getElementById('presupuesto').style.display='none';
        document.getElementById('detalle__presupuesto').style.display='none';
        document.getElementById('alumnosP').style.display = 'block';
        document.getElementById('alumnosP2').style.display = 'block';
    }

    mostrarPresupuesto=()=>{    
        document.getElementById('presupuesto').style.display='block';
        document.getElementById('detalle__presupuesto').style.display='block';
        document.getElementById('alumnosP').style.display = 'none';  
        document.getElementById('alumnosP2').style.display = 'none';
    }

    obtenerPresupuesto=()=>{
      fetch(CONFIG+'alumno/alumnoprograma/programa/'+this.state.programa_actual.value)
        .then((response)=>{
          return response.json();
        })
        .then((programa)=>{
          this.setState({
            optionsTipoPrograma : [{value : programa.idPrograma,label:programa.idPrograma+" - "+programa.nomPrograma}],/**/ 
            programaSeleccionado : programa.idPrograma
          })

          let arreglo1=[];
          let prepObj;
          fetch(CONFIG+'alumno/alumnoprograma/programa/presupuesto2/'+this.state.programaSeleccionado)
          .then((response)=>{
            return response.json();
          })
          .then((presupuestoss)=>{
            
            this.setState({
              presupuestoss
            })
            
            Object.keys(presupuestoss).map(key=>{
              prepObj={value:key,label:presupuestoss[key].codPlan+" - "+presupuestoss[key].idTipoPresupuesto+" - "+presupuestoss[key].nCreditos+" - "+presupuestoss[key].moneda+" - "+presupuestoss[key].costoMupg+" - "+presupuestoss[key].costoMepg+" - "+presupuestoss[key].costoCiclo+" - "+presupuestoss[key].costoCredito+" - "+presupuestoss[key].costoTotal};
              if(presupuestoss[0].codPlan!==presupuestoss[key].codPlan){
                prepObj.style={color:"DarkGray"};
              }
              return arreglo1.push(prepObj);
              
              }
            )

            this.setState({
              tipo_presupuesto : arreglo1,
            })
          })
        })
        .catch(error=>{
          console.log(error)
        })
    }

    handleChangeSelectTipoPrograma=(estado)=>{
      this.setState({
        TipopresupuestoInput:{value: estado.value,label: estado.label},
        vacio:false
      });
      console.log("id_programa_presupuesto="+this.state.presupuestoss[estado.value].idProgramaPresupuesto)
      this.setState({
        id_programa_presupuesto:this.state.presupuestoss[estado.value].idProgramaPresupuesto,
      });
      this.setState({
        detallePresupuesto : { upg: this.state.presupuestoss[estado.value].costoMupg, epg:this.state.presupuestoss[estado.value].costoMepg, derecho:(this.state.presupuestoss[estado.value].costoCredito*this.state.presupuestoss[estado.value].nCreditos), total:this.state.presupuestoss[estado.value].costoTotal, valor1:this.state.presupuestoss[estado.value].nCreditos, valor2:this.state.presupuestoss[estado.value].costoCredito}
      });
    }

    handleChangeSelectSemestre1=(estado)=>{
      let arreglo=[]
      Object.keys(this.state.semestres).map(key=>(
        (Number(key)>=Number(estado.value)) ?
        (arreglo.push({value:key,label:this.state.semestres[key].semestre})) :
        null
      ))

      this.setState({
        semestreInput1 : {value: estado.value,label: estado.label},
        optionsSemestreSegundo : arreglo
      })
    }

    handleChangeSelectSemestre2=(estado)=>{
      let arreglo=[]
      Object.keys(this.state.semestres).map(key=>(
        (Number(key)<=Number(estado.value)) ?
        (arreglo.push({value:key,label:this.state.semestres[key].semestre})) :
        null
      ))

      this.setState({
        semestreInput2 : {value: estado.value,label: estado.label},
        optionsSemestrePrimer : arreglo
      })
    }

    seleccionar=()=>{
      fetch(CONFIG+'alumno/alumnoprograma/programa/alumnosemestres/'+this.state.programaSeleccionado+"/"+this.state.semestreInput1.label+"/"+this.state.semestreInput2.label)
      .then((response)=>{
        return response.json();
      })
      .then((resultado)=>{
        this.setState({
          alumnosM : resultado
        })

        console.log(this.state.alumnosM)
      
      })
      
      fetch(CONFIG+'/programa_presupuesto/listartodo/'+this.state.id_programa_presupuesto)
      .then((response)=>{
        return response.json();
      })
      .then((resultado)=>{
        this.setState({
          presupuestoM : resultado
        })

        console.log(this.state.presupuestoM)
      
      })

      var lista= document.getElementsByClassName('checkbox1');
      var remover = document.getElementsByClassName('remover');
      var aumentar = document.getElementsByClassName('aumentar');

      for(var i=0;i<lista.length;i++)
        lista[i].checked=false;

      for(var i=0;i<remover.length;i++)
        remover[i].classList.remove("dis-none");
      
      for(var i=0;i<aumentar.length;i++)
        aumentar[i].classList.add("dis-none");

       

    }

    AgregarAlumno=(arreglo,e)=>{
      console.log(this.state.alumnosM[4])
      this.state.arregloAlumnos.splice(e,1,arreglo);

      console.log(document.getElementById("filaLista-"+e).checked)
      if(document.getElementById("filaLista-"+e).checked)
        this.state.arregloAlumnos.splice(e,1,arreglo);
      else
        this.state.arregloAlumnos.splice(e,1,{})

        console.log(this.state.arregloAlumnos);
    }


    removerAlumno=(e)=>{
      this.state.arregloAlumnos.splice(e,1,{})
        //console.log(this.state.alumnosM);
        document.getElementById('boton_remove' + e.toString()).classList.add("dis-none");
        document.getElementById('boton_add' + e.toString()).classList.remove("dis-none");
        
        document.getElementById('fila-' + e.toString()).classList.add("sombreado-rojo");
        document.getElementById('fila2-' + e.toString()).classList.add("sombreado-rojo");
        document.getElementById('fila3-' + e.toString()).classList.add("sombreado-rojo");
        //document.getElementById('fila4-' + e.toString()).classList.add("sombreado-rojo");
        document.getElementById('fila5-' + e.toString()).classList.add("sombreado-rojo");

        console.log(this.state.arregloAlumnos);
      }

    AsignarPres=()=>{
      console.log(this.state.arregloAlumnos);
      var arreglo = [...this.state.arregloAlumnos]
      this.setState({
        arregloProgramaOriginal : arreglo
      })
      Object.keys(this.state.arregloAlumnos).map(key=>(
        // console.log(this.state.arregloAlumnos[key].codigo)
          (this.state.arregloAlumnos[key].codigo) ? (
            fetch(CONFIG+'recaudaciones/alumno/concepto/actualizarIdProgramaPrespuesto/'+this.state.programaSeleccionado+'/'+this.state.arregloAlumnos[key].codigo,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              method: "PATCH",
            }
          )
          .then((defuncion) => {
              swal("Presupuesto Asignado Correctamente","","")  
          })
          .catch(error => {
            // si hay algún error lo mostramos en consola
            swal("Oops, Algo salió mal!!", "", "error")
            console.error(error)
          })
          ) : 
          null
      ))
      
      this.setState({
        arregloAlumnos : []
      })
      
      setTimeout(() => {
        this.seleccionar();        
      }, 3500);
      }

      seleccionar1=()=>{
        //console.log("gg agg");
        var checks=document.getElementsByClassName("checkbox1");

        if(this.state.cambiar){
          for (let i=0;i<checks.length;i++) {
            let a
            a=this.state.alumnosM[i];
            console.log(a)
            checks[i].checked=true;
            this.state.arregloAlumnos.splice(i,1,this.state.alumnosM[i]);
          }

        }else{
          for (let i=0;i<checks.length;i++) {
            let a
            a=this.state.alumnosM[i];
            console.log(a)
            checks[i].checked=false;
            this.state.arregloAlumnos.splice(i,1,{});
          }
        }
        let cambiar1= this.state.cambiar;
            this.setState({
              cambiar:!cambiar1
            })
      console.log(this.state.arregloAlumnos)
      }


    DesasignarPres=()=>{
      Object.keys(this.state.arregloAlumnos).map(key=>(
        // console.log(this.state.arregloAlumnos[key].codigo)
          (this.state.arregloAlumnos[key].codigo) ? (
            fetch(CONFIG+'recaudaciones/alumno/concepto/actualizarIdProgramaPrespuesto/'+0+'/'+this.state.arregloAlumnos[key].codigo,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              method: "PATCH",
            }
          )
          .then((defuncion) => {
              swal("Presupuesto Desasignado Correctamente","","")  
          })
          .catch(error => {
            // si hay algún error lo mostramos en consola
            swal("Oops, Algo salió mal!!", "", "error")
            console.error(error)
          })
          ) : 
          null
      ))
      this.setState({
        arregloAlumnos : []
      })
      setTimeout(() => {
        this.seleccionar();        
      }, 1000);
    }

    recorrerpresupuesto=()=>{
      var indice=1;
      return(
      (this.state.alumnosM.length>0) ?
                      Object.keys(this.state.presupuestoM).map(key=>(
                      <div className="alcentro " key={key}>
                        <div className="col-xs-12 row" >
                          <div className="cuadro-borde col-xs-1  " id={"fila1-"+key}><div className="margenes-padding">{indice++}</div></div>
                          <div className="cuadro-borde col-xs-1  " id={"fila2-"+key}><div className="margenes-padding">{this.state.presupuestoM[key].ciclo}</div></div>
                          <div className="cuadro-borde col-xs-2  " id={"fila3-"+key}><div className="margenes-padding">{this.state.presupuestoM[key].concepto}</div></div>
                          <div className="cuadro-borde col-xs-2  " id={"fila4-"+key}><div className="margenes-padding">{this.state.presupuestoM[key].descripcion_min}</div></div>
                          <div className="cuadro-borde col-xs-1  " id={"fila5-"+key}><div className="margenes-padding">{this.state.presupuestoM[key].moneda}</div></div>
                          <div className="cuadro-borde col-xs-2  " id={"fila6-"+key}><div className="margenes-padding">{this.state.presupuestoM[key].importe}</div></div>
                        </div>
                      </div>  
                    )) : (
                    <div className="alcentro ">  
                      <div className="col-xs-12 row">
                          <div className="cuadro-borde col-xs-9">Sin datos de presupuesto</div>
                      </div>
                    </div>    
                    ))     
    }
    recorrerAlumnos=()=>{
      var indice=1;
      return(
      (this.state.alumnosM.length>0) ?
                      Object.keys(this.state.alumnosM).map(key=>(
                      <div className="alcentro " key={key}>
                        <div className="col-xs-12 row" >
                          <div className="cuadro-borde col-xs-1  " id={"fila-"+key}><div className="margenes-padding">{indice++}</div></div>
                          <div className="cuadro-borde col-xs-2  " id={"fila2-"+key}><div className="margenes-padding">{this.state.alumnosM[key].codigo}</div></div>
                          <div className="cuadro-borde col-xs-4  " id={"fila3-"+key}><div className="margenes-padding">{this.state.alumnosM[key].nombre}</div></div>
                          <div className="cuadro-borde col-xs-3  " id={"fila5-"+key}><div className="margenes-padding">{this.state.alumnosM[key].presupuesto}</div></div>
                          <div className="cuadro-borde col-xs-2 ">

                          <form action="#">
                            <label className="row center-xs color_white">
                              <input className="checkbox1" onClick={e=>this.AgregarAlumno(this.state.alumnosM[key],key)} id={"filaLista-"+key} type="checkbox"></input>
                              <span></span>
    
                            </label>
                          </form>
                           { /*
                              <button onClick={e=>this.removerAlumno(key)} id={"botonremove"+key} className="remover waves-effect waves-light btn-small btn-danger start mt-1 mb-1">Remover
                              <i className="large material-icons left">remove_circle</i>
                              </button>
                              <button onClick={e=>this.AgregarAlumno(this.state.alumnosM[key],key)} id={"boton_add"+key} className="aumentar waves-effect waves-light btn-small btn-success start mt-1 mb-1 dis-none">Incluir
                              <i className="large material-icons left">add_circle</i>
                           </button>*/}
                              
                          </div> 
                        </div>
                      </div>  
                    )) : (
                    <div className="alcentro ">  
                      <div className="col-xs-12 row">
                          <div className="cuadro-borde col-xs-12">Sin datos de alumnos</div>
                      </div>
                    </div>    
                    ))                
    }

    render(){

        return(
        <div>
            <h3>ASIGNACION DE PRESUPUESTOS
                <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
                </ul>
            </h3>
            <div className="SplitPane">
              <br/>
              <div className="row">

                <div className="row col-xs-12">
                  <label className="col-xs-2">Tipo de Programa</label>
                  <Select className="col-xs-2" 
                      clearable={false}
                      placeholder="Seleccione un tipo"
                      name="selectipo"
                      id="selectipo"
                      value={this.state.tipo_actual}
                      onChange={this.handleChangeSelectTipo}
                      options={this.state.tipo_programa}
                  />

                  <label className="col-xs-1">Programa</label>
                  <Select className="col-xs-6"
                      clearable={false} 
                      placeholder="Seleccione una opcion"
                      name="selecprograma"
                      id="selecprograma"
                      value={this.state.programa_actual}
                      onChange={this.handleChangeSelectPrograma}
                      options={this.state.programas}
                  />
                </div>
              </div>  
              <br/>
              <div className="row">
                    <div className="row col-xs-12">
                      <label className="col-xs-2">Presupuesto</label>
                      <Select className="col-xs-7"
                          clearable={false} 
                          placeholder="Seleccione un presupuesto"
                          name="selecpresupuesto"
                          id="selecpresupuesto"
                          value={this.state.TipopresupuestoInput}
                          onChange={this.handleChangeSelectTipoPrograma}
                          options={this.state.tipo_presupuesto}
                      />
                    </div>
              </div>
              
              <br/>

              <div className="row">

                <div className="row col-xs-12">
                  <label className="col-xs-2">Periodo de Ingreso</label>
                  <Select className="col-xs-2"
                        clearable={false} 
                        placeholder="Periodo Inicial"
                        name="primerperiodo"
                        id="primerperiodo"
                        value={this.state.semestreInput1}
                        onChange={this.handleChangeSelectSemestre1}
                        options={this.state.optionsSemestrePrimer}
                        disabled = {this.state.vacio}
                    />
                  <Select className="col-xs-2" 
                      clearable={false}
                      placeholder="Periodo Final"
                      name="segundoperiodo"
                      id="segundoperiodo"
                      value={this.state.semestreInput2}
                      onChange={this.handleChangeSelectSemestre2}
                      options={this.state.optionsSemestreSegundo}
                      disabled = {this.state.vacio}
                  />
                  <button onClick={this.seleccionar} className=" waves-light btn-small">Filtrar</button>
                </div>   
              </div>
              <hr/>
              <h4 className="ml-3 subtitulo">Detalle del Presupuesto</h4>
              <div align="center">
                <button onClick={this.mostrarPresupuesto} className=" waves-light btn-small"> Detalle Presupuesto</button>
                <button onClick={this.mostrarAlumnosP} className="waves-light btn-small  ml-3">Alumnos </button>
                <button onClick={this.seleccionar1} id="alumnosP2" className=" waves-effect waves-light btn-small newbotonSeleccionar start mt-1 ml-4">
            Seleccionar todo<i className="large material-icons left">check</i>
            </button>
              </div>
                

              <div className="margenes-cuadro" >
                <div id="detalle__presupuesto">
                    <div className="alcentro ">
                      <div className="col-xs-12 row">
                        <div className="verdeagua cuadro-borde col-xs-2"><b>MATRICULA UPG</b></div>
                        <div className="verdeagua cuadro-borde col-xs-2"><b>MATRICULA EPG</b></div>
                        <div className="verdeagua cuadro-borde col-xs-3"><b>DERECHO DE ENSEÑANZA</b></div>
                        <div className="verdeagua cuadro-borde col-xs-2"><b>TOTAL</b></div>
                        <div className="verdeagua cuadro-borde col-xs-2"><b>VALOR POR CREDITO</b></div>
                      </div> 
                    </div>
                    <div className="alcentro ">
                      <div className="col-xs-12 row">
                        <div className="cuadro-borde col-xs-2">S/ {this.state.detallePresupuesto.upg}</div>
                        <div className="cuadro-borde col-xs-2">S/ {this.state.detallePresupuesto.epg}</div>
                        <div className="cuadro-borde col-xs-3">S/ {this.state.detallePresupuesto.derecho}</div>
                        <div className="cuadro-borde col-xs-2">S/ {this.state.detallePresupuesto.total}</div>
                        <div className="cuadro-borde col-xs-2">{this.state.detallePresupuesto.valor1} x {this.state.detallePresupuesto.valor2}</div> 
                      </div>             
                    </div>
                    <p></p>
                </div>
                <div id="presupuesto">
                  <div className="alcentro ">
                    <div className="col-xs-12 row">
                      <div className="verdeagua cuadro-borde col-xs-1 "><b>N°</b></div>
                      <div className="verdeagua cuadro-borde col-xs-1"><b>CICLO</b></div>
                      <div className="verdeagua cuadro-borde col-xs-2"><b>CONCEPTO</b></div>
                      <div className="verdeagua cuadro-borde col-xs-2"><b>DESCRIPCION_MIN</b></div>
                      <div className="verdeagua cuadro-borde col-xs-1"><b>MONEDA</b></div>
                      <div className="verdeagua cuadro-borde col-xs-2"><b>IMPORTE</b></div>
                    </div> 
                  </div>
                  
                  {this.recorrerpresupuesto()}
                  <h5 className="mt-3">Total de alumnos: {this.state.alumnosM.length}</h5>
                </div>
                

                <div id="alumnosP">
                  <div className="alcentro ">
                      <div className="col-xs-12 row">
                        <div className="verdeagua cuadro-borde col-xs-1 "><b>N°</b></div>
                        <div className="verdeagua cuadro-borde col-xs-2 "><b>CODIGO ALUMNO</b></div>
                        <div className="verdeagua cuadro-borde col-xs-4 "><b>NOMBRE DEL ALUMNO</b></div>
                        <div className="verdeagua cuadro-borde col-xs-3 "><b>PRESUPUESTO ACTUAL</b></div>
                        <div className="verdeagua cuadro-borde col-xs-2 "><b>PARA ASIGNACION</b></div>
                      </div> 
                  </div>

                  {this.recorrerAlumnos()}
                  
                </div>

              </div >

              <div align="center">
                <button onClick={this.AsignarPres} className="waves-effect waves-light btn-small">
                    Asignar</button>
                <button onClick={this.DesasignarPres} className="waves-effect waves-light btn-small btn-danger ml-3">
                    Desasignar</button>
              </div>
            </div>
            <footer>
            <div className="row center-xs centrar color">
              Proyecto SIGAP © 2019 v.1.3
            </div>
          </footer>
        </div>)
    }

}

export default AsignarPresupuesto;
