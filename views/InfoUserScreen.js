import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Color, Border, FontSize } from "../configs/GlobalStyles";
import { useAuth } from "../configs/authContext";

const InfoScreen = () => {
  const { user, logout } = useAuth(); 
  
  return (
    <View style={styles.InfoScreen}>
      <View style={[styles.accountInformationParent, styles.parentShadowBox]}>
        <Text style={[styles.accountInformation, styles.settingTypo]}>
          account information
        </Text>
        <Image
          style={[styles.arrowForwardIosIcon, styles.arrowIconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-forward-ios.png")}
        />
        <Image
          style={[styles.arrowForwardIosIcon1, styles.arrowIconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-forward-ios.png")}
        />
        <Image
          style={[styles.arrowForwardIosIcon2, styles.arrowIconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-forward-ios.png")}
        />
        <Text style={[styles.passwordAndSecurity, styles.helpTypo]}>
          Password and Security
        </Text>
        <Text style={[styles.doUser, styles.helpTypo]}>Do User</Text>
        <Text style={[styles.persionalPassword, styles.changeYourETypo]}>
          persional password
        </Text>
        <Text style={[styles.email, styles.helpTypo]}>Email</Text>
        <Text style={[styles.changeYourE, styles.changeYourETypo]}>
          change your e - mail
        </Text>
        <Image
          style={[styles.accountCircleIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/account-circle.png")}
        />
        <Image
          style={[styles.lockIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/lock.png")}
        />
        <Image
          style={[styles.draftsIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/drafts.png")}
        />
      </View>
      <View style={[styles.arrowForwardIosParent, styles.parentShadowBox]}>
        <Image
          style={[styles.arrowForwardIosIcon, styles.arrowIconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-forward-ios.png")}
        />
        <Image
          style={[styles.arrowForwardIosIcon1, styles.arrowIconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-forward-ios.png")}
        />
        <Image
          style={[styles.arrowForwardIosIcon2, styles.arrowIconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-forward-ios.png")}
        />
        <Text style={[styles.help, styles.helpTypo]}>Help</Text>
        <Text style={[styles.changeLanguage, styles.helpTypo]}>
          Change Language
        </Text>
        <Text style={[styles.setting, styles.settingTypo]}>Setting</Text>
        <Text style={[styles.logout, styles.helpTypo]}>Logout</Text>
        <Image
          style={[styles.accountCircleIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/language.png")}
        />
        <Image
          style={[styles.lockIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/help.png")}
        />
        <Image
          style={[styles.logoutIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/logout.png")}
        />
      </View>
      {user && user.avatar && (
          <Image
            style={styles.image8Icon}
            contentFit="cover"
            source={{ uri: user.avatar }}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentShadowBox: {
    height: 246,
    width: 395,
    borderWidth: 0.5,
    borderColor: Color.colorSilver,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_xl,
    marginLeft: -197,
    left: "50%",
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  settingTypo: {
    textAlign: "left",
    position: "absolute",
  },
  arrowIconLayout: {
    height: 24,
    width: 24,
    left: 352,
    position: "absolute",
  },
  helpTypo: {
    left: 65,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  changeYourETypo: {
    color: Color.colorGray_100,
    left: 65,
    textAlign: "left",
    position: "absolute",
  },
  iconLayout: {
    height: 35,
    width: 35,
    left: 18,
    position: "absolute",
  },
  thngTinC: {
    marginTop: -15,
    top: "50%",
    left: 24,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  InfoScreenWrapper: {
    top: 43,
    left: 0,
    width: 444,
    height: 64,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  accountInformation: {
    top: 85,
    color: "#777",
    fontSize: FontSize.size_xs,
    left: 65
    },
  arrowForwardIosIcon: {
    top: 66,
  },
  arrowForwardIosIcon1: {
    top: 117,
  },
  arrowForwardIosIcon2: {
    top: 172,
  },
  passwordAndSecurity: {
    top: 110,
  },
  doUser: {
    top: 59,
  },
  persionalPassword: {
    top: 136,
  },
  email: {
    top: 161,
  },
  changeYourE: {
    top: 187,
  },
  accountCircleIcon: {
    top: 66,
  },
  lockIcon: {
    top: 117,
  },
  draftsIcon: {
    top: 169,
  },
  accountInformationParent: {
    top: 166,
  },
  help: {
    top: 122,
  },
  changeLanguage: {
    top: 71,
  },
  setting: {
    top: 16,
    left: 21,
    fontSize: 30,
    color: Color.colorBlack,
  },
  logout: {
    top: 171,
  },
  logoutIcon: {
    top: 168,
  },
  arrowForwardIosParent: {
    top: 441,
  },
  image8Icon: {
    marginLeft: -50,
    top: 116,
    borderRadius: 70,
    width: 100,
    height: 100,
    left: "50%",
    position: "absolute",
  },
  InfoScreen: {
    borderRadius: 40,
    flex: 1,
    width: "100%",
    height: 979,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
    marginTop:-90
  },
});

export default InfoScreen;
