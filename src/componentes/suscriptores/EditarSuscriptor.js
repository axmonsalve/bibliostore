import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';

class EditarSuscriptor extends Component {
  
  //Crear los refs
  nombreInput = React.createRef();
  apellidoInput = React.createRef();
  carreraInput = React.createRef();
  codigoInput = React.createRef();

    //Edita Suscriptor en la BD
    editarSuscriptor = e => {
        e.preventDefault();

        //crear el objeto que va actualizar
        const suscriptorActualizado = {
            nombre : this.nombreInput.current.value,
            apellido : this.apellidoInput.current.value,
            codigo : this.codigoInput.current.value,
            carrera : this.carreraInput.current.value
        }

        //Extraer firestore y history
        const {suscriptor, firestore, history} = this.props;
        
        //Almacenar en la BD con firestore
        firestore.update({
            collection : 'suscriptores',
            doc : suscriptor.id
        }, suscriptorActualizado)
            .then(
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  }),
                history.push('/suscriptores')
                );
    }

  render() {
    const { suscriptor } = this.props;
    if (!suscriptor) return <Spinner />;
    return (
      <div className="row">
        <div className="col-12 my-4">
          <Link to={"/suscriptores"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-edit"></i> Editar Suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-8">
              <form onSubmit={this.editarSuscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre del suscriptor"
                    required
                    ref={this.nombreInput}
                    defaultValue={suscriptor.nombre}
                  />
                </div>

                <div className="form-group">
                  <label>Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del suscriptor"
                    required
                    ref={this.apellidoInput}
                    defaultValue={suscriptor.apellido}
                  />
                </div>

                <div className="form-group">
                  <label>Carrera:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del suscriptor"
                    required
                    ref={this.carreraInput}
                    defaultValue={suscriptor.carrera}
                  />
                </div>

                <div className="form-group">
                  <label>Código:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="codigo"
                    placeholder="Código del suscriptor"
                    required
                    ref={this.codigoInput}
                    defaultValue={suscriptor.codigo}
                  />
                </div>
                <input
                  type="submit"
                  value="Editar Suscriptor"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

EditarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
  };

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      //Para no perder la referencia del state de suscriptores
      storeAs: "suscriptor",
      //Para saber que registro me traigo de la bd
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    //{ firestore: { ordered } } destructuring
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor);
