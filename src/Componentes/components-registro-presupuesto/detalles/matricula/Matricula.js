import React, {Component,Fragment } from 'react';

class TableMatricula extends Component {  

  constructor(props){
    super(props);
    this.getSubtotalUPG = this.getSubtotalUPG.bind(this);
    this.getSubtotalEPG = this.getSubtotalEPG.bind(this);
    this.getTotalMatricula = this.getTotalMatricula.bind(this);
  }

  getSubtotalUPG(detalle){
    return detalle.map(({ importe }) => importe).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  }
  getSubtotalEPG(detalle){
    return detalle.map(({ importe }) => importe).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  }
  getTotalMatricula(detalle,detalle_epg){
    let subtotalUPG =this.getSubtotalUPG(detalle);
    let subtotalEPG =this.getSubtotalEPG(detalle_epg);
    let total = Number(subtotalUPG) + Number(subtotalEPG);
    return total; 
  }
  ordenarAsc = (p_array_json) =>{
   p_array_json.sort( (a, b) => 
    parseFloat(a.programaCiclo.id) - parseFloat(b.programaCiclo.id) );
  }

  render(){
    const mystyle ={ padding:'3px' };
    const detalles = this.props.programaDetalle || [] ;
    const detalles_matricula = detalles!==[]?detalles.filter(detalle =>detalle.concepto.concepto === "210010  "):[];//9 es conceptode enseñanza
    const detalles_matricula_epg = detalles!==[]?detalles.filter(detalle =>detalle.concepto.concepto === "207010  "):[];//9 es conceptode enseñanza
    this.ordenarAsc(detalles_matricula);
    this.ordenarAsc(detalles_matricula_epg);
       return (
        <div className="row">
          <div className="col-md-6">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr >
                  <th scope="col" style={mystyle}><center>#</center></th> 
                  <th scope="col" style={mystyle}><center>Matrícula</center> </th>
                  <th scope="col"style={mystyle}><center>Concepto de Pago</center></th>
                  <th scope="col"style={mystyle}><center>Monto</center></th>
                  <th scope="col" width="20%"style={mystyle}><center>Acción</center></th>                
                </tr>
              </thead>
              <tbody>
                    {detalles_matricula.map((detalle, i) => {
                  return (<Fragment key={`fragment_${detalle.programaCiclo.id}_${detalle.concepto.id}`}>
                      <tr key={i}>
                        <td style={mystyle}>{i+1}</td>
                        <td style={mystyle}><center>Ciclo&nbsp;{detalle.programaCiclo.ciclo}</center></td>
                        <td style={mystyle}><center>{detalle.concepto.concepto}</center></td>
                        <td style={mystyle}><center>{detalle.importe}</center></td>
                        <td style={mystyle}>
                          <button className="btn btn-sm  btn-warning" onClick={this.props.btnEdit}
                              importe={detalle.importe}
                              concepto={detalle.concepto.id} 
                              ciclo={detalle.programaCiclo.id}>
                            <i className="large material-icons">create</i>
                          </button>&nbsp;
                          <button className="btn btn-sm btn-danger" onClick={this.props.btnDeleteDetalle}
                            concepto={detalle.concepto.id} 
                            ciclo={detalle.programaCiclo.id}
                            >
                            <i className="large material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                  </Fragment>)
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3" style={mystyle}>
                    <div className="float-right">Subtotal Matrícula UPG</div>
                  </th>
                  <th style={mystyle}><center>S/. &nbsp;{this.getSubtotalUPG(detalles_matricula)}</center></th>
                  <th style={mystyle}></th>                  
                </tr> 
              </tfoot>           
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-bordered">
              <thead className="thead-dark ">
                <tr>
                  <th scope="col" style={mystyle}><center>#</center></th> 
                  <th scope="col" style={mystyle}><center>Matrícula</center> </th>
                  <th scope="col"style={mystyle}><center>Concepto de Pago</center></th>
                  <th scope="col"style={mystyle}><center>Monto</center></th>
                  <th scope="col" width="20%"style={mystyle}><center>Acción</center></th>                
                </tr>
              </thead>
              <tbody>
                    {detalles_matricula_epg.map((detalle, i) => {
                  return (<Fragment key={`fragment_${detalle.programaCiclo.id}_${detalle.concepto.id}`}>
                      <tr key={i}>
                        <td style={mystyle}>{i+1}</td>
                        <td style={mystyle}><center>Ciclo{detalle.programaCiclo.ciclo}</center></td>
                        <td style={mystyle}><center>{detalle.concepto.concepto}</center></td>
                        <td style={mystyle}><center>{detalle.importe}</center></td>
                        <td style={mystyle}>
                          <button className="btn btn-sm  btn-warning" onClick={this.props.btnEdit}
                              importe={detalle.importe}
                              concepto={detalle.concepto.id} 
                              ciclo={detalle.programaCiclo.id}>
                            <i className="large material-icons">create</i>
                          </button>&nbsp;
                          <button className="btn btn-sm btn-danger" onClick={this.props.btnDeleteDetalle}
                            concepto={detalle.concepto.id} 
                            ciclo={detalle.programaCiclo.id}
                            >
                            <i className="large material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                  </Fragment>)
                  })}
              </tbody>            
              <tfoot>
                <tr>
                  <th colSpan="3" style={mystyle}>
                    <div className="float-right">Subtotal Matrícula EPG</div>
                  </th>
                  <th style={mystyle}><center>S/. &nbsp;{this.getSubtotalEPG(detalles_matricula_epg)}</center></th>
                  <th style={mystyle}></th>                  
                </tr> 
                <tr>
                  <th colSpan="3" style={mystyle}>
                    <div className="float-right">TOTAL Por derecho de Matrícula</div>
                  </th>
                  <th style={mystyle}><center>S/. &nbsp;{this.getTotalMatricula(detalles_matricula,detalles_matricula_epg)}</center></th>
                  <th style={mystyle}></th>                  
                </tr>                
              </tfoot> 
            </table>            
          </div>
        </div>                   
    );
  }
} ; 

export default TableMatricula
