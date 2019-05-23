import firebaseService from "../../enviroments/firebase";
import * as types from "./actionsTypes";
import { AsyncStorage } from 'react-native';
import { Actions } from "react-native-router-flux";

export const restoreSession = () => dispatch => {
  dispatch(sessionLoading());
  dispatch(sessionRestoring());

  firebaseService.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(sessionSuccess(user));
    } else {
      dispatch(sessionLogout());
    }
  });
};

export const loginUser = (email, password) => dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(sessionSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const loginAnonymously = () => dispatch => {
  dispatch(sessionLoading());
  console.log("Buttoin Clicked");
  firebaseService
    .auth()
    .signInAnonymously()
    .then(user => {
      console.log(user);
      dispatch(sessionSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const signupUser = (email, password) => dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const registerUser = (email, password) => dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const logoutUser = () => dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .auth()
    .signOut()
    .then(() => {
      dispatch(sessionLogout());
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

// Start Of Export Section for API Session

export const apiRegisterUser = () => dispatch => {
  dispatch(APISessionLoading);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/users";
  fetch(url, options)
    .then( aid => aid.json())
    .then(aid => {
      dispatch(APISessionRegister);
      console.log("This is your new user AId" + aid["data"]);
      const userAID = aid["data"];


      AsyncStorage.setItem('aid', userAID ).then(() =>{
        console.log("Setting AID and Saving Locally")
      })
      const token_url = "https://nile.rtst.co.za/api/artist/6/users";

      fetch(token_url)
      .then( token=> token.json() )
      .then( token =>{
        AsyncStorage.setItem('tokenID', token ).then(() =>{
          console.log("Setting Token ID and Saving Locally")
        })
      }).catch(err => console.log( err, "Token Not Set"));
    });
};

// End Of Export Section for API Session

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
  type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
});

const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
});

// API SESSION

const APISessionRestoring = () => ({
  type: types.API_SESSION_RESTORING
});

const APISessionLoading = () => ({
  type: types.API_SESSION_LOADING
});

const APISessionSuccess = user => ({
  type: types.API_SESSION_SUCCESS,
  user
});

const APISessionRegister = user => ({
  type: types.API_SESSION_REGISTER,
  user
});

const APISessionError = error => ({
  type: types.API_SESSION_ERROR,
  error
});

//END OF API SESSION

// PLAYLIST PORTION

export const getUID = () => async dispatch => {
  firebaseService.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(getUserUID(user));
    }
  });
};

export const Add = item => dispatch => {
  //dispatch(add(item));
};

export const Remove = index => dispatch => {
  //dispatch(remove(index));
};

export const add = item => ({
  type: types.ADD_ITEM,
  todo: item
});

export const remove = index => ({
  type: types.REMOVE_ITEM,
  index: index
});

export const addToPlaylist = newItem => dispatch => {
  playlistRef.push().set(newItem);
};

export const removeItem = removeItemId => dispatch => {
  playlistRef.child(removeItemId).remove();
};

export const fetchPlaylist = user => dispatch => {
  let databaseRef = firebaseService.database().ref();

  let playlistRef = databaseRef.child("userProfile").child(user);

  this.playlist = playlistRef.child("playlist").on("value", snapshot => {
    let items = snapshot.val();
    dispatch(fetchUserPlaylist(items, user));
  });
};

const fetchUserPlaylist = (items, user) => ({
  type: types.FETCH_PLAYLIST,
  items,
  user
});

const getUserUID = user => ({
  type: types.GET_USER,
  user
});

// START OF GET WIFI OPTIONS

export const getWiFiSettingsOption = (selected) => dispatch => {
  console.log( "Boolesan Selected IS : " + selected);
  dispatch(getWiFiOption(selected))
};

const getWiFiOption = (wifi) => ({
  type: types.GET_WIFI_OPTION,
  wifi
});


// END OF GET WIFI OPTIONS
