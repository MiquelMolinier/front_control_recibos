// JavaScript source code
import React from 'react'
import Select from 'react-select'
import AR_tableHeaderTransferencia from './AR_TableHeaderTransferencia';

class AR_Transferencia extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            objObservacion: this.props.listObservacion,
        }
    }

    render() {
        return (
            <div>
                <table className="table">
                    <AR_tableHeaderTransferencia />
                    <tbody>
                        {
                            this.props.listObservacion.map((recaudaciones, key) => {
                                return (
                                    <tr>
                                        <td className="td1">{key + 1}</td>
                                        <td className="td1">{recaudaciones.numero}</td>
                                        <td className="td1">{recaudaciones.observacion}</td>
                                        <td className="td1">{recaudaciones.fecha}</td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}
export default AR_Transferencia
