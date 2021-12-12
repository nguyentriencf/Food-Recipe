import React, {useState} from "react";
import { View,Text, StatusBar, Modal, StyleSheet,KeyboardAvoidingView,TextInput } from "react-native";
import {COLORS,FONTS,SIZES,icons} from '../../constants';
import {CustomButtonIcon,LoginForm} from '../components'
const LoginScreen = ({modalVisible})=>{
    const renderHeader =() =>{
        return(
            <View 
             style={styles.renderHeader}
           >
               <CustomButtonIcon
                icons={icons.back}
                onPress={()=>console.log('pressed')}
               buttonContainerStyle={styles.customButtonIconStyle}
               />
                <Text 
                    style = {{
                            marginLeft:30,
                            color: COLORS.white,
                            ...FONTS.largeTitle,
                            lineHeight:45,
                             marginTop:SIZES.radius,

                        }}>
                            Đăng nhập
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
                    Tuỳ chọn đăng nhập.
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
                <LoginForm/>
                
            </View>
        )
    }
    return(
        <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
             <Modal
         visible={modalVisible}
        presentationStyle='overFullScreen'
      >
         <StatusBar barStyle="light-content"/>
        <View   style={styles.viewContainer }>
        {renderHeader()}
        {renderFormalLogin()}
        </View>
        </Modal>

        </KeyboardAvoidingView>
       
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    viewContainer:{  
            flex:1,
            backgroundColor:COLORS.black
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
                    height:45,
                    width:45,
                    paddingHorizontal:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
               },
    renderFormalLoginStyle:{
                // flex:1,
                  paddingHorizontal:15,
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
               }
})