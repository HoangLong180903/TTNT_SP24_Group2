import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Image,ImageBackground } from 'react-native';
import axios from 'axios';
import { API_GET_CAPCHA, API_VALIDATE_CAPCHA, API_CREATE_CAPCHA } from '../configs/api-config';
import { useAuth } from '../configs/authContext';

export default function ChangeCapcha({ navigation }) {
    const { user } = useAuth();
    const [userId, setUserId] = useState(null);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isCaptchaCreated, setIsCaptchaCreated] = useState(false);
    const [expiredAt, setExpiredAt] = useState(null);
    const createNewCaptcha = async () => {
        try {
            const response = await axios.post(API_CREATE_CAPCHA, { userId: userId });
            setCaptcha(response.data.captcha);
            setExpiredAt(response.data.expired_at);
            setIsCaptchaCreated(true);
        } catch (error) {
            console.error('Error creating new CAPTCHA:', error);
        }
    };

    const fetchCaptcha = async () => {
        try {
            if (!userId) {
                console.error('User ID is null');
                return;
            }

            const response = await axios.get(`${API_GET_CAPCHA}/${userId}`);
            setCaptcha(response.data.captcha);
            setExpiredAt(Date.now() + response.data.remainingTime);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching CAPTCHA:', error);
            setIsLoading(false);
        }
    };

    const validateCaptcha = async () => {
        try {
            const response = await axios.post(API_VALIDATE_CAPCHA, {
                userId: userId,
                captchaCode: captchaInput,
            });
            console.log('CAPTCHA validation response:', response.data);
            navigation.navigate('ChangePassW');
        } catch (error) {
            console.error('Error validating CAPTCHA:', error);
        }
    };

    useEffect(() => {
        if (user && user._id) {
            setUserId(user._id); 
            if (isCaptchaCreated) {
                fetchCaptcha(); 
            }
        } else {
            // console.error('User ID is null');
        }
    }, [user, isCaptchaCreated]);

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: "bold", margin: 15 }}>
          Verifycation captcha
        </Text>
        <Image
          style={{ width: 250, height: 200, alignSelf: "center" }}
          source={require("../assets/robot.png")}
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
          Requires entering the correct captcha to prove you are not a robot to
          continue.
        </Text>

        {/* log captcha  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 200,
              height: 40,
              borderWidth: 0.5,
              borderColor: "#333",
              borderRadius: 5,
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.captchaText}>{captcha}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              createNewCaptcha();
            }}
          >
            <Image
              style={{ width: 40, height: 40, alignSelf: "center" }}
              source={require("../assets/reload.png")}
            />
          </TouchableOpacity>
        </View>

        {/* enter captcha  */}
        <TextInput
          placeholder="Enter CAPTCHA"
          value={captchaInput}
          onChangeText={setCaptchaInput}
          style={styles.input}
        />
        {/* submit  */}
        <View style={{ flex: 0.5 }}></View>
        <TouchableOpacity style={styles.submitButton} onPress={validateCaptcha}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  captchaContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 45,
    borderColor: "lightgray",
  },
  captchaText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  //     marginTop: 10,
  //     padding: 10,
  //     borderRadius: 5,
  //     alignItems: 'center',

  // },
  // refreshIcon: {
  //     width: 34,
  //     height: 34,
  //     tintColor: 'dodgerblue',
  //     marginLeft: 250,
  // },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: 240,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#50c8ef",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  button: {
    backgroundColor: "#50c8ef",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  imageBackground: {
    width: 300,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 20,
  },
});