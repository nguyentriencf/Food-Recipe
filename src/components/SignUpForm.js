import React from "react";
import {Text,TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomButton} from '../components';
import {COLORS, FONTS} from '../../constants'
import { AuthContext } from "../navigation/AuthProvider";
import LoginScreen from "./LoginScreen";
const SignUpForm = () =>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] =React.useState('');
    const [confirm,setConfirm] =React.useState('');
    const [messageError,setMessageError] =React.useState('')
    const [messageEmailError,setMessageEmailError] =React.useState('')
    const [isError,setIsError] =React.useState(false)
    const {register} =React.useContext(AuthContext)
    const [isFocusedEmail,setIsFocusedEmail] =React.useState(false)
    const [isFocusedPass,setIsFocusedPass] =React.useState(false)
    const [isFocusedConfirmPass,setIsFocusedConfirmPass] =React.useState(false)
    const [isOpenLogin,setIsOpenLogin] =React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const validatePassword =()=>{
        return password === confirm 
    }

    const showMessageError =()=>{
        setIsError(true)
        setMessageError('Password không khớp')
    }
    const Register = ()=>{
        register(email,password).then(()=>{
          console.log('success')
        }).catch((error)=>{
          const er =  String(error).split(':')[1]
          const indexMessage = parseInt(er.indexOf(']'))+1;
          const messageError = er.slice(indexMessage).trim();
          if(messageError.includes('email')) setMessageEmailError(messageError)
          else setMessageError(messageError)
        })
    }
    const handleChangeVisible =(isVisible)=>{
        setModalVisible(isVisible);
        setIsOpenLogin(false)
}
    return(
        <View
        style ={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Email</Text>
                  <TextInput
                     onFocus={()=>{setIsFocusedEmail(true)}}
                    onBlur={()=>{setIsFocusedEmail(false)}}
                  value={email}
                  onChangeText={(text)=>{setEmail(text)}}
                  keyboardAppearance='dark'
                  style={[styles.inputStyle,{borderColor : isFocusedEmail ? COLORS.lightGreen2 : '#1f1f1f'}]}
       />
            </View>
            {
                messageEmailError ?     
           <View>
                <Text style={{color:'red',...FONTS.body3}}>{messageEmailError}</Text>
           </View> : null
           }
             <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Mật khẩu </Text>
                  <TextInput
                    secureTextEntry={true}
                   onFocus={()=>{setIsFocusedPass(true)}}
                    onBlur={()=>{setIsFocusedPass(false)}}
                   value={password}
                   onChangeText={(text)=>{setPassword(text)}}
                  textContentType="password"
                  keyboardAppearance='dark'
                  style={[styles.inputStyle,{borderColor : isFocusedPass ? COLORS.lightGreen2 : '#1f1f1f'}]}
       />
       </View>
            <View style={styles.viewContainer}>
                <Text style={{color:'white',margin:10}}>Nhập lại mật khẩu </Text>
                  <TextInput
                    secureTextEntry={true}
                   onFocus={()=>{setIsFocusedConfirmPass(true)}}
                    onBlur={()=>{setIsFocusedConfirmPass(false)}}
                   value={confirm}
                   onChangeText={(text)=>{setConfirm(text)}}
                  textContentType="password"
                  keyboardAppearance='dark'
                  style={[styles.inputStyle,{borderColor : isFocusedConfirmPass ? COLORS.lightGreen2 : '#1f1f1f'}]}
       />
       </View>

       {
           messageError ?     
           <View>
                <Text style={{color:'red',...FONTS.body3}}>{messageError}</Text>
           </View> : null
       }
        
       <View style={styles.viewContainer}>
       {
                        email.length !== 0 && password.length !== 0 && confirm.length !==0  ?  <CustomButton buttonText="Đăng ký"
                      buttonContainerStyle={{
                          paddingVertical:18,
                          borderRadius:20,
                          paddingHorizontal:10
                      }}
                     colors ={[COLORS.darkGreen,COLORS.lime]}
                     onPress={()=>
                     {
                        validatePassword() ? Register()  : showMessageError()
                     }
                     
                     }/>  : null 
                    }
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
                     <TouchableOpacity onPress={()=>{setIsOpenLogin(true);setModalVisible(true)} }>
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
       
            {
                isOpenLogin ?  <LoginScreen value={modalVisible} onChange={handleChangeVisible}/> :null
            }
            </View>
     
    )
} 

export default SignUpForm;


const styles = StyleSheet.create({
    container:{
        flex:1,
        height:700,
        marginTop:30
    },
    viewContainer:{
        marginTop:20
    },
    inputStyle:{
                paddingVertical:10,
                height:60,
                width:'100%',
                borderColor:'#1f1f1f',
                backgroundColor:'#171717',
                color:'white',
                borderWidth:2,
                borderRadius:15,
                fontSize:20,
                 },
        
})

