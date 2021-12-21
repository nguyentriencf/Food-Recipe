import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Platform,
    StyleSheet,
    Modal,
    ScrollView,
    Dimensions
} from 'react-native';
import {COLORS,FONTS,SIZES,icons} from '../../constants';
import {CustomButtonIcon, PreparationStep} from '../components';
import AsyncStorage from "@react-native-async-storage/async-storage"; 


const HEADER_HEIGHT = 350;
const Device_Width = Dimensions.get('window').width ;

const Recipe = (props) => {
   
    const [isVisable,setIsVisavle] =useState(props.value);
    const [food,setFood] = useState(props.foodSelect);
    const scrollY = React.useRef(new Animated.Value(0)).current;
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
   
        const renderDetail = React.useCallback(({item})=>{
            return (
                item.content.ingredientLines.map(index =>{
                    return(
                        <View key={index.ingredientId} style={styles.containerIngredientStyle}>

                            <View style={styles.viewContainerIngredient}>
                                <Text style={styles.textIngreient}>
                                    {index.ingredient}
                                </Text>
                            </View>
                            <View style={styles.viewContainerQuantity}>
                                <Text style={styles.textIngreient}>
                                    {index.quantity!==null ? `${index.quantity} ${index.unit}`:""}
                                </Text>
                            </View>
                        </View>
                    )
                })
        )
        },[])
       const cardStepByStep =() =>{
              return(
                  <View style={{
                      flex:1,
                      borderRadius:SIZES.radius,
                      backgroundColor:COLORS.transparentBlack7
                  }}>
                      <View style={{
                          flex:1,
                          flexDirection:'row',
                          alignItems:'center'
                      
                      }}>
                          <View style={{
                              padding:19,
                             bottom:4
                          }}>
                              <Text style={{color:'white' ,
                              height:40,
                              marginTop:25,
                              fontSize:18,
                              marginLeft:-12
                             }}>
                                  Preparation Step
                              </Text>
                          </View>
                          <View style={{
                              right:10
                          }}>
                              
             <CustomButtonIcon
                icons={icons.rightArrow}
                onPress={()=>{setIsVisavle(!isVisable)}}
               buttonContainerStyle={styles.customButtonRightArrowIcon}
               /> 
                          </View>
                      </View>

                  </View>
              )
          

        }
        const renderHeader = ()=>{
            //  console.log(item);
            return(
               <View style={{
                   marginTop:-1000,
                   paddingTop:1000,
                   alignItems:'center',
                   overflow:'hidden',
                   top:-30
               }}>
                             <Animated.Image 
                source={{uri:food.display.images[0].toString()}}
                resizeMode='cover'
                style={{
                        height:HEADER_HEIGHT,
                        width:'120%',
                        transform:[
                   {
                translateY: scrollY.interpolate({
                    inputRange:[-HEADER_HEIGHT,0,HEADER_HEIGHT],
                    outputRange:[-HEADER_HEIGHT/2,0,HEADER_HEIGHT*0.75]
                })},
                {
                    scale: scrollY.interpolate({
                        inputRange:[-HEADER_HEIGHT,0,HEADER_HEIGHT],
                    outputRange:[2,1,0.75]
                    })
                }
            ]
        }}/>
            <Animated.View style={{
                position:'absolute',
                bottom:10,
                left:100,
                right:100,
                height:50,
            }}>
                {    food.content.preparationSteps !== null ? cardStepByStep() : null}
            </Animated.View>

             </View>
            )
        }
        const renderHeaderBar =()=>{
            return(
                <View 
                style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    right:0,
                    height:70,
                    flexDirection:'row',
                    alignItems:'flex-end',
                    justifyContent:'space-between',
                    paddingHorizontal:SIZES.padding,
                    paddingBottom:10
                }}>
                    <CustomButtonIcon
                icons={icons.back}
                onPress={()=>{handleCloseModalRecipe(),setIsVisavle(!isVisable),closeModal()}}
               buttonContainerStyle={styles.customButtonBackIcon}
               />
                 <CustomButtonIcon
                icons={icons.bookmark}
                onPress={()=>{updateBookMark(food)}}
               buttonContainerStyle={styles.customButtonBookarkIcon}
               /> 
                </View>
            )
        }
        function renderRecipeInfo(){
            return(
                <View style={{
                    height:250,
                    flexDirection:'column',
                    justifyContent:'flex-start',

                }}>
                    <View style={{
                        top:10,
                        padding:10
                       
                    }}>
                        <Text style={{...FONTS.h1, color:COLORS.black}}>
                            {food.display.displayName}
                        </Text>
                       
                        <Text style={{...FONTS.h3}}>
                            Description:
                        </Text>
                           <Text >
                            {food.content.description !==null ?food.content.description.text:''}
                        </Text>
                           <Text style={{
                               fontWeight:'bold',
                                color:COLORS.lightGreen2
                           }}>
                            {food.content.details.totalTime} | {food.content.details.rating} rating
                        </Text>
                    </View>
                        <View style={
                            {
                                 flexDirection:'row',
                                paddingHorizontal:15,
                                marginVertical:5               
                            }
                    }>
                        <View style={{
                             flex:1,

                        }}>
                            <Text style={{...FONTS.body2,fontWeight:'bold'}}>
                            Ingredient
                        </Text>

                        </View>
                          <Text style={{...FONTS.body3,   
                                        alignItems:'flex-end',
                                        justifyContent:'center',}}>
                            {food.content.ingredientLines.length} Item
                        </Text>
                    </View>


                </View>
            )
        }
        function handleCloseModalRecipe(){
            //  setFood(null)
           props.onChange(null);
        }
        function closeModal(){
                props.setStateModal(false)
        }

        function handleCloseStep(state){
            setIsVisavle(state)
        }
    return (
        <View style={styles.MainContainer}>
            
                   <Modal
        visible={isVisable}
            presentationStyle='fullScreen'
            style={styles.container}
        >
            <View style={{
                flex:1,
                backgroundColor:COLORS.white,
            }}>
                <Animated.FlatList
                    data={[food]}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={{marginVertical:25}}>
                            {renderHeader()}
                            {renderRecipeInfo()}
                        </View>
                        }
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {nativeEvent:{contentOffset:{y:scrollY}}}
                    ],{useNativeDriver:true})}
                    renderItem={renderDetail}
                    keyExtractor={(item,index)=>String(index)}
                />
            </View>
            {renderHeaderBar()}
        </Modal>
        {/* <PreparationStep foodSelect={food} value={false}/> */}
       {!isVisable ? <PreparationStep foodSelect={food} value={!isVisable} onChange={handleCloseStep}/> :isVisable}
        </View>
       
       
    )
}

