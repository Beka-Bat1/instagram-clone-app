import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { firebase } from "../../firebase/config";

const SearchScreen = () => {
  const [users, setUsers] = useState(null);
  const navigation = useNavigation();

  const fetchUsers = (search) => {
    // AAA
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
          };
        });
        setUsers(users);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Search"
        onChangeText={(search) => {
          fetchUsers(search);
        }}
      />

      <FlatList
        horizontal={false}
        numColumns={1}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { uid: item.id })}
          >
            <Text> {item.name} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
