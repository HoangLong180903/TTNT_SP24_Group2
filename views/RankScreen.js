import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import axios from "axios";
import { API_RANK_LIST } from "../configs/api-config";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../configs/authContext';

export default function RankScreen() {
  const [rankings, setRankings] = useState([]);
  const { user } = useAuth(); 
  const navigation = useNavigation();

  useEffect(() => {
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
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };
  
  const renderItem = ({ item, index }) => {
    const itemId = item.user?._id;
    const currentUserId = user?._id;
    const rankIcon = index < 3 ? getRankIcon(index) : null;
    let iconColor = "#000"; 
  
 
    switch (index) {
      case 0:
        iconColor = "gold";
        break;
      case 1:
        iconColor = "silver"; 
        break;
      case 2:
        iconColor = "#CD7F32";
        break;
      default:
        iconColor = "#000";
        break;
    }
  
    return (
      <View style={[styles.rankItem, itemId === currentUserId && styles.currentUserItem]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {rankIcon && <FontAwesome name={rankIcon} style={[styles.rankIcon, { color: iconColor }]} />}
          <Text>{index + 1}</Text>
        </View>
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

  const getRankIcon = (index) => {
    return 'trophy'; 
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
    width: '80%',
    alignSelf: 'center',
  },
  currentUserItem: {
    backgroundColor: "#CCFFCC", 
  },
  rankIcon: {
    fontSize: 20,
    marginRight: 5,
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
