import { USER_STATE_CHANGE } from "../actions/authActions";
import { USER_POST_CHANGE } from "../actions/userActions";
import { USER_FOLLOWING_STATE_CHANGE } from "../actions/userActions";
import { CLEAR_DATA } from "../actions/authActions";

const initialState = {
  currentUser: "",
  posts: [],
  following: [], // TOFINDOUT array??
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.payload,
      };

    case USER_POST_CHANGE:
      return {
        ...state,
        posts: action.payload,
      };

    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        posts: action.payload,
      };

    case CLEAR_DATA:
      // TOFINDOUT initialState must return clean data
      return {
        ...initialState,
      };
      
    /// todo USER_POST_STATE_CHANGE

    // case USER_POST_STATE_CHANGE:
    //     return {
    //       ...state,
    //       following: action.payload
    //     }
    default:
      return state;
  }
};
