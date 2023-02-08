
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { firebase, db } from "../firebase"
import { getDatabase, ref, onValue} from "firebase/database";
import { QuerySnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from '@firebase/util';
import { useRoute } from '@react-navigation/native';
import { mergeSorter } from './mergeSort.js'
import { hasher } from './hashingAlgorithm';






const SignIn = ({navigation}) => {

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [EmailError, SetEmailError] = useState(false);
  const [username, SetUsername] = useState('')


  
 

  var acceptedEmail = ""
  var acceptedPassword = ""
  

  function HomeScreenNavigation(){
    global.userEmail=acceptedEmail
    navigation.navigate('HomeScreen', {
      email: acceptedEmail, 
      password: acceptedPassword,
    })
 }
 


  function MainScreenNavigation(){
    navigation.navigate('MainScreen')
  }

  const usersData = []


  function checkEmail(){
    for(let j=0;j<usersData.length;j++){
      if(email == usersData[j].email && password == usersData[j].password){
        acceptedEmail = usersData[j].email
        acceptedPassword = usersData[j].password
        if(username.length>4 && username.length<10){
          SetEmailError(EmailError => false)
          HomeScreenNavigation()
        } else {
          SetEmailError(EmailError => true)
        }
      } else {
        SetEmailError(EmailError => true)
      }

      }
    }
  
  
  

  function pullData(){
    const Ref = firebase.firestore().collection('users')
    .onSnapshot(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          const { email, password, username } = doc.data()
          usersData.push({
            id: doc.id,
            username,
            email,
            password

          })
        })
      }
    )
    }

    function sortAlphabets(str) {
      return [...str].sort((a, b) => a.localeCompare(b)).join("");
    }



    function checkUser(){
      pullData()
      checkEmail()

      // remove hre  
      let temp = (sortAlphabets(username))
      console.log(temp)
      let tempList = temp.split()
      global.tempUsername = (hasher(tempList))


    }
  


    
  
  function MainScreenNavigation(){
        navigation.navigate('MainScreen')}
  return(
    <ImageBackground
    blurRadius={100}

    style={{flex:1}}
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
    <Text style={styles.FirstText}>Welcome Back!</Text>
    <View style={styles.Line}></View>
    <View
    style={styles.TextInputBox3}>
    <TextInput
      placeholder='Enter Username'
      onChangeText={(value)=>SetUsername(value)}
      style={styles.TextInputFont}/>
    </View>
    <View
      style={styles.TextInputBox1}>
      <TextInput
      placeholder='Enter Email'
      onChangeText={(value)=>SetEmail(value)}
      style={styles.TextInputFont}/> 
      </View>
      <View
      style={styles.TextInputBox2}>
      <TextInput
      placeholder='Enter Password'
      onChangeText={(value)=>SetPassword(value)}
      style={styles.TextInputFont}/> 
      </View>
      {EmailError && <Text style={styles.ErrorText}>INVALID EMAIL OR PASSWORD</Text>}

      <Pressable style={styles.button2}
      onPress={checkUser}
      >
          <Text style={styles.buttonFont}>
          Confirm
          </Text>
      </Pressable>
    
    
  
      <Pressable style={styles.button}
      onPress={MainScreenNavigation}>
          <Text style={styles.buttonFont}>
          Back
          </Text>
      </Pressable>
    

    </ImageBackground>
 
  
  )
}

export default SignIn;
export 

const styles = StyleSheet.create({
    FirstText:{
      marginTop: '20%',
      textAlign:'center',
      color:'white',
      fontSize:20,
      fontWeight:'bold',
    },
    
    TextInputBox1:{
      borderColor:'white',
      borderWidth:'5%',
      marginTop:"5%",
      width:'80%',
      height:'5%',
      alignSelf:'center'
    },

    TextInputBox3:{
      borderColor:'white',
      borderWidth:'5%',
      marginTop:"50%",
      width:'80%',
      height:'5%',
      alignSelf:'center'
    },

    
    TextInputBox2:{
        borderColor:'white',
        borderWidth:'5%',
        marginTop:"5%",
        width:'80%',
        height:'5%',
        alignSelf:'center'
    },

    Line:{
      backgroundColor:'white',
      alignSelf:'center',
      width:'80%',
      height:'0.5%',
      marginTop:'2%'

    },

    text:{
      marginTop:'20%'

    },

    button:{
      width:'60%',
      alignSelf:'center',
      alignItems:'center',
      paddingVertical:20,
      height:'7%',
      backgroundColor:'white',
      borderRadius:100,
      marginTop:'5%'
    },
    button2:{
        width:'60%',
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:20,
        height:'7%',
        backgroundColor:'white',
        borderRadius:100,
        marginTop:'50%'
    },


    buttonFont:{
      fontSize:'20',
      fontWeight:'bold',
    },

    ErrorText:{
      fontSize:15,
      marginBottom:'-3.45%',
      fontWeight:'bold',
      color:'red',
      marginTop:'1%',
      alignSelf:"center"
  }

})
