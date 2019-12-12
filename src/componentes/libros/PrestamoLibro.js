import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class PrestamoLibro extends Component {
  state = {
    noResultados: false,
    busqueda: '',
    resultado: {}
  };

  //Buscar alumno por código
  buscarAlumno = e => {
    e.preventDefault();

    //obtener el valor a buscar
    const {busqueda} = this.state;

    //Extraer firestore
    const {firestore} = this.props;

    //Hacer la consulta mediante un llamado del usuario
    const coleccion = firestore.collection('suscriptores');
    const consulta = coleccion.where("codigo", "==", busqueda).get();

    //Leer los resultados
    consulta.then(resultado => {
      if(resultado.empty){
        //No hay resultados
        this.setState({
          noResultados: true,
          resultado:{}
        })
      }else{
        //Si hay resultados
        const datos = resultado.docs[0];
         //Este resultado (datos) lo coloco en el state
         this.setState({
            resultado: datos.data(),
            noResultados: false
         })
      }
    })
  }


  //Almacenar el código en el state
  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  render() {
    //Extraer el libro
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 my-4">
          <Link to={"/"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> <span className="font-weight-bold">Solicitar prestamo:</span>  {libro.titulo}
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form
                onSubmit={this.buscarAlumno}
              >
                <legend className="color-primary text-center mt-5">
                  Busca el suscriptor por código
                </legend>
                <div className="form-group">
                  <input type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.leerDato}
                  />
                </div>
                <input type="submit" value="Buscar" className="btn btn-primary btn-block"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      //Para no perder la referencia del state de suscriptores
      storeAs: "libro",
      //Para saber que registro me traigo de la bd
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    //{ firestore: { ordered } } destructuring
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);
