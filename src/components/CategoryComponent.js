import React from 'react'
import { FlatList,View,Text,StyleSheet,ImageBackground,TouchableOpacity,
ActivityIndicator,Animated,Modal }
 from "react-native";
import{FONTS,COLORS,dummyData} from '../../constants';
import { moderateScale } from "react-native-size-matters";
import RecipeCategoryResult from './SearchCategoryComponent';
const CategoryComponent = ()=>{
   
    let [categoryList,setCategoryList] = React.useState([])
    let [limit,setLimit] =React.useState(5)
    const [loadmore,setLoadmore] = React.useState('')
    const [isLoading,setIsLoading] =React.useState(false)
    const [fadeValue,setFadeValue] =React.useState(new Animated.Value(0))
    const [isVisible,setIsVisible] = React.useState(false)
    const [nameResult,setnameResult] =React.useState('')
    React.useEffect(()=>{
          const data = dummyData.categories.slice(0,limit);
          categoryList =[...data];
            setCategoryList(categoryList)
            setIsLoading(true)
            AnimationFade().start();
    },[])

    const AnimationFade =()=>{
        return Animated.timing(fadeValue,{
            toValue:2,
            duration:3000,
            useNativeDriver:true
        })
    }

    const refeshList =()=>{
        if( loadmore === 'Trở lại' && limit > dummyData.categories.length){
            setLoadmore('');
            limit =5
            setLimit(limit)
            const data =  dummyData.categories.slice(0,limit);
            setCategoryList([...data]);
            setIsLoading(true)
         }
    }
    const checkloadMore =()=>{
        limit +=5
        setLimit(limit); 
        if(limit > dummyData.categories.length){
              setLoadmore('Trở lại')
              setIsLoading(false)
        }else{
            const data =  dummyData.categories.slice(0,limit);
            setCategoryList([...data]);
            setIsLoading(true)
        }
   
    }
    const onChange = (isChange)=>{
        setIsVisible(isChange)
        setnameResult('')
    }

    const handleLoadMore= ()=>{
        setIsLoading(true)
        checkloadMore();
    }
    const renderLoading =()=>{
        return(
            isLoading ?
            <View style={styles.loading}>
            <ActivityIndicator size={'large'}/>
            </View>   : null
        )
    }
    return(
        <View style={styles.container}>
            <View style={styles.titleCategory}>
              <Text style={styles.textCategory} >Loại món ăn</Text>
              <TouchableOpacity onPress={()=>{
               refeshList()
              }}>
              <Text style={styles.loadMore}>{loadmore}</Text>
              </TouchableOpacity>
                
          </View>
        <FlatList
     
        data={categoryList}
        renderItem={({item})=>(
            <TouchableOpacity onPress={()=>{
                setIsVisible(true)
                setnameResult(item.name)
            }}>
            <Animated.View style={[styles.containerItem,{opacity:fadeValue}]}> 
           <ImageBackground style={styles.categoriesImg} source={item.image}>
            </ImageBackground>
            <View style={styles.containerText}>
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
            </View>
            </Animated.View>
            </TouchableOpacity>
        )}
        keyExtractor={(item,index)=>item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderLoading}
        />

        {
            isVisible ? 
            <RecipeCategoryResult nameFood={nameResult} onChange={onChange}/> : null
        }
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
       flex:0.5
    },
    titleCategory:{
        marginTop:20,
         marginLeft:20,
         flexDirection:'row',
         justifyContent:'space-between'
        },
    textCategory:{
            color:COLORS.black,
            ...FONTS.h2,
        },
    categoriesImg:{
        width:100,
        height:100,
        borderRadius:10,
        overflow:'hidden'
    },
    containerItem:{
        backgroundColor:COLORS.gray2,
        marginTop:10,
        borderRadius:10,
        width:'90%',
        marginLeft:20,
        justifyContent:'flex-start',
        flexDirection:'row'
        
    },
    item:{
        color:COLORS.black,
        ...FONTS.h2,
        marginLeft:20,
        maxWidth: moderateScale(150, 2)
    },
    type:{
        color:COLORS.lightGray2,
        ...FONTS.body3,
        marginLeft:20,
        marginBottom:10
    },
    containerText:{
        flexDirection:'column',
        justifyContent:'space-between'
    },
    loadMore:{
        color:COLORS.lightGray2,
        ...FONTS.body3,
        right:20,
        top:5
    },
    loading:{
        marginTop:10,
        alignItems:'center'
    }

})

export default CategoryComponent