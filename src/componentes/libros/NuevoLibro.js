import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Swal from 'sweetalert2';
import PropTypes from "prop-types";

class NuevoLibro extends Component {
    state = { 
        titulo: '',
        ISBN : '',
        editorial : '',
        existencia : ''
     }

    //Almacena lo que el usuario escribe
     leerDato = e => {
         this.setState({
             [e.target.name] : e.target.value
         })
     }

     //guarda el libro en la BD
     agregarLibro = e => {
         e.preventDefault();

         //Tomar un a copia del state
        const nuevoLibro = this.state;

        //Agregar un arreglo de prestados
        nuevoLibro.prestados = [];

         //Extraer firestore con sus metodos
         const {firestore, history} = this.props

         //Añadirlo a la BD y redireccionar
         firestore.add({collection: 'libros'}, nuevoLibro)
            .then(()=> {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  history.push("/");
                })
                .catch(error => console.log(error));
     }


    render() { 
        return ( 
            <div className="row">
                <div className="col-12 my-4">
                    <Link
                        to={'/'}
                        className="btn btn-secondary"
                    >
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al listado
                    </Link>
                </div>

                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>{' '}
                        Nuevo libro
                    </h2>
                

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                            onSubmit={this.agregarLibro}
                            >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Título o nombre del libro"
                                    required
                                    value={this.state.titulo}
                                    onChange={this.leerDato}
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
                                    value={this.state.editorial}
                                    onChange={this.leerDato}
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
                                    value={this.state.ISBN}
                                    onChange={this.leerDato}
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
                                    value={this.state.existencia}
                                    onChange={this.leerDato}
                                    />
                                </div>
                                <input type="submit" value="Agregar libro" className="btn btn-success btn-block"/>
                            </form>
                            </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
  };
  
  export default firestoreConnect()(NuevoLibro);