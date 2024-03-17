import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import { API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../configs/authContext';

export default function RankScreen() {
  const [rankings, setRankings] = useState([]);
  const { user } = useAuth(); 
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("Current user:", user); 
  
    // if (user) {
    //   console.log("_id of current user:", user._id);
    // } else {
    //   console.log("Current user is null or undefined");
    // }
  
    fetchRankings();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRankings();
    });
  
    return unsubscribe;
  }, [navigation, user]); 
  
  const fetchRankings = async () => {
    try {
      const response = await axios.get(API_RANK_LIST);
      setRankings(response.data);
  
      response.data.forEach(item => {
        // console.log("_id of item:", item._id);
      });
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };
  

  const renderItem = ({ item, index }) => {
    const itemId = item.user?._id;
    const currentUserId = user?._id;
    
    // console.log("Item _id:", itemId);
    // console.log("User _id:", currentUserId);
  
    return (
      <View style={[styles.rankItem, itemId === currentUserId && styles.currentUserItem]}>
        <Text>{index + 1}</Text>
        {item.user && (
          <>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{item.user.name}</Text>
              <Text>{item.scoreWithinSevenDays} points</Text>
            </View>
          </>
        )}
      </View>
    );
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Rankings</Text>
      <FlatList
        data={rankings}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  currentUserItem: {
    backgroundColor: "#CCFFCC", 
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
