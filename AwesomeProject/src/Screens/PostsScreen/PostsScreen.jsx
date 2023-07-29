import { View, Text, Image,ScrollView, StyleSheet, TouchableWithoutFeedback,Keyboard,  } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearPostLogout, getDataFromFirestore } from "../../redux/posts/postsOperation";
import { authSignOutUser } from "../../redux/auth/authOperations";

import defaultAvatar from "../../Images/default.jpg";
import exitImage from "../../Images/log-out.png"
import comment from "../../Images/comment.png";
import like from "../../Images/like.png";
import locationIcon from "../../Images/locationIcon.png";

import { Pressable } from "react-native";

const PostsScreen = () => {
    const navigator = useNavigation();
    const dispatch = useDispatch();
    const {login,email, userId,photoURL} = useSelector(state => state.auth);
    const {posts} = useSelector(state=>state.post)
    const { params } = useRoute();
    useEffect(()=>{    
        dispatch(getDataFromFirestore(userId))
    },[userId,params])
    
    
    const heandleLogOut = async ()=>{
        await dispatch(clearPostLogout())
        dispatch(authSignOutUser())
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Публікації</Text>
                <Pressable  style={styles.exitButton}
                    onPress={heandleLogOut}>
                    <Image
                    source={exitImage}
                        style={styles.exitIcon}
                    />
                </Pressable>
            </View>
            <View style={styles.profileContainer} >
                <View style={styles.imageContainer}>
                    <Image
                        source={photoURL?.length > 0 ? {uri:photoURL} : defaultAvatar}
                        style={styles.image} />
                </View>
                    <View>
                        <Text>{login}</Text>
                        <Text>{email}</Text>
                    </View>
            </View>
           {posts?.length !== 0 && <ScrollView vertical>
                {posts.map((data) => {
                    console.log(data)
                    return (
                <View key={data.id} style={{marginBottom:32, width:"100%"}}>
                        <View style={{marginBottom:8}}>
                            <Image source={{uri:data.image}} style={{marginBottom:8,height:240}} />
                            <Text>{data.title}</Text>     
                        </View>
                        <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:343}}>
                            <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:120}}>
                                            <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Commentary",{data})}>
                                                <Image source={comment} style={{width:24,height:24,marginRight:6,}} />
                                                <Text>{ data.message.length}</Text>
                                            </Pressable>
                                            <View style={{display:"flex", flexDirection:"row"}}>
                                                <Image source={like} style={{width:24,height:24,marginRight:6,}}/>
                                                <Text>{data.like}</Text>
                                            </View>
                            </View>
                                <Pressable style={{display:"flex", flexDirection:"row",marginLeft:10}} onPress={()=>navigator.navigate("Map",data.coords)}>
                                            <Image source={locationIcon} style={{width:24,height:24,marginRight:6,}}/>
                                            <Text>{data.locationName}</Text>
                                </Pressable>
                        </View>
                </View>
                    )
                    }
                )}
            </ScrollView>}
        </View>
    </TouchableWithoutFeedback>    
)
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        alignItems:"center",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius:25
        },
    header: {
        minWidth: 375,
        height:60,
        position:"relative",
        top:1,
        display:"flex",
        alignItems: "center",
        paddingTop: 28,
        borderBottomWidth: 1,
        borderColor:"rgba(0, 0, 0, 0.3)"
    },
    title: {
        width:97,
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
        textAlign: "center",
        color: "#212121",
    },
    exitButton:{
        position: "absolute",
        top: 28,
        right:12,
    },
    exitIcon: {
        width:24, height:24,
    },
    button: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        width: 70,
        height: 40,
        padding:0,
        display: "flex",
                display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginLeft:42,
        marginRight:42,
    },
    profileContainer: {
        minWidth: 375,
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        paddingTop: 16,  
        paddingBottom:32,
    },
    imageContainer: {
        backgroundColor: "#F6F6F6",
        marginRight:8,
    },
    image: {
        width: 60, height: 60,borderRadius: 16,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor:"rgba(0, 0, 0, 0.3)",
        minWidth: 375,
        height: 83,
    }
});

export default PostsScreen