import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from 'redux-firestore'
import rootReducer from './store/reducers/rootReducer'
import firebaseConfig from './config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

firebase.initializeApp(firebaseConfig)

// Persisted State
const persistedState = { vote: {} }
const db = firebase.firestore()

db.collection('calon')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const tempData = doc.data()
      persistedState.vote[doc.id] = tempData.perolehan_suara
    })
  })

// Create Store
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
)

const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
