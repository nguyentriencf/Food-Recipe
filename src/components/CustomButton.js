import React from 'react';
import {Text,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS,FONTS}from '../../constants';
const CustomButton = ({buttonText,colors,onPress,buttonContainerStyle}) =>{
    if(colors.length > 0){
        return(
            <TouchableOpacity 
                onPress={onPress}
                
            >
                <LinearGradient 
                start={{x:0,y:0}}
                end={{x:0,y:1}}
                style={{...buttonContainerStyle}}
                colors={colors}
                >
                      <Text
                    style={{
                        textAlign:'center',
                        color:COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    {buttonText}
                </Text>

                </LinearGradient>
              
            </TouchableOpacity>
        )
    }else{
         return(
            <TouchableOpacity 
             onPress={onPress} 
               style={{
                     ...buttonContainerStyle
                 }}>
                <Text
                    style={{
                        textAlign:'center',
                        color:COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default CustomButton;