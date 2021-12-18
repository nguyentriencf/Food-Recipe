import React from "react";
import auth from '@react-native-firebase/auth';
export const AuthContext   =  React.createContext()
export const  AuthProvider = ({children}) => {
    const [user,setUser] = React.useState(null);
    return(
        <AuthContext.Provider
        value={{
            user,
            setUser,
            login: async (email, password) =>{
                    await auth().signInWithEmailAndPassword(email,password) 
            },
            register:async(email,password) =>{ 
                    await auth().createUserWithEmailAndPassword(email,password)
            },
            changePassword:async(oldPassword,newPassword) =>{ 
                const user  = await auth().currentUser;
                const cred = auth.EmailAuthProvider.credential(user.email,oldPassword);
                const authen = user.reauthenticateWithCredential(cred);
                authen.then(()=>{
                        user.updatePassword(newPassword).then(()=>{
                            console.log('update success')
                        }).catch((error)=>{
                            console.log('update fail',error)
                        })
                }).catch((error)=>{
                    console.log(error);
                })
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