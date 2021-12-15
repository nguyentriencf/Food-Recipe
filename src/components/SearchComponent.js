import React,{useState,useRef} from 'react'
import {Image, StyleSheet, Text, View,TouchableWithoutFeedback, Modal,TextInput,FlatList,TouchableOpacity,Keyboard } from 'react-native'
import * as Animatable from 'react-native-animatable';
import {COLORS,filterData,icons} from "../../constants"
import filter from 'lodash/filter'
import FoodRepository from '../adapters/repositories/FoodRepository';
import FoodRecipeResult from './FoodRecipeResultComponent';
import localStorage from '../adapters/infrastructures/localStorage';
export default function SearchComponent() {

   
        const [data, setData] =  useState([...filterData])
        const [modalVisible, setModalVisible] = useState(false)
        const [textInputFossued,setTextInputFossued] = useState(true)
        const [showHint,setShowHint] =useState(true)
        const [isHintEmpty,setHintEmpty] =useState(true)
        const textInput = useRef(0)
        const [valueInput,setValueInput] = useState('')
        const [dataResult,setDataResult] = useState([])
       const [dataSearch,setDataSearch] =useState([])

const contains = ({name},query)=>{
    if(name.includes(query)){
        return true
    }
    return false
}
const initDataFood =()=>{

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
}

const handleSearch = text =>{
    setShowHint(true)
    setValueInput(text)
    const dataS = filter(filterData, userSearch =>{
        return contains(userSearch,text)
    })
    if(dataS.length === 0){
        setHintEmpty(false)
    }else{
        setHintEmpty(true)
    }
    setData([...dataS])
}
const searchFood = (text)=>{
    setValueInput(text)
    const query = text.toLowerCase().trim();
    const tmpData = dataSearch;
   const rs = tmpData.filter(item => item.display.displayName.toLowerCase().includes(query))
   setDataResult(rs)
}
    return (
        <View style = {{alignItems:"center",marginBottom:10}}>
            <TouchableWithoutFeedback
                    onPress ={()=>{
                        setModalVisible(true)      
                        initDataFood();      
                    }}
                >
                <View style = {styles.SearchArea}>
                <Image style={styles.search} source={icons.search}/>
                     <Text style ={{fontSize:15,color:COLORS.lightGray3}}>Tìm kiếm món ăn?</Text>
                </View>
            </TouchableWithoutFeedback>

        <Modal
            animationType = "fade"
            transparent = {false}
            visible = {modalVisible}
            >
                <View style ={styles.modal}>
                    <View style = {styles.view1}>
                        <View style ={styles.TextInput}>
                            <Animatable.View 
                                    animation = {textInputFossued?"fadeInRight":"fadeInLeft"}
                                    duration = {400}
                                    >
                                 { textInputFossued && isHintEmpty  ?
                                 <TouchableOpacity 
                                    onPress = {()=>{
                                        if(textInputFossued)
                                        setModalVisible(false)
                                        setTextInputFossued(true)
                                        setData([...filterData])
                                        setShowHint(false)
                                            }}
                                 >
                                 <Image style={styles.back} source={icons.back}/> 
                                 </TouchableOpacity> :
                                 <TouchableOpacity 
                                    onPress = {()=>{
                                        if(textInputFossued)
                                        setTextInputFossued(true)
                                        setShowHint(false)
                                        searchFood(valueInput)
                                            }}
                                 >
                                 <Image style={styles.back} source={icons.search}/> 
                                 </TouchableOpacity>
                                 }
                            </Animatable.View>

                            <TextInput 
                                style ={{width:"90%",fontSize:16}}
                                placeholder ="Tìm kiếm..."
                                autoFocus = {false}
                                value={valueInput}
                                ref = {textInput}

                                onFocus = {()=>{
                                    setTextInputFossued(true)
                                    setShowHint(true)                           
                                }} 

                                onBlur = {()=>{
                                    setTextInputFossued(false)
                                }}

                                onChangeText ={handleSearch}
                            />

                            <Animatable.View
                                     animation = {textInputFossued?"fadeInLeft":""}
                                    duration = {400}
                                    >
                         <TouchableOpacity
                          onPress ={()=>{
                                        textInput.current.clear()  
                                        setData([...filterData])
                                        setHintEmpty(true)      
                                        setShowHint(false)
                                       
                                          
                                }}>
                         <Image style={styles.cancle} source={icons.cancel1}/>
                         </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </View>
    
          
                  {showHint ?
                    <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity 
                       onPress = {() =>{
                            Keyboard.dismiss
                          //  setModalVisible(false)
                            setTextInputFossued(true)
                            setData([...filterData])
                            setShowHint(false)
                            searchFood(item.name);
                                }} >
                    <View style={styles.view2}>
                        <Text style={{color:COLORS.lightGray2, fontSize:15 }}>{item.name}</Text>
                    </View>
              </TouchableOpacity>
                )}
            keyExtractor={item => item.id}
             /> : 
                <FlatList
                style={styles.foodResult}
        showsVerticalScrollIndicator ={false}
         data={[0]}
         renderItem={({item})=>(
            <FoodRecipeResult props={dataResult} nameFood={valueInput}/>
         )}
         keyExtractor={(item,index)=>String(index)}
        >
        </FlatList>
                  }
        
                </View>
        </Modal>

        </View>
    )
}


const styles = StyleSheet.create({
    container :{
        flex:1
    },

    text1:{
        color:COLORS.lightGray2,
        fontSize:16
    },
     search:{
         width:25,
         height:25,
         margin:10,
         tintColor:COLORS.lightGray3
     },
     back:{
        width:15,
        height:15,
        tintColor:COLORS.black
     },
     cancle:{
        width:15,
        height:15
     },
    TextInput:{
        borderWidth:1,
         borderRadius:12,
         marginHorizontal:0,
         borderColor:"#86939e",
         flexDirection:"row",
         justifyContent:"space-evenly",
         alignContent:"center",
         alignItems:"center",
         paddingLeft:10,
         paddingRight:10,
         padding:10,
         top:35
      },

    SearchArea:{
        marginTop :60,
        width:"90%",
        height:50,
        backgroundColor:COLORS.lightGray,
        borderRadius:12,
        flexDirection:"row",
        alignItems:"center"
      },

    searchIcon:{ fontSize:24,
                  padding:5,
                  color:COLORS.lightGray2,
      },

    view1:{ 
        height:70,
        justifyContent:"center",    
        paddingHorizontal:10,
      },

    view2:{
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
    },

    icon2 :{ fontSize:24,
            padding:5,
            color:COLORS.lightGray2,
    },
    modal :{
        flex:1
    },
    foodResult:{
    marginVertical:60,
    flex:1,
    bottom:30
    }

})