export default Recipe;
const styles = StyleSheet.create({
    
  MainContainer :{
 
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
 
  },
    container:{
                flex: 1,
                backgroundColor:COLORS.white
            },
    containerIngredientStyle :{
        flexDirection:'row',
        paddingHorizontal:15,
        marginVertical:5
    },
    viewContainerIngredient:{
            flex:1,
            justifyContent:'center'
        },
    textIngreient:{
        ...FONTS.body3,
        },
        viewContainerQuantity:{
            alignItems:'flex-end',
            justifyContent:'center',

        },
        customButtonBackIcon:{
                    marginTop:0,
                    borderWidth:3,
                    borderColor:COLORS.darkLime,
                    height:35,
                    width:35,
                    paddingHorizontal:1,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:COLORS.gray3
               },
                customButtonBookarkIcon:{
                    marginTop:0,
                    height:40,
                    width:45,
                    paddingHorizontal:1,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:COLORS.gray3
               },
                customButtonRightArrowIcon:{
                    marginTop:0,
                    height:35,
                    width:35,
                    paddingHorizontal:2,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:COLORS.gray3,
                     borderWidth:3,
                    borderColor:COLORS.darkLime,
               },
                ThirdBlockStyle:{
    
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Device_Width 
    
  },
    TextStyle:{
    fontSize : 30,
    color: '#fff',
    textAlign : 'center',
    fontWeight: 'bold'
  }
})