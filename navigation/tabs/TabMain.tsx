import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedScreen from "../../screens/Feed";
import HomeScreen from "../../screens/HomeScreen";
import SearchScreen from "../../screens/SearchScreen";
import { firebase } from "../../firebase/config";
import ProfileScreen from "../../screens/ProfileScreen";
import CommentScreen from "../../screens/CommentScreen";

const EmptyScreen = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();
const TabMain = () => (
  <Tab.Navigator labeled={false}>
    <Tab.Screen
      name="Home"
      component={FeedScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={29} />
        ),
      }}
    />

    <Tab.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={29} />
        ),
      }}
    />

    <Tab.Screen
      name="AddPicture"
      component={EmptyScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus-box" color={color} size={29} />
        ),
      }}
      // listener inside component or inside naivgation ...
      listeners={({ navigation }) => ({
        tabPress: (event) => {
          event.preventDefault();
          navigation.navigate("Add");
        },
      })}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-circle"
            color={color}
            size={29}
          />
        ),
      }}
      listeners={({ navigation }) => ({
        tabPress: (event) => {
          event.preventDefault();
          navigation.navigate("Profile", {
            uid: firebase.auth().currentUser.uid,
          });
        },
      })}
    />

    <Tab.Screen name="Comments" component={CommentScreen} />
  </Tab.Navigator>
);

export default TabMain;
