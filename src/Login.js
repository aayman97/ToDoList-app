import React, { Component ,useState} from 'react';
import firebase from 'firebase';
import { ActivityIndicator ,Text, StyleSheet, View ,TextInput } from "react-native";
import {Authprovider , useAuth} from './AuthContext';
import {Button ,Input} from 'react-native-elements'

const Login = (props) =>{
    
    const [email,setEmail] = useState('')
    const [Password,setPassword] = useState('')
    const {login , errorLoggingIn , passwordIncorrect , loggedInSuccessfully ,loading , CheckRoute} = useAuth();
    

    return(
       
        <View style = {styles.container}>
          {passwordIncorrect ? (<Text style =  {{margin : 20 ,fontSize : 10 }}> Your password is incorrect </Text>) : null}
        <Text style =  {{margin : 20 ,fontSize : 30}}> Log In</Text>
       
      <Input 
      placeholder = 'Email'
      containerStyle = {{margin : 10 ,width : 200}}
      onChangeText = {text => setEmail(text)}>
      </Input>
      <Input 
      containerStyle = {{margin : 10 ,width : 200 ,}}
      placeholder = 'Password'
      secureTextEntry={true}
      onChangeText = {text => setPassword(text)}>
      </Input>
  
      <Button 
      type = 'outline'
      title = 'Log in'
      containerStyle = {{margin : 20 , width : 100  }}
      onPress = {() => {
      
        const e = email
        const password = Password
        login(e,password)
      }}
     >
      {loading.state ? props.navigation.navigate('Loading') : null}
      {errorLoggingIn ? props.navigation.navigate('Create Account') : null}
      
      </Button>
    
     </View>
     
    )
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
})
export default Login;