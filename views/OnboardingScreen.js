import React from "react";
import {View, Text,StyleSheet, FlatList,Animated, TouchableOpacity, Button, Image} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

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
const Done = ({...props})=>(
   <TouchableOpacity
   style={{marginHorizontal:10}}
   {...props}
   >
    <Text style={{fontSize:16}}> Done </Text>

   </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) =>{
    return(
        <Onboarding
            // SkipButtonComponent={Skip}
            // NextButtonComponent ={Next}
            DoneButtonComponent ={Done}
            onSkip={() => navigation.navigate("Màn Hình Đăng Nhập")}
            onDone={() => navigation.navigate("Màn Hình Đăng Nhập")}
        pages={[
            {
                backgroundColor: '#a6e4d0',
                image : <Image source = {require ('../assets/Onbroading-fage1-logup.png')}  />,
                title : 'Connect to the World',
                subtitle: 'A New Way To Connect With The World',
            },
            {
                backgroundColor: '#fdeb93',
                image : <Image source = {require ('../assets/Onbroading-fage2-logup.png')}  />,
                title : 'Share Your Favorites',
                subtitle: 'Share Your Thoughts With Similar Kind Of People',
            },
            {
                backgroundColor: '#a6e4d0',
                image : <Image source = {require ('../assets/Onbroading-fage3-logup.png')}  />,
                title : 'Become The Star',
                subtitle: 'Let The Spot Light Capture You',
            },

        ]}
        
        />

    
    );
};
export default OnboardingScreen;

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    image : {
        flex:0.7,
        justifyContent:'center',
    }
});