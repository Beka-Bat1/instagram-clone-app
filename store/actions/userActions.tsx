export const USER_POST_CHANGE = "USER_POST_CHANGE";
export const USER_POST_STATE_CHANGE = "USER_POST_STATE_CHANGE";
export const USER_FOLLOWING_STATE_CHANGE = "USER_FOLLOWING_STATE_CHANGE";

import { firebase } from "../../firebase/config";

export const fetchUserPosts = () => {
  /// FINDOUT order by ascending
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
          };
        });
        console.log(posts);
        dispatch({ type: USER_POST_STATE_CHANGE, payload: posts });
      });
  };
};

export const fetchUserFollowing = () => {
  /// FINDOUT order by ascending
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        console.log(following);
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, payload: following });
      });
  };
};



