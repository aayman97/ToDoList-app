import React, { Component ,useState} from 'react';
import firebase from 'firebase';
import { Text, StyleSheet, View ,TextInput } from "react-native";
import {Authprovider , useAuth} from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button} from 'react-native-elements'

const Stack = createStackNavigator();

export const Logout = (props) =>{

    const {logout} = useAuth()
    const navigation = useNavigation();

   return(
   <Button
   type = 'outline'
   containerStyle = {{borderWidth : 0.1, borderColor : 'white' , paddingLeft : 5 , paddingRight : 5 }}
   titleStyle = {{color : 'white' , fontSize : 9, alignContent : "center" ,  justifyContent : 'center' , flex : 1}}
   onPress = {() => {
    logout()
    
    }}
    title = 'Log Out'>
        
    </Button>
   
    ) 

}