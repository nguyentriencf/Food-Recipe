import React from "react";
import {Text,TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomButton} from '../components';
// import {images, COLORS, SIZES, FONTS} from "../../constants";
import {COLORS,SIZES,FONTS} from '../../constants'
const LoginForm = () =>{
    return(
        <View
        style ={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Email</Text>
                  <TextInput
                  keyboardAppearance='dark'
        style={styles.inputStyle}
       />
            </View>
             <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Mật khẩu </Text>
                  <TextInput
                  textContentType="password"
                  keyboardAppearance='dark'
        style={styles.inputStyle}
       />
       <View style={styles.viewContainer}>
                    <CustomButton buttonText="Đăng nhập"
                      buttonContainerStyle={{
                          paddingVertical:18,
                          borderRadius:20,
                          paddingHorizontal:10
                      }}
                     colors ={[COLORS.darkGreen,COLORS.lime]}
                     onPress={()=>console.log('presses')}/>
                     <View 
                      flexDirection="row"

                      style={{justifyContent:'center',alignItems:'center',marginTop:20}}
                    >
                           <Text style={{
                         color:'white',
                         fontSize:15

                         
                    }}>
                         {`Bạn chưa có tài khoản? `}
                     </Text>
                     <TouchableOpacity>
                         <Text 
                         style={{
                         color:COLORS.darkGreen,
                         fontWeight:'bold',
                         fontSize:15
                    }}
                     >Đăng Ký 
                     </Text>
                     </TouchableOpacity>
                     </View>
                   
       </View>
       
            </View>

       
        </View>
     
    )
} 

export default LoginForm;


const styles = StyleSheet.create({
    container:{
        marginTop:30,
    },
    viewContainer:{
        marginTop:20
    },
    inputStyle:{
                paddingVertical:10,
                 height:65,
                 width:'100%',
                 borderColor:'#1f1f1f',
                backgroundColor:'#171717',
                color:'white',
                borderWidth:2,
                borderRadius:15,
                fontSize:20,
                 },
        
})

