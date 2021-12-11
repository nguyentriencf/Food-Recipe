import React from "react";
import { View,Text, StatusBar, Modal } from "react-native";
import {COLORS,FONTS,SIZES,icons} from '../../constants';

import {CustomButtonIcon} from '../components'
const LoginScreen = ({modalVisible})=>{
    const renderHeader =() =>{
        return(
            <View 
             style={{
                 flex:1,
                  paddingHorizontal:SIZES.padding,
                  flexDirection:"row",
                width:'100%',
                height:150
             }}
           >
               <CustomButtonIcon
                icons={icons.back}
                onPress={()=>console.log('presses')}
               buttonContainerStyle={{
                    marginTop:SIZES.radius,
                    borderWidth:2,
                    borderColor:COLORS.darkLime,
                    height:45,
                    width:45,
                    paddingHorizontal:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
               }}
               />
                <Text 
                    style = {{
                            marginLeft:60,
                            color: COLORS.white,
                            ...FONTS.largeTitle,
                            lineHeight:45,
                             marginTop:SIZES.radius,

                        }}>
                            Sign up
                </Text>
            </View>
        )
    }
    const renderFormalLogin = () =>{
        return(
            <View 
            style={{
                flex:1,
                paddingHorizontal: SIZES.padding
            }}
            >
            </View>
        )
    }
    return(
        <Modal
         visible={modalVisible}
        presentationStyle='overFullScreen'
      >
         {/* <StatusBar barStyle="light-content"/> */}
        <View   style={{
            flex:1,
            backgroundColor:COLORS.black
            }}>
        {renderHeader()}

        </View>
        </Modal>
    )
}

export default LoginScreen;