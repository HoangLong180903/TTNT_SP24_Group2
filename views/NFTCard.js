import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const NFTCard = ({ name, points, imageUri, onPress }) => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: 15 }}
      source={imageUri}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.4)",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>{name}</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{points}</Text>
            <Image
              source={require("../assets/point.png")}
              style={styles.pointsIcon}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.redeemButton} onPress={onPress}>
            <Text style={styles.redeemText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    width: 170,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  redeemButton: {
    flexDirection: "row",
    backgroundColor: "#faa701",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,

  },
  redeemText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  redeemIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  points: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    margin: 5,
  },
  image: {
    width: 180,
    height: 180,

    margin: 10,
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NFTCard;