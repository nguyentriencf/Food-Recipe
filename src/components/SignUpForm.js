import React from "react";
import {Text,TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomButton} from '../components';
// import {images, COLORS, SIZES, FONTS} from "../../constants";
import {COLORS} from '../../constants'
import { AuthContext } from "../navigation/AuthProvider";
const SignUpForm = () =>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] =React.useState('');
    const [confirm,setConfirm] =React.useState('');
    const {register} =React.useContext(AuthContext)
    return(
        <View
        style ={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Email</Text>
                  <TextInput
                  value={email}
                  onChangeText={(text)=>{setEmail(text)}}
                  keyboardAppearance='dark'
        style={styles.inputStyle}
       />
            </View>
             <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Mật khẩu </Text>
                  <TextInput
                   value={password}
                   onChangeText={(text)=>{setPassword(text)}}
                  textContentType="password"
                  keyboardAppearance='dark'
        style={styles.inputStyle}
       />
       </View>
            <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Nhập lại mật khẩu </Text>
                  <TextInput
                   value={confirm}
                   onChangeText={(text)=>{setConfirm(text)}}
                  textContentType="password"
                  keyboardAppearance='dark'
        style={styles.inputStyle}
       />
       </View>
       <View style={styles.viewContainer}>
                    <CustomButton buttonText="Đăng ký"
                      buttonContainerStyle={{
                          paddingVertical:18,
                          borderRadius:20,
                          paddingHorizontal:10
                      }}
                     colors ={[COLORS.darkGreen,COLORS.lime]}
                     onPress={()=>{register(email,password)}}/>
                     <View 
                      flexDirection="row"

                      style={{justifyContent:'center',alignItems:'center',marginTop:20}}
                    >
                           <Text style={{
                         color:'white',
                         fontSize:15
                    }}>
                         {`Bạn đã có tài khoản? `}
                     </Text>
                     <TouchableOpacity>
                         <Text 
                         style={{
                         color:COLORS.darkGreen,
                         fontWeight:'bold',
                         fontSize:15
                    }}
                     >Đăng nhập
                     </Text>
                     </TouchableOpacity>
                     </View>
                   
       </View>
       
            </View>
     
    )
} 

export default SignUpForm;


const styles = StyleSheet.create({
    container:{
        marginTop:30
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

