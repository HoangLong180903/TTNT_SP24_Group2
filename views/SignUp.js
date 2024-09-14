import { StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,Alert } from 'react-native'
  import { useNavigation } from '@react-navigation/native';
import { API_SIGNUP } from "../configs/api-config";
import React, { useState } from 'react'

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const dangKyTaiKhoan = async () => {
    try {
      const response = await fetch(`${API_SIGNUP}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username ,email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Alert.alert("Thông báo!", "Đăng ký tài khoản thành công", [
          {
            text: "OK",
          },
        ]);
        setUsername("");
        setEmail("");
        setPassword("");
        // navigation.navigate("Màn Hình Chính");
      } else {
        Alert.alert("Thông báo!", "Đăng ký tài khoản thất bại", [
          {
            text: "OK",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%" }}
        source={require("../assets/frame_11.png")}
      />
      <Text style={{ fontSize: 35, textAlign: "center", marginTop: 10 }}>
        Create Account
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", color: "#969696" }}>
        Create a new account
      </Text>

      <TextInput
        style={{
          width: 360,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#000000",
          borderWidth: 0.5,
          height: 40,
          padding: 10,
          margin: 15,
          alignSelf: "center",
        }}
        placeholder="Username"
        onChangeText={(txt) => {
          setUsername(txt);
        }}
      />
      <TextInput
        style={{
          width: 360,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#000000",
          borderWidth: 0.5,
          height: 40,
          padding: 10,
          margin: 15,
          alignSelf: "center",
        }}
        placeholder="Email"
        onChangeText={(txt) => {
          setEmail(txt);
        }}
      />
      <TextInput
        style={{
          width: 360,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#000000",
          borderWidth: 0.5,
          height: 40,
          padding: 10,
          margin: 15,
          alignSelf: "center",
        }}
        placeholder="Password"
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={{
          width: 360,
          backgroundColor: "#F46535",
          height: 45,
          alignSelf: "center",
          borderRadius: 10,
          justifyContent: "center",
        }}
        onPress={() => {
          dangKyTaiKhoan();
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 22, color: "#FFF" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: 360,
          alignSelf: "center",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "300",
            justifyContent: "center",
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#F46535",
              textAlign: "center",
              marginLeft: 5,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topHeader: {
    width: "100%",
    height: 400,
    backgroundColor: "#F46535",
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
})