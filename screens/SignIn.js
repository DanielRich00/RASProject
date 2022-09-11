
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { firebase, db } from "../firebase"
import { getDatabase, ref, onValue} from "firebase/database";
import { QuerySnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from '@firebase/util';



const SignIn = ({navigation}) => {

// API FOR TWITTER PULL
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [EmailError, SetEmailError] = useState(false);

  function HomeScreenNavigation(){
    console.log("hello")
    navigation.navigate('HomeScreen')
 }
 


  function MainScreenNavigation(){
    navigation.navigate('MainScreen')
  }

  const usersData = []
  const userData = []

  fetch("https://danielrich00.github.io/RASapi/pastpaper.json")
  .then(response=>response.json())
  .then(data=>userData.push(data))

  var acceptedEmail = "hello"
  var acceptedPassword = null
 




  function checkEmail(){
    let checkNumber = 0;
    console.log(email)
    for(let j=0;j<usersData.length;j++){
      console.log(usersData[0].email)
      if(email == usersData[j].email && password == usersData[j].password){
        acceptedEmail = usersData[j].email
        acceptedPassword = usersData[j].password
        SetEmailError(EmailError => false)
        HomeScreenNavigation()
      } else {
        SetEmailError(EmailError => true)
      }

      }
    }
  

  function pullData(){
    const Ref = firebase.firestore().collection('users')
    .onSnapshot(
      querySnapshot => {

        // HERE ONWARDS HAS BEEN PULLED FROM YOUTUBE NOT MY ORIGINAL WORK
        // HAD ERRORS WORKING WITH FIRESTORE https://www.youtube.com/watch?v=evS7V2M1xq4&ab_channel=BugNinza

        querySnapshot.forEach((doc) => {
          const { email, password } = doc.data()
          usersData.push({
            id: doc.id,
            email,
            password

          })
        })
      }
    )
    }



    function checkUser(){
      pullData()
      checkEmail()
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