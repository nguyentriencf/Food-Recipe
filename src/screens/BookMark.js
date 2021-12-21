import React,{useState} from 'react';
import { moderateScale } from "react-native-size-matters";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Image,
    FlatList
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import TrendingRecipe from '../components/TrendingRecipeComponent';
import {images, COLORS, SIZES, FONTS,icons} from "../../constants";
import FoodRepository from "../adapters/repositories/FoodRepository";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import {RecipeComponent} from '../components'
const BookMark= () =>{
    const [openModal, setOpenModal] = useState(false)
     const [fadeValue,setFadeValue] =React.useState(new Animated.Value(0));
     const [item,setItem] = React.useState({})
     const [bookMark,setBookMark] =React.useState([])
    const HEADER_HEIGHT = 350;
    const scrollY = React.useRef(new Animated.Value(0)).current;
     React.useEffect(()=>{
          const bookMark = AsyncStorage.multiGet(['bookMarkStorage']);
        bookMark.then(stores =>{
            stores.map( (result,i,store)=>{   
            if (store[i][1] !== null){
           const  items = JSON.parse(store[i][1]);
            const data = items
             setBookMark([...data])
            }else{
                console.log("empty");
            }
        })   
          });  
       });
 const animationFade=()=>{
      return  Animated.timing(fadeValue,{
        toValue:1,
        duration:2000,
        useNativeDriver:true
        })
    }
    function onChangeModal(value){
      setItem(value);
    }
    function setStateModal(state){
        setOpenModal(state);
    }
    const checkExistFood = (item,food)=>{
      return item.content.details.id !==food.content.details.id;
  }
    const updateBookMark = (food) =>{
      let foods = [];

          const bookMark = AsyncStorage.multiGet(['bookMarkStorage']);
      bookMark.then( (stores) =>{
          stores.map(async (result,i,store)=>{   
          if (store[i][1] !== null){
          const  items = JSON.parse(store[i][1]);
                  const data = items
                 const isExist=  data.findIndex(item=>item.content.details.id===food.content.details.id)
                  if( isExist !== -1){
                        foods = data.filter(item=>checkExistFood(item,food))
                  }else{
                      foods  = [...data,food];
                  }
               
                 let item = ['bookMarkStorage',JSON.stringify(foods)]
                 await AsyncStorage.multiSet([item])
          }else{
               let item = ['bookMarkStorage',JSON.stringify([food])]
                 await AsyncStorage.multiSet([item]);
          }
      })   
        });  
  }
    return(

      <View style={styles.container}>
          <FlatList
        style={styles.listFood}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={bookMark}
        renderItem={({item})=>(
             <View >
                 <TouchableOpacity onPress={()=>{
                  setItem(item), setStateModal(true);
                }}>
                       <ImageBackground style={styles.bgImage} source={{uri:item.display.images[0].toString()}}>
            <View style={styles.containerReview}>
                  <Text style={styles.textReview}>{item.content.reviews.totalReviewCount} reviews</Text>
            </View>
            <View style={styles.nameFood}>
            <View style={styles.infoFood}>
              <View style={styles.detailFood}>
              <Text style={styles.viewText}>
                {item.display.displayName}
            </Text> 

              
            <View style={styles.viewBookmark}>
            <TouchableOpacity onPress={()=>{updateBookMark(item)}}>
            <Image style={styles.bookmark} source={icons.bookmarkFilled}/>
            </TouchableOpacity>
            </View>
              </View>

              <View style={styles.totalTime}>
                    <Text style={styles.textTime}>
                        {item.content.details.totalTime} | {item.content.details.rating} rating
                    </Text>
            </View>
            </View>

            </View>
            </ImageBackground>
                 </TouchableOpacity>
          
        </View>
            
        )}
        numColumns={2}
        keyExtractor={(item,index) =>item.content.details.recipeId}
        />
            {!openModal  ? null : <RecipeComponent foodSelect={item} onChange={onChangeModal} value={openModal} setStateModal={setStateModal}/>}
        </View>
    )
}

export default BookMark;

const styles = StyleSheet.create({
    container:{
        flex:1,
        resizeMode:'cover'
    },
     listFood:{
         top:30,
        flexDirection:'column',
      padding:10,
        width:'100%',
        marginBottom:120
    },
      bgImage:{
        width:180,
        height:290,
        borderRadius: 14,
        overflow: "hidden",
        marginTop:10,
        marginLeft:4,
      },
       containerReview:{
            backgroundColor:COLORS.transparentGray,
            marginLeft:5,
            marginTop:10,
            padding:10,
            borderRadius:14,
            width:100,
            height:40,
          alignItems:'center'
          },
           textReview:{
            color:'white',
            ...FONTS.body4,
          },
          nameFood:{
        backgroundColor:COLORS.transparentBlack7,
        marginLeft:5,
        position: 'absolute',
        bottom: 15,
        padding:25,
        borderRadius:14,
        width:170,
        height:100
    },
     detailFood:{
           flexDirection:'row',
           maxWidth: moderateScale(100, 1),
           marginTop:5
      },
        infoFood:{
        flexDirection:'column'
        
      }, 
      viewBookmark:{
          position:'absolute',
          right:-20
      },
 bookmark:{
           width:20,
           height:20,
           tintColor:COLORS.lightGreen2,
           top:-20
      },
       totalTime:{
        marginLeft:-15,
        bottom:0,
        height:20
      },
      textTime:{
        color:'white',
        ...FONTS.body4,
      },
        viewText:{
          color:'white',
          ...FONTS.h3,
          marginLeft:-15,
          top:-20
      },
})