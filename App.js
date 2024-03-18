import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import thư viện navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./configs/authContext";
import { QuizHistoryProvider } from "./configs/QuizHistoryContext";
const Stack = createNativeStackNavigator();
import ManHinhDangNhap from "./views/SignIn";
import ManHinhDangKy from "./views/SignUp";
import ManHinhHome from "./views/MainContainer";
import GameDetail from "./views/GameDetail";
import StartQuizz from "./views/StartQuizz";
import ResultQuizz from "./views/ResultQuizz";
import HomeScreen from "./views/HomeScreen";
import QuizScreen from "./views/QuizScreen";
import RankScreen from "./views/RankScreen";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <QuizHistoryProvider>
          <Stack.Navigator initialRouteName='Màn Hình Đăng Nhập' screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name='Màn Hình Đăng Nhập' component=
              {ManHinhDangNhap} />
            <Stack.Screen name='Màn Hình Đăng Ký' component={ManHinhDangKy} />
            <Stack.Screen name='Màn Hình Chính' component={ManHinhHome} />
            <Stack.Screen name="GameDetail" component={GameDetail} />
            <Stack.Screen name="StartQuizz" component={StartQuizz} />
            <Stack.Screen name="ResultQuizz" component={ResultQuizz} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
            <Stack.Screen name="RankScreen" component={RankScreen} />



          </Stack.Navigator>
        </QuizHistoryProvider>
      </AuthProvider>
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
