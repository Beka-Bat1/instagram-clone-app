import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { useSelector } from "react-redux";

import { firebase } from "../../firebase/config";

const ProfileScreen = () => {
  const { posts, currentUser, following } = useSelector((state) => state?.user);
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const params = useRoute().params;

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
  }, [params.uid, following]);

  if (user === null) {
    return <View />;
  }

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

  const onLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
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
                title="Unfollow"
                onPress={() => {
                  onFollow();
                }}
              />
            )}
          </View>
        ) : (
          <Button
            title="LogOut"
            onPress={() => {
              onLogout();
            }}
          />
        )}
      </View>

      <View style={styles.containerGallery}>
        {/* {posts.map((post) => {})} */}

        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },

  containerInfo: { marginVertical: 20 },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    // AAA
    aspectRatio: 1 / 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
});
