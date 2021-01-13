import React, { Component } from 'react';
import {Logout} from './Logout'
import Login from './Login'
import ToDoListInterface from './ToDoList'
import Authprovider , {useAuth} from './AuthContext';
import {CreateAccount} from './CreateAccount'
import {Header , Button} from 'react-native-elements'
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createDrawerNavigator  } from '@react-navigation/drawer';

const DrawerNav = createDrawerNavigator();


const Drawer = (props) => {

    return (
        
        <Authprovider>
            < DrawerNav.Navigator>
               <DrawerNav.Screen name="ToDoList" component={ToDoListInterface} />
                <DrawerNav.Screen name="Create Account" component={CreateAccount} />
               </DrawerNav.Navigator>

           </Authprovider>
       
        
    )
}

export default Drawer;