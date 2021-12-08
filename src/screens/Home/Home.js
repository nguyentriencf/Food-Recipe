import React from 'react';
import { moderateScale } from "react-native-size-matters";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {images, COLORS, SIZES, FONTS} from "../../../constants";
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <View style={styles.containerHeader}>
             <View style={styles.header}>
             <Text style={styles.textTitle}>
             Xin chào Nguyen Mau Tuan,
             </Text>
             <Text style={styles.textSmall}>
                 Hôm nay bạn muốn nấu món gì?
             </Text>
             </View>
         <View>
         <ImageBackground style={styles.avatar} source={images.UserProfile1}>
        </ImageBackground>
         </View>
        </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        resizeMode:'cover'
    },
    containerHeader:{
       flexDirection:"row"
    },
    header:{
        top:50,
        margin:10,
        marginLeft:20,
        maxWidth: moderateScale(250, 2)
    },
    textTitle:{
        ...FONTS.h2,
        color: COLORS.lightGreen2
    },
    textSmall:{
       ...FONTS.h3,
       color:COLORS.lightGray3
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        overflow: "hidden",
        top:65,
        right:-10
    }
})