import React from "react"
import {Image,TouchableOpacity ,FlatList, ImageBackground, StyleSheet,View,Text,SafeAreaView }
 from "react-native"
 import { moderateScale, s } from "react-native-size-matters";
import localStorage from '../adapters/infrastructures/localStorage'
import { COLORS, FONTS,icons } from "../../constants"
import {RecipeComponent} from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage'
const TrendingRecipe  = ({props}) =>{
    let [foodList,setFoodList] = React.useState([...props[0].feed])
    const [item,setItem] = React.useState({})
    const [openModal, setOpenModal] = React.useState(false)
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
     
          <View style={style.containerFood}>
           <View style={style.titleTrending}>
              <Text style={style.textTrending} >Món ăn phổ biến</Text>
          </View>
            <FlatList
            style={style.listFood}
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
             data={foodList}
             horizontal={true}
             renderItem={({item})=>(
        
              <TouchableOpacity style={{flex:1}} onPress={()=>{
                  setItem(item), setStateModal(true);
                }}>
                <ImageBackground style={style.bgImage} source={{uri:item.display.images[0].toString()}}>
                 
                <View style={style.containerReview}>
                  <Text style={style.textReview}>{item.content.reviews.totalReviewCount} reviews</Text>
                </View>
                <View style={style.nameFood}>

                <View style={style.infoFood}>
                  <View style={style.detailFood}>
                  <Text style={style.viewText}>
                    {item.display.displayName}
                 </Text> 

                  
                 <View style={style.viewBookmark}>
                 <TouchableOpacity onPress={()=>{updateBookMark(item)}}>
                 <Image style={style.bookmark} source={icons.bookmark}/>
                 </TouchableOpacity>
                 </View>
                  </View>

                  <View style={style.totalTime}>
                        <Text style={style.textTime}>
                            {item.content.details.totalTime} | {item.content.details.rating} rating
                        </Text>
                 </View>
                </View>

                </View>
                </ImageBackground>  
                </TouchableOpacity>
                
             )}
             keyExtractor={(item,index) =>item.content.details.recipeId}
            />
               <View>
         {!openModal ? 
          null : <RecipeComponent foodSelect={item} onChange={onChangeModal} value={openModal} setStateModal={setStateModal}/>}

      </View>
      </View>
     )
}

const style = StyleSheet.create({
    containerFood:{
      flex:0.5
    },
    listFood:{
        flexDirection:'row',
        flex:1,
        top:10,
         marginLeft:0,
         maxHeight: moderateScale(350, 1)
    },
    nameFood:{
        backgroundColor:COLORS.transparentBlack7,
        marginLeft:5,
        position: 'absolute',
        bottom: 15,
        padding:25,
        borderRadius:14,
        width:240,
        height:100
    },
      bgImage:{
        width:250,
        height:390,
       // flex:1,
        marginLeft:25,
        borderRadius: 14,
        overflow: "hidden"
      },
      viewText:{
          color:'white',
          ...FONTS.h3,
          marginLeft:-15,
          top:-20
      },
      bookmark:{
           width:20,
           height:20,
           tintColor:COLORS.lightGreen2,
           top:-20
      },
      viewBookmark:{
          position:'absolute',
          right:-20
      },
      detailFood:{
           flexDirection:'row',
           maxWidth: moderateScale(150, 2),
           marginTop:5
      },
      infoFood:{
        flexDirection:'column'
      },
      totalTime:{
        marginLeft:-15
      },
      textTime:{
        color:'white',
        ...FONTS.body4,
      },
      titleTrending:{
        marginTop:20,
         marginLeft:20
        },
      textTrending:{
            color:COLORS.black,
            ...FONTS.h2,
        },
      containerReview:{
        backgroundColor:COLORS.transparentGray,
        marginLeft:5,
        marginTop:10,
        padding:10,
        borderRadius:14,
        width:110,
        height:40,
      alignItems:'center'
      },
      textReview:{
        color:'white',
        ...FONTS.body3,
      }
      
})

export default TrendingRecipe