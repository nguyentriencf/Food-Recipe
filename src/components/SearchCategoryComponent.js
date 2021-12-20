import React from "react"
import {Image,TouchableOpacity ,
        FlatList, ImageBackground, 
        StyleSheet,View,Text,
        Animated,
        Modal
         }
 from "react-native"
 import LottieView from 'lottie-react-native'
 import { moderateScale, s } from "react-native-size-matters"
 import { COLORS, FONTS,icons, animation} from "../../constants"
import FoodRepository from "../adapters/repositories/FoodRepository"
import localStorage from "../adapters/infrastructures/localStorage"
const RecipeCategoryResult  = (props) =>{
    console.log(props)
    let [foodList,setFoodList] = React.useState([])
    const [fadeValue,setFadeValue] =React.useState(new Animated.Value(0))
    const [showSpinner,setShowSpinner] = React.useState(true)
    React.useEffect(()=>{
          FoodRepository.searchFood(props.nameFood).then((data)=>{
              const result = data.feed;
              if(result.length >0) animationFade().start()
              setFoodList(result);
              setShowSpinner(false)
             
          })
  
    },[])

    const closeModal = ()=>{
        props.onChange(false)
        setFoodList([])
    }
    const animationFade=()=>{
      return  Animated.timing(fadeValue,{
        toValue:1,
        duration:2000,
        useNativeDriver:true
        })
    }
    return(
        <Modal
        style={style.containnerModal}
         animationType = "fade"
            transparent = {false}
            visible = {true}>
            {
                showSpinner ? 
          <View style={style.containerSpinner}>
              <LottieView style={style.spinner} source={animation.spinnerIcon} autoPlay loop/>
                <View style={style.viewLoading}>
              <Text style={style.loading}>Loading...</Text>
           </View>
          </View>
         :
       
         foodList.length ===0 ?
         
           <View style={style.conntainerNotFound}>
            <View>
            <TouchableOpacity
             onPress={(()=>{
                closeModal()
            })}>
            <Image style={{ width:30,height:30,top:10,left:10}} source={icons.back}>
             </Image>
            </TouchableOpacity>
             </View>
           <Image style={style.imgNotFound}  source={icons.notFound}></Image>
             <Text style={style.textNotFound}>Không có món ăn cần tìm!</Text>
           </View> :
        <View style={style.containerFood}>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={(()=>{
                closeModal()
            })}>
            <Image style={{ width:30,height:30,top:20,left:10}} source={icons.back}>
             </Image>
            </TouchableOpacity>
         
         <View style={style.titleSearch}>
              <Text style={style.textSearch} >{props.nameFood} kết quả tìm kiếm:{foodList.length}</Text>       
         </View>
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
            }
        
        </Modal>
     )
}

const style = StyleSheet.create({

    containnerModal:{
        flex:1
    },
    containerFood:{
      top:40
    },
    listFood:{
        flexDirection:'column',
        marginLeft:8,
        marginRight:15,
        width:'100%',
        marginTop:20,
        marginBottom:150
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

export default RecipeCategoryResult