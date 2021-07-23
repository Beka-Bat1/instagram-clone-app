import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import getStyleObj from "./styles";
import { firebase } from "../../firebase/config";
import { useRoute } from "@react-navigation/native";

const CommentScreen = () => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const params = useRoute().params;

  useEffect(() => {
      if(params.postId !== postId ){
          firebase.firestore().collection('posts').doc(params.uid).collection('userPosts').collection('comments')

          // posts userId userPosts comments doc
      }
  }, []);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
