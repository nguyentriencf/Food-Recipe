import React from "react";
import {Image, TouchableOpacity,Modal} from "react-native";
import {COLORS} from '../../constants';

const CustomButtonIcon = ({icons,buttonContainerStyle,onPress}) =>{
     return(
            <TouchableOpacity 
             onPress={onPress} 
               style={{
                     ...buttonContainerStyle
                 }}>
               <Image
                   source={icons}
                  resizeMode='contain'
                style={{
                height:25,
                width:25,
                tintColor:COLORS.darkGreen 
            }}
               />
            </TouchableOpacity>
     )
}

export default CustomButtonIcon;