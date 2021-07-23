import { firebase } from "../../firebase/config";

export const USERS_DATA_STATE_CHANGE = "USERS_DATA_STATE_CHANGE";
export const USERS_POSTS_STATE_CHANGE = "USERS_POSTS_STATE_CHANGE";
export const USERS_LIKE_STATE_CHANGE = "USERS_LIKE_STATE_CHANGE";

export const fetchUserData = (uid, getPosts) => {
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

          if (getPosts) {
            dispatch(fetchUsersFollowingPosts(user.uid));
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

          for (let index = 0; index < posts.length; index++) {
            dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
          }
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

export const fetchUsersFollowingLikes = (uid, postId) => {
  return (dispatch, getState) => {
    const found = getState().userState.users.some((el) => el.uid == uid);

    if (!found) {
      firebase
        .firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {
          const postId = snapshot.ZE.path.segments[3];

          let currentUserLike = false;
          if (snapshot.exists) {
            currentUserLike = true;
          }

          dispatch({
            type: USERS_LIKE_STATE_CHANGE,
            payload: {
              postId,
              currentUserLike,
            },
          });
        });
    }
  };
};
