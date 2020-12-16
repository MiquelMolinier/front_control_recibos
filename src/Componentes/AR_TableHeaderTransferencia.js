import React from 'react'

class AR_tableHeaderTransferencia extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return(
            <thead>
                <tr>
                    <th className="th">Nro</th>
                    <th className="th">Recibo</th>
                    <th className="th">Observacion</th>
                    <th className="th">Fecha</th>                    
                </tr>
            </thead>
        )
    }

}
export default AR_tableHeaderTransferencia