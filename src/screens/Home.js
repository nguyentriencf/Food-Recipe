import React from 'react';
import { moderateScale} from "react-native-size-matters";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import TrendingRecipe from '../components/TrendingRecipeComponent';
import {images, COLORS, SIZES, FONTS} from "../../constants";
import CategoryComponent from '../components/CategoryComponent';
import CategoriesRepository from '../adapters/repositories/CategoriesRepository';
import FoodRepository from '../adapters/repositories/FoodRepository';
import localStorage from '../adapters/infrastructures/localStorage';
const Home = ({navigation,route}) => {

    const [foodPopulars,setfoodPopulars] = React.useState([...route.params.data])
   React.useEffect(()=>{
        // FoodRepository.getListFoodTrending().then((c)=>{
        //  //  console.log(Object.values(c));
        //    const torage = new localStorage();
        //    torage.set('trendingListFood',Object.values(c))
        // })
       // const data = route.params.data;
   //  setfoodPopulars(data);
      
   },[])
 
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
       
        <FlatList
        style={styles.flatListFood}
        showsVerticalScrollIndicator ={false}
        horizontal={false}
         data={[0]}
         renderItem={({item})=>(
             <View>
            <TrendingRecipe props={foodPopulars}/>
            <CategoryComponent/>
             </View>
           
         )}
         keyExtractor={(item,index)=>String(index)}
        >
        </FlatList>
        </View>
       
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        resizeMode:'cover',
        backgroundColor:'white'
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
    flatListFood:{
        flex:1
    }
})