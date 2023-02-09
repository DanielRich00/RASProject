
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
  
  
  
// this function pulls the data from the database
  function pullData(){
// this references the database using the firebase.firestore function, inside collection users
    const Ref = firebase.firestore().collection('users')
// takes a snapshot of the information at the moment of collection
    .onSnapshot(
// asks the snapshot for information
      querySnapshot => {
// for each document within the snapshot in the collection "users"
        querySnapshot.forEach((doc) => {
// it sets a const email password and useranme for the data, which can then be referenced as a function
          const { email, password, username } = doc.data()
// this pushes the data collected from the database into the previously empty array.
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
  


    
  //this is for the mainscreen navigation
  function MainScreenNavigation(){
        navigation.navigate('MainScreen')}
  //this returns the information
  return(
  //this is for the image background, mentioned previously is an image that provides a gradient.
    <ImageBackground
  // this blurs the image
    blurRadius={100}
// gives it flex properties
    style={{flex:1}}
//provides a soruce for the image background
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
//makes a text with the style "firstText", and has the text "Welcome Back", this acts as a title Screen.
    <Text style={styles.FirstText}>Welcome Back!</Text>
//This is a line, which seperates the title and the main content of the page
    <View style={styles.Line}></View>
    <View
//This is a containter for one of the text inputs boxes
    style={styles.TextInputBox3}>
    <TextInput
//placeholders are what the users see inside the box that they type in, gives guidance.
      placeholder='Enter Username'
//on change text, means that when the text is change it will perform inside the brackets
// meaning it will take the value of the entered box, and change the Username value to that value.
      onChangeText={(value)=>SetUsername(value)}
// this is the style of the box itself.
      style={styles.TextInputFont}/>
    </View>
// this is another one of the text input boxes
    <View
      style={styles.TextInputBox1}>
// for the tuser to enter their email
      <TextInput
      placeholder='Enter Email'
      onChangeText={(value)=>SetEmail(value)}
 //on change text, means that when the text is change it will perform inside the brackets
// meaning it will take the value of the entered box, and change the email value to that value.
      style={styles.TextInputFont}/> 
      </View>
      <View
      style={styles.TextInputBox2}>
      <TextInput
      placeholder='Enter Password'
      onChangeText={(value)=>SetPassword(value)}
//on change text, means that when the text is change it will perform inside the brackets
// meaning it will take the value of the entered box, and change the password value to that value.
      style={styles.TextInputFont}/> 
      </View>
// This is for the email error, if the email error is true it will perform the right of the Email Error.
// With the style of ErrorText, it will display the text below.
      {EmailError && <Text style={styles.ErrorText}>INVALID EMAIL OR PASSWORD</Text>}
//this is a button, that on press performs the function CheckUser
      <Pressable style={styles.button2}
      onPress={checkUser}
      >
//The text on this is "buttonFont"
          <Text style={styles.buttonFont}>
//This is the text itself
          Confirm
          </Text>
      </Pressable>
    
//This is a button for the user to navigate back
      <Pressable style={styles.button}
// on press it will navigate to the main screen, back to home.
      onPress={MainScreenNavigation}>
//this is with the style buttonFont, again.
          <Text style={styles.buttonFont}>
// has the text "back"
          Back
          </Text>
      </Pressable>
    

    </ImageBackground>
 
  
  )
}

export default SignIn;
export 

const styles = StyleSheet.create({
// styling for firstText, this title 
    FirstText:{
//changes the margin of the top
      marginTop: '20%',
// aligns the text to centre
      textAlign:'center',
// changes the color to white 
      color:'white',
// changes the font size to 20
      fontSize:20,
// changes the weight of the font to bold
      fontWeight:'bold',
    },
 //styling for the orginal text box
    TextInputBox1:{
      borderColor:'white',
      borderWidth:'5%',
      marginTop:"5%",
      width:'80%',
      height:'5%',
      alignSelf:'center'
    },
//styling for the different text box
    TextInputBox3:{
      borderColor:'white',
      borderWidth:'5%',
      marginTop:"50%",
      width:'80%',
      height:'5%',
      alignSelf:'center'
    },
//styling for the different text box
    
    TextInputBox2:{
      
 // changes the border color to white
        borderColor:'white',
// changes the widht 
        borderWidth:'5%',
// adds a margin
        marginTop:"5%",
// makes it width
        width:'80%',
// makes the text box shorter
        height:'5%',
        alignSelf:'center'
    },
  
//styling for the seperating line
    Line:{
      backgroundColor:'white',
      alignSelf:'center',
      width:'80%',
      height:'0.5%',
      marginTop:'2%'

    },
// styling for the text
    text:{
      marginTop:'20%'

    },
//styling for the input button
    button:{
 // makes the widht to 60% of the screen
      width:'60%',
 // centres itself ot the centre of the screen
      alignSelf:'center',
 // the items in the box button are not to the centre
      alignItems:'center',
      paddingVertical:20,
      height:'7%',
 //changes the background to white
      backgroundColor:'white',
      borderRadius:100,
      marginTop:'5%'
    },
  
//styling for the back button
    button2:{
// changes the width of the button2
        width:'60%',
// aligns the item to the center
        alignSelf:'center',
// aligns the items in the container
        alignItems:'center',
 // this adds padding to the top
        paddingVertical:20,
        height:'7%',
        backgroundColor:'white',
        borderRadius:100,
        marginTop:'50%'
    },

//styling for the button font
    buttonFont:{
//changes the font size
      fontSize:'20',
      
//changes the font weight
      fontWeight:'bold',
    },
//styling for the error text
    ErrorText:{
 //changes the font size
      fontSize:15,
 // moves it down, as the bottom margin has a negative value
      marginBottom:'-3.45%',
 // changes the weight of the font
      fontWeight:'bold',
// changes the colour of the font to red
      color:'red',
//adds a margin to the top
      marginTop:'1%',
      alignSelf:"center"
  }

})
