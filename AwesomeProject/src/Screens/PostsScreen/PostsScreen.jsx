import { View, Text, Image,FlatList, StyleSheet, Pressable,TouchableWithoutFeedback,Keyboard,  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation  } from "@react-navigation/native";
import exitImage from "../../Images/log-out.png"
import toolBar from '../../Images/grid.png'
import userImg from '../../Images/user.png'
import addPostImage from "../../Images/Union.png"
import userAvatar from "../../Images/default-user-avatar.png"




const PostsScreen = () => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Публікації</Text>
                <Image
                source={exitImage}
                    style={styles.exitIcon}
                />
            </View>
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
            <FlatList />

            <View style={styles.footer}>
                <Pressable>
                    <Image
                        source={toolBar}
                        style={{width:24, height:24}}
                    />
                </Pressable>
                <Pressable style={styles.button}
                // onPress={() => navigation.navigate("CreatePost")}
                >
                    <Image
                    source={addPostImage}
                        style={{width:13, height:13}}
                    />
                </Pressable>
                <Pressable>
                        <Image
                    source={userImg}
                        style={{width:24, height:24}}
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
    exitIcon: {
        position: "absolute",
        top: 28,
        right:12,
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
        paddingTop: 32,  
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