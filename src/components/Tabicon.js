import React from 'react';
import {View,Image,Text} from 'react-native';
import {COLORS,} from '../../constants';

const Tabicon = ({focused,icon,name}) =>{
    return(
        <View 
            style={{
                alignItems:'center',
                justifyContent:'center',
                height:80,
                width:50
            }}
        >
            <Image
            source={icon}
            resizeMode='contain'
            style={{
                height:30,
                width:30,
                tintColor:focused ? COLORS.darkGreen : COLORS.lightLime
            }}
            />
            <Text style={{fontSize:10,marginTop:5,color:focused ? COLORS.darkGreen : COLORS.lightLime }}>
                {name}
            </Text>
            {focused && 
            <View 
            style={{
                position:'absolute',
                left:0,
                right:0,
                bottom:0,
                height:5,
                borderTopLeftRadius:5,
                borderTopRightRadius:5,
                backgroundColor:COLORS.darkGreen
            }}/>
            }
        </View>
    )
}

export default Tabicon;