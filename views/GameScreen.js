import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View  ,Button , FlatList,Modal, Image } from 'react-native'
import axios from 'axios';
export default function GameScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:6002/api/quizz/testsByName");
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10, 
    overflow: 'hidden', 
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10, 
  },
  text: {
    textAlign: 'center',
    padding: 5,
  },
})