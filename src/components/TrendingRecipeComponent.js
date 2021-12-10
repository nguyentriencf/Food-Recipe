import React from "react"
import {Image,TouchableOpacity ,FlatList, ImageBackground, StyleSheet,View,Text,SafeAreaView }
 from "react-native"
 import { moderateScale } from "react-native-size-matters";
import localStorage from '../adapters/infrastructures/localStorage'
import { COLORS, FONTS,icons } from "../../constants"

const TrendingRecipe  = () =>{
    let [foodList,setFoodList] = React.useState([])
    React.useEffect(async()=>{
      const storage =new localStorage();
        const foodList =  storage.get('foodList');
        foodList.then(stores =>{
            stores.map( (result,i,store)=>{   
            if (store[i][1] !== null){
             items = JSON.parse(store[i][1]);
             data =items.feed;
             setFoodList([...data])
            }else{
                console.log("empty");
            }
        })   
          });         
        
    },[])
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
                <ImageBackground style={style.bgImage} source={{uri:item.display.images[0].toString()}}>
                <View style={style.nameFood}>

                <View style={style.infoFood}>
                  <View style={style.detailFood}>
                  <Text style={style.viewText}>
                    {item.display.displayName}
                 </Text> 

                  
                 <View style={style.viewBookmark}>
                 <TouchableOpacity>
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
                
             )}
             keyExtractor={(item,index) =>item.content.details.recipeId}
            />
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
        flex:1,
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
        }
      
})

export default TrendingRecipe