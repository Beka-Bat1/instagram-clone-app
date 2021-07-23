import { useNavigation, useRoute } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, Button, Image, TextInput } from "react-native";
// import CameraScreen from "../CameraScreen/index";

import { firebase } from "../../firebase/config";

const AddScreen = () => {
  const route = useRoute();
  const image = route.params?.image;
  const [text, setText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    console.log(image);
  }, [image]);

  const uploadHandler = async () => {
    let childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    // image needs to be fetched async
    const response = await fetch(image);
    // FINDOUT blob
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      //TOFIDOUT bytestransfered
      console.log(`transfers: ${snapshot.bytesTransfered}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot, "this mut be download URl");
        savePostData(snapshot);
      });
    };

    const savePostData = (downloadURL) => {
      //// FINDOUT TODO error
      firebase
        .firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("UserPosts")
        .add({
          downloadURL,
          caption,
          creation: firebase.firestore().FieldValue.serverTimeStamp(),
        })
        .then((response) => {
          console.log(response);
          StackActions.popToTop();
        });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    /// TOFINDOUT wtf is .on
    task.on("state_canged", taskProgress, taskError, taskCompleted);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text> Hello world </Text>
      <Image source={{ uri: image }} />
      <TextInput
        placeholder="type some dummy text"
        value={text}
        onChangeText={setText}
      />
      {/* todo  */}
      <Button onPress={() => uploadHandler()} title="save" />
    </View>
  );
};

export default AddScreen;
