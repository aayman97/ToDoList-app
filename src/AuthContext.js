import React, { Component ,createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const app = firebase.initializeApp({
    apiKey: "AIzaSyDgOySw4uiU3qf83rQqcyJ8_nvC21x94Bg",
    authDomain: "todolist-61a3d.firebaseapp.com",
    databaseURL: "https://todolist-61a3d.firebaseio.com",
    projectId: "todolist-61a3d",
    storageBucket: "todolist-61a3d.appspot.com",
    messagingSenderId: "639708356282",
    appId: "1:639708356282:web:8606d22549304ec0302c83",
    measurementId: "G-7M2BB4GLF7"
    })

export const db = app.firestore();

export  function useAuth(props){
    return useContext(AuthContext)
}
export default function AuthProvider (props) {

 const[currentUser,setcurrentUser] = useState('')
 const[errorLoggingIn , seterrorLoggingIn] = useState(false)
 const[passwordIncorrect, setpasswordIncorrect] = useState(false)
 const [loggedInSuccessfully,setloggedInSuccessfully] = useState(false)
 const[loading,setloading] = useState({state : false , route : ''})
 const[todolist,settodolist] =  useState([])
 const[logoutcheck,setlogout] = useState(false)
  
let todolistTemp = []




    useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
                setcurrentUser(user)
          })
          
       //  console.log('currentUser from a context = ', currentUser)
    
    },[currentUser])


    function CheckRoute(route){
     if (typeof route !== 'undefined' && route !== null && route !== ''){
       return true
     }
     else {
       return false
     }
    }

  
    function login(email,password){
      setloading({state : true})
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            res => {
              
              setloggedInSuccessfully(true)
              db.collection('Users').doc(firebase.auth().currentUser.uid+'').set({
                email : email,
                password : password
              }).then(res => console.log(res))
              setloading({state : false , route : 'Logout'})
              console.log('Signed In !!!')
              setlogout(false)
              
           
            }
          ).catch(
            err => {
              console.log(err.message)
              console.log('Error Logging in')
              if(err.message === "The password is invalid or the user does not have a password."){
                setpasswordIncorrect(true)
                setloading({state : false , route : 'Login'})
              }
              else if(err.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                seterrorLoggingIn(true)
                setloading({state : false , route : 'Create Account'})
              }

            }
            
          )
        
          
    }

    function logout(){
        setloading({state : true})
        firebase.auth().signOut().then(res => {
            console.log(res)
            setloggedInSuccessfully(false) 
            setloading({state : false , route : 'Login'})
            setcurrentUser(firebase.auth().currentUser)
            setlogout(true)
         
            
          }).catch(err => console.log(err))
          
    }

    function createAccount(email,password){
      setloading({state : true})    
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            res => {
              console.log('res = ',res)

              db.collection('Users').doc(firebase.auth().currentUser.uid+'').set({
                email : email,
                password : password
              }).then(res => console.log(res))
              seterrorLoggingIn(false)
              setloading({state : false , route : 'Login'})

            }
            
            ).catch(
            err => {
              console.log(err ,'Authentication Failed')
              
            }
            
            
            )
    }

const value ={

     currentUser,
     login,
     logout,
     createAccount,
     passwordIncorrect,
     errorLoggingIn,
     loggedInSuccessfully,
     loading,
     CheckRoute,
     todolist,
     settodolist,
     logoutcheck,
     todolistTemp
     
}
    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )  
    }



