import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import QuizScreen from "./QuizScreen"
import DiemThuongScreen from "./DiemThuongScreen";
import InfoUserScreen from "./InfoUserScreen";
const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History Take Quiz" 
        component={QuizScreen} 
        options={{
          tabBarLabel: 'History', 
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Rank & Điểm Thưởng"
        component={DiemThuongScreen}
        options={{
          tabBarLabel: 'Rank Coin',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet-giftcard" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông Tin Cá Nhân"
        component={InfoUserScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
