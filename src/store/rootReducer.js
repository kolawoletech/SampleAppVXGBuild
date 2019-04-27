import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import counterReducer from '../reducers/counter/counterReducer';
import sessionReducer from '../reducers/session/sessionReducer';
import todolistReducer from '../reducers/todolist/todolistReducer';
import apiReducer from '../reducers/api/apiReducer';
import playlistReducer from '../reducers/playlist/playlistReducer';
import mediaReducer from '../reducers/media/mediaReducer';

export default combineReducers({
  routesReducer,
  counterReducer,
  sessionReducer,
  todolistReducer,
  apiReducer,
  playlistReducer,
  mediaReducer
});
