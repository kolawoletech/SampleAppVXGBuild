import * as types from '../../actions/api/actionTypes';


const initialState = {
    connecting: false,
    loading: false,
    token_data: [],
    error: null,
    logged: null,
    registered: null,
    channels: [],
    channel: {},
    catalogue: {},
    link: null
};

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.REGISTER_USER:
        return { 
          ...state, 
          connecting: true,
          
         };
      case types.REGISTERING_USER:
        return { 
          ...state, 
          connecting: false, 
          loading: true, 
          error: null ,
        };
      case types.REGISTERED_USER:
        return {
          ...state,
          connecting: false,
          loading: false,
          token: action.token,
          error: null,
          logged: true,
          registered: null
        };

        case types.CHANNELS_LOADING:
        return {
          ...state,
          connecting: false,
          loading: true,
          token: action.token,
          error: null,
          loaded: false,

        };

        case types.CHANNELS_LOADED:
        return {
          ...state,
          connecting: false,
          loading: false,
          token: action.token,
          error: null,
          loaded: true,
          channels: action.channels
        };

        case types.CATALOGUE_LOADING:
        return {
          ...state,
          connecting: false,
          loading: true,
          token: action.token,
          error: null,
          loaded: false,
        };

        case types.CATALOGUE_LOADED:
        return {
          ...state,
          connecting: false,
          loading: false,
          token: action.token,
          error: null,
          loaded: true,
          catalogue: action.catalogue
        };
        case types.FETCHED_CHANNEL:
        return {
          ...state,
          connecting: false,
          loading: false,
          token: action.token,
          error: null,
          loaded: true,
          channel: action.channel
        };

        case types.FETCHING_CHANNEL:
        return {
          ...state,
          connecting: true,
          loading: false,
          token: action.token,
          error: null,
          loaded: false,

        };

        case types.CATALOGUE_URI_LINK_LOADED:
        return {
          ...state,
          connecting: false,
          loading: false,
          token: action.token,
          error: null,
          loaded: true,
          link: action.link
        };

        case types.CHANNEL_IMAGE_URI_LOADED:
        return {
          ...state,
          connecting: false,
          loading: false,
          token: action.token,
          error: null,
          loaded: true,
          img: action.img
        };
     /*  case types.SIGNUP_SUCCESS:
        return {
          ...state,
          restoring: false,
          loading: false,
          user: action.user,
          error: null,
          logged: null,
          registered: true
        };
      case types.SESSION_ERROR:
        return {
          ...state,
          restoring: false,
          loading: false,
          user: null,
          error: action.error,
          logged: null,
          registered: null
        };
      case types.SESSION_LOGOUT:
        return initialState; */

        
      default:
        return state;
    }
  };
  
  export default apiReducer;