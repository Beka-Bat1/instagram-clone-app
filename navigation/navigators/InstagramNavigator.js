import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/HomeScreen";
import SaveScreen from "../../screens/SaveScreen";
e
const Stack = createStackNavigator();
const InstagramNavigator = () => {
  return (
    <Stack.Navigator initialRoute="HomeScreen">
      <Stack.Screen
        title="HomeScreen"
        component={HomeScreen}
      />


      <Stack.Screen
        name="Save"
        component={SaveScreen}
      />
    </Stack.Navigator>
  );
};

export default InstagramNavigator;
