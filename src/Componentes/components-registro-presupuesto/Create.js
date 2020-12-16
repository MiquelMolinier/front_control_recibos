
import React, {Component} from 'react';
import axios from 'axios';
import * as Detalles from './detalles';


class Create extends Component {
	constructor(props){
		super(props);
		this.state = {		
			selectedOptionConcepto: -1,
			programa_ciclos: [],
			conceptos: [],
			selectedOptionCiclo: null,
			descripcion: "",		
			ciclo_selected: -1,
			refs: [],
		}
		this.handleProgramaCicloChange = this.handleProgramaCicloChange.bind(this);
	}

	handleProgramaCicloChange(e) {
	  this.setState( {ciclo_selected: Number(e.target.value) } );	  
	}	

	componentDidMount(){
		// Uso tipico (no olvides de comparar los props):https://cors-anywhere.herokuapp.com/
	   axios.get('https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/programa-ciclos/'+this.props.tipo_grado)		
			.then(response => {
				this.setState({ programa_ciclos: response.data })			
			})
			.catch( error =>{ console.log(error) 
			});

	  	axios.get('https://cors-anywhere.herokuapp.com/https://costoprogramas-back.herokuapp.com/conceptos',{ crossdomain: true })
				.then(response => {
				//	console.log(response);
		    let concepto_all = response.data|| [] ;
		    let conceptos_filtrados = 
		    concepto_all!==[]?concepto_all.filter(concepto => 
		    	(concepto.concepto === "210024  " || concepto.concepto === "210011  "
		    			|| concepto.concepto === "210010  " || concepto.concepto === "207010  ")):[];
					this.setState({ conceptos: conceptos_filtrados })		
				//	console.log(conceptos_filtrados);	
				})
				.catch( error =>{ console.log(error) 
				});	
	}

	handleChangeImporte = e =>{
		this.props.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
	}

 	handleChangeCiclo = selectedOptionCiclo => {
	    this.setState({ selectedOptionCiclo });   
  	};


	render(){
		const mystyle = { marginBottom: '0' , paddingBottom: '2px'} 	
		return (					
					<div className="card" style={mystyle}>
					  <div className="card-body" style={mystyle}>
					  	<div className="row" style={mystyle}>
					  		<div className="col-md-4">
					  			<div className="subject form-group">
									  <b> Trámite</b>
									  <input type="text" value={this.props.concepto}
									  className="form-control" readOnly// disabled={this.props.isDisabled}
									  />									    
									</div>								
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<b> Concepto</b>
					  				<select className="form-control" name="id_concepto"
					  				//disabled={this.props.readOnly}
					  				// disabled={this.props.isDisabled} 
					  				 id="select_concepto"
					  				 value={this.props.form.id_concepto} 
								    	onChange={this.props.onChange}>
								    	<option value="-1" default>Choose</option>							    					      
												{
												 this.state.conceptos.map( (concepto) => 
														<option key={concepto.id} value={concepto.id}> 
															{concepto.concepto}
														</option>)
												}
					  				</select>
					  				
					  			</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  			<div className="form-group"> 
					  				<b> Ciclo</b>
					  				<select className="form-control"  name="id_programa_ciclo"					  				
					  					//disabled={this.props.isDisabled} 
					  					id="select_programa_ciclo"
					  					value={this.props.form.id_programa_ciclo} 
								    	onChange={this.props.onChange}>	
								    	<option value="-1" default>Choose</option>							    								    					      
												{
													this.state.programa_ciclos.map( (ciclo) => 
														<option key={ciclo.id} value={ciclo.id}> 
															{ciclo.ciclo}
														</option>)
												}  
								    </select>
					  			</div>					  			
					  		</div>					  		
					  		<div className="col-md-2">
						  		<div className="subject form-group">
										<b> Importe</b>										
										<input type="text"  placeholder="Importe" name="importe"
										  className="form-control" value={this.props.form.importe} 
										  onChange={this.props.onChange}  id="importe"
										  // disabled={this.props.isDisabled} 
										  //disabled={this.props.isDisabled}
										  readOnly={this.props.readOnlyImporte} 
										  //required
										  />									    
									</div>					  			
					  		</div>
					  		<div className="col-md-2">
					  		{this.renderSelectedForm(this.props.form.id_concepto)}						  							  			
					  		</div>					  		
					  	</div>{/* end.row*/}
					  	<div className="row" style={mystyle}>
					  		<div className="col s12">
					  			<div className=" float-right">

											<button className="btn  waves-effect waves-light" 
												id="btnSaveCreate"
											 type="submit"
											  //disabled={this.props.readOnlyBtn} 
											  >
									 		  <i className="material-icons left">save</i>		
									 		  Guardar							 		 
											</button>
					  				 &nbsp;
									  	<button className="btn  red" type="button" onClick={this.props.clearForm}>
									  		 <i className="large material-icons left">cancel</i>	Limpiar
									  	</button>&nbsp;	
									  	{ this.renderModo(this.props.tipo_save) }
									  				
									  						  									 		 								 		 
				
					  			</div>									
								</div>
					  	</div>	{/*	end.row		*/}  	
					  </div> {/*end.card-body*/}
					</div>
		)
	}

	renderSelectedForm( concepto ){
		if(Number(concepto) === 21 || Number(concepto) === 62 ){
				//console.log('ingreso!');
					const Creditos = Detalles["Creditos"];
					return <Creditos form={this.props.form} onChange={this.props.onChange}/>
				}
	 }
	renderModo(tipo){
		switch(Number(tipo)){
			// case 0:
			// 	break;
			case 1:
				return <span className="badge badge-light"> Modo Crear</span>
			case 2:
				return <span className="badge badge-light"> Modo Actualizar</span>
			case 3:
				return <span className="badge badge-light"> Modo Actualizar Header</span>
			default:
				return <span className="badge badge-light">-</span>
		}
	}
}

export default Create;