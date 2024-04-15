import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../configs/authContext";
import {
  API_LIST_QUIZZ,
  API_TOTAL_COIN_BY_UID,
  API_RANK_LIST,
} from "../configs/api-config";
import { useNavigation } from "@react-navigation/native";
import NFTQuaCuaToi from "./NFTQuaCuaToi";
import { SafeAreaView } from "react-native-safe-area-context";
export default function QuaCuaToi() {
  const [nfts, setNfts] = useState([]);
  const [data, setData] = useState([]);
  const [totalCoin, setTotalCoin] = useState();
  const { user } = useAuth();
  const navigation = useNavigation();
  const xKey = "Z0s1HomCTG-Ppn--"; // Thay thế bằng x-api-key của bạn
  const wallID = "F8zYJEbLJ3n6rKjHrno5tSG6Uvz3cf1fzpP5uBNU7zhg"; // Thay thế bằng địa chỉ ví của bạn
  const network = "devnet";
  useEffect(() => {
    fetchNFTs();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchNFTs();
    });

    return unsubscribe;
  }, [navigation, user]);
  const fetchNFTs = async () => {
    try {
      const nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
      const response = await axios.get(nftUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
      });
      console.log(response.data.result.id);
      const nftData = response.data.result.map((item) => ({
        id: item.mint,
        name: item.name,
        points: 100, // Giả sử mỗi NFT cần 100 điểm
        imageUri: { uri: item.image_uri },
      }));
      console.log(nftData);
      setNfts(nftData);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to fetch NFTs");
    }
  };
  const renderNFTCard = ({ item }) => (
    <NFTQuaCuaToi
      name={item.name}
      points={item.points}
      imageUri={item.imageUri}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", height: 50 ,backgroundColor:"#FFF"}}>
        <Text style={{ fontSize: 25 ,fontWeight:"bold",margin:10}}>Quà của tôi</Text>
      </View>
      <FlatList
        data={nfts}
        renderItem={renderNFTCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },

  cardView: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    padding: 5,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    // flex:1,
  },
});
