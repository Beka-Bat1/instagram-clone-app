import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, Button } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

import { firebase } from "../../firebase/config";
import st from "./styles";

const FeedScreen = (props) => {
  const { currentUser, following } = useSelector((state) => state?.user);
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(undefined);
  const [isFollowing, setIsFollowing] = useState(false);
  const params = useRoute().params;
  const [posts, setPosts] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      // sort by creation date
      props.feed.sort((x, y) => {
        return x.creation - y.creation;
      });
      setPosts(posts);
    }
  }, [props.userFollowingLoaded, props.feed]);

  useEffect(() => {
    /// CHECK user vs currentUSer
    if (params.uid === firebase.auth().currentUser.uid) {
      setUser(params.uid);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("user")
        .doc(params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log(snapshot.data()); //// snapshot data must be username
            setUser(snapshot.data());
          } else {
            console.log("user does not exists");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(params.uid)
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
          setUserPosts(posts);
        });
    }

    if (following.indexOf(params.uid) > -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [params?.uid, following]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(params.uid)
      .set({});
  };

  const onUnFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(params.uid)
      .delete();
  };

  const onLikePress = (uid, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };
  const onDislikePress = (uid, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  return (
    <View style={st.container}>
      <View style={st.containerInfo}>
        <Text>{JSON.stringify(user)}</Text>
        <Text>{JSON.stringify(user)}</Text>
        {params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {isFollowing ? (
              <Button
                title="Unfollow"
                onPress={() => {
                  onUnFollow();
                }}
              />
            ) : (
              <Button
                title="Follow"
                onPress={() => {
                  onFollow();
                }}
              />
            )}
          </View>
        ) : null}
      </View>

      <View style={st.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={st.containerImage}>
              <Text style={st.container}>{item.user.name}</Text>
              <Image style={st.image} source={{ uri: item.downloadURL }} />

              {item.currentUserLike ? (
                <Button
                  title="Like"
                  onPress={() => {
                    onLikePress(item.user.uid, item.id);
                  }}
                />
              ) : (
                <Button
                  title="Dislike"
                  onPress={() => {
                    onDislikePress(item.user.uid, item.id);
                  }}
                />
              )}
              <Text
                style={st.container}
                onPress={
                  (() => navigate("Comment"),
                  { postId: item.id, uid: item.user.uid })
                }
              >
                View Coomments...
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FeedScreen;
