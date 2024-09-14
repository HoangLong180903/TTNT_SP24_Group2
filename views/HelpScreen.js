import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from 'react'
import API_HELP from '../configs/api-config'
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function HelpScreen() {
    const [contentText , setContentText ] = ([]);
    const navigation = useNavigation();
    useEffect(() => {
      getContent();
      const unsubscribe = navigation.addListener("focus", () => {
      getContent();
      });
      return unsubscribe;
    }, []); 

    const getContent = async () => {
      try {
        const response = await axios.get(API_HELP);
        setContentText(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const renderItem = ({ item }) => (
      <TouchableOpacity>
        <Text style={styles.textTitle}>{item.textH}</Text>
      </TouchableOpacity>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={contentText}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});