import { View, Text, Image,TextInput, StyleSheet,TouchableOpacity, Pressable,Platform, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,   } from "react-native";
import React, { useState,useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { db, storage } from "../../firebase/config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";

import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";


import arrowLeft from "../../Images/arrow-left.png";
import trashIcon from "../../Images/trashIcon.png";
import cameraBlack from "../../Images/camera-black.png"
import cameraWhite from "../../Images/camera-white.png"
import locationIcon from "../../Images/locationIcon.png"
import { useDispatch } from "react-redux";
import { createPostToFirestore } from "../../redux/posts/postsOperation";


const CreatePostsScreen = () => {
    const [locationName, setLocationName]= useState("");
    const[photoName, setPhotoName]=useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [photo,setPhoto] =useState('');

    const [cameraRef, setCameraRef] = useState(null);

    const navigation = useNavigation()
    const dispatch = useDispatch();

    const takePhoto = async ()=>{
        const  {uri}  = await cameraRef.takePictureAsync();
        setPhoto(uri)
    }

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          await MediaLibrary.requestPermissionsAsync();
          setHasPermission(status === "granted");
        })();

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              alert("Перейдіть у налаштування дозволів і налаштуйте доступ до геолокації");
            }
          })();
    }, []);      
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob();
        const uniqueId = Date.now().toString();
        const storageRef = ref(storage,`postImage/${uniqueId}`);
        await uploadBytes(storageRef, file);
        const addedPhoto = await getDownloadURL(storageRef);
        return addedPhoto;
    };
    
    // const writePostToFirestore = async (post) => {
    //     try {
    //         // console.log("пост який надсилаєм:",post)
    //       const docRef = await addDoc(collection(db, 'posts'), post);
    //       console.log('Document written with ID: ', docRef.id);
    //     } catch (e) {
    //       console.error('Error adding document: ', e);
    //         throw e;
    //     }
    // };

    const onPublication= async ()=>{

        let locate = await Location.getCurrentPositionAsync({});

        const coords = {
          latitude: locate.coords.latitude,
          longitude: locate.coords.longitude,
        };

        const newPhoto = await uploadPhotoToServer();
        const postId = Date.now().toString();
        const createPost = await {
            image: newPhoto,
            title:photoName,
            like:"0",
            comments:"0",
            id: postId,
            coords,
            locationName:locationName,
        }
        console.log("createPost",createPost)
        // writePostToFirestore(createPost);
        dispatch(createPostToFirestore(createPost))

        reset();
        navigation.navigate("Home", createPost)
    }


    const reset = ()=>{
        setPhotoName("")
        setLocationName('')
        setPhoto('')
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
                {photo.length === 0 && <Camera
                            style={{width:"100%",zIndex:1}}
                            type={Camera.Constants.Type.back}
                            ref={setCameraRef}
                        >
                            <View style={styles.cameraButtonContainer}>
                                <TouchableOpacity
                                style={{...styles.photoCircle,}}
                                    onPress={takePhoto}
                                >
                                    <Image
                                                source={cameraBlack}
                                                style={styles.trashIcon}
                                            />
                                </TouchableOpacity>
                            </View>
                        </Camera>}    
            
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    
            <View style={styles.addImageContainer}> 
                        {photo.length > 0 && <View style={styles.takePhoto}>
                                <TouchableOpacity
                                    style={{...styles.photoCircle, position:"absolute",zIndex:2,top:90,left:153.5}}
                                    onPress={()=>{
                                        setPhoto('')
                                    }}
                                >
                                <Image
                                                source={cameraWhite}
                                                style={styles.trashIcon}
                                            />
                                </TouchableOpacity>
                            <Image style={{width:"100%",height:"100%"}} source={{uri:photo}}/>
                        </View>}
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
                            value={locationName}
                            onChangeText={setLocationName}
                            style={{paddingLeft:28,...styles.input, color:"#212121"}}
                                    placeholder="Місцевість..."
                        />
                    </KeyboardAvoidingView>
                    <Pressable style={(locationName.length === 0 || photoName.length === 0) ? styles.buttonDisabled : styles.button}
                        onPress={()=>onPublication()}
                        disabled={(locationName.length === 0 || photoName.length === 0)}
                    >
                        <Text style={(locationName.length === 0 || photoName.length === 0) ?styles.buttonDisabledText :styles.buttonText}>Опубліковати</Text>
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
            color:"#FFFFFF",
            // color:"#BDBDBD"
    },
    buttonDisabledText:{
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 30,
        fontSize: 16,
        lineHeight: 19,
        color:"#BDBDBD"
    },
    button: {
        // backgroundColor: "#F6F6F6",
        backgroundColor: "#FF6C00",
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
    buttonDisabled:{
          backgroundColor: "#F6F6F6",
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
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        borderRadius:100,
        backgroundColor:"rgba(255, 255, 255, 0.3)",
    },
    locationIcon: {
        position: "absolute",
        top: 13,
        zIndex:1,
        width:24,
    },
    cameraButtonContainer:{
        display:'flex',alignItems:"center",justifyContent:"center", height:"100%",
    },
    takePhoto:{
        position:"absolute",
        width:"100%",
        height:"100%",
        top:1,
        zIndex:2,
    }
});

export default CreatePostsScreen;