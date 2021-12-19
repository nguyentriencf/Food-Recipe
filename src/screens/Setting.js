import React from "react";
import { FlatList,View,Text,StyleSheet,Image,TouchableOpacity,Alert } from "react-native";
import { FONTS,COLORS,icons } from "../../constants";
import { AuthContext } from "../navigation/AuthProvider";

const Settings = ({ navigation })=>{
    const [data,setData] = React.useState(
    [
        {name:'Đổi mật khẩu',icon:icons.passwordChange},
        {name:'Đăng xuất',icon:icons.logout}
    ])
    const {logout} = React.useContext(AuthContext);
    const logOut =()=>{
        logout().then(()=>{
            console.log("logout");
        }).catch((error)=>{
            console.log(error)
        })
    }
      return(
          <View style={styles.containner}>
          <View style={styles.title}>
              <Text style={{...FONTS.h1,marginLeft:10,marginTop:50}}>
                  Cài đặt
              </Text>
          </View>
        <View
        style={{top:30}}>   
             <TouchableOpacity
             onPress={()=>{
                navigation.navigate('ChangePassword')
             }}>
                <View style={styles.containnerItem}>
                     <View style={styles.containnerIconLeft}>
                     <Image style={styles.icon} source={data[0].icon}></Image>
                    <Text style={styles.text}>{data[0].name}</Text>
                     </View>
                     <Image style={styles.containnerIconRight} source={icons.arrow_right}></Image>      
                </View>
             </TouchableOpacity>
             <TouchableOpacity
             onPress={()=>{
              Alert.alert("Đăng xuất","Bạn có muốn đăng xuất không?",
              [
                {
                text: "Huỷ",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Đăng xuất",style:'destructive', onPress: () =>{logOut()} }
            ])
             }}>
                <View style={styles.containnerItem}>
                     <View style={styles.containnerIconLeft}>
                     <Image style={styles.icon} source={data[1].icon}></Image>
                    <Text style={styles.text}>{data[1].name}</Text>
                     </View>
                     <Image style={styles.containnerIconRight} source={icons.arrow_right}></Image>      
                </View>
             </TouchableOpacity>
         </View>
          </View>
        
      )
}

const styles = StyleSheet.create({
    containner:{
        flex:1,
      backgroundColor:COLORS.lightGray
    },
    containnerItem:{
        backgroundColor:COLORS.white,
        marginTop:10,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    containnerIconLeft:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:15,
        marginLeft:10
    },
    containnerIconRight:{
        marginTop:15,
        right:3,
        width:20,
        height:20
    },
    text:{
        color:COLORS.black,
        ...FONTS.body3,
        marginLeft:10
    },
    title:{
       backgroundColor:COLORS.white,
       height:100,
       width:'100%'
    },
    icon:{
        width:30,
        height:30
        }
})

export default Settings