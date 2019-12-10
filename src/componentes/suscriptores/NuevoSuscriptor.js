import React, { Component } from "react";
import { Link } from "react-router-dom";
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

import Swal from 'sweetalert2';

class NuevoSuscriptor extends Component {
  state = {
      nombre: '',
      apellido: '',
      carrera: '',
      codigo: ''
  };

  //Extraer valores del input para colocarlo en el state
  leerDato = e => {
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  //Agrega un nuevo suscriptor a la bd
  agregarSuscriptor = e => {
      e.preventDefault();

      //Extraer valores del state
        const nuevoSuscriptor = {...this.state}

      //Extraer firestore de props
      const {firestore, history} = this.props;

      //Guardar en la bd
      firestore.add({
          collection : 'suscriptores',

      },nuevoSuscriptor)
        .then(()=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
              history.push('/suscriptores');
        })
        .catch(error => console.log(error))
  }


  render() {
    return (
      <div className="row">
        <div className="col-12 my-4">
          <Link to={"/suscriptores"} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus"></i> Nuevo Suscriptor
          </h2>
          <div className="row justify-content-center">
              <div className="col-md-8 mt-8">
                  <form
                    onSubmit={this.agregarSuscriptor}
                  >
                      <div className="form-group">
                          <label>Nombre:</label>
                          <input 
                            type="text"
                            className="form-control"
                            name="nombre"
                            placeholder="Nombre del suscriptor"
                            required
                            onChange={this.leerDato}
                            value={this.state.nombre}
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
                            onChange={this.leerDato}
                            value={this.state.apellido}
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
                            onChange={this.leerDato}
                            value={this.state.carrera}
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
                            onChange={this.leerDato}
                            value={this.state.codigo}
                            />
                      </div>
                      <input 
                        type="submit" 
                        value="Agregar Suscriptor"
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

NuevoSuscriptor.propTypes = {
    firestore : PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoSuscriptor);
