import React from 'react';
import { moderateScale, s } from "react-native-size-matters";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import TrendingRecipe from '../components/TrendingRecipeComponent';
import {images, COLORS, SIZES, FONTS} from "../../constants";
import FoodRepository from "../adapters/repositories/FoodRepository";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
const Home = ({ navigation }) => {
    const [foodList,setFoodList] = React.useState([]);
//     React.useEffect(async()=>{
//          FoodRepository.getListFood().then(async(f) => {
//             // console.log(f);
//            let item = ['foodList',JSON.stringify(f)];
//           await AsyncStorage.multiSet([item]);    
//   });
//          },[])
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
            <SearchComponent></SearchComponent>
            <View style={styles.titleTrending}>
            <Text style={styles.textTrending} >Món ăn phổ biến</Text>
            </View>
            <View style={styles.listTrending}>
            <TrendingRecipe></TrendingRecipe>
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
    },
    listTrending:{
        top:10,
        flex:1,
        marginLeft:0,
        maxHeight: moderateScale(350, 1)
    },
    titleTrending:{
    marginTop:20,
     marginLeft:20
    },
    textTrending:{
        color:COLORS.black,
        ...FONTS.h2,
    }
})