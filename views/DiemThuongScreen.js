import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from "react-native";
import React, {useState, useEffect} from "react";
import axios from "axios";
import NFTCard from "./NFTCard";
export default function DiemThuongScreen() {
  const [nfts, setNfts] = useState([]);
  const xKey = "Z0s1HomCTG-Ppn--"; // Thay thế bằng x-api-key của bạn
  const wallID = "9FWUokoE27tEtaxCvcUwQwQdtY5bbzcgqX7miKct1geS"; // Thay thế bằng địa chỉ ví của bạn
  const network = "devnet"; // Sử dụng mạng devnet
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
        const response = await axios.get(nftUrl, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        }); 
        const nftData = response.data.result.map((item) => ({
          id: item.mint,
          name: item.name,
          points: 100, // Giả sử mỗi NFT cần 100 điểm
          imageUri: { uri: item.image_uri },
        }));
        setNfts(nftData);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Unable to fetch NFTs");
      }
    };

    fetchNFTs();
  }, []);

  const renderNFTCard = ({ item }) => (
    <NFTCard
      name={item.name}
      points={item.points}
      imageUri={item.imageUri}
      onPress={() => console.log('NFT pressed', item.id)}
    />
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={require("../assets/Frame_10.png")}
        >
          <Text style={{margin:5,fontSize:16,fontWeight:"bold"}}>Bạn hiện có</Text>
          <View style={{flexDirection:"row"}}>
            <Text style={{margin:5,fontSize:16,fontWeight:"bold"}}>99</Text>   
            <Image style={{width:20,height:20,alignSelf:"center"}}  source={require("../assets/points.png")}/> 
          </View>
            <Text style={{margin:5,fontSize:16,fontWeight:"bold"}}>Điểm thưởng</Text> 
        </ImageBackground>
      </View>

      <FlatList
        data={nfts}
        renderItem={renderNFTCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems:"center",
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
  },
});
