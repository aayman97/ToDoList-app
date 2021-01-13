import React, { Component ,useState} from 'react';
import firebase from 'firebase';
import { Text, StyleSheet, View ,TextInput } from "react-native";
import {Authprovider , useAuth} from './AuthContext';
import {Button ,Input} from 'react-native-elements'

export const CreateAccount = (props) =>{

const [email,setEmail] = useState('')
const [Password,setPassword] = useState('')
const {createAccount , loading} = useAuth();

return(
  <View style = {styles.container}>
  <Text style =  {{margin : 20 ,fontSize : 30}}> Create an account</Text>
  <Input 
  placeholder = 'Email'
  style =  {{margin : 10 }}
  onChangeText = {text => setEmail(text)}>
  </Input>
  <Input 
  placeholder = 'Password'
  secureTextEntry={true}
  style =  {{margin : 10 }}
  onChangeText = {text => setPassword(text)}>
  </Input>
  <View  style =  {{margin : 20 }}>
  <Button
  title = 'Create Account'
  onPress = {() => {
  
  const e = email
  const password = Password

  createAccount(e,password)

  }}
  >
  
  </Button>
  {loading.state ? props.navigation.navigate('Loading') : null}
  </View>
  </View>)




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