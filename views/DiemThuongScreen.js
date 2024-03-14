import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";

export default function DiemThuongScreen() {
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

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
