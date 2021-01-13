import React, { Component,useState ,useRef , useEffect} from 'react';
import { Text, StyleSheet, View ,TextInput ,AsyncStorageStatic, ActivityIndicator } from "react-native";
import {Header} from 'react-native-elements'
import {Logout} from './Logout'
import {Authprovider , useAuth ,db} from './AuthContext';
import {Button ,Input,ListItem} from 'react-native-elements'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
import {EvilIcons} from '@expo/vector-icons'
import {RubikMonoOne_400Regular,useFonts} from '@expo-google-fonts/dev'
import * as Font from 'expo-font'


const ToDoListInterface = (props) => {
  

const fonts = () => {
  return Font.loadAsync({
    'rubik' : require('./fonts/Rubik-VariableFont_wght.ttf'),
    'rubik font' : require('./fonts/Rubik-Italic-VariableFont_wght.ttf')
  })
}

  const [toDoListItem,setToDoListItem] = useState('')
  const [id,setId] = useState(0)
  const [list,setList] = useState([])
  const[loading,setLoading] = useState(false) 
  const[error,setError] = useState('')
  const[logout,setLogout] = useState(true)
 const[oneTime, setOneTime] = useState(true)

  const TextInputRef = React.useRef()
  const {currentUser , todolist , settodolist,loggedInSuccessfully,todolistTemp} = useAuth()


  
   useEffect(() => {

 

    setLoading(true)



    //console.log(currentUser)
    // console.log(props.navigation)
    // console.log(firebase.auth().currentUser)
    if(currentUser){
      
    
      
    
    var unsubscribe =  db.collection('Users').doc(firebase.auth().currentUser.uid).collection('ToDoList')
    .orderBy('id').onSnapshot(
          (snapshot) => {
            const b = []
            snapshot.forEach(
              doc => {
            
            
               
                    
                    console.log(' doc.data() = ', doc.data())
                    b.push(doc.data())
                  
                
                
                }

            )
            setList(b)
            settodolist(b)
            setLoading(false)
          },(err) => {
          console.log(err.message)
          }
        )
      
     
      
        
    
   
    } 
  
        
 
     
     
    return unsubscribe
 
    
   },[currentUser])


  
 
   


   const renderList = async () => {
    
     if(currentUser){
      await db.collection('Users').doc('user '+ firebase.auth().currentUser.uid).collection('ToDoList').get().then(
        (snapshot) => {
          snapshot.docs.forEach(
            doc => {
              //console.log(doc.id , doc.data().toDoListItem)
        
             setList(prevState => [...prevState,{id : doc.id , toDoListItem : doc.data().toDoListItem }])
               
                
              
            }
  
          )
          
          
        }
      )
     }


   }
 

        
        return ( 
        
      <View style = {styles.container}>
      
      <View style = {styles.veiw1}>
      {console.log('list length = ',list)}
        {loading ? (<ActivityIndicator size = 'large'/>) 
        :
        <FlatList
        style = {{backgroundColor : 'white' , width : 300 , maxHeight : 400 , marginTop : 5, borderRadius : 10}}
        data = {list}
        renderItem = {({item}) => {
        return (
          <View style = {{flex : 2,
            paddingHorizontal : 10,flexDirection : "row",
          justifyContent : "space-between", alignItems : "center"
          ,backgroundColor : 'gray'
          }}>
        <Text style = {{ marginTop : 10 , marginBottom : 5 }} >{item.item}</Text>
        <EvilIcons name="close" size={14} color="black" onPress ={ () => {
       db.collection('Users').doc(firebase.auth().currentUser.uid).collection('ToDoList').doc(item.id+'').delete()
        }}/>
        </View>
        )
        }}></FlatList>       
        }
      </View>
      <View style = {styles.view2}>
       <Input 
      containerStyle={{ height: 40, borderColor: 'gray',width : 200}}
      placeholder = ' Enter ToDoList item '
      onChangeText = {text => {
       setToDoListItem(text)
      }}>
      </Input>
      <View style = {styles.buttonS}>
      <Button 
      title = 'Submit'
      onPress = {() =>  {
      if(toDoListItem !== ''){
         
        let idItem = 0
      
        if(list.length === 0){
         idItem = 0
        }
        else {
          idItem = list[list.length-1].id + 1
        }
      
        
        if(list.length > 0){
          console.log('list[list.length-1].id + 1' , list[list.length-1].id + 1)
        }
       
       const item = {id : idItem, item :  toDoListItem}
     
          db.collection('Users').doc(currentUser.uid).collection('ToDoList').doc(item.id+'')
          .set(
             item
          )
        
       
      }
    

      }
      
    }
      
      >
      </Button>

      </View>
      </View>

             
            </View>  );
    
}
 


const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
    container : {
      flex : 1,
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center'
    },
   buttonS : {
    margin : 10,
      backgroundColor : 'red'
    },
    veiw1 : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    },
    view2 : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    },
    activityIndicator : {
      justifyContent : 'center',
      alignItems : 'center'
    }
  })

export default ToDoListInterface;