import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

export default function NFTQuaCuaToi({ name, points, imageUri }) {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 15 }}
      source={imageUri}
      resizeMode="cover"
      style={styles.image}
    >
        <View style={{flex:1,}}>
        </View>
      <Text style={styles.text}>{name}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  image: {
    width: 180,
    height: 180,
    
    margin: 10,
    flexDirection: "column",
  },
 
  ///test
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 7,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(52, 52, 52, 0.4)",

    borderBottomRightRadius: 10,
    borderBottomLeftRadius:10,
  },
});
