import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';


export const getUID = () => async dispatch => {
  //dispatch(sessionLoading());
  //dispatch(sessionRestoring());

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

export const fetchPlaylist = (uid) => dispatch => {

  let databaseRef = firebaseService.database().ref();

  let playlistRef =  databaseRef.child("userProfile").child(uid);


  playlistRef.child("playlist").on("value", snapshot => {

    let items = snapshot.val()
    dispatch(fetchUserPlaylist(items, uid));

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