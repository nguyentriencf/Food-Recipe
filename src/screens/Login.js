import React,{ useState }  from 'react';
import {
    View,
    Text,
    StatusBar,
    ImageBackground,
  
} from 'react-native';
import {images, COLORS, SIZES, FONTS} from "../../constants";
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton, LoginScreen,SignUpScreen} from "../components";
const Login = ({ navigation }) => {
    React.useEffect(()=>{
        StatusBar.setHidden(true)

    },[]) 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSignUp, setModalVisibleSignUp] = useState(false);
    
    const renderHeader =()=> {
            return (
            <View
            style={{height: SIZES.height >700 ?"65%": "60%"}
            }>
                <ImageBackground
                source={images.loginBackground}
                style={{
                flex:1,
                justifyContent:'flex-end',
                }}
                resizeMode="cover">
                    <LinearGradient
                    start={{x:0,y:0}}
                     end= {{x:0,y:1}}
                     colors={[COLORS.transparent,
                     COLORS.black]}
                     style={{height:200,
                     justifyContent:'flex-end',
                     paddingHorizontal:SIZES.padding
                    }}
                    >
                        <Text 
                        style = {{
                            width:"80%",
                            color: COLORS.white,
                            ...FONTS.largeTitle,
                            lineHeight:45
                        }}
                        >
                            Cooking Delicious Food Easily
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
     }
     const renderDetail = () =>{
         return(
             <View
             style = {{flex:1,
             paddingHorizontal:SIZES.padding}}>
                 <Text style={{width:'70%',
                marginTop:SIZES.radius,
                color:COLORS.gray,
                ...FONTS.body3}}>
                     Disvover more than 1200 food recipe in your hands and cooking easily
                 </Text>
                 <View  style={{
                     flex:1,
                     justifyContent:'center'
                 }}>
                     <CustomButton
                      buttonText="Đăng nhập"
                      buttonContainerStyle={{
                          paddingVertical:18,
                          borderRadius:20,
                          paddingHorizontal:10,
                          borderWidth:1,
                          borderColor:COLORS.darkLime,
                      
                      }}
                     colors ={[COLORS.darkGreen,COLORS.lime]}
                     onPress={()=>setModalVisible(true)}
                     />
                      <CustomButton
                      buttonText="Đăng ký"
                       buttonContainerStyle={{
                        marginTop:SIZES.radius,
                        paddingVertical:18,
                          borderRadius:20,
                          borderWidth:1,
                          borderColor:COLORS.darkLime
                      }}
                      colors ={[COLORS.darkGreen,COLORS.lime]}
                     onPress={()=>setModalVisibleSignUp(true)}
                     />
                 </View>
             </View>
         )
     }
     const handleChangeVisible =(isVisible)=>{
             setModalVisible(isVisible);
     }
        const handleChangeVisibleSignUp =(isVisible)=>{
             setModalVisibleSignUp(isVisible);
     }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
         >
          <LoginScreen value={modalVisible} onChange={handleChangeVisible}/> 
      <SignUpScreen value={modalVisibleSignUp} onChange={handleChangeVisibleSignUp} />
              <StatusBar barStyle="light-content"/>
             {renderHeader()}
            {renderDetail()}   
        </View>     
    )
}

export default Login;