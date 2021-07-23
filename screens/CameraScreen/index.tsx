import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");

      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
    })();
  }, []);

  const takePictureHandler = async () => {
    // request local storage accesss
    if (!cameraRef) return;
    const data = await cameraRef.takePictureAsync(null);
    console.log(data.uri);
  };

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result?.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={{ flex: 1 }}
          type={type}
          ratio={"1:1"}
        />
      </View>

      <Button
        style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
        title="Flip Camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />

      <Button title="Take Picture" onPress={takePictureHandler} />
      <Button title="Pick image from gallery" onPress={pickImageHandler} />
      <Button
        title="Save"
        onPress={() => navigation.navigate("Save", { image: image })}
      />

      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
};

export default CameraScreen;
