import { View, Text, Image,TextInput, StyleSheet, Pressable,Platform, KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard,  } from "react-native";
import {  useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import arrowLeft from "../../Images/arrow-left.png";
import avatar from "../../Images/avatar.png";
import arrowUp from "../../Images/arrow-up.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const months = [
    "січня", "лютого", "березня", "квітня", 
    "травня", "червня", "липня", "серпня", 
    "вересня", "жовтня", "листопада", "грудня"
  ];
const daysOfWeek = [
    "Неділя", "Понеділок", "Вівторок", "Середа",
    "Четвер", "П'ятниця", "Субота"
  ];


const CommentsScreen = ()=>{
    const { params: { data } } = useRoute();
    const [comment, setComment] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const {id,message} = data;

    const {login,userId} = useSelector(state=>state.auth);

    
    useEffect(()=>{
        setAllComments(message)
    },[id])

    useEffect(()=>{
         (async()=>{
            const ref = await doc(db, `posts:${userId}`, id);
            updateDoc(ref, {
                message: allComments
            })
        })()
    },[allComments.length])

    const createPost = async () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()} | ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        const commentId = Date.now().toString();
        const newComment = {
            avatar,
            id:commentId,
            userId,
            login,
            text:comment,
            time:formattedDate,
        }
        setAllComments((prev)=>[...prev, newComment])
        setComment('')
    }

    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View  style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Коментарі</Text>
                    <Pressable 
                        style={styles.arrowLeft}
                        onPress={()=>navigation.navigate("Home", allComments.length)}>
                        <Image
                            source={arrowLeft}
                            />
                    </Pressable>
                </View>                
                <View style={styles.imageContainer}>
                </View>

                    <ScrollView vertical style={{...styles.messageList}}>
                        {allComments.length !== 0 && allComments.map((twit) => {
                            return (
                            <View key={twit.id} style={styles.messageListItem}>
                                <View key={twit.id} style={styles.avatarIMG}>
                                    <Text>{twit.login}</Text>
                                    {/* <Image
                                        source={avatar} 
                                        style={styles.avatarIMG}
                                    />     */}
                                </View>
                                <View style={styles.messageTextContainer} >
                                    <View style={styles.messageText} >
                                        <Text>{twit.text}</Text>
                                    </View>
                                    <Text style={styles.dataText}>{twit.time}</Text>
                                    {/* 09 червня, 2020 | 08:40 */}
                                </View>           
                            </View>
                            )
                            }
                        )}
                    </ScrollView>

            

                <View style={styles.footer}>
                    <KeyboardAvoidingView style={styles.containerComment} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput  type="text"
                                    style={{
                                        //  borderColor: state.input2.borderColor, 
                                        ...styles.input }}
                                    // onBlur={() => dispatch({ type: "BLUR", payload: "input2" })}
                                    onChangeText={setComment}
                                    placeholder="Коментувати..."
                                    value={comment}
                        />
                        <Pressable style={styles.trashButton}
                            onPress={createPost}                                
                        >
                            <Image
                                source={arrowUp}
                                style={styles.trashIcon}
                                />
                        </Pressable>                
                    </KeyboardAvoidingView>
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
    avatarIMG: {
        width: 28, height: 28, marginRight:16,
    },
    input: {
        padding: 10,
        backgroundColor:"#F6F6F6",
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        borderRadius: 100,
      },
    trashIcon: {
        width:34, height:34,
    },
    trashButton: {
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        width: 34,
        height: 34,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
        right:8,
        top:8,
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
        paddingTop:7,
    },
    imageContainer:{
        paddingTop: 16,
        paddingBottom:32,
    },
    messageListItem:{
        display:"flex",
        flexDirection:"row",
        marginBottom:24,
        minHeight:69,
    },
    messageList:{
        display:"flex",
        flexDirection:"column-reverse",
        // alignItems:"flex-end",
        overflow:"hidden",
        height:"100%",
        marginBottom:50,
    },
    messageTextContainer:{
        width:299,
        padding:16,
        display:"flex",
        alignItems:"flex-end",
        backgroundColor:"rgba(0, 0, 0, 0.03)",
        borderRadius:6,
    },
    messageText:{
        marginBottom:8,
        color: "#212121",
        fontSize: "13",
        fontFamily: "Roboto",
        lineHeight: 18,
    },
    containerComment:{
        position:"absolute",
        width:"100%",
    },
    dataText:{
        color:"#BDBDBD",
        textAlign: "right",
        fontSize: 10,
        fontFamily: "Roboto",
    }

});

export default CommentsScreen;