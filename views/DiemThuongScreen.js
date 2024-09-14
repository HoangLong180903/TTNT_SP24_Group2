import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Alert, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import axios from "axios";
import NFTCard from "./NFTCard";
import { useAuth } from "../configs/authContext"; 
import { API_LIST_QUIZZ, API_TOTAL_COIN_BY_UID, API_RANK_LIST, API_REQUEST_ADDRESS_SOL_TO_SERVER , API_TRANFERS } from "../configs/api-config"; 
import { useNavigation } from '@react-navigation/native';
import * as solanaWeb3 from "@solana/web3.js";
export default function DiemThuongScreen() {
  const [nfts, setNfts] = useState([]);
  const [data, setData] = useState([]);
  const [totalCoin, setTotalCoin] = useState(); 
  const { user } = useAuth();
  const [idAddresNFT,setId] = useState();
  const navigation = useNavigation();
  // const xKey = "Z0s1HomCTG-Ppn--"; // Thay thế bằng x-api-key của bạn
  // const wallID = "9FWUokoE27tEtaxCvcUwQwQdtY5bbzcgqX7miKct1geS"; // Thay thế bằng địa chỉ ví của bạn
  // const network = "devnet"; // Sử dụng mạng devnet
  const xKey = "Z0s1HomCTG-Ppn--";
  const wallID = "9FWUokoE27tEtaxCvcUwQwQdtY5bbzcgqX7miKct1geS";
  const network = "devnet";
  const toTransaction = (encodedTransaction) =>
    solanaWeb3.Transaction.from(
      Uint8Array.from(atob(encodedTransaction), (c) => c.charCodeAt(0))
    );
  useEffect(() => {
    fetchNFTs();
    getCoin();

    const unsubscribe = navigation.addListener('focus', () => {
    fetchNFTs();
    getCoin();
    });
  
    return unsubscribe;
  }, [navigation, user]); 
  
  const getCoin = async () => {
    try {
      if (user && user._id) {
        const response = await axios.get(`${API_TOTAL_COIN_BY_UID}/${user._id}`);
        setTotalCoin(response.data.totalScore);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchNFTs = async () => {
      try {
        const nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
        const response = await axios.get(nftUrl, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        }); 
        const nftData = response.data.result.map((item) => ({
          id: item.mint,
          name: item.name,
          points: 200, // Giả sử mỗi NFT cần 100 điểm
          imageUri: { uri: item.image_uri },
        }));
        setNfts(nftData);
        console.log("list danh sach nft",nftData);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Unable to fetch NFTs");
      }
    };

  const tranferDoiThuong = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", xKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      network: "devnet",
      token_address: "74GK3ELRXSwzXpEfQHKcMdxtuMc1maN7DJD4sTR3dH8k", //lấy từ token address của NFTs
      from_address: "9FWUokoE27tEtaxCvcUwQwQdtY5bbzcgqX7miKct1geS", //lấy từ address Admin
      to_address: "F8zYJEbLJ3n6rKjHrno5tSG6Uvz3cf1fzpP5uBNU7zhg", //lấy từ address ví người dùng
      transfer_authority: true,
      fee_payer: "9FWUokoE27tEtaxCvcUwQwQdtY5bbzcgqX7miKct1geS", //lấy từ address Admin
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const res = await fetch(
          "https://api.shyft.to/sol/v1/nft/transfer_detach",
          requestOptions
        );
        // const result = await response.text();
        // console.log("success", result);
        if (res.data.success === true) {
          const transactions = res.data.result.encoded_transactions;
          const ret_result = await signAndConfirmTransactions(
            network,
            transactions,
            callback
          );
          console.log("loi ret result", ret_result);
        }
        return result;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
  };
  // const tangQua = async (idAddress) => {
  //   axios({
  //     // Endpoint to mint NFTs
  //     url: "https://api.shyft.to/sol/v1/nft/mint_detach",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": xKey,
  //     },
  //     data: {
  //       network: network, //mạng
  //       wallet: wallID, //địa chỉ người gửi
  //       master_nft_address: idAddress, //địa chỉ token address nfts
  //       receiver: user.solanaAddress, //người nhận
  //       transfer_authority: true,
  //     },
  //   })
  //     // Handle the response from backend here
  //     .then(async (res) => {
        
  //       if (res.data.success === true) {
  //         const transaction = res.data.result.encoded_transaction;
  //         console.log("log transaction",transaction);
  //         const ret_result = await signAndConfirmTransactions(
  //           network,
  //           transaction,
  //           callback
  //         );
  //       } else {
  //         console.log("Some Error Occurred");
  //       }
  //     })
  //     // Catch errors if any
  //     .catch((err) => {
  //       console.warn(err);
  //       setMssg("Failed! Some error occurred");
  //     });
  // }

  //
  const startListing = (idAddress) => {
    axios({
      url: "https://api.shyft.to/sol/v1/nft/transfer_detach",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      data: {
        network: network,
        token_addresses: idAddress,
        from_address: wallID,
        to_address: user.solanaAddress,
      },
    })
      // Handle the response from backend here
      .then(async (res) => {
        console.log(res.data);
        if (res.data.success === true) {
          const transactions = res.data.result.encoded_transactions;
          const ret_result = await signAndConfirmTransactions(
            network,
            transactions,
            callback
          );
          console.log("loi ret result",ret_result);
        }
      })
      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };

  // const rpcUrl = clusterApiUrl(network); //network here maybe devnet, testnet or mainnet-beta
  // const connection = new Connection(rpcUrl, "confirmed");
  // const confirmTransactionFromFrontend = async (
  //   connection,
  //   encodedTransaction,
  //   wallet
  // ) => {
  //   try {
  //     // Gửi yêu cầu xác nhận giao dịch đến backend hoặc một dịch vụ blockchain
  //     const response = await axios.post(
  //       "https://api.shyft.to/sol/v1/nft/mint_detach",
  //       {
  //         encodedTransaction,
  //         wallet,
  //       }
  //     );

  //     // Xử lý kết quả từ việc xác nhận giao dịch
  //     if (response.data.success) {
  //       console.log("Transaction confirmed successfully!");
  //       // Hiển thị thông báo hoặc thực hiện hành động phù hợp
  //     } else {
  //       console.error("Transaction confirmation failed:", response.data.error);
  //       // Xử lý lỗi, hiển thị thông báo hoặc thực hiện hành động phù hợp
  //     }
  //   } catch (error) {
  //     console.error("Error confirming transaction:", error);
  //     // Xử lý lỗi, hiển thị thông báo hoặc thực hiện hành động phù hợp
  //   }
  // };



  const renderNFTCard = ({ item }) => (
    <NFTCard
      name={item.name}
      points={item.points}
      imageUri={item.imageUri}
      onPress={() => {
        if(totalCoin < item.points){
            Alert.alert("Thông báo!", "Không đủ điểm", [
          {
            text: "OK",
          },
        ]);
        }else{
         tranferDoiThuong1(item.id);
        // tangQua();
        // setId(item.id);
        // console.log("id address ", item.id + "\t" + user.solanaAddress);
        // tangQua(item.id);
        // startListing(item.id);
        }
      }}
    />
  );

  const sentNFTIds = {};

  const tranferDoiThuong1 = async (nftId) => {
    try {
      if (!nftId) {
        Alert.alert("Thông báo!", "Vui lòng chọn một NFT để đổi");
        return;
      }

      // Kiểm tra xem nftId đã được gửi trước đó hay chưa
      if (sentNFTIds[nftId]) {
        Alert.alert("Thông báo!", "Yêu cầu đổi NFT này đã được gửi trước đó");
        return;
      }

      // Đánh dấu nftId đã được gửi
      sentNFTIds[nftId] = true;

      // Tiếp tục xử lý gửi yêu cầu
      const userId = user._id;
      // Thời gian gửi yêu cầu nft
      const requestTime = new Date().toISOString();

      const response = await axios.post(API_TRANFERS, {
        userId: userId,
        nftId: nftId,
        requestTime: requestTime,
      });

      if (nftId) {
        Alert.alert("Thông báo!", "Đã gửi yêu cầu lên server");
        return;
      }

      Alert.alert("Thông báo!", "Yêu cầu đổi NFT đã được gửi thành công");
    } catch (error) {
      console.error("Lỗi khi đổi NFT:", error);
      Alert.alert("Lỗi", "Không thể đổi NFT");
    }
  };

  //  const tranferDoiThuong1 = async (nftId) => {
  //    try {
  //      if (!nftId) {
  //        Alert.alert("Thông báo!", "Vui lòng chọn một NFT để đổi");
  //        return;
  //      }

  //      const userId = user._id;
  //      // time req nft
  //      const requestTime = new Date().toISOString();

  //      const response = await axios.post(API_TRANFERS, {
  //        userId: userId,
  //        nftId: nftId,
  //        requestTime: requestTime,
  //      });

  //      if(nftId){
  //       Alert.alert("Thông báo!", "Đã gửi yêu cầu lên server");
  //       return;
  //      }

  //      Alert.alert("Thông báo!", "Yêu cầu đổi NFT đã được gửi thành công");
  //    } catch (error) {
  //      console.error("Error exchanging NFT:", error);
  //      Alert.alert("Error", "Unable to exchange NFT");
  //    }
  //  };   

  
  return (
    <View style={styles.container}>
      <View style={[styles.cardView, { borderRadius: 20 }]}>
        <ImageBackground
          style={[styles.imgBackground, { borderRadius: 50 }]}
          resizeMode="stretch"
          source={require("../assets/Frame_10.png")}
        >
          <Text
            style={{
              margin: 5,
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFF",
              justifyContent: "flex-start",
            }}
          >
            You currently have
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 5,
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "#FFF",
              }}
            >
              {totalCoin}{" "}
            </Text>
            <Image
              style={{ width: 20, height: 20, alignSelf: "center" }}
              source={require("../assets/points.png")}
            />
          </View>
          <Text
            style={{
              margin: 5,
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFF",
            }}
          >
            Points
          </Text>
        </ImageBackground>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("QuaCuaToi");
        }}
        style={{
          flexDirection: "row",
          backgroundColor: "#11758A",
          width: "100%",
          height: 60,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#11758A",
            width: "100%",
            height: 60,
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: 50, height: 50, alignSelf: "center", margin: 10 }}
            source={require("../assets/gift.png")}
          />
          <Text
            style={{
              alignSelf: "center",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            My gift
          </Text>
        </View>
      </TouchableOpacity>

      
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          alignSelf: "flex-start",
          margin: 10,
        }}
      >
        Exchange gifts
      </Text>
      <FlatList
        data={nfts}
        renderItem={renderNFTCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems:"center",
  },

  cardView: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    padding: 5,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    // flex:1,
  },
});
