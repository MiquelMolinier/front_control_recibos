import React,{Component} from 'react';
import Create from './Create';


class Header extends Component {
	focus = () => {
		let $costo_credito = document.getElementById("costo_credito");
		let $btn_save_header = document.getElementById("save-header");
		$btn_save_header.disabled = ($btn_save_header.disabled === false)? true : false;
		$costo_credito.disabled = ($costo_credito.disabled === false)? true : false;
		this.props.changeTipoSave(3);
		$costo_credito.focus();
	}	
	componenDidUpdate(prevProps){
		if (this.props.readOnlyHeader !== prevProps.readOnlyHeader) {
	  	//console.log(this.props.readOnlyHeader)
	  }		
	}
	reload = () => ( window.location.reload(true) )	
	toggle = () => {
		let $bodyHeader = document.getElementById("collapseExample");
		$bodyHeader.classList.toggle('show');
	}
	render(){

		return (		
						<form onSubmit={this.props.handleSubmit} tipo_save={this.props.tipo_save}>					
							<div className="card">
								<div className="card-header">
									<div>	
										<div className="float-left">	
											<span className="badge" style={{fontSize: '13px'}} >
											{this.props.description}
											</span>
										</div>
										<div className="float-left">
											{(this.props.form.costo_credito===0||!this.props.form.costo_credito)?"":" - CostoCrédito"}
											<span className="badge badge-info" style={{color: 'black'}}>
											{(this.props.form.costo_credito===0||!this.props.form.costo_credito)?'':'S/. '+this.props.form.costo_credito}
											</span>
										</div>																  
									</div>
									<div className="float-right">
										<button type="button" className="btn waves-effect waves-light"
										 data-toggle="collapse" data-target="#collapseExample"
										 aria-expanded="false" aria-controls="collapseExample" 
										 onClick={this.toggle}>
											<i className="material-icons"> visibility</i>
										</button>
										&nbsp;
										<button type="button" onClick={this.reload} className="btn waves-effect waves-light">
														<i className="material-icons">add</i>
										</button>							
									</div>
								</div>
								<div className="card-body collapse show" id="collapseExample">
									<div className="row">
										<div className="col-md-2">			 
											<div className="subject form-group">
											  	<b>Escoja un programa</b>
											    <select className="form-control" value={this.props.form.id_programa} 
											    	onChange={this.props.handleProgramaChange} name="id_programa" disabled={this.props.readOnlyHeader}>
											    		<option value="-1" default>Choose</option>							    					      
															{
																this.props.programas.map( (programa) => 
																	<option key={programa.id} value={programa.id}> 
																		{programa.siglaPrograma}
																	</option>)
															}															 
											    </select>
											</div>			
										</div>
										<div className="col-md-8">			 
											<div className="subject form-group">
											  <b>Programa descripción</b>
											    <textarea name="" id="" cols="10" className="form-control" rows="2" 
											    readOnly value={this.props.description}>								    			    
											    </textarea>
											</div>			
										</div>
										<div className="col-md-2">
											<div className="form-group ">
												<b>Costo Total</b>
												<input type="text" style={{textAlign: 'center', fontWeight: 'bold'}} 
												value={`S/. ${this.props.programaPresupuesto.costoTotal||'0.00'}`}
												className="form-control bg-info text-white" readOnly/>					
											</div>							
										</div>
									</div>	{/*end.row*/}
									<div className="row">
										<div className="col-md-4">			 
											<div className="subject form-group">
											  <b>Escoja la programación de pagos</b>
											    <select className="form-control"  name="id_programacion_pagos"
											    value={this.props.form.id_programacion_pagos} disabled={this.props.readOnlyHeader}
											    	onChange={this.props.handleProgramacionChange}>
											    		<option value="-1" default>Choose</option>							    					      
															{
																this.props.programaciones.map( (programacion) => 
																	<option key={programacion.id} value={programacion.id}> 
																		{programacion.fechaVigenciaInicio.concat(" hasta "+programacion.fechaVigenciaFin) }
																	</option>)
															}
											    </select>
											</div>			
										</div>	
										<div className="col-md-3">
											<div className="form-group">
												<b>Cuotas</b>
												<input type="text" className="form-control"
													value={this.props.cuotas} disabled/>						    																																						    			
											</div>							
										</div>
										<div className="col-md-2">
											<div className="form-group">
												 <b> Costo Crédito</b> 									
												<input type="number" id="costo_credito" className="form-control" placeholder={`Costo crédito`}
													value={this.props.form.costo_credito} name="costo_credito" 
													onChange={this.props.handleCostoCreditoChange} step="any" min="1"
													disabled={this.props.readOnlyCostoCredito} />	
											</div>											
										</div>
										<div className="col-md-3">
											{this.renderBtnRPP(this.props.form.id_programa_presupuesto)}
											&nbsp;
											{this.renderBtnDelete(this.props.form.id_programa_presupuesto,this.props.nro_detalles)}
											&nbsp;
											{this.renderBtnEdit_Save(this.props.form.id_programa_presupuesto)}
											&nbsp;											
										</div>									
									</div>	{/*end.row*/}
								</div>	{/*end.card.body	*/}					
							</div> {/*end.card*/}
							{this.renderCreate(this.props.form.id_programa_presupuesto)}

					</form>	
			) 
		}
	renderBtnRPP(id_programa_presupuesto){
		if ( Number(id_programa_presupuesto) === -1) {
			return 	<button className="btn waves-light waves-effect" 
								//disabled={this.props.readOnly} 
								>
								Registrar												
							</button>
		}
	}

	renderBtnDelete(id_programa_presupuesto,nro_detalles){
		if ( Number(id_programa_presupuesto) !== -1) {
			if (Number(nro_detalles)<=0) {
			return <button className="btn btn-sm btn-danger"
                  onClick={this.props.btnDeleteHeader} type="button"
                  >
                  <i className="large material-icons">delete</i>
              </button>
		}
		}

		

	}
	renderBtnEdit_Save(id_programa_presupuesto){
		if ( Number(id_programa_presupuesto) !== -1) {
			return 	<div className="float-left">
								<button className="btn waves-effect btn-sm waves-light" onClick={this.focus}
									type="button">
												<i className="material-icons">create</i> 
								</button>
								&nbsp;
								<button className="btn waves-effect waves-light btn-sm " id="save-header"  
												disabled={this.props.readOnlyCostoCredito}>
									<i className="material-icons">save</i> 
								</button>
							</div>
		}
	}
	renderCreate(id_programa_presupuesto){
		if ( Number(id_programa_presupuesto) !== -1) {
			return <Create 
									  tipo_grado={this.props.tipo_grado}
										readOnly={this.props.readOnly}
										readOnlyBtn={this.props.readOnlyBtn}
										readOnlyImporte={this.props.readOnlyImporte}
										onChange={this.props.handleChange}
										onSubmit={this.props.handleSubmit}
										form = {this.props.form}
										concepto={this.props.descripcionConcepto}
										importeCalculado={this.props.importeCalculado}
										clearForm = {this.props.clearForm}
										isDisabled={this.props.readOnlyHeader}
										addCreate={this.props.btnAddCreate}
										tipo_save={this.props.tipo_save}
										> 
						</Create>
		}
	}

}

export default Header;