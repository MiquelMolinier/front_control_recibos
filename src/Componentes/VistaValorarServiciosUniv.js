import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { browserHistory } from 'react-router-3';

class VistaValorarServiciosUniv extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            codigo: this.props.codigo,

            opciones: Array.from([
                "A SIDO PROMOVIDO EN LA INTITUCION",
                "INCREMENTO SU SALARIO",
                "APERTURO NUEVAS OPORTUNIDADES LABORALES MEJOR REMUNERADAS",
                "NO LOGRO CAMBIOS SIGNIFICATIVOS",
                "OTRO :"
            ]),

            perfil: Array.from([
                "Perfil de Egreso del Doctorado en Ingeniería de Sistemas e Informática",
                "Perfil de Egreso de la Maestría en Ingeniería de Sistemas e Informática: mención en Ingenieria de Software",
                "Perfil de Egreso de la Maestría en Ingeniería de Sistemas e Informática: mención en Gestión de Tecnología de Información y Comunicaciones",
                "Perfil de Egreso de la Maestría en Ingeniería de Sistemas e Informática: mención en Dirección de Tecnología de Información y Comunicaciones",
                "Perfil de Egreso de la Maestría en Gestión de la Información y del Conocimiento",
                "Perfil de Egreso de la Maestría en Gobierno de Tecnologías de Información",
                "OTRO :"
            ]),

            datos: Array.from([
                "Excelente",
                "Muy Bueno",
                "Bueno",
                "Regular",
                "Pésimo",
                "Desconocia que se brindaba",
                "OTRO"
            ]),

            columnas: Array.from([
                "Formación Integral",
                "Calidad Docente",
                "Calidad de Atencion del Asesor de Tesis",
                "Calidad de Atencion del Personal de la Oficina",
                "Calidad de Atencion del Director",
                "Servicio del Tramite Administrativo",
                "Bibliotecas",
                "Apoyo para la Difusion de Resultados de Investigacion",
                "Realizacion de Eventos Cientificos",
                "Infraestructura",
                "Servicios Higienicos",
                "Laboratorios",
                "Aulas",
                "Laboratorios de Investigacion",
                "Estacionamiento",
                "Insercion Laboral",
                "Vinculacion con Instituciones Nacionales",
                "Vinculacion con Instituciones Internacionales",
                "Seguro de Salud (Autoseguro)",
                "Movilidad Interna (Uso del Omnibus Univ)",
                "Comedor Universitario",
                "Movilidad Estudiantil (Pasantias en el extranjero)",
                "Carné Universitario"
            ])

        }

    }
    

    render() {
        return (
            <div className="contenedor">
                
                <div className="">
                <label className="label-dato">
                            VALORE LOS SERVICIOS UNIVERSITARIOS RECIBIDOS:
                            <table className="table">
                                <thead>
                                        <tr>
                                            <td></td>
                                            {this.state.datos.map(da =>
                                            <td>{da}</td>
                                            )}
                                        </tr>
                                </thead>
                                <tbody>

                                    {this.state.columnas.map( (col,index) =>
                                        <tr>
                                            <td>{col}</td>
                                            <td>
                                                <label>
                                                <input name = {`g${index}`} type="radio" />
                                                    <span class="entidad-input span centrar-label"> 
                                                    </span>         
                                                                    
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                    <input name={`g${index}`} type="radio" />
                                                    <span class="entidad-input span centrar-label"> 
                                                    </span>         
                                                                        
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                <input name={`g${index}`} type="radio" />
                                                <span class="entidad-input span centrar-label"> 
                                                </span>         
                                                                    
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                <input name={`g${index}`} type="radio" />
                                                <span class="entidad-input span centrar-label"> 
                                                </span>         
                                                                    
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                <input name={`g${index}`} type="radio" />
                                                <span class="entidad-input span centrar-label"> 
                                                </span>         
                                                                    
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                <input name={`g${index}`} type="radio" />
                                                <span class="entidad-input span centrar-label"> 
                                                </span>         
                                                                    
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                <input name={`g${index}`} type="radio" />
                                                <span class="entidad-input span centrar-label"> 
                                                </span>         
                                                                    
                                                </label>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>


                            </table>
                        </label>

                        <input type="submit" value="Enviar" className="btn right" onClick={this.onSubmitDatosPersonales} />
                </div>
            </div>
        );
    }
}

export default VistaValorarServiciosUniv;