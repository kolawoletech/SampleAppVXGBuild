import firebaseService from '../../enviroments/firebase';
import * as types from './actionsTypes';

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
  console.log("Buttoin Clicked")
  firebaseService
    .auth()
    .signInAnonymously()
    .then(user => {
      console.log(user)
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

export const fetchPlaylist = (user) => dispatch => {

  let databaseRef = firebaseService.database().ref();

  let playlistRef =  databaseRef.child("userProfile").child(user);


 this.playlist = playlistRef.child("playlist").on("value", snapshot => {

    let items = snapshot.val()
    dispatch(fetchUserPlaylist(items, user));

  });



};


const fetchUserPlaylist= (items, user) => ({
  type: types.FETCH_PLAYLIST,
  items,
  user
});

const getUserUID = (user) => ({
  type: types.GET_USER,
  user
});