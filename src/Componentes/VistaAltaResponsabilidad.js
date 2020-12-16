import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { browserHistory } from 'react-router-3';


class VistaAltaResponsabilidad extends React.Component {
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
                    <h2 className="titulo">Formacion Academica en Posgrado</h2>
                    <div className="input-dato">
                        <label className="label-dato">
                            ENTIDAD:
                            <input type="text" name="name" value={this.state.codigo} disabled/>
                        </label>
                        <label className="label-dato">
                           FUNCION DESEMPEÑADA:
                            <input type="text" name="name" required/>
                        </label>
                        <label className="label-dato">
                            EXPRESA LAS PRINCIPALES FUNCIONES DESEMPEÑADAS:
                            <input type="text" name="name" required/>
                        </label>
                        <label className="label-dato">
                            MOTIVO DE CESE:
                            <input type="text" name="name" required/>
                        </label>


                        <label className="label-dato">
                            ¿DE QUE MANERA LOS ESTUDIOS DE POSGRADO CURSADOS HA INFLUENCIADO EN SU DESARROLLO PROFESIONAL?

                            {this.state.opciones.map(entidad =>
                                <label>
                                        <input name="group1" type="radio" />
                                            {entidad!="OTRO :" ? (
                                                <span className="span">{entidad}</span>
                                            ) : (
                                                <span class="entidad-input span"> {entidad}
                                                
                                                <label className="label-dato">
                                                        
                                                        <input type="text" name="name" />
                                                    </label>    
                                                </span>         
                                                                        
                                            )}
                                </label>
                            )}
                        </label>
                        <br></br>

                        <label className="label-dato">
                            PERFIL DE EGRESO DE LOS PROGRAMAS DE POSGRADO

                            {this.state.perfil.map(perfil =>
                                <label>
                                        <input name="group1" type="radio" />
                                            {perfil!="OTRO :" ? (
                                                <span className="span">{perfil}</span>
                                            ) : (
                                                <span class="entidad-input span"> {perfil}
                                                
                                                <label className="label-dato">
                                                        
                                                        <input type="text" name="name" />
                                                    </label>    
                                                </span>         
                                                                        
                                            )}
                                </label>
                            )}
                        </label>
                        <br></br>

                        <label className="label-dato">
                            VALORE EL PERFIL DE EGRESO:
                            <input type="text" name="name" required/>
                        </label>


                        
                        

                        <label className="label-dato">
                            ¿Recomendaria el Programa de Posgrado cursado en la Unidad de Posgrado de la Universidad Nacional Mayor de San Marcos?
                            <input type="text" name="name" required/>
                        </label>

                        <label className="label-dato">
                            COMENTARIOS:
                            <p>¿Expresenos sus comentarios, en que medida se puede mejorar los servicios academicos brindados?</p>
                            <input type="text" name="name" required/>
                        </label>


                        <input type="submit" value="Enviar" className="btn right" required/>
                    </div>

                </div>
            </div>
        );
    }
}


export default VistaAltaResponsabilidad;