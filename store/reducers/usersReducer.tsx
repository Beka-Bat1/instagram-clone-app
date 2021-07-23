import { USERS_DATA_STATE_CHANGE } from "../actions/usersActions";
import { USERS_POSTS_STATE_CHANGE } from "../actions/usersActions";

import { USERS_LIKE_STATE_CHANGE } from "../actions/usersActions";
import { CLEAR_DATA } from "../actions/authActions";

const initialState = {
  users: [],
  feed: [],
  usersFollowingLoaded: 0,
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
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        // users: state.users.map((user) =>
        //   user.uid === action.payload.uid
        //     ? { ...user, post: action.payload.posts }
        //     : null
        // ),  -- why is this here?

        feed: [...state.feed, ...action.payload.posts],
      };

    case USERS_LIKE_STATE_CHANGE:
      return {
        ...state,
        feed: state.feed.map((post) => {
          post.id == action.postId
            ? {
                ...post,
                currentUserLike: action.payload.currentUserLike,
                postId: action.payload.postId,
              }
            : post;
        }),
      };
    case CLEAR_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
