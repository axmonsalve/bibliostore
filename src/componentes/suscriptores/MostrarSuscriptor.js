import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from 'prop-types';

const MostrarSuscriptor = ({ suscriptor }) => {
  if (!suscriptor) return <Spinner />;
  return (
    <div className="row my-4">
      <div className="col-md-6 ">
        <Link to="/suscriptores" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> Volver al listado
        </Link>
      </div>

      <div className="col-md-6">
        <Link
          to={`/suscriptores/editar/${suscriptor.id}`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-pencil-alt"></i> Editar Suscriptor
        </Link>
      </div>
      
      <hr className="mx-5 w-100"/>
      
      <div className="col-12">
          <p className="mb-4 h2">
              {suscriptor.nombre} {suscriptor.apellido}
          </p>
          <p className="h5">
              <span className="font-weight-bold ">Carrera: </span>
              {suscriptor.carrera}
          </p>
          <p className="h5">
              <span className="font-weight-bold">Código: </span>
              {suscriptor.codigo}
          </p>
      </div>
    </div>
  );
};

MostrarSuscriptor.propTypes = {
    firestore : PropTypes.object.isRequired 
}

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
  connect(({ firestore: { ordered } }, props) => ({ //{ firestore: { ordered } } destructuring
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(MostrarSuscriptor);
