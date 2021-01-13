import React , {Component , useContext, useEffect, useState} from "react";
import firebase from 'firebase';
import { Text, StyleSheet, View ,TextInput, Button } from "react-native";
import { ThemeColors } from "react-navigation";
import {useAuth} from './AuthContext';
import Login from './Login'
import {CreateAccount} from './CreateAccount'
import {Logout} from './Logout'
import CurrentUser from './CurrentUser'



function HomeScreen  (props)   {
 


const [email,setEmail] = useState('')
const [Password,setPassword] = useState('')
const [error,setError] = useState(false)
const [LoggedIn,setLoggedIn] = useState(false)


const {currentUser,errorLoggingIn,passwordIncorrect,loggedInSuccessfully} = useAuth()
    
const logInInterface = <Login></Login>
// const logOutInterface = <Logout></Logout>
const createAccountInterface = <CreateAccount></CreateAccount>

const inCorrectPassword= (error)=>{

  let alert = null
  if(error === "The password is invalid or the user does not have a password."){
    console.log('enetered the method')
    alert = 
      <Text style =  {{margin : 20 ,fontSize : 10}}>
      The password is invalid or the user does not have a password.
      </Text>
    
  }
  return alert
}
 

let alert = <Text style =  {{margin : 20 ,fontSize : 10}}>
There is no such user in the database
</Text>


    return (  
      
      <View style = {styles.container}>
      
         {/* {loggedInSuccessfully ? logOutInterface : null} */}

    </View>
    
    );
 
}
const styles = StyleSheet.create({
  text: {
    
    fontSize: 20,
  },
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
 buttonS : {
  margin : 10,
    backgroundColor : 'red'
  }
});
 
export default HomeScreen;




