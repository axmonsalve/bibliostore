import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";

import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const Suscriptores = ({ suscriptores, firestore }) => {
  //SPINNER DE CARGA
  if (!suscriptores) return <Spinner />;

  //Eliminar suscriptores
  const eliminarSuscriptor = id => {
    //Eliminar con firestore
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        firestore.delete({
          collection: "suscriptores",
          doc: id
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    // .then(history.push('/suscriptores'))
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={"/suscriptores/nuevo"} className="btn btn-primary mt-4">
          <i className="fas fa-plus"></i>
          {""} Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users"></i> Suscriptores
        </h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>
                {suscriptor.nombre} {suscriptor.apellido}
              </td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${suscriptor.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right"></i> Mas información
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={() => eliminarSuscriptor(suscriptor.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                  {""} Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Suscriptores.protoTypes = {
    firestore : PropTypes.object.isRequired,
    suscriptores : PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: "suscriptores" }]),
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
