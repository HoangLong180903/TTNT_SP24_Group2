import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { API_CHANGE_PASSWORD } from '../configs/api-config';
import { useAuth } from '../configs/authContext';
import { useNavigation } from '@react-navigation/native';

const ChangePassW = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirm password do not match');
        return;
      }

      const response = await fetch(API_CHANGE_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user ? user._id : null,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setErrorMessage('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        Alert.alert(
          'Success',
          'Your password has been changed successfully.',
          [
            {
              text: 'Logout',
              onPress: () => {
                // logout(); // Đăng xuất người dùng
                navigateToLogin(); // Chuyển hướng đến màn hình đăng nhậpư
              
              },
            },
            {
              text: 'OK',
              onPress: () => navigateToHome(),
            },
          ]
        );
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while changing password');
    }
  };

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Màn Hình Chính' }],
    });
  };

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Màn Hình Đăng Nhập' }],
    });
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: () => {} }]);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "bold", margin: 15 }}>
        Create new password
      </Text>
      <Image
        style={{ width: 250, height: 200, alignSelf: "center" }}
        source={require("../assets/changepassword.jpg")}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          margin: 15,
          textAlign: "center",
          color: "#696969",
        }}
      >
        Your New Password Must Be Differnt from Previously Used Password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={{flex:0.5}}></View>
      <TouchableOpacity
        onPress={handleChangePassword}
        style={{ width: 250, backgroundColor: "#ffce01",alignItems:"center",padding:10,elevation:3,borderRadius:15 ,margin:15,}}
      >
        <Text style={{fontWeight:"bold"}}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#FFF"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default ChangePassW;