import React from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";


const MostrarSuscriptor = () => {
    return ( 
        <h1>Mostrar Suscriptor...</h1>
     );
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'suscriptores',
            //Para no perder la referencia del state de suscriptores
            storeAs : 'suscriptor',
            //Para saber que registro me traigo de la bd
            doc : props.match.params.id
        }
    ]),
    connect(({firestore : {ordered}}, props)=>({
        suscriptor : ordered.suscriptor && ordered.suscriptor[0]
    }))
)(MostrarSuscriptor);