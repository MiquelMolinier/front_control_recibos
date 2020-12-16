import React, {Component,Fragment } from 'react';

class TablePerfeccionamiento extends Component {  

  constructor(props){
    super(props);
    this.getSubtotal = this.getSubtotal.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  getSubtotal(detalle){
    return detalle.map(({ importe }) => importe).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  }
  getTotal(detalle){
    return detalle.map(({ importe }) => importe).reduce((sum, i) => Number(sum) + Number(i),Number(0));
  }

  ordenarAsc = (p_array_json) =>{
   p_array_json.sort( (a, b) => 
    parseFloat(a.programaCiclo.id) - parseFloat(b.programaCiclo.id) );
  }
  render(){
    const mystyle ={ padding:'3px' };
    const detalles = this.props.programaDetalle || [] ;

    const detalles_enseñanza = 
    detalles!==[]?detalles.filter(detalle => 
    	(detalle.concepto.concepto === "210024  " || detalle.concepto.concepto === "210011  ")):[];
    this.ordenarAsc(detalles_enseñanza);

       return (
            <table className="table table-bordered" width="50%">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={mystyle}>#</th> 
                  <th scope="col" style={mystyle}>Enseñanza </th>
                  <th scope="col" style={mystyle}>Concepto de Pago</th>
                  <th scope="col" style={mystyle}>Monto (S/.)</th>
                  <th scope="col" style={mystyle}>Acción</th>                
                </tr>
              </thead>
              <tbody>
                    {detalles_enseñanza.map((detalle, i) => {
                  return (<Fragment key={`fragment_${detalle.programaCiclo.id}_${detalle.concepto.id}`}>
                      <tr key={i} style={ {fontWeight: 'bold' } }>
                        <td style={mystyle}>{i+1}</td>
                        <td style={mystyle}><center>CICLO  {detalle.programaCiclo.ciclo}:
                          &nbsp;{detalle.credito}&nbsp;CRÉDITOS</center>
                        </td>
                        <td style={mystyle}></td>
                        <td style={mystyle}><center>S/.&nbsp;{detalle.importe}</center></td>
                        <td width="10%" style={mystyle}>
                          <button className="btn btn-sm btn-warning" onClick={this.props.btnEdit}
                            importe={detalle.importe}
                              concepto={detalle.concepto.id} 
                              ciclo={detalle.programaCiclo.id}
                              creditos={detalle.credito}
                          >
                          	<i className="large material-icons">create</i>
                          </button>&nbsp;
                        	<button className="btn btn-sm btn-danger"
                            onClick={this.props.btnDeleteDetalle}
                            concepto={detalle.concepto.id} 
                            ciclo={detalle.programaCiclo.id}
                            >
                        		<i className="large material-icons">delete</i>
                        	</button>
                        </td>
                      </tr>
                      <tr>
                        <td style={mystyle}></td>
                        <td style={mystyle}><center>1ERA CUOTA</center></td>
                        <td style={mystyle}><center>{detalle.concepto.concepto}</center></td>
                        <td style={mystyle}>
                          <center>
                            {Number.parseFloat(detalle.importe/4).toFixed(2)}
                          </center>                        
                        </td>
                        <td style={mystyle}></td>                                               
                      </tr>
                      <tr>
                        <td style={mystyle}></td>
                        <td style={mystyle}><center>2DA CUOTA</center></td>
                        <td style={mystyle}><center>{detalle.concepto.concepto}</center></td>
                        <td style={mystyle}><center>{Number.parseFloat(detalle.importe/4).toFixed(2)}</center></td>
                        <td style={mystyle}></td>                                               
                      </tr>
                      <tr>
                        <td style={mystyle}></td>
                        <td style={mystyle}><center>3ERA CUOTA</center></td>
                        <td style={mystyle}><center>{detalle.concepto.concepto}</center></td>
                        <td style={mystyle}><center>{Number.parseFloat(detalle.importe/4).toFixed(2)}</center></td>
                        <td style={mystyle}></td>                                               
                      </tr>
                      <tr>
                        <td style={mystyle}></td>
                        <td style={mystyle}><center>4TA CUOTA</center></td>
                        <td style={mystyle}><center>{detalle.concepto.concepto}</center></td>
                        <td style={mystyle}><center>{Number.parseFloat(detalle.importe/4).toFixed(2)}</center></td>
                        <td style={mystyle}></td>                                               
                      </tr> 
                  </Fragment>)
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3" style={mystyle}>
                    <div className="float-right">Total por derecho de Enseñanza</div>
                  </th>
                  <th style={mystyle}><center>S/. &nbsp;{this.getSubtotal(detalles_enseñanza)}</center></th>
                  <th style={mystyle}></th>                  
                </tr> 
                <tr>
                  <th colSpan="3" style={mystyle}>
                    <div className="float-right" style={mystyle}>
                    <p>COSTO TOTAL DEL PROGRAMA </p>
                    <p>(Matricula UPG, Matrícula EPG, Perfeccionamiento)</p>
                    </div>
                  </th>
                  <th style={{fontSize: "20px", color: 'red', padding: '3px'}} >
                    <center>S/. &nbsp;{this.getTotal(detalles)}</center>
                  </th>
                  <th style={mystyle}> </th>                  
                </tr>                         
              </tfoot>          
            </table>                   
    );
  }
} ; 

export default TablePerfeccionamiento