import React, {useState,useEffect} from "react";
import { View,Text, StatusBar, Modal, StyleSheet,KeyboardAvoidingView,TextInput,ScrollView, TouchableWithoutFeedback,Keyboard } from "react-native";
import {COLORS,FONTS,SIZES,icons} from '../../constants';
import {CustomButtonIcon,SignUpForm} from '../components'
const SignUpScreen = (props)=>{
    const[openModal,setOpenModal] = useState(props.value)
        React.useEffect(()=>{
                setOpenModal(props.value)
        })


    const callChangeVisible =()=>{
        props.onChange(false)
    }
    const renderHeader =() =>{
        return(
            <View 
             style={styles.renderHeader}
           >
               <CustomButtonIcon
                icons={icons.back}
                onPress={()=>{setOpenModal(!openModal);callChangeVisible()}}
               buttonContainerStyle={styles.customButtonIconStyle}
               />
                <Text 
                    style = {{
                            marginLeft:30,
                            color: COLORS.white,
                            ...FONTS.h1,
                            lineHeight:45,
                             marginTop:8,

                        }}>
                            Đăng ký
                </Text>
              
            </View>
        )
    }
    const renderFormalLogin = () =>{
        return(
            <View 
            style={styles.renderFormalLoginStyle}
            >
                <Text 
                style={{
                     color: COLORS.gray,
                            ...FONTS.h3,
                            lineHeight:45,
                }}
                >
                    Tuỳ chọn đăng ký.
                </Text>
                <View
                 flexDirection="row"
                    style={{
                         paddingHorizontal: 8,
                         justifyContent:'space-between'
                    }}
                >
                             <CustomButtonIcon
                     icons={icons.facebook}
                onPress={()=>console.log('pressed')}
                  buttonContainerStyle={styles.buttonContainerFacebookStyle}
               />
                        <CustomButtonIcon
                     icons={icons.gmail}
                onPress={()=>console.log('pressed')}
                  buttonContainerStyle={styles.buttonContainerGmailStyle}
               />

                </View>
                <SignUpForm/>   
            </View>
        )
    }
    return(
         <Modal 
        visible={openModal}
        presentationStyle='fullScreen'
        style={styles.containerModal}
        >
        <KeyboardAvoidingView
        style={{flex:1}}
        //  behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
         {/* <StatusBar barStyle="light-content"/> */}
        <View   style={styles.viewContainer }>
        {renderHeader()}
        {renderFormalLogin()}
        </View>       
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
        </Modal>
       
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    viewContainer:{  
            flex:1,
            backgroundColor:COLORS.black,
            // height:"100%"
            },
    renderHeader:{
                  paddingHorizontal:SIZES.padding,
                  flexDirection:"row",
                width:'100%',
                height:100
             },
    customButtonIconStyle:{
                    marginTop:SIZES.radius,
                    borderWidth:2,
                    borderColor:COLORS.darkLime,
                    height:40,
                    width:45,
                    paddingHorizontal:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
               },
    renderFormalLoginStyle:{
                // flex:1,
                  paddingHorizontal:10,
                  height:"100%"
            },
            buttonContainerFacebookStyle:{
                    marginTop:SIZES.radius,
                    borderWidth:2,
                    borderColor:'#1f1f1f',
                    height:70,
                    width:170,
                    // paddingHorizontal:1,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#171717'
            },
            buttonContainerGmailStyle:{
                    marginTop:SIZES.radius,
                    borderWidth:2,
                    borderColor:'#1f1f1f',
                    height:70,
                    width:170,
                    // paddingHorizontal:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#171717'
               },
     containerModal:{
            flex:1,
            backgroundColor:COLORS.black,
            height:'100%'
    }
               
})