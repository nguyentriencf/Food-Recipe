import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Settings from './Setting';
import ChangePassword from "./ChangePassword";
const Stack = createStackNavigator();
const SettingStack =()=>{
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Setting"
            >
          <Stack.Screen
                    name="Setting"
                    component={Settings}
                />
        <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
        />  
              
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default SettingStack