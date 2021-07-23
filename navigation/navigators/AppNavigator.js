import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native";
import HomeScreen from "../../screens/HomeScreen";

import AuthNavigator from "./AuthNavigator";
import TabMain from "../tabs/TabMain";
import { firebase } from '../../firebase/config'
import AddScreen from "../../screens/AddScreen";



const Stack = createStackNavigator();
const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = true;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        setIsLoading(true);
      } else {
        setIsLoggedIn(true);
      }
    });
  }, []);

  if (isLoading) return <ActivityIndicator size={40} color="black" />



  const navigators = isAuthenticated ? <TabMain /> : <AuthNavigator />

  return <NavigationContainer>{navigators}</NavigationContainer>;
};

export default AppNavigator;
