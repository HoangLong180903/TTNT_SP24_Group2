import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';
import { useAuth } from '../configs/authContext'; 
import { API_VERIFY_PASSWORD, API_CHANGE_EMAIL } from '../configs/api-config';
import { useNavigation } from '@react-navigation/native';

const ChangeEmail = () => {
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [passwordVerified, setPasswordVerified] = useState(false);
    const { user } = useAuth();
    const navigation = useNavigation();

    const handleVerifyPassword = async () => {
        try {
            if (!password) {
                Alert.alert('Error', 'Please enter your password');
                return;
            }
    
            const verifyResponse = await axios.post(API_VERIFY_PASSWORD, {
                userId: user._id,
                password: password
            });
    
            if (verifyResponse.status === 200 && verifyResponse.data.success) {
                Alert.alert('Success', 'Password verified successfully');
                setPasswordVerified(true);
            } else {
                Alert.alert('Error', 'Incorrect password');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Internal Server Error');
        }
    };


    const handleChangeEmail = async () => {
        try {
            if (!user || !user._id) {
                Alert.alert('Error', 'User ID is missing');
                return;
            }
    
            if (!passwordVerified) {
                Alert.alert('Error', 'Please verify your password first');
                return;
            }
    
            if (!passwordVerified) {
                Alert.alert('Error', 'Please verify your password first');
                return;
            }
    
            const changeEmailResponse = await axios.post(API_CHANGE_EMAIL, {
                userId: user._id,
                newEmail: newEmail
            });
    
            if (changeEmailResponse.status === 200 && changeEmailResponse.data.success) {
                Alert.alert('Success', changeEmailResponse.data.message);
                setPassword('');
                setNewEmail('');
                setPasswordVerified(false);
            } else {
                Alert.alert('Change to Email Succesfully!');
            }
            navigation.navigate('Màn Hình Chính');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Internal Server Error');
        }
    };
    
    

    return (
      <View style={styles.container}>
        {!passwordVerified && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 15 }}>
              Verification your password
            </Text>
            <Image
              style={{ width: 250, height: 200, alignSelf: "center" }}
              source={require("../assets/verifypassword.png")}
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
              We need to check your password to verify it is correct to
              continue.
            </Text>

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder="Enter Password"
            />
            <View style={{ flex: 0.5 }}></View>
            <TouchableOpacity
              onPress={handleVerifyPassword}
              style={{
                width: 250,
                backgroundColor: "#ffce01",
                alignItems: "center",
                padding: 10,
                elevation: 3,
                borderRadius: 15,
                margin: 15,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Verify Password</Text>
            </TouchableOpacity>
          </>
        )}
        {passwordVerified && (
          <>
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 15 }}>
              Change your email
            </Text>
            <Image
              style={{ width: 250, height: 200, alignSelf: "center" }}
              source={require("../assets/changeemail.png")}
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
              Please enter your email address change to a new email address.
            </Text>

            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter New Email"
            />
            <View style={{ flex: 0.5 }}></View>
            <TouchableOpacity
              onPress={handleChangeEmail}
              style={{
                width: 250,
                backgroundColor: "#ffce01",
                alignItems: "center",
                padding: 10,
                elevation: 3,
                borderRadius: 15,
                margin: 15,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
            
          </>
        )}
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor:"#FFF"
    },
    label: {
        marginBottom: 5,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 20,
        
    },
});

export default ChangeEmail;
