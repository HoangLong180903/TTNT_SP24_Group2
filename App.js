import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import thư viện navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
import ManHinhDangNhap from "./views/SignIn";
import ManHinhDangKy from "./views/SignUp";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Màn Hình Đăng Nhập' screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name='Màn Hình Đăng Nhập' component=
        {ManHinhDangNhap}/>
        <Stack.Screen name='Màn Hình Đăng Ký' component={ManHinhDangKy}/>
      </Stack.Navigator>
    </NavigationContainer>
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
