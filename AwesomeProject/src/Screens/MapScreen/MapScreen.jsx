import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View,  Image, StyleSheet, Pressable } from "react-native";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";

import toolBar from '../../Images/grid.png'
import userImg from '../../Images/user.png'
import addPostImage from "../../Images/Union.png"

const MapScreen = ()=>{
    const Tabs = createBottomTabNavigator();
    return (<>
    
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === "Post") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "CreatePost") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }
              else if (route.name === "Profile") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }
              return (
            <View style={styles.footer}>
                <Pressable>
                    <Image
                    source={toolBar}
                    style={{width:24, height:24}}
                    />
                </Pressable>
                <Pressable style={styles.button}>
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
              )
            //   <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            "tabBarActiveTintColor": "tomato",
            "tabBarInactiveTintColor": "gray",
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ]
          }}
        >
          <Tabs.Screen name="Post" component={PostsScreen} />
          <Tabs.Screen name="CreatePost" component={CreatePostsScreen} />
          <Tabs.Screen name="Profile" component={ProfileScreen} />
        </Tabs.Navigator>
    </>

)
}

const styles = StyleSheet.create({
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor:"rgba(0, 0, 0, 0.3)",
        minWidth: 375,
        height: 83,
    },
})
{/* <View style={styles.footer}>
    <Pressable>
        <Image
        source={toolBar}
        style={{width:24, height:24}}
        />
    </Pressable>
    <Pressable style={styles.button}>
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
</View> */}

export default MapScreen;