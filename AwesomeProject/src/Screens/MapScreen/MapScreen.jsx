import React from "react";
import { View, Text, StyleSheet, Dimensions,Pressable,Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";


import arrowLeft from "../../Images/arrow-left.png";


const MapScreen = () => {  
  const navigation = useNavigation();
  const  {params}  = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>Карта</Text>
          <Pressable 
              style={styles.arrowLeft}
              onPress={()=>navigation.navigate("Home")}>
              <Image
                  source={arrowLeft}
                  />
          </Pressable>
      </View> 
      <MapView
        style={styles.mapStyle}
        region={params}
        showsUserLocation={true}
      >
        {params && (
          <Marker title="I am here" coordinate={params} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "90%",
  },
  header: {
    width: 375,
    height: 60,
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingTop: 28,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)"
},
title: {
  // width:97,
  fontFamily: 'Roboto',
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 17,
  lineHeight: 22,
  letterSpacing: -0.408,
  textAlign: "center",
  color: "#212121",
},
arrowLeft: {
  position: "absolute",
  top: 28,
  left: 16,
  width: 24, height: 24,
},
});

export default MapScreen;
