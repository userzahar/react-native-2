import { View, Text, Image,TextInput, StyleSheet,TouchableOpacity, Pressable,Platform, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,    } from "react-native";
import React, { useState,useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Geocoder from 'react-native-geocoding';
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";


import arrowLeft from "../../Images/arrow-left.png";
import trashIcon from "../../Images/trashIcon.png";
import cameraBlack from "../../Images/camera-black.png"
import cameraWhite from "../../Images/camera-white.png"
import locationIcon from "../../Images/locationIcon.png"

const CreatePostsScreen = () => {
    const [location, setLocation] = useState(null);
    const [locationName, setLocationName]= useState("");
    const[photoName, setPhotoName]=useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          await MediaLibrary.requestCameraPermissionsAsync();
    
          setHasPermission(status === "granted");
        })();
      }, []);
    
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    Geocoder.init("AIzaSyAkbk-S9ZRmDakrniK5xVAdivngkHiNhkA");
    // AIzaSyAkbk-S9ZRmDakrniK5xVAdivngkHiNhkA
    const locationRequest =()=>{
        {
            (async () => {
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                alert("Перейдіть у налаштування дозволів і налаштуйте доступ до геолокації");
              }
        
              let location = await Location.getCurrentPositionAsync({});
              const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              };

              const locationNameFree  = await Geocoder.from(coords)
            
              setLocation(coords);
              const trimmedAddress = await locationNameFree.results[0].formatted_address.split(" ").slice(2).join(" ");
              setLocationName(trimmedAddress)
            })();
          }
    }
    const reset = ()=>{
        setLocationName('')
        setPhotoName("")
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Створити публікацію</Text>
                <Pressable 
                    style={styles.arrowLeft}
                    onPress={()=>navigation.navigate("Home")}>
                    <Image
                        source={arrowLeft}
                            
                        />
                </Pressable>

            </View>
            {openCamera && 
            <Camera
                style={styles.imageContainer}
                type={type}
                ref={setCameraRef}
            >
                <View style={styles.photoView}>
                <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}
                >
                    <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                    {" "}
                    Flip{" "}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                    if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();
                        await MediaLibrary.createAssetAsync(uri);
                    }
                    }}
                >
                    <View style={styles.takePhotoOut}>
                    <View style={styles.takePhotoInner}></View>
                    </View>
                </TouchableOpacity>
                </View>
            </Camera>}
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.addImageContainer}>
                        <Pressable style={styles.photoCircle}
                            onPress={()=>setOpenCamera(true)}>
                            <Image
                                source={cameraBlack}
                                style={styles.trashIcon}
                            />
                        </Pressable>
                    </View>
                    <Text style={styles.imageText} >Завантажте фото</Text>
                </View>

                <View style={styles.inputContainer}>
                    <KeyboardAvoidingView style={{...styles.containerWidth}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput type="text"
                            onChangeText={setPhotoName}
                            style={styles.input}
                            value={photoName}
                                    // onBlur={() => dispatch({ type: "BLUR", payload: "input1" })}
                                    // onChangeText={(value) => handleChange(value, "input1")}
                                    placeholder="Назва..."
              />
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView  style={styles.containerWidth}
                        behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <Image
                                source={locationIcon}
                                style={styles.locationIcon}
                            />
                        <TextInput type="text"
                            onPressIn={locationRequest}
                            value={locationName}
                            style={{paddingLeft:28,...styles.input}}
                                    // onBlur={() => dispatch({ type: "BLUR", payload: "input1" })}
                                    // value={state.input1.value}
                                    // onChangeText={(value) => handleChange(value, "input1")}
                                    placeholder="Місцевість..."
                        />
                    </KeyboardAvoidingView>
                    <Pressable style={styles.button}
                        // onPress={onLogin}
                    >
                  <Text style={styles.buttonText}>Опубліковати</Text>
                </Pressable>
                </View>
            </View>


            <View style={styles.footer}>
                    <Pressable style={styles.trashButton} onPress={reset}>
                        <Image
                            source={trashIcon}
                            style={styles.trashIcon}
                        />
                    </Pressable>
            </View>
        </View>
    </TouchableWithoutFeedback>    
    )
}




const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    header: {
        minWidth: 375,
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
    trashButton: {
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        width: 70,
        height: 40,
        padding: 0,
        display: "flex",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginLeft: 42,
        marginRight: 42,
    },
    profileContainer: {
        minWidth: 375,
        paddingTop: 32,
    },
    imageContainer: {
        backgroundColor: "#FFF",
        marginRight: 8,
    },
    imageText: {
        fontFamily: "Roboto",
        color:"#BDBDBD",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: "left",        
    },
    image: {
        width: "100%",
        height: 240,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom:1,
        minWidth: 375,
        height: 83,
    },
    trashIcon: {
        width:24, height:24,
    },
    containerWidth:{width:"100%"},
    buttonText: {
            fontFamily: 'Roboto',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 30,
            fontSize: 16,
            lineHeight: 19,
            // color:"#FFFFFF",
            color:"#BDBDBD"
    },
    button: {
        backgroundColor: "#F6F6F6",
        // backgroundColor: "#FF6C00",
        borderRadius: 100,
        width: "100%",
        height: 51,
        padding:0,
        display: "flex",
        marginTop:16,
        flexirection: "column",
        alignItems: "center",
        padding: 16,

    },
    input: {
            padding: 10,
            backgroundColor:"#FFF",
            borderBottomWidth:1,
            marginBottom: 16,
            borderColor: "#E8E8E8",
            width: "100%",
            
    },
    inputContainer: {
        paddingBottom: 32,
        paddingTop:32,
    },
    addImageContainer: {
        position:"relative",
        width:"100%",
        height: 240,
        borderRadius:1,
        backgroundColor: "#E8E8E8",
        marginBottom: 8,
    },
    photoCircle: {
        width: 60,
        height: 60,
        position: "absolute",
        top: 90,
        left:142,
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        borderRadius:100,
        backgroundColor:"#fff",
    },
    locationIcon: {
        position: "absolute",
        top: 13,
        zIndex:1,
        width:24,
    }
});

export default CreatePostsScreen;