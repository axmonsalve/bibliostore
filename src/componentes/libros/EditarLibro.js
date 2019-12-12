import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class EditarLibro extends Component {
  //Refs
  tituloInput = React.createRef();
  editorialInput = React.createRef();
  ISBNInput = React.createRef();
  existenciaInput = React.createRef();

  //Actualiza el libro en firebase
  actualizarLibro = e => {
    e.preventDefault();

    //Construir el nuevo objeto
    const libroActualizado = {
      titulo: this.tituloInput.current.value,
      editorial: this.editorialInput.current.value,
      ISBN: this.ISBNInput.current.value,
      existencia: this.existenciaInput.current.value
    };

    //Leer firestore y history
    const { firestore, history, libro } = this.props;
    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        libroActualizado
      )
      .then(
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${libro.titulo} guardado!`,
          showConfirmButton: false,
          timer: 1500
        }),
        history.push("/")
      );
    //Actualizar en firestore
  };

  render() {
    //Obtener el libro
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
            <i className="fas fa-book"></i> Editar Libro
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-8">
              <form onSubmit={this.actualizarLibro}>
                <div className="form-group">
                  <label>Titulo:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Título o nombre del libro"
                    required
                    defaultValue={libro.titulo}
                    ref={this.tituloInput}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del libro"
                    required
                    defaultValue={libro.editorial}
                    ref={this.editorialInput}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del libro"
                    required
                    defaultValue={libro.ISBN}
                    ref={this.ISBNInput}
                  />
                </div>

                <div className="form-group">
                  <label>Existencia:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="existencia"
                    placeholder="Cantidad en existencia"
                    required
                    defaultValue={libro.existencia}
                    ref={this.existenciaInput}
                  />
                </div>
                <input
                  type="submit"
                  value="Editar libro"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarLibro.propTypes = {
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
)(EditarLibro);
