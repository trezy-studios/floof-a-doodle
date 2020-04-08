// Module imports
import firebase from 'firebase/app'
/* eslint-disable-next-line import/no-unassigned-import */
import 'firebase/database'





// Local imports
import firebaseConfig from './firebaseConfig'





if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.database()
}





export default firebase
