import React, {Component} from 'react';


class Creditos extends Component {
		render(){
			return(
					<div className="subject form-group">
							<b>N° de creditos</b>
							<input type="text" name="creditos" placeholder="" value={this.props.form.creditos}
								className="form-control" required onChange={this.props.onChange}/>						    						
					</div>
				)
		}	
};
export default Creditos
