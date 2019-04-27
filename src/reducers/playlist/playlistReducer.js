import * as types from '../../actions/playlist/actionTypes';

const initialState = {
  items: [],
  user: {uid: "playlistRef"}
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case types.FETCH_PLAYLIST:
      return {
        ...state,
        //user: action.user,
        items: action.items,
        user: action.user
      };
    case types.ADD:
      return {
        ...state,
        items: action.item,
      };
    case types.REMOVE:
      return {
        ...state,
        items: state.items.filter((item, i) => i !== action.index)
      };
    default:
      return state;
  }
};

export default playlistReducer;
