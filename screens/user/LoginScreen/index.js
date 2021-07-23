import React, { useState, useReducer } from "react";
import { View, Text, TextInput, Button } from "react-native";

import firebase from "firebase";

const EMAIL = "EMAIL";
const PASSWORD = "PASSWORD";
const NAME = "NAME";

const LoginScreen = () => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case EMAIL:
        return {
          ...sate,
          email: action.payload,
        };
      case PASSWORD:
        return {
          ...sate,
          password: action.payload,
        };
      case NAME:
        return {
          ...sate,
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

  const textChangeHandler = (inputName, value) => {
    console.log(value);
    dispatchAuthForm({ type: inputName, payload: value });
  };

  const signInHandler = () => {
    console.log("you will be signed in shortly");
    const { email, password, name } = authForm;
    firebase
      .auth()
      .signInWIthEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <TextInput
        placeHolder="name"
        value={authForm.name}
        onChangeText={() => textChangeHandler(NAME, value)}
      />

      <TextInput
        placeHolder="email"
        value={authForm.email}
        onChangeText={() => textChangeHandler(EMAIL, value)}
      />

      <TextInput
        placeHolder="password"
        secureTextEntry={true}
        value={authForm.password}
        onChangeText={() => textChangeHandler(PASSWORD, value)}
      />

      <Button title="Sign In" onPress={signInHandler} />
    </View>
  );
};

export default LoginScreen;
