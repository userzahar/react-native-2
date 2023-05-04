import { useState } from "react";
import { View, Text, Image,TextInput,StyleSheet,Button,Pressable }  from "react-native"
// import LogoImage from '../../Images/default-user-avatar.png'

const LoginScreen = () => {
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
   return <View style={styles.container}>
       <Text style={styles.title}>Вход</Text>
     <TextInput type="mail" style={{ borderColor: isActive2?  "#FF6C00" :"#E8E8E8" , ...styles.input}} onFocus={()=>setActive2(true)} />
     <View style={{ width:"100%"}}>
       <TextInput type="password" style={{ borderColor: isActive3?  "#FF6C00" :"#E8E8E8" , ...styles.input}} onFocus={()=>setActive3(true)} />
       <Text style={{ position: "absolute", right: 16, top: 16, ...styles.textLink}}>Показать</Text>
     </View>
       <Pressable style={styles.button}>
         <Text style={styles.buttonText}>Войти</Text>
       </Pressable>
       <Text style={styles.textLink}>Нет аккаунта? Зарегистрироваться</Text>
     </View>
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
  }

});

export default LoginScreen;