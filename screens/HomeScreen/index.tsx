import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../../store/actions/authActions";
import {
  fetchUserFollowing,
  fetchUserPosts,
} from "../../store/actions/userActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.auth.userName);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
  }, []);

  if (!userName) {
    return (
      <View>
        <Text>no User</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>current user {userName}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
