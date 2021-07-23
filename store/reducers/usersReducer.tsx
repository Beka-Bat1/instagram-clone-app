import { USERS_DATA_STATE_CHANGE } from "../actions/usersActions";
import { USERS_POSTS_STATE_CHANGE } from "../actions/usersActions";

const initialState = {
  users: [],
  usersLoaded: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        user: [...state.users, action.payload],
      };

    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        users: state.users.map((user) =>
          user.uid === action.payload.uid
            ? { ...user, post: action.payload.posts }
            : null
        ),
      };

    // case USERS_POST_CHANGE:
    //   return {
    //     ...state,
    //     posts: action.payload,
    //   };

    // case USERS_DATA_CHANGE:
    //   return {
    //     ...state,
    //     posts: action.payload,
    //   };

    default:
      return state;
  }
};
