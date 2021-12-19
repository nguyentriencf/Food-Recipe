import React from "react";
import auth from '@react-native-firebase/auth';
export const AuthContext   =  React.createContext()
export const  AuthProvider = ({children}) => {
    const [user,setUser] = React.useState(null);
    const [currenUser,setCurrentUser] = React.useState(null);
    return(
        <AuthContext.Provider
        value={{
            user,
            setUser,
            currenUser,
            setCurrentUser,
            login: async (email, password) =>{
                    await auth().signInWithEmailAndPassword(email,password) 
            },
            register:async(email,password) =>{ 
                    await auth().createUserWithEmailAndPassword(email,password)
            },
            changePassword:async(oldPassword) =>{ 
                const user  = await auth().currentUser;
                setCurrentUser(user)
                const cred = auth.EmailAuthProvider.credential(user.email,oldPassword);
                await user.reauthenticateWithCredential(cred);
            },
            logout:async() => {
                try {
                    await auth().signOut();
                    
                } catch (e) {
                    console.log(e);
                }
            }
        }}>
            {children}

        </AuthContext.Provider>
    )
}