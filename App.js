import React, { Component , useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Logout} from './src/Logout'
import Login from './src/Login'
import ToDoListInterface from './src/ToDoList'
import Authprovider , {useAuth} from './src/AuthContext';
import {CreateAccount} from './src/CreateAccount'
import {Header , Button} from 'react-native-elements'
import Spinner from './src/Spinner'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem , DrawerItemList} from '@react-navigation/drawer'
import firebase from 'firebase'
import DrawerItemLogout from './src/DrawerItemLogout'
import { AntDesign,Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()



const LoginScreen = ({ navigation}) => {
  return (
    <Stack.Navigator 
    screenOptions = {{
      header : () => <Header
      leftComponent={{ icon: 'menu', color: '#fff'  ,size : 30 , onPress : () => {
      navigation.toggleDrawer();
      }}}
      centerComponent={{ text: 'ToDoList App', style: { color: '#fff' , fontSize : 15}}}
      rightComponent={<AntDesign name="setting" size={30} color="white" />}
      containerStyle = {{height : 80}}
  
      ></Header>
    }}>
    
    <Stack.Screen name="Login" component=  {Login}  />
    <Stack.Screen name = "Logout" component = {ToDoListInterface}  />
    <Stack.Screen name = "Loading" component = {Spinner}  /> 
    <Stack.Screen name="Create Account" component=  {CreateAccount}  />
    

  
   
  
  </Stack.Navigator>
    
  )
}

const LogoutScreen = ({navigation})=> {
  return (
   
    <Stack.Navigator screenOptions = {{
      header : () => <Header
      leftComponent={{ icon: 'menu', color: '#fff'  ,size : 30 , onPress : () => {
      navigation.toggleDrawer();
      }}}
      centerComponent={{ text: 'ToDoList App', style: { color: '#fff' , fontSize : 15}}}
      rightComponent={{ icon: 'home', color: '#fff' , size : 30 }}
      containerStyle = {{height : 80}}
  
      ></Header>
    }}>
    <Stack.Screen name = "Logout" component = {ToDoListInterface}  /> 
    <Stack.Screen name = "Loading" component = {Spinner} /> 
    </Stack.Navigator>
  )
}

const App = ({navigation}) => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  let routeName = ''
  return(
    <Authprovider>
    <NavigationContainer      
    ref={navigationRef}
     onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name

        if (previousRouteName !== currentRouteName) {

          routeName = currentRouteName
         console.log(routeName)
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>

      <Drawer.Navigator drawerContent = {props => {
        return (
          <DrawerContentScrollView>
          <DrawerItemList {...props} />
          {routeName === "Logout" ? <DrawerItemLogout/> :null}
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name = 'Home' component = {LoginScreen}/>
      
      </Drawer.Navigator>
    </NavigationContainer>
    </Authprovider>
  )
}

export default App;