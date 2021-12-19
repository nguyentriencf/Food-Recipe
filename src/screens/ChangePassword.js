import React from "react"
import { View,Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert } from "react-native"
import { COLORS,FONTS,icons } from "../../constants"
import { AuthContext } from "../navigation/AuthProvider"
const ChangePassword = ({navigation})=>{
    const [oldPassword,setOldPassword] =React.useState('')
    const [newPassword,setNewPassword] =React.useState('')
    const [confirm,setConfirm] =React.useState('')

    const {changePassword,currenUser} = React.useContext(AuthContext)

    const validatePassword =()=>{
        return newPassword === confirm 
    }
    const checkInputEmpty =()=>{
       return oldPassword.length !==0 && newPassword.length !==0 && confirm.length !==0 
    }
    const resetForm =()=>{
        navigation.navigate('Setting')
        setConfirm('')
        setNewPassword('')
        setOldPassword('')
    }
    const updatePassword = ()=>{
       const authen = changePassword(oldPassword)
        authen.then(()=>{
            currenUser.updatePassword(newPassword).then(()=>{
                console.log('update success')
                Alert.alert('Cập nhật mật khẩu thành công',null,
                [
                    { text: "OK", onPress: () =>resetForm()
                    }
                ])

            }).catch((error)=>{
                console.log('update fail',error)
                Alert.alert('Cập nhật mật khẩu thất bại')
            })
    }).catch((error)=>{
        console.log(error)
         Alert.alert('Mật khẩu không đúng')
    })
    }

    return (
        <View style={styles.containner}>
         <View style={styles.containnerTitle}>
         <TouchableOpacity style={styles.containnerTouch} onPress={()=>{
            navigation.navigate('Setting')
        }}>
             <Image style={{width:15,height:15,marginLeft:10,marginTop:60}} source={icons.back}></Image>
              <Text style={{...FONTS.body3,marginLeft:5,marginTop:55}}>
                  Cài đặt
              </Text>
          </TouchableOpacity>
            <Text style={{...FONTS.h2,marginLeft:50,marginTop:50}}>
                  Đổi mật khẩu
              </Text>
                {
                    checkInputEmpty() ? 
                    <TouchableOpacity
                    onPress={()=>{
                        validatePassword() ? updatePassword() : Alert.alert("Mật khẩu mới không khớp")
                    }}>
                        <Text style={{...FONTS.body3,marginLeft:50,marginTop:55}}>
                        Xác nhận
                        </Text>
                    </TouchableOpacity>
             : null
                }
             
         </View>
         <View style={styles.containnerForm}>

         <View style={styles.containnerItem}>
                     <View style={styles.containnerInput}>
                     <Text style={styles.text}>Hiện tại</Text>
                    <TextInput
                     style={styles.textInput}
                     value={oldPassword}
                     onChangeText={text=>setOldPassword(text)}
                     placeholder="Nhập mật khẩu cũ"
                     >
                    </TextInput>
                     </View>
        </View>

        <View style={styles.containnerItem}>
                     <View style={styles.containnerInput}>
                     <Text style={styles.text}>Mới</Text>
                    <TextInput
                     style={styles.textInput}
                     value={newPassword}
                     onChangeText={text=>setNewPassword(text)}
                     placeholder="Nhập mật khẩu mới"
                     >
                    </TextInput>
                     </View>
        </View>

        <View style={styles.containnerItem}>
                     <View style={styles.containnerInput}>
                     <Text style={styles.text}>Xác nhận</Text>
                    <TextInput
                     style={styles.textInput}
                     value={confirm}
                     onChangeText={text=>setConfirm(text)}
                     placeholder="Xác nhận mật khẩu mới"
                     >

                    </TextInput>
                     </View>
        </View>
        </View>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    containner:{
        flex:1,
        backgroundColor:COLORS.lightGray
    },
    containnerForm:{
     marginTop:40
    },
    containnerItem:{
        backgroundColor:COLORS.white,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    containnerTitle:{
        backgroundColor:COLORS.white,
        height:100,
        width:'100%',
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#d9d9d9'
     },
     containnerTouch:{
        flexDirection:'row',
        justifyContent:'flex-start'
     },
     containnerInput:{
        flexDirection:'row',
         marginLeft:30,
        borderBottomWidth:1,
        borderBottomColor:'#d9d9d9'
     },
     text:{
           color:COLORS.lightGray2,
           ...FONTS.body3,
           marginTop:15,
           width:'20%'
     },
     textInput:{
           marginLeft:10,
           marginTop:5,
           width:'70%'

     }
})