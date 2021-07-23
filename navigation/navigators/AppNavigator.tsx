import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native";

import AuthNavigator from "./AuthNavigator";
import { Alert } from "react-native";
import TabMain from "../tabs/TabMain";
import { firebase } from "../../firebase/config";
import { useSelector } from "react-redux";

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = useSelector((state) => state?.user.currentUser);

  useEffect(() => {
    console.log(isAuthenticated);

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        setIsLoading(false);
        setIsLoggedIn(false);
        Alert.alert("sorry youser was not found ");
      } else {
        setIsLoggedIn(true);
      }
    });
  }, []);

  if (isLoading) return <ActivityIndicator size={40} color="black" />;

  const navigators = !!isAuthenticated ? <TabMain /> : <AuthNavigator />;

  return <NavigationContainer>{navigators}</NavigationContainer>;
};

export default AppNavigator;
