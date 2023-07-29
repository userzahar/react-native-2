
import { View, Text, Image,ScrollView,StyleSheet,ImageBackground,Pressable,TouchableWithoutFeedback,Keyboard, }  from "react-native"

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import backgroundImage from "../../Images/Photo-BG.png";
import comment from "../../Images/comment.png";
import like from "../../Images/like.png";
import locationIcon from "../../Images/locationIcon.png";
import defaultAvatar from "../../Images/default.jpg";


const ProfileScreen =  ()=>{
  const navigator = useNavigation();
  const {login,photoURL} = useSelector(state => state.auth);
  const {posts} = useSelector(state=>state.post)
  
    return ( 
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
    <ImageBackground source={backgroundImage} style={styles.ImageBackground}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                 source={photoURL?.length > 0 ? {uri:photoURL} : defaultAvatar}
                style={styles.image} />
              <Pressable style={styles.addImgButton}>
                <Text style={styles.textButtonAddImage} >+</Text>
              </Pressable>
            </View>
            <Text style={styles.title}>{login}</Text>
            <ScrollView vertical>
                {posts.length !== 0 && 
                posts.map((data) => {
                    return (
                    <View key={data.id} style={{marginBottom:32}}>
                        <View style={{marginBottom:8}}>
                            <Image source={{uri:data.image}} style={{marginBottom:8,width:343, height:240}} /> 
                            <Text>{data.title}</Text>     
                        </View>
                        <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between",}}>
                            <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:120}}>
                                    <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Commentary",{data})}>
                                        <Image source={comment} style={{width:24,height:24,marginRight:6,}}/>
                                        <Text>{data.comments}</Text>
                                    </Pressable>
                                    <View style={{display:"flex", flexDirection:"row"}}>
                                        <Image source={like} style={{width:24,height:24,marginRight:6,}}/>
                                        <Text>{data.like}</Text>
                            </View>
                        </View>
                            <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Map", data.coords)}>
                                <Image source={locationIcon} style={{width:24,height:24,marginRight:6,}}/>
                                <Text>{data.locationName}</Text>
                            </Pressable>
                        </View>
                    </View>
                    )
                    }
                )}
            </ScrollView>
        </View>
    </ImageBackground>
  </TouchableWithoutFeedback>  
      )
}

const styles = StyleSheet.create({
    ImageBackground: {
        position: "relative",
        top: 0,
        minWidth: "100%",
        minHeight: "100%",
      },
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
        marginTop:68,
        color: "#212121",
      },
      imageContainer: {
        position: "absolute",
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        top:-60,
      },
      image: {
        width: 120, height: 120,
        borderRadius:8,
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
      
})



export default ProfileScreen;