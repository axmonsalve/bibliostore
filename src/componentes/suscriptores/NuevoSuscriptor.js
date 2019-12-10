import React, { Component } from "react";
import { Link } from "react-router-dom";

class NuevoSuscriptor extends Component {
  state = {
      nombre: '',
      apellido: '',
      carrera: '',
      codigo: ''
  };
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
                  <form>
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

export default NuevoSuscriptor;
