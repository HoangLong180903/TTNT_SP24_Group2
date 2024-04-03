import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";

import { Section } from "../Section";
import { useAuthorization } from "../utils/useAuthorization";
import { AccountDetailFeature } from "../components/account/account-detail-feature";
import { SignInFeature } from "../components/sign-in/sign-in-feature";
import { TopBar } from "../components/top-bar/top-bar-feature";

export function HomeScreen() {
  const { selectedAccount } = useAuthorization();

  return (
    <View style={styles.screenContainer}>
      <TopBar/>
      <Text
        style={{ fontWeight: "bold", fontSize:25 }}
        variant="displaySmall"
      >
        Solana Wallet Mobile
      </Text>
      <Text
        style={{ fontWeight: "600", fontSize:14 , color:"#9F9F9F"}}
        variant="displaySmall"
      >
        All purpose. Non-custodial. Safe.
      </Text>
      {selectedAccount ? (
        <AccountDetailFeature />
      ) : (
        <>
          <Image
            style={{width:"100%",height:"50%",alignSelf:"center"}}
            source={require('../assets/4229368.webp')}  
            resizeMode="cover" 
          />
          <View style={{justifyContent:"flex-end"}}>
            <SignInFeature/>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    flex: 1,
    backgroundColor:"#FFF"
  },
  buttonGroup: {
    flexDirection: "column",
    paddingVertical: 4,
  },
});



