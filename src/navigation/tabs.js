import React from "react";
import {
    View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { icons,COLORS } from "../../constants";
import { Home,Search,SettingStack,BookMark } from "../screens"
import {Tabicon} from'../components'
const Tab = createBottomTabNavigator()

const Tabs = ({route,navigation}) => {
    const [foodList,setFoodList] =React.useState([route.params.data])
    React.useEffect(()=>{    
    },[])
    return (
        <Tab.Navigator
          tabBarOptions={{
            showLabel:false,
            style:{
                position:'absolute',
                left:0,
                right:0,
                bottom:0,
                elevation:0,
                borderTopColor:"transparent",
                height:100,
                backgroundColor:COLORS.white
            },
            
        }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon:({focused}) => <Tabicon 
                    focused={focused} icon={icons.home} name='Home'/>
                }}
                initialParams={{data:foodList}}
            />
            <Tab.Screen
                name="Search"
               component={Search}
               options={{
                    tabBarIcon:({focused}) => <Tabicon 
                  focused={focused} icon={icons.search} name='Search'/>       
                }}
            />
            <Tab.Screen
                name="Bookmark"
                component={BookMark}
                options={{
                    tabBarIcon:({focused}) => <Tabicon 
                    focused={focused} icon={icons.bookmark} name='Bookmark' />
                }}
            />
            <Tab.Screen
                name="Setting"
               component={SettingStack}
               options={{
                    tabBarIcon:({focused}) => <Tabicon 
                    focused={focused} icon={icons.settings} name='Settings'/>
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;