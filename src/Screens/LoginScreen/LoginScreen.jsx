
import { useNavigation  } from "@react-navigation/native";
import {useDispatch} from "react-redux"
import {authSignInUser} from "../../redux/auth/authOperations"
import {Platform, KeyboardAvoidingView, View, Text, TextInput,StyleSheet,ImageBackground,Pressable,TouchableWithoutFeedback,Keyboard }  from "react-native"
// import LogoImage from '../../Images/default-user-avatar.png'
import backgroundImage from "../../Images/Photo-BG.png";
import { useState } from "react";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword]=useState('');

  const dispatch = useDispatch();

  const onLogin = () => {
      dispatch(authSignInUser({
        email,
        password
      }))
      reset();
  }

  const reset = ()=>{
    setEmail("");
    setPassword("");
  }


  return (
    <ImageBackground source={backgroundImage} style={styles.ImageBackground}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Увійти</Text>
                    <KeyboardAvoidingView style={styles.containerWidth} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput type="mail"
                                    style={{ borderColor: "#E8E8E8", ...styles.input }}
                                    // onBlur={() => dispatch({ type: "BLUR", payload: "input1" })}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Адреса електронної пошти"
              />
                    </KeyboardAvoidingView>   
                    <View style={styles.containerWidth}>
                        <KeyboardAvoidingView style={styles.containerWidth} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <TextInput  type="password"
                                        style={{ borderColor: "#E8E8E8", ...styles.input }}
                                        // onBlur={() => dispatch({ type: "BLUR", payload: "input2" })}
                                        onChangeText={setPassword}
                                        placeholder="Пароль"
                                        value={password}
                            />
                        </KeyboardAvoidingView>
                        <Text style={{ position: "absolute", right: 16, top: 16, ...styles.textLink}}>Показати</Text>
                    </View>
                <Pressable style={styles.button} onPress={onLogin}>
                  <Text style={styles.buttonText}>Увійти</Text>
                </Pressable>
                <Text style={styles.textLink}>Немає акаунту? <Text 
                style={{textDecorationLine:"underline"}}
                onPress={() => navigation.navigate("Registration")}
                >Зареєструватися</Text></Text>
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
    marginTop:32,
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
    marginTop:43,
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
  textButtonAddImage: {
    color: "#FF6C00",
    fontSize: 25,
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
  containerWidth:{width:"100%"}

});

export default LoginScreen;