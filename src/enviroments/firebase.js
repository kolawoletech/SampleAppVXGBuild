import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database'

const config = {
  apiKey: "AIzaSyB6YABGXUWiqLzHoxuQ1E1Z7FO67FGD7-4",
  authDomain: "nilemediaonline.firebaseapp.com",
  databaseURL: "https://nilemediaonline.firebaseio.com",
  projectId: "nilemediaonline",
  storageBucket: "nilemediaonline.appspot.com",
  messagingSenderId: "660857508341"
};

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config);
      instance = this;
    }
    return instance;
  }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;
