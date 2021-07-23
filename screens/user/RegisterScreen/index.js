import React, { useState, useReducer } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { firebase } from '../../../firebase/config'

const EMAIL = "EMAIL";
const PASSWORD = "PASSWORD";
const NAME = "NAME";

const RegisterScreen = () => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case EMAIL:
        return {
          ...state,
          email: action.payload,
        };
      case PASSWORD:
        return {
          ...state,
          password: action.payload,
        };
      case NAME:
        return {
          ...state,
          name: action.payload,
        };
      default:
        throw new Error();
    }
  };

  const [authForm, dispatchAuthForm] = useReducer(formReducer, {
    email: "",
    password: "",
    name: "",
  });

  const textChangeHandler = (value, inputName) => {
    console.log('==========');
    console.log(inputName, value);
    console.log('==========');
    dispatchAuthForm({ type: inputName, payload: value });
  };

  const signUpHandler = () => {
    console.log("you will be signed out");
    const { email, password, name } = authForm;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email });
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <TextInput
        placeHolder="name"
        value={authForm.name}
        onChangeText={(e) => textChangeHandler(e, NAME)}
      />

      <TextInput
        placeHolder="email"
        value={authForm.email}
        onChangeText={(e) => textChangeHandler(e, EMAIL)}
      />

      <TextInput
        placeHolder="password"
        secureTextEntry={true}
        value={authForm.password}
        onChangeText={(e) => textChangeHandler(e, PASSWORD)}
      />

      <Button title="sign Up" onPress={signUpHandler} />
    </View>
  );
};

export default RegisterScreen;
