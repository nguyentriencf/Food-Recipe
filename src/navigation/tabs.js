import React from "react";
import {
    View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home,Search,Settings,SettingStack } from "../screens"

const Tab = createBottomTabNavigator()

const Tabs = ({route,navigation}) => {
    const [foodList,setFoodList] =React.useState([route.params.data])
    React.useEffect(()=>{
    //    const {data}  =route.params;
    //    setFoodList(data);
      
    },[])
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{data:foodList}}
            />
            <Tab.Screen
                name="Search"
               component={Search}
            />
            <Tab.Screen
                name="Bookmark"
                component={Home}
            />
            <Tab.Screen
                name="Setting"
               component={SettingStack}
            />
        </Tab.Navigator>
    )
}

export default Tabs;