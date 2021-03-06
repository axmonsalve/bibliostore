import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";

class MostrarLibro extends Component {
  
  devolverLibro = id => {
    //extraer firestore
    const {firestore} = this.props;

    //Copia del libro
    const libroActualizado = {...this.props.libro};

    //Eliminar la persona que esta realizando la devolucion de prestados
    const prestados = libroActualizado.prestados.filter(elemento => elemento.codigo !== id);
    libroActualizado.prestados = prestados;

    //Actualizar en firestore
    firestore.update({
      collection: 'libros',
      doc: libroActualizado.id
    }, libroActualizado);
  }


  render() {
    //Extraer el libro
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    //Boton para solicitar un libro
    let botonPrestamo;
    if (libro.existencia - libro.prestados.length > 0) {
      botonPrestamo = (
        <Link
          to={`/libros/prestamo/${libro.id}`}
          className="btn btn-primary my-3"
        >
          Solicitar prestamo
        </Link>
      );
    } else {
      botonPrestamo = null;
    }

    return (
      <div className="row">
        <div className="col-md-6 my-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>

        <div className="col-md-6 my-4">
          <Link
            to={`/libros/editar/${libro.id}`}
            className="btn btn-primary float-right"
          >
            <i className="fas fa-pencil-alt"></i> Editar libro
          </Link>
        </div>
        <hr className="mx-5 w-100" />
        <div className="col-12">
          <h2 className="mb-4">{libro.titulo}</h2>
          <p>
            <span className="font-weight-bold">ISBN:</span> {libro.ISBN}
          </p>
          <p>
            <span className="font-weight-bold">Editorial:</span>{" "}
            {libro.editorial}
          </p>
          <p>
            <span className="font-weight-bold">Existencia:</span>{" "}
            {libro.existencia}
          </p>
          <p>
            <span className="font-weight-bold">Disponibles:</span>{" "}
            {libro.existencia - libro.prestados.length}
          </p>
          {botonPrestamo}

          {/* Muestra las personas que tienen los libros */}
          <h3 className="my-3">
            Personas que tienen el libro prestado actualmente
          </h3>
          {libro.prestados.map(prestado => (
            
            <div key={prestado.codigo} className="card my-2">
              <h4 className="card-header bg-primary text-white">
                <i className="fas fa-user-check"></i> {prestado.nombre}{" "}
                {prestado.apellido}
              </h4>
              <div className="card-body">
                <p>
                  <span className="font-weight-bold">Código:</span>{" "}
                  {prestado.codigo}
                </p>
                <p>
                  <span className="font-weight-bold">Carrera:</span>{" "}
                  {prestado.carrera}
                </p>
                <p>
                  <span className="font-weight-bold">Fecha de solicitud:</span>{" "}
                  {prestado.fecha_solicitud}
                </p>
              </div>
              <div className="card-footer bg-primary">
                <button
                  type="button"
                  className="btn btn-success font-weight-bold"
                  onClick={() => this.devolverLibro(prestado.codigo)}
                >
                  Realizar devolución
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MostrarLibro.propTypes = {
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
)(MostrarLibro);
