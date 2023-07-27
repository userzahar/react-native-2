
import { View, Text, Image,ScrollView,StyleSheet,ImageBackground,Pressable,TouchableWithoutFeedback,Keyboard, }  from "react-native"
// import LogoImage from '../../Images/default-user-avatar.png'
import { useNavigation } from "@react-navigation/native";

import backgroundImage from "../../Images/Photo-BG.png";
import ContentBlock from "../../Images/ContentBlock.png";
import zahid from "../../Images/zahid.png";
import italy from "../../Images/italy.png";
import comment from "../../Images/comment.png";
import like from "../../Images/like.png";
import locationIcon from "../../Images/locationIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataFromFirestore } from "../../redux/posts/postsOperation";

const POSTS = [
    {
        id: "45kaassd6-j54k-4jth",
        image: zahid,
        title:"Ліс",
        like:"153",
        comments:"8",
        location:"Ukraine",
      },
      {
        id: "45k6-asadj54k-4jsadath",
        image: ContentBlock,
        title:"Захід",
        like:"200",
        comments:"3",
        location:"Ukraine",
      },
      {
        id: "45k6-j54k-4sdasafjth",
        image: italy,
        title:"Старий будиночок у Венеції",
        like:"200",
        comments:"50",
        location:"Italy",
      },
];


const ProfileScreen =  ()=>{
  const navigator = useNavigation();
  const {login} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {posts} = useSelector(state=>state.post)
  console.log("пост зі firestore:" , posts)
  useEffect(()=>{
    dispatch(getDataFromFirestore())
  },[])

    return ( 
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
    <ImageBackground source={backgroundImage} style={styles.ImageBackground}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                //  source={LogoImage}
                style={styles.image} />
              <Pressable style={styles.addImgButton}>
                <Text style={styles.textButtonAddImage} >+</Text>
              </Pressable>
            </View>
            <Text style={styles.title}>{login}</Text>
            <ScrollView vertical>
                {posts.length !== 0 && 
                posts.map(({posts}) => {
                    return (
                    <View key={posts.id} style={{marginBottom:32}}>
                        <View style={{marginBottom:8}}>
                            <Image source={{uri:posts.image}} style={{marginBottom:8}} />
                            <Text>{posts.title}</Text>     
                        </View>
                        <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between",}}>
                            <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:120}}>
                                    <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Commentary",{data})}>
                                        <Image source={comment} style={{width:24,height:24,marginRight:6,}}/>
                                        <Text>{posts.comments}</Text>
                                    </Pressable>
                                    <View style={{display:"flex", flexDirection:"row"}}>
                                        <Image source={like} style={{width:24,height:24,marginRight:6,}}/>
                                        <Text>{posts.like}</Text>
                            </View>
                        </View>
                            <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Map", posts.coords)}>
                                <Image source={locationIcon} style={{width:24,height:24,marginRight:6,}}/>
                                <Text>{posts.locationName}</Text>
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