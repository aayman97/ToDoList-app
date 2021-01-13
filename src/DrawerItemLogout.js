import React, { Component , useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authprovider , {useAuth} from './AuthContext';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem , DrawerItemList} from '@react-navigation/drawer'

const DrawerItemLogout = (props) => {
    const {logout} = useAuth()

    return(
        <DrawerItem label="Logout" onPress = {() => logout()}/>
    )

    
}
export default DrawerItemLogout