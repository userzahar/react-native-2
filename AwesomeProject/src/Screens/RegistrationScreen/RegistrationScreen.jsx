import { useEffect, useState } from "react";
import { useNavigation, useRoute  } from "@react-navigation/native";
import { authSignUpUser } from "../../redux/auth/authOperations";
import {useDispatch} from "react-redux"
import {  storage } from "../../firebase/config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

import { View, Text, Image,TextInput,StyleSheet,ImageBackground,Pressable,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard, }  from "react-native"

import defaultAvatar from "../../Images/default.jpg";
import backgroundImage from "../../Images/Photo-BG.png";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]=useState('');
  const [newPhoto, setNewPhoto] = useState("");
  const {params} = useRoute();

  // const [onCamera, setOnCamera]=useState(false);
  // const [avatar, setAvatar] = useState('');
  
  const dispatch = useDispatch();

  useEffect(()=>{
    if(params?.avatar){
      ( async ()=>{
      const link = await uploadPhotoToServer()
      setNewPhoto(link)
      })()}
      setNewPhoto("")
    },[params?.avatar])

  const uploadPhotoToServer = async () => {
        const response = await fetch(params?.avatar);
        const file = await response.blob();
        const uniqueId = Date.now().toString();
        const storageRef = ref(storage,`postImage/${uniqueId}`);
        await uploadBytes(storageRef, file);
        const addedPhoto = await getDownloadURL(storageRef);
        return addedPhoto;
  };  


  const onRegister = async () => {

    dispatch(authSignUpUser({
      avatar: newPhoto,
      login,
      email,
      password,
    }))
      reset();
      navigation.navigate("Home")
  }
  const reset = ()=>{
    setLogin("");
    setEmail("");
    setPassword("");
    // setAvatar('https://th.bing.com/th/id/OIF.gcxoLjOpUF5IER9F802lgg?pid=ImgDet&rs=1');
  }


  return  (
    <ImageBackground source={backgroundImage} style={styles.ImageBackground}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image
                       source={newPhoto.length > 0 ? {uri:params?.avatar}:defaultAvatar}
                      style={styles.image} />

                    {newPhoto.length > 0 ? 
                     <Pressable style={styles.changeImgButton}>
                        <Text style={styles.textButtonChangeImage} 
                          onPress={() => setNewPhoto("")}
                          >x</Text>
                      </Pressable> :
                      <Pressable style={styles.addImgButton}>
                        <Text style={styles.textButtonAddImage} 
                        onPress={() => navigation.navigate("CreatePostsScreen")}
                        >+</Text>
                      </Pressable>}

                  </View>
                  
                      <Text style={styles.title}>Реєстрація</Text>
                      <KeyboardAvoidingView style={styles.containerWidth} behavior={Platform.OS == "ios" ? "padding" : "height"}>   
                            <TextInput  type="text" name="login"
                                        style={{ borderColor: "#E8E8E8", ...styles.input }}
                                        // onBlur={() => dispatch({ type: "BLUR", payload: "input1" })}
                                        value={login}
                                        onChangeText={setLogin}
                                        placeholder="Логін"
                            />
                            <TextInput  type="mail" name="email"
                                        style={{ borderColor:"#E8E8E8", ...styles.input }}
                                        // onBlur={() => dispatch({ type: "BLUR", payload: "input2" })}
                                        onChangeText={setEmail}
                                        placeholder="Адреса електронної пошти"
                                        value={email}
                            />
                      </KeyboardAvoidingView>
                      <View style={styles.containerWidth}>
                          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                              <TextInput  type="password" name="password"
                                          style={{ borderColor: "#E8E8E8", ...styles.input }}
                                          // onBlur={() => dispatch({ type: "BLUR", payload: "input3" })}
                                          onChangeText={setPassword}
                                          placeholder="Пароль"
                                          value={password}  
                              />
                          </KeyboardAvoidingView>
                          <Text style={{ position: "absolute", right: 16, top: 16, ...styles.textLink}}>Показати</Text>
                      </View>
                    <Pressable style={styles.button} onPress={onRegister} >
                      <Text style={styles.buttonText}>Зареєстуватися</Text>
                    </Pressable>
                    <Text style={styles.textLink}>Вже є акаунт? <Text 
                    style={{textDecorationLine:"underline"}}
                    onPress={() => navigation.navigate("Login")}
                    >Увійти</Text></Text>
              </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
            )
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingLeft: 16,
    paddingRight:16,
    marginTop:263,
    flex: 1,
    alignItems:"center",
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius:25
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
// letterSpacing: 0.01em,
    marginBottom: 32,
    marginTop:54,
    color: "#212121",
  },
  input: {
    padding: 10,
    backgroundColor:"#F6F6F6",
     borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%"
  },
  button: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        width: "100%",
        height: 51,
        padding:0,
        display: "flex",
        marginTop:27,
        flexirection: "column",
        alignItems: "center",
        padding: 16,
        marginBottom:16,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    fontSize: 16,
    lineHeight: 19,
    color:"#FFFFFF",  
  },
  imageContainer: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top:-60,
  },
  image: {
    width: 120, height: 120,
    borderRadius: 8,
  },
  addImgButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    bottom: 14,
    right:-13,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FF6C00",
  },
  changeImgButton:{
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    bottom: 14,
    right:-13,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#BDBDBD",
  },
  textButtonAddImage: {
    color: "#FF6C00",
    fontSize: 25,
    position: "absolute",
    top:-6,
  },
  textButtonChangeImage: {
    color: "#BDBDBD",
    fontSize: 21,
    position: "absolute",
    top:-6,
  },
  textLink: {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  ImageBackground: {
    position: "relative",
    top: 0,
    minWidth: "100%",
    minHeight: "100%",
  },
  containerWidth: {
    width:"100%",
  },
});

export default RegistrationScreen;