import React from 'react';
import {Text,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS,FONTS}from '../../constants';
const CustomButton = ({buttonText, buttonContainerStyle,colors,onPress}) =>{
    if(colors.length > 0){
        return(
            <TouchableOpacity 
                onPress={onPress}
            >
                <Text
                    style={{
                        textAlign:'center',
                        color:colors[0],
                        ...FONTS.h2
                    }}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        )
    }else{
         return(
            <TouchableOpacity 
             onPress={onPress}>
                <Text
                    style={{
                        textAlign:'center',
                        color:'red',
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