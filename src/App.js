import React from 'react';
import { Login, Recipe,SplashLoading } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./navigation/tabs";
import auth from '@react-native-firebase/auth';
import {AuthContext} from './navigation/AuthProvider';
const Stack = createStackNavigator();

const App = () => {
     const {user,setUser} = React.useContext(AuthContext);
    const[initializing,setInitializing] = React.useState(true);
    const onAuthStateChanged = (user) => {
        setUser(user)
        if(initializing) setInitializing(false);
    }
  
   React.useEffect(()=>{
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }); 
    if(initializing) return null
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
            {user ?  <Stack.Screen
                    name="Splash"
                    component={SplashLoading}
                />  :  <Stack.Screen
                    name="Login"
                    component={Login}
                /> 
            }
            {user ?   <Stack.Screen
                    name="Home"
                    component={Tabs}
                />  : null
                
            }
              
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;