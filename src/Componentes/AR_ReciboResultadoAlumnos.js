import React from 'react'
import Select from 'react-select'
import AR_tableHeaderReciboResultado from './AR_tableHeaderReciboResultado';

class AR_ReciboResultadoAlumnos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            listAlumno: this.props.listAlumnos,
        }
    }

    render() {
        return(
            <div>
                <table className="table">
                    <AR_tableHeaderReciboResultado/>
                    <tbody>
                        {
                            this.props.listAlumnos.map((alumno, key) => {
                                return(
                                    <tr>
                                        <td className="td1">{alumno.codAlumno}</td>
                                        <td className="td1">{alumno.apePaterno}</td>
                                        <td className="td1">{alumno.apeMaterno}</td>
                                        <td className="td1">{alumno.nomAlumno}</td>
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
export default AR_ReciboResultadoAlumnos