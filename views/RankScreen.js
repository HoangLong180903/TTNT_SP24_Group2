import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import { API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';

export default function RankScreen() {
  const [rankings, setRankings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRankings();

    // Gắn kết việc cập nhật dữ liệu xếp hạng với sự focus vào màn hình
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRankings();
    });

    // Hủy gắn kết khi component bị unmount
    return unsubscribe;
  }, [navigation]);

  const fetchRankings = async () => {
    try {
      const response = await axios.get(API_RANK_LIST);
      setRankings(response.data);
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.rankItem}>
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
