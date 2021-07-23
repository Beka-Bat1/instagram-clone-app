import firebase from "firebase";

export const LOGIN = "LOGIN";
export const USER_STATE_CHANGE = "USER_STATE_CHANGE";
export const CLEAR_DATA = "CLEAR_DATA";

export const fetchUser = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot); //// snapshot data must be username
          dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() });
        } else {
          console.log("user does not exists");
        }
      });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
};
