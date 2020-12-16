import React from 'react'

class AR_tableHeaderRecibo extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return(
            <thead>
                <tr>
                    <th className="th">Codigo</th>
                    <th className="th">Apellido Paterno</th>
                    <th className="th">Apellido Materno</th>
                    <th className="th">Nombres</th>
                </tr>
            </thead>
        )
    }

}
export default AR_tableHeaderRecibo