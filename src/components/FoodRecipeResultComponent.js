import React from "react"
import {Image,TouchableOpacity ,
        FlatList, ImageBackground, 
        StyleSheet,View,Text,
        Animated
         }
 from "react-native"
 import LottieView from 'lottie-react-native'
 import { moderateScale, s } from "react-native-size-matters"
 import { COLORS, FONTS,icons, animation} from "../../constants"

const FoodRecipeResult  = ({props,nameFood}) =>{
    let [foodList,setFoodList] = React.useState([])
    const [fadeValue,setFadeValue] =React.useState(new Animated.Value(0))
    const [showSpinner,setShowSpinner] = React.useState(true)
    React.useEffect(()=>{
        setFoodList(props)
        setTimeout(() => {
          setShowSpinner(false)
          animationFade().start()
        }, 4000);
    },[])

    const animationFade=()=>{
      return  Animated.timing(fadeValue,{
        toValue:1,
        duration:2000,
        useNativeDriver:true
        })
    }
    return(
           props.length ===0 ?
           <View style={style.conntainerNotFound}>
           <Image style={style.imgNotFound}  source={icons.notFound}></Image>
             <Text style={style.textNotFound}>Không có món ăn cần tìm!</Text>
           </View> :
          showSpinner ? 
          <View style={style.containerSpinner}>
              <LottieView style={style.spinner} source={animation.spinnerIcon} autoPlay loop/>
                <View style={style.viewLoading}>
              <Text style={style.loading}>Loading...</Text>
           </View>
          </View>
         :
        <View style={style.containerFood}>
         
         <View style={style.titleSearch}>
              <Text style={style.textSearch} >{nameFood} kết quả tìm kiếm:{foodList.length}</Text>       
         </View>

         <FlatList
        style={style.listFood}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={foodList}
        renderItem={({item})=>(
             <Animated.View style={{opacity:fadeValue}}>
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
        </Animated.View>
            
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
      spinner:{
        width:100,
        height:100,
       alignSelf:'center'
        },
      loading:{
        color:COLORS.black,
        ...FONTS.body3,
        },
      viewLoading:{
        width:80,
        height:30,
        alignSelf:'center',
        justifyContent:'center'
        },  
      containerSpinner:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        top:150
        },
        conntainerNotFound:{
          justifyContent:'center',
          flexDirection:'column',
          top:50,
        },
        textNotFound:{
          color:COLORS.black,
          ...FONTS.body3, 
          marginTop:15,
          marginLeft:10,
          alignSelf:'center'
        },
        imgNotFound:{
          width:300,
          height:300,
         alignSelf:'center'
        },
        titleSearch:{
          marginTop:20,
           marginLeft:20
          },
      textSearch:{
              color:COLORS.black,
              ...FONTS.h2,
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
          }    

      
})

export default FoodRecipeResult