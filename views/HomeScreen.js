import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.2:6002/api/quizz/testsByName"
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.textTitle}>{item.name}</Text>
      <Text style={styles.textQuestion}>{item.questions.length} câu hỏi</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* top header  */}
      <View
        style={{
          margin: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 30, fontWeight: "400" }}>Hi, User</Text>
          <Text style={{ fontSize: 15, color: "#9F9F9F" }}>
            Let's make this day productive
          </Text>
        </View>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={require("../assets/icon_user.jpg")}
        />
      </View>

      {/* rank - points */}
      <View
        // style={{
        //   margin: 20,
        //   borderWidth: 1,
        //   borderColor: "#EEEEEE",
        //   height: 70,
        //   shadowColor: "#000",
        //   borderRadius: 20,
        //   justifyContent:"space-around",
        //   flexDirection:"row"
        // }}
        style={styles.cardView}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={require("../assets/cup.png")}
          />
          <View style={{ flexDirection: "column", alignSelf: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Xếp hạng</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#0CA9A9",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              4953
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={require("../assets/points.png")}
          />
          <View style={{ flexDirection: "column", alignSelf: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Điểm thưởng</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#0CA9A9",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              999
            </Text>
          </View>
        </View>
      </View>

      {/* flat list  */}
      <Text
        style={{ fontSize: 25, fontWeight: "bold", margin: 20, fontFamily: "" }}
      >
        Let's play
      </Text>
      <FlatList
        data={data}
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

  cardView: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth:0.5,
    borderColor:"#BDBDBD",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  textTitle: {
    textAlign: "left",
    fontSize: 22,
    marginLeft: 10,
    marginBottom:5,
    marginTop:10
  },
  textQuestion: {
    textAlign: "left",
    fontSize: 15,
    marginLeft: 10,
    marginBottom:10,
    color: "#9F9F9F",
  },
});