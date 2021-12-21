import React from "react";
import {View, Text,Touchable,Modal, StyleSheet, Animated,TouchableOpacity} from 'react-native'
import {COLORS,FONTS,SIZES,icons} from '../../constants';
import {CustomButtonIcon} from '../components';

const PreparationStep = (props) =>{
    const [isVisable,setIsVisavle] =React.useState(props.Value)
    const HEADER_HEIGHT = 350;
const scrollY = React.useRef(new Animated.Value(0)).current;
     const [step,setFood] = React.useState(props.foodSelect.content.preparationSteps);
       const renderDetail = React.useCallback(({item})=>{
            return (
                item.map((value,i) =>{
                    return(
                        <View key={props.foodSelect.id} style={{padding:10, top:30,marginLeft:10}}>
                            <View >
                                <Text style={{...FONTS.h2, color:COLORS.black}}>
                                    {`Step ${i +1}`}
                                </Text>
                                <Text style={{...FONTS.body3}}>
                                    {value}
                                </Text>
                            </View>
                        </View>
                    )
                })
        )
        },[])
          const renderHeaderBar =()=>{
            return(
                <View 
                style={{
                    position:'relative',
                    top:0,
                    left:0,
                    right:0,
                    height:50,
                    paddingHorizontal:SIZES.padding,
                }}>
                    <View style={{
                       // flex:1,
                        flexDirection:'row',
                        alignItems:'center',
                        top:40
                    }}>
               
                    <CustomButtonIcon
                icons={icons.back}
                // onPress={()=>{handleCloseModalRecipe(),setIsVisavle(!isVisable),closeModal()}}
                onPress={()=>{setIsVisavle(false);handleCloseStep(); }}
               buttonContainerStyle={styles.customButtonBackIcon}
               />
                
               <Text  
                    style={{left:20,
                        ...FONTS.h1,
                         color:COLORS.darkGreen}}
               >
                   Preparation Step
               </Text>
                    </View>
                </View>
            )
        }
        function handleCloseStep(){
            props.onChange(true)
        }
    return(
         <Modal
            visible={isVisable}
            presentationStyle='fullScreen'
            style={styles.container}
        >
            <View style={{
                flex:1,
                backgroundColor:COLORS.white
            }}>
            {renderHeaderBar()}

                <Animated.FlatList
                    data={[step]}         
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {nativeEvent:{contentOffset:{y:scrollY}}}
                    ],{useNativeDriver:true})}
                    renderItem={renderDetail}
                    keyExtractor={(item,index)=>{String(index)}}
                />
            </View>
        </Modal>
    )
}

export default PreparationStep;

const styles=StyleSheet.create({
    container:{
                flex: 1,
                backgroundColor:COLORS.black
    },
    customButtonBackIcon:{
          marginTop:0,
          borderWidth:3,
          borderColor:COLORS.darkLime,
          height:35,
          width:35,
          paddingHorizontal:1,
          borderRadius:10,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:COLORS.gray3
    },

    
})