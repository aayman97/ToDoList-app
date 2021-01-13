import React, { Component ,useState} from 'react';
import firebase from 'firebase';
import { ActivityIndicator ,Text, StyleSheet, View ,TextInput } from "react-native";
import {Authprovider , useAuth} from './AuthContext';
import {Button ,Input} from 'react-native-elements'

const Spinner = (props) => {

    const {loading,CheckRoute} = useAuth()
    return (
       
        <View style={[styles.container]}>
           {CheckRoute(loading.route) ? props.navigation.navigate(loading.route): null}

        <ActivityIndicator size="large" />
       
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });

  export default Spinner;