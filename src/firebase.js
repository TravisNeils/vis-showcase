import firebase from '@firebase/app'
import '@firebase/storage'

// Replace these with your own :)
const firebaseConfig = {
    apiKey: "AIzaSyB2Yg98AzrlXyw7AxybFG7ChK3Ta9Hw69U",
    authDomain: "vis-showcase.firebaseapp.com",
    projectId: "vis-showcase",
    storageBucket: "vis-showcase.appspot.com",
    messagingSenderId: "168509012454",
    appId: "1:168509012454:web:ce00789f11173107263e27",
}

// Make sure it hasn't already been initialized
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase