import React from "react";
import { View,Text,TextInput,StyleSheet,TouchableOpacity,Image, FlatList,Animated,ImageBackground } from "react-native"
import * as Animatable from 'react-native-animatable';
import { moderateScale } from "react-native-size-matters";
import localStorage from '../adapters/infrastructures/localStorage';
import FoodRecipeResult from '../components/FoodRecipeResultComponent';
import {COLORS,filterData,FONTS,icons,dummyData} from "../../constants"
const Search = ()=>{
    const [textInputFossued,setTextInputFossued] = React.useState(true)
    const [fadeValue,setFadeValue] =React.useState(new Animated.Value(0))
    const textInput = React.useRef(0)
    const [valueSearch,setValueSearch] =React.useState('')
    const [dataResult,setDataResult] = React.useState([])
    const [dataSearch,setDataSearch] =React.useState([])
    const [showHint,setShowHint] =React.useState(true)
    React.useEffect(()=>{
       //   animationFade().start()
       const storage =new localStorage();
       const foodListTrending =  storage.get('trendingListFood');
       foodListTrending.then(stores =>{
           stores.map( (result,i,store)=>{   
           if (store[i][1] !== null){
           const items = JSON.parse(store[i][1]);
           const dataTrending = items[0];
           const foodListPopular =  storage.get('foodList');
           foodListPopular.then(stores =>{
             stores.map( (result,i,store)=>{   
             if (store[i][1] !== null){
             const items = JSON.parse(store[i][1]);
             const data = items.feed;
           const dataFood = dataTrending.concat(data);
            setDataSearch(dataFood)
             }else{
                 console.log("empty");
             }
         })   
           });     
           }else{
               console.log("empty");
           }
       })   
         });
       
    },[])

    const searchFood = (text)=>{
        if(text.length !==0){
          setValueSearch(text)
          console.log(text);
          const tmpData = dataSearch;
         const rs = tmpData.filter(item => item.display.displayName.toLowerCase().includes(text.toLowerCase().trim()))
         setShowHint(false)
         setDataResult(rs)
      
        }
   
  }

    const updateText =text=>{
        if (text.length ===0) setShowHint(true)
       setValueSearch(text);
    }
    const colorsHint =[
        '#1fb779',
        '#35be86',
        '#4bc593',
        '#62cca1',
        '#78d3ae',
        '#8fdbbc',
        '#a5e2c9',
        '#bbe9d6',
        '#d2f0e4',
        '#e8f7f1'
    ]
    const renderItem = React.useCallback(({ item,index }) => {
     
        return (
            
          <View style={styles.containnerHintSearch}>
          <TouchableOpacity
          onPress={()=>{
                searchFood(item[0].name)
              
          }}>
          <View style={[styles.containnerMultiRow,{backgroundColor:colorsHint[index]}]}>
          <Text style={styles.hintSearch}>
            {item[0].name}
            </Text>
          </View>
          </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            searchFood(item[1].name)
          }}
        >
        <View style={[styles.containnerMultiRow,{backgroundColor:colorsHint[index]}]}>
          <Text style={styles.hintSearch} {...item[1]}>
            {item[1].name}
            </Text>
          </View>
        </TouchableOpacity>
          
           
          </View>
        );
      },[]);
      const animationFade=()=>{
        return  Animated.timing(fadeValue,{
          toValue:1,
          duration:2000,
          useNativeDriver:true
          })
      }
     

      const renderItemCategory = React.useCallback(({item})=>{
                return (
                    <Animated.View  animation = {textInputFossued?"fadeInLeft":""}
                                                                duration = {400}>
                    <TouchableOpacity>
                    <ImageBackground style={styles.bgImage} source={item.img}>
                            <View style={styles.conntainerTextImage}>
                                <Text style={styles.textImage}>
                                    {item.name}
                                </Text>
                            </View>
                    </ImageBackground>
                    </TouchableOpacity>
              
                </Animated.View>
                )
      },[])
      const keyExtractor = React.useCallback((item) => {
        return item.id;
      }, []);
        return(
            <View style={styles.containner}>
            <View style ={styles.TextInput}>
                            <Animatable.View 
                                    animation = {textInputFossued?"fadeInRight":"fadeInLeft"}
                                    duration = {400}
                                    >
                                 <TouchableOpacity 
                                    onPress = {()=>{
                                       // if(textInputFossued)
                                       // setTextInputFossued(true)
                                        searchFood(valueSearch)
                                            }}
                                 >
                                 <Image style={styles.back} source={icons.search}/> 
                                 </TouchableOpacity>
                                 
                            </Animatable.View>

                            <TextInput 
                                style ={{width:"90%",fontSize:16}}
                                placeholder ="Tìm kiếm..."
                                autoFocus = {false}
                                value={valueSearch}
                                ref={textInput}
                                onFocus = {()=>{
                                    setTextInputFossued(true) 
                                    setShowHint(true)                           
                                }} 

                                onBlur = {()=>{
                                    setTextInputFossued(false)
                                }}
                                onChangeText={updateText}
                            />

                            <Animatable.View
                                     animation = {textInputFossued?"fadeInLeft":""}
                                    duration = {400}
                                    >
                         <TouchableOpacity
                          onPress ={()=>{
                                        textInput.current.clear()  
                                         
                                }}>
                         <Image style={styles.cancle} source={icons.cancle}/>
                         </TouchableOpacity>
                            </Animatable.View>
            </View>
                        <View style={
                             styles.containnerLine
                            }>          
                       </View>
                 
                       {showHint ?
                      <View style={{top:60}}>
                      <View style ={styles.containnerHint}>
                           <View style={styles.titlePopular}>
                               <Text style={styles.textPopular}>
                               Phổ biến</Text>
                           </View>
                           <FlatList
                           style={styles.listHint}
                           data={dummyData.hintSearch}
                           showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                           horizontal={true}
                           renderItem={renderItem}
                           keyExtractor={keyExtractor}
                           >
                           </FlatList>
                              
                     </View>
                     <View style ={styles.containnerCategory}>
                            <View style={styles.titlePopular}>
                               <Text style={styles.textPopular}>
                               Danh mục & Loại món ăn
                               </Text>
                            
                           <FlatList
                           style={styles.listCategory}
                           data={dummyData.categoriesSearch}
                           showsVerticalScrollIndicator ={false}
                           showsHorizontalScrollIndicator={false}
                           scrollEnabled={false}
                           numColumns={2}
                           renderItem={renderItemCategory}
                           keyExtractor={(item)=>item.id}
                           >
                           </FlatList>
                           </View>
                    </View>
                      </View> 
                 : 
                 <FlatList
                style={styles.foodResult}
         showsVerticalScrollIndicator ={false}
         data={[0]}
         renderItem={({item})=>(
           <FoodRecipeResult props={dataResult} nameFood={valueSearch}/>
         )}
         keyExtractor={(item,index)=>String(index)}
        >
        </FlatList>
           
                  }

            </View>
        )
}

export default Search

const styles = StyleSheet.create({
    containner:{
      flex:1,
      backgroundColor:'white'
    },
    containnerLine:{
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 3,
        top:70,
        shadowColor:'#f8f8fc',
        shadowOpacity: 5.5,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    TextInput:{
        flex:0.1,
        borderWidth:1,
         borderRadius:22,
         marginHorizontal:0,
         borderColor:COLORS.lightGray,
         flexDirection:"row",
         justifyContent:"space-evenly",
         alignContent:"center",
         alignItems:"center",
         paddingLeft:10,
         paddingRight:10,
         top:55,
         marginLeft:30,
         marginRight:30,
         backgroundColor:COLORS.lightGray,
         
      },
    containnerCategory:{
        top:50
    },
    back:{
        width:20,
        height:20,
        tintColor:COLORS.lightGreen2,
        marginRight:10
     },
     cancle:{
        width:20,
        height:20
     },
     titlePopular:{
         marginLeft:30
    },
    textPopular:{
        color:COLORS.gray,
        ...FONTS.body3
    },
     containnerHint:{
        top:30
     },
     listHint:{
         backgroundColor:'white',
        flexDirection:'row',
        marginLeft:10
     },
     hintSearch:{
        color:'white',
        ...FONTS.body3
     },
     containnerHintSearch:{
         marginLeft:10
     },
     containnerMultiRow:{
         borderRadius:15,
         marginTop:10,
         left:4,
         padding:5,
         paddingLeft:10,
         paddingRight:10,
         alignSelf: 'center',
     },
     bgImage:{
        width:170,
        height:80,
        borderRadius: 10,
        overflow: "hidden",
        marginTop:10,
       marginLeft:10,
     
      },
    textImage:{
        color:'white',
        ...FONTS.h3,
        alignSelf:'flex-start',
        top:50,
        marginLeft:15
      },
    listCategory:{
        backgroundColor:'white',
        flexDirection:'row',
        marginLeft:-20
      },
    conntainerTextImage:{
          width:200,
          height:100,
          backgroundColor:COLORS.transparentBlack3
      },
    foodResult:{
        top:60,
       marginVertical:10,
       marginBottom:70,
        flex:1
        }

})