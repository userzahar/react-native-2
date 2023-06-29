import { View, Text, Image,ScrollView, StyleSheet, FlatList,TouchableWithoutFeedback,Keyboard,  } from "react-native";
import { useNavigation  } from "@react-navigation/native";

import exitImage from "../../Images/log-out.png"
import userAvatar from "../../Images/default-user-avatar.png"
import comment from "../../Images/comment.png";
import like from "../../Images/like.png";
import locationIcon from "../../Images/locationIcon.png";
import ContentBlock from "../../Images/ContentBlock.png";
import zahid from "../../Images/zahid.png";
import italy from "../../Images/italy.png";
import { Pressable } from "react-native";

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
        id: "45k6-asadj5jl4k-4jsadath",
        image: ContentBlock,
        title:"Захід",
        like:"200",
        comments:"3",
        location:"Ukraine",
      },
      {
        id: "45k6-j54k-4sdhkasafjth",
        image: italy,
        title:"Старий будиночок у Венеції",
        like:"200",
        comments:"50",
        location:"Italy",
      },
      {
        id: "45k6-j54k-j4sdasafjth",
        image: italy,
        title:"Старий будиночок у Венеції",
        like:"200",
        comments:"50",
        location:"Italy",
      },
      {
        id: "45k6-j54kh-4sdasafjth",
        image: italy,
        title:"Старий будиночок у Венеції",
        like:"200",
        comments:"50",
        location:"Italy",
      },
      {
        id: "45k6-j5g4k-4sdasafjth",
        image: italy,
        title:"Старий будиночок у Венеції",
        like:"200",
        comments:"50",
        location:"Italy",
      },
];


const PostsScreen = () => {
    const navigator = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
        <View style={styles.container}>
            <View style={styles.profileContainer} >
                <View style={styles.imageContainer}>
                    <Image
                        source={userAvatar}
                        style={styles.image} />
                </View>
                    <View>
                        <Text>Natali Romanova</Text>
                        <Text>email@example.com</Text>
                    </View>
            </View>
            <ScrollView vertical>
                {POSTS.map((data) => {
                    return (
                    <View key={data.id} style={{marginBottom:32}}>
                        <View style={{marginBottom:8}}>
                            <Image source={data.image} style={{marginBottom:8}} />
                            <Text>{data.title}</Text>     
                        </View>
                        <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between",}}>
                            <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:120}}>
                                    <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Commentary",{data})}>
                                        <Image source={comment} style={{width:24,height:24,marginRight:6,}} />
                                        <Text>{data.comments}</Text>
                                    </Pressable>
                                    <View style={{display:"flex", flexDirection:"row"}}>
                                        <Image source={like} style={{width:24,height:24,marginRight:6,}}/>
                                        <Text>{data.like}</Text>
                            </View>
                        </View>
                            <Pressable style={{display:"flex", flexDirection:"row"}} onPress={()=>navigator.navigate("Map")}>
                                <Image source={locationIcon} style={{width:24,height:24,marginRight:6,}}/>
                                <Text>{data.location}</Text>
                            </Pressable>
                        </View>
                    </View>
                    )
                    }
                )}
            </ScrollView>
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