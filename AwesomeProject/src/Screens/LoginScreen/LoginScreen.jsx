import { useReducer } from "react";
import { useNavigation  } from "@react-navigation/native";
import { reducer } from "../RegistrationScreen/reducer";
import { initialState } from "./initialState";
import {Platform, KeyboardAvoidingView, View, Text, TextInput,StyleSheet,ImageBackground,Pressable,TouchableWithoutFeedback,Keyboard }  from "react-native"
// import LogoImage from '../../Images/default-user-avatar.png'
import backgroundImage from "../../Images/Photo-BG.png";

const LoginScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigation = useNavigation();


  const handleChange = (value, index) => {
    dispatch({
      type: "CHANGE",
      payload: { index, value },
    });
  };

  const onLogin = () => {
    console.log({
      email: state.input1.value,
      password:state.input2.value,
    })
    if (state.input1.value.length > 4) {
      dispatch({ type: "UNBLUR", payload: "input1" })
    }
    if (state.input2.value.length > 4) {
      dispatch({ type: "UNBLUR", payload: "input2" })
    };
    navigation.navigate("Home")
  }


  return (
    <ImageBackground source={backgroundImage} style={styles.ImageBackground}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Увійти</Text>
                    <KeyboardAvoidingView style={styles.containerWidth} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput type="mail"
                                    style={{ borderColor: state.input1.borderColor, ...styles.input }}
                                    onBlur={() => dispatch({ type: "BLUR", payload: "input1" })}
                                    value={state.input1.value}
                                    onChangeText={(value) => handleChange(value, "input1")}
                                    placeholder="Адреса електронної пошти"
              />
                    </KeyboardAvoidingView>   
                    <View style={styles.containerWidth}>
                        <KeyboardAvoidingView style={styles.containerWidth} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <TextInput  type="password"
                                        style={{ borderColor: state.input2.borderColor, ...styles.input }}
                                        onBlur={() => dispatch({ type: "BLUR", payload: "input2" })}
                                        onChangeText={(value) => handleChange(value, "input2")}
                                        placeholder="Пароль"
                                        value={state.input2.value}
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