import React,{useState,useRef} from 'react'
import {Image, StyleSheet, Text, View,TouchableWithoutFeedback, Modal,TextInput,FlatList,TouchableOpacity,Keyboard } from 'react-native'
import * as Animatable from 'react-native-animatable';
import {COLORS,filterData,icons} from "../../constants"
import filter from 'lodash/filter'


export default function SearchComponent() {

   
        const [data, setData] =  useState([...filterData])
        const [modalVisible, setModalVisible] = useState(false)
        const [textInputFossued,setTextInputFossued] = useState(true)
        const [showHint,setShowHint] =useState(false)
        const [isHintEmpty,setHintEmpty] =useState(true)
        const textInput = useRef(0)

const contains = ({name},query)=>{
    if(name.includes(query)){
        return true
    }
    return false
}


const handleSearch = text =>{
    setShowHint(true)
    const dataS = filter(filterData, userSearch =>{
        return contains(userSearch,text)
    })
       console.log(dataS)
    if(dataS.length === 0){
        setHintEmpty(false)
    }else{
        setHintEmpty(true)
    }
    setData([...dataS])
}

    return (
        <View style = {{alignItems:"center",marginBottom:10}}>
            <TouchableWithoutFeedback
                    onPress ={()=>{
                        setModalVisible(true)
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
                                      //  setModalVisible(false)
                                        setTextInputFossued(true)
                                        setShowHint(false)
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
                         <Image style={styles.cancle} source={icons.cancle}/>
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
                                }} >
                    <View style={styles.view2}>
                        <Text style={{color:COLORS.lightGray2, fontSize:15 }}>{item.name}</Text>
                    </View>
              </TouchableOpacity>
                )}
            keyExtractor={item => item.id}
             /> : null
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
         top:25
  
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
    }

})
