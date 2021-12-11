import React from "react"
import {Image,TouchableOpacity ,FlatList, ImageBackground, StyleSheet,View,Text,SafeAreaView }
 from "react-native"
 import { moderateScale, s } from "react-native-size-matters";
import localStorage from '../adapters/infrastructures/localStorage'
import { COLORS, FONTS,icons } from "../../constants"

const FoodRecipeResult  = ({props}) =>{
    console.log(props);
    let [foodList,setFoodList] = React.useState([])
    React.useEffect(()=>{
        setFoodList(props)
    },[])
    return(
     
          <View style={style.containerFood}>
            <FlatList
            style={style.listFood}
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
             data={foodList}
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
             numColumns={2}
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
        flexDirection:'column',
        marginLeft:8,
        marginRight:15,
        width:'100%'
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
      bgImage:{
        width:180,
        height:290,
        borderRadius: 14,
        overflow: "hidden",
        marginTop:10,
        marginLeft:4,
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
           maxWidth: moderateScale(100, 1),
           marginTop:5
      },
      infoFood:{
        flexDirection:'column'
        
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
      titleTrending:{
        marginTop:20,
         marginLeft:20
        },
      textTrending:{
            color:COLORS.black,
            ...FONTS.h2,
        },
      
})

export default FoodRecipeResult