import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from "react-native";

import getStyleObj from "./styles";
import { firebase } from "../../firebase/config";
import { useRoute } from "@react-navigation/native";

const CommentScreen = (props) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const { params } = useRoute();

  useEffect(() => {
    function matchUserToComments(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }
        // TODO
        const user = props.users.find((x) => x.uid);
        if (user == undefined) {
          props.fetchUsersData(comments[i].create);
        } else {
          comments[i].user = user;
        }
      }

      setComments(comments);
    }

    if (params?.postId !== postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(params.uid)
        .collection("userPosts")
        .doc(params.postId)
        .get()
        .then((snpashot) => {
          let comments = snpashot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComments(comments);
          setPostId(postId);
        });
    }
  }, [params?.postId]);

  const onCommentSend = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(params.uid)
      .collection("userPosts")
      .doc(params.postId)
      .collection("comments")
      .add({ creator: firebase.auth().currentUser.uid, text });
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View>
            {item.user !== undefined ? <Text> {item.user.name}</Text> : null}
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View>
        <TextInput placeholder="comment" value={text} onChangeText={setText} />

        <Button title={} onPress={() => onCommentSend()} />
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
