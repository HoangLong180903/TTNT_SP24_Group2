import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
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

    // useEffect(() => {
    //     if (expiredAt !== null) {
    //         const timer = setTimeout(() => {
    //             setIsCaptchaCreated(false);
    //             setExpiredAt(null);
    //         }, expiredAt - Date.now());

    //         return () => clearTimeout(timer);
    //     }
    // }, [expiredAt]);

    return (
        <View style={styles.container}>
            

            <Text style={styles.captchaText}>{captcha}</Text>

            {/* {expiredAt && (
                <Text style={styles.expirationText}>
                    Expired At: {new Date(expiredAt).toLocaleTimeString()}
                </Text>
            )} */}

            <TextInput
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChangeText={setCaptchaInput}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={createNewCaptcha}>
                <Text style={styles.buttonText}>New CAPTCHA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={validateCaptcha}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            {isLoading && <ActivityIndicator style={styles.loader} size="large" color="blue" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 20,
        width: '80%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    captchaText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    expirationText: {
        fontSize: 16,
        marginBottom: 10,
    },
    loader: {
        marginTop: 20,
    },
});
