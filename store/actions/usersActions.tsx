import { firebase } from "../../firebase/config";

export const USERS_DATA_STATE_CHANGE = "USERS_DATA_STATE_CHANGE";
export const USERS_POSTS_STATE_CHANGE = "USERS_POSTS_STATE_CHANGE";

export const fetchUserData = (uid) => {
  return (dispatch, getState) => {
    const found = getState().userState.users.some((el) => el.uid == uid);

    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.id = snapshot.id;

            dispatch({ type: USERS_DATA_STATE_CHANGE, payload: user });
          } else {
            console.log("user does not exists");
          }
        });
    }
  };
};

export const fetchUsersFollowingPosts = (uid) => {
  return (dispatch, getState) => {
    const found = getState().userState.users.some((el) => el.uid == uid);

    if (!found) {
      firebase
        .firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          const uid = snapshot.query?.EP.path.segments[1];
          console.log(uid, "uid in users Actions");

          const user = getState().userState.users.find((el) => el.uid === uid);

          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch({
            type: USERS_POSTS_STATE_CHANGE,
            payload: {
              posts: posts,
              uid: uid,
            },
          });
        });
    }
  };
};
