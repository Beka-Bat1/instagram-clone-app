import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "../../screens/user/LandingScreen";
import RegisterScreen from "../../screens/user/RegisterScreen";
import LoginScreen from "../../screens/user/LoginScreen";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRoute="LandingScreen">
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
      />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
