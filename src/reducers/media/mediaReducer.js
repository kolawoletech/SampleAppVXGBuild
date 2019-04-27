import * as types from '../../actions/media/actionTypes';

const initialState = {
  uri : 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  videos: []
};
const mediaReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.PLAY:
      return {
        ...state,
        video: action.uri,
      };
    case types.FETCH_VIDEOS:
      return {
        ...state,
        //user: action.user,
        videos: action.videos,
        //user: action.user
      };
    case types.STOP:
      return {
        ...state,
        video: action.video,
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

export default mediaReducer;
