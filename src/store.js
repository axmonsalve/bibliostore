import {createStore, combineReducers, compose} from 'redux';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//Custom Reducers
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

//Configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyAOrdg3AXdvk2SWo4Xu0dspun3yl2x8F20",
    authDomain: "bibliostore-42c72.firebaseapp.com",
    databaseURL: "https://bibliostore-42c72.firebaseio.com",
    projectId: "bibliostore-42c72",
    storageBucket: "bibliostore-42c72.appspot.com",
    messagingSenderId: "47888439083",
    appId: "1:47888439083:web:31ecd79e47176a69c9576e",
    measurementId: "G-HHQBFC85CF"
}

//Inicializar Firebase
firebase.initializeApp(firebaseConfig);

//Configuración de React Redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile : true
}

//Crear enhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//Reducers
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer,
    usuario: buscarUsuarioReducer
});

//State inicial 
const initialState = {

};

//Crear el Store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;