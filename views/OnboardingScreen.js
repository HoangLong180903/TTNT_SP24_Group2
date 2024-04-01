import React from "react";
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, Button, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Done = ({...props}) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}> Done </Text>
  </TouchableOpacity>
);
// const Skip = ({...props})=>(
//     <Button
//     title="Skip"
//     {...props}

//     />
// );
// const Next = ({...props})=>(
//     <Button
//     title="Next"
//     {...props}
//     />
// );

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
    // SkipButtonComponent={Skip}
  // NextButtonComponent ={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.navigate("Màn Hình Đăng Nhập")}
      onDone={() => navigation.navigate("Màn Hình Đăng Nhập")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/Onbroading1.png')} style={styles.image} />,
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/Onbroading2.png')} style={styles.image} />,
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind Of People',
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/Onbroading3.png')} style={styles.image} />,
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex:0.7,
        alignItems:'center',
        justifyContent:'center',
    },
});
