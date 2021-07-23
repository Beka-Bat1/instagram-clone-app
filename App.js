import React, { useEffect } from "react";
import { useState } from "react";
import { Text } from "react-native";


import { Provider } from "react-redux";
import { store } from "./store/store";
import AppNavigator from "./navigation/navigators/AppNavigator";


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}


