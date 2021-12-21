import React from "react";
import { View,StyleSheet,Text,Animated,Modal} from "react-native"
import LottieView from 'lottie-react-native';
import  {animation,FONTS,COLORS}  from "../../constants";
import FoodRecipeResult from "../components/FoodRecipeResultComponent";
import localStorage from '../adapters/infrastructures/localStorage'
import DataFoodStorage from "../adapters/repositories/dataFoodStorage";
import FoodRepository from "../adapters/repositories/FoodRepository";
const SplashLoading = ({navigation })=>{

    const [fadeValue,setFadeValue] =React.useState(new Animated.Value(0))
    const [modalVisible,setModalVisible] =React.useState(true)
    let [foodListPopular,setFoodPopular] = React.useState([])
    React.useEffect(()=>{
        
       // DataFoodStorage.breakfast();
        // DataFoodStorage.lunch();
       // DataFoodStorage.dinner();
      //  DataFoodStorage.brunch(); 
     // DataFoodStorage.dessert(); 
     //DataFoodStorage.appetizer()   
        const storage =new localStorage();
        const foodList =  storage.get('foodList');
        foodList.then(stores =>{
            stores.map( (result,i,store)=>{   
            if (store[i][1] !== null){
            const items = JSON.parse(store[i][1]);
             foodListPopular =items;
             setFoodPopular([...foodListPopular.feed])
            }else{
                 FoodRepository.getListFood().then(async(data)=>{
                     const storage = new localStorage()
                    await storage.set('foodList',data)
                 })
            }
        })   
          });     
         AnimationFadeIn().start()
         setTimeout(()=>{
           AnimationFadeOut().start()
         },2000)
         setTimeout(()=>{
            setModalVisible(false)
           navigation.navigate("Home",{data:foodListPopular})
         },3000)
    },[])

    const AnimationFadeIn =()=>{
        return Animated.timing(fadeValue,{
            toValue:1,
            duration:3000,
            useNativeDriver:true
        })
    }

    const AnimationFadeOut =()=>{
        return Animated.timing(fadeValue,{
            toValue:0,
            duration:1000,
            useNativeDriver:true
        })
    }

    return (
       <Modal
        animationType = "fade"
            transparent = {false}
            visible = {modalVisible}>
   <View style={styles.container}>
         <LottieView style={styles.splashLoading} source={animation.loadingCooking} autoPlay loop />
            <Animated.Text style={[styles.text,{opacity:fadeValue}]}>
                Food recipe
            </Animated.Text>
        </View>
       </Modal>
     
)
}


const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    splashLoading:{
        width:500,
        height:500,
        alignSelf:'center',
        top:50
    },
    text:{
        flex:0.5,
        color:COLORS.black,
        ...FONTS.body2,
        alignSelf:'center',
        marginTop:-50
    }
})

export default SplashLoading