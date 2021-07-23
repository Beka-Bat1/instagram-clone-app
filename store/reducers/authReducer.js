import { useReducer } from "react";

import { LOGIN } from "../actions/authActions";
import { USER_STATE_CHANGE } from "../actions/authActions";

const initialState = {
  isAuth: true,
  token: "",
  userName: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case USER_STATE_CHANGE:
      console.log(action.payload, "user DAta");
      return {
        ...state,
        userName: payload.name,
      };
    default:
      return state;
  }
};
