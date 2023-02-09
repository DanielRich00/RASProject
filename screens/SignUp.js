

//all of the imports are the same as the sign in screen.
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, TurboModuleRegistry} from 'react-native';
import { Box } from '../components/Box';
import { firebase } from "../firebase"
import { mergeSorter } from './mergeSort.js'
import { hasher } from './hashingAlgorithm';
import { ref } from 'firebase/database';
import { doc } from 'firebase/firestore';




// creates a const sign up with navigation passed through for navigation ebtween screens.
const SignUp = ({navigation}) => {

 // funciton for ensuring that the username that is entered is of valid format and will work correctly with the program
    function usernameValidation(){
//sets a default error.
        let error = 0
//loops through the userData that has been fetched from teh database
        for(let i = 0; i < usersData.length; i ++ ){
// if the username is already in the database, then it will display the following data.
            if (usersData[i].username == Username){
// change the AlreadyUsedError to true, meaning that the error will be displayed.
                setAlreadyUsedError(AlreadyUsedError => true)
// incriments error by one.
                error = error + 1 
            } 
        }
// if error is 0, then it will execute the following code.
        if(error === 0){
// it will remove the error and then return true
            setAlreadyUsedError(AlreadyUsedError => false)
// this means that the username is valid.
            return true
        }

    }


//this is a function for valididating the email that has been entered
    function EmailValidation(){    
//loops rthrough the email
      for(let i = 0; i < usersData.length; i ++ ){
// ensures that the email mataches one forom teh database
        if (usersData[i].email == email){
// if the inputted email matches one from the database, then it will shoq an error, this means that it has already been used
 
            setAlreadyUsedError(AlreadyUsedError => true)
// a return fo false means that the email is invalid
            return false
        }
      }
//splits the email for furthur use, into domain and left side
      var SplitEmail = email.split('.');
//splits the domain at the @
      var SplitDomain = SplitEmail[0].split('@');
// if email does no include an @ symbol, its invalid
      if(!email.includes('@')){
          return false
// if an email does not include a . symbol, it's invalid
      } else if (!email.includes('.')){
          return false
// if the email is larger than a 100 in length, or shorter than 10, then it's invalid
      } else if (email.length > 100 || email.length < 10){
          return false
// if the split email legnth is less than or equal to 0, then it's invalid
      } else if (SplitEmail[1].length <= 0){
          return false
// if the domain is == 0, or the second part of hte domain == 0, then it's invalid
      } else if (SplitDomain[0].length == 0 || SplitDomain[1].length == 0){
          return false
      } else {
//else, it's a valid email and username, and will remove the error.
          setAlreadyUsedError(AlreadyUsedError => false)
          return true
    }}

    
//sets a const for special cahracters which can be used to look through the password
// to indentify whether it is of good strength
    const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`

// this loops through the password itself
    function LoopThrough(){
//sets a value of one, which will count the amount of special characters
        let value = 0;
//loops through the password one at a time
        for (let i = 0; i<=password.length; i++){
// loops through the special characters constant
            for (let j = 0; j<specialChars.length; j++){
// if the character of the a password, matches the character of the special characters then it executes below
                if (password[i] == specialChars[j]){
// then it adds one to the value
                    value = value+1
                } 
            }
        }
// if value == 0, then it is an invalid password, as it does not contain a special cahracter

        if(value==0){
            return false
        }
    }

    function sortAlphabets(str) {
        return [...str].sort((a, b) => a.localeCompare(b)).join("");
      }
  


    
 // this validates the password

    function PasswordValidation(){
 // if the special character checker returns false, then it returns false
        if(LoopThrough()===false){
            return(false)
// if the password is of invalid length then ti returns false
        } else if (password.length<6 || password.length>20 ) {
            return(false)
        } else {
            return(true)
        } 
    }
 //sets and empty array for users data
  const usersData = []

 // function that pulls the data from the database
  function pullData(){
 //sets the reference using the firebase function, of collection users
    const Ref = firebase.firestore().collection('users')
 // takes a snapshot of the database at that given time
    .onSnapshot(
// looks at the snapshot and takes the data.
      querySnapshot => {
// for each document in the snapshot it will do the following:
        querySnapshot.forEach((doc) => {
// identify the data's email password, and username, and assign it to the doc data.
          const { email, password, username } = doc.data()
//push it onto the otherwise empty array
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




// this is checks for validation for email.
    function Checks(){
// pulls the intial data
      pullData()
// if all of the checks return true, then the data is valid
      if(EmailValidation() === true && PasswordValidation() === true && usernameValidation() === true){
// it will remove the error screen
          SetEmailError(EmailError => false)
// send the username through sorter
          let temp = (mergeSorter(Username))
          let tempList = temp.split()
// send it through the hashing, so that it can find the space in te database.
          let usernameTemp = (hasher(tempList))
// adds data to the database, in location (username temp)
          AddData(usernameTemp)
 
      } else {
// otherwise, if they dont all return true and the user clicked the button, it will display an error.
          SetEmailError(EmailError => true)
      }
    }


    function AddData(usernameTemp){
//creates references for the location of where the data is to be stored
        var docRef2 = firebase.firestore().collection("usersInformation").doc(String(usernameTemp))
// creates references of where the user information is to be stored
        var docRef = firebase.firestore().collection("users").doc(String(usernameTemp));

        
// insert into, and values are both firebase commands, and they can insert the username, email and password into the docRef
        INSERT INTO docRef VALUES ({
            username: Username,
            email: email,
            password: password
        }) 
// THis is information for the achievments and profile information that is predetermined when the user creates their account
// the total studied time and total studies at this point will obviously be 0 
        INSERT INTO docRef VALUES ({
            totalStudied: 0,
            totalStudies: 0,
        })
//These are for settings the diffeent acheivements status' for the user
        INSERT INTO docRef2.collection('achievements').doc("LaunchApp") VALUES({
//this is whether or not the acheviement is acheived, this is set to true becuase the user has already opened the app
            achieved: true,
// The application does not need to track it now, as it is already achieved, and would just waste money.
            tracking: false,
        })
// acheivments is the "collection" and "start study" is the document.
        INSERT INTO docRef2.collection('achievements').doc("StartStudy") VALUES ({
            achieved: false,
            tracking: true,
        })
        INSERT INTO docRef2.collection('achievements').doc("OneNote") VALUES ({
            achieved: false,
            tracking: true,
        })
      

    };

// Whenever I call MainScreenNavigation/HomeScreenNavigation it navigates to the desired screen using navigation library.
    function MainScreenNavigation(){
        navigation.navigate('MainScreen')
    }

    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')
    }
    
    function SignInNavigation(){
        navigation.navigate('SignIn')
    }
  
//These usestate constants are for updating compoments on the screen, 
//usually you wouldn't be able to readily update things like this but with UseState it works.
    const [email, SetEmail] = useState('');
// this is a usestate for the password
    const [password, SetPassword] = useState('');
// this is a useState for the email error.
    const [EmailError, SetEmailError] = useState(false);
// this is the usestate for the username, which stores the username when it is inputted
    const [Username, SetUsername] = useState('');
// thsi is for the error, when thsi is false, then it will not display the error.
    const [AlreadyUsedError, setAlreadyUsedError] = useState(false);

  
    return(
 // for setting the image background
      <ImageBackground
 // gives the image a blur
      blurRadius={100}

      style={{flex:1}}
      source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
 // this is the title with the text, and has a style of "first text"
      <Text style={styles.FirstText}> Start With Study Assistant </Text>

 // thsi is a line seperating the title and the content of the screen
      <View style={styles.Line}></View>
 // this is for the text input box
      <View
      
      style={styles.TextInputBox3}>
      <TextInput
//placeholder is what is displayed to the user
      placeholder='Enter Username'
//whenever the text is changed, then the value is assigned to the username value.
      onChangeText={(value)=>SetUsername(value)}
//this gives the input box the text input font style.
      style={styles.TextInputFont}/> 
      </View>
   
     <View
      style={styles.TextInputBox1}>
// allows input for the email
      <TextInput
      placeholder='Enter Email'
//whenever the text is changed, then the value is assigned to the email value.
      onChangeText={(value)=>SetEmail(value)}
// assigns it the textinput font style.
      style={styles.TextInputFont}/> 
      </View>
      <View
      style={styles.TextInputBox2}>
      <TextInput
// this is for entering the password
      placeholder='Enter Password'
//whenever the text is changed, then the value is assigned to the password value.
      onChangeText={(value)=>SetPassword(value)}
      style={styles.TextInputFont}/> 
      </View>
// these are for the various errors that the user can recieve
      {EmailError && <Text style={styles.ErrorText}>INSUFFICIENT EMAIL OR PASSWORD</Text>}
// this is what happens when the user inputted an email that already exists on the database, has the style error text.
      {AlreadyUsedError && <Text style={styles.ErrorText}>EMAIL OR USERNAME ALREADY USED</Text>}


// this is a button that confirms the information that the user has entered
      <Pressable style={styles.button2}
 // onpress it will perform the various checks to see if the information is valid
      onPress={Checks}>
          <Text style={styles.buttonFont}>
// this is the text on the button
          Confirm
          </Text>
      </Pressable>
    
//when this button is pressed, then the screen will navigate to main screen
      <Pressable style={styles.button}
// calls the mainscreen function
      onPress={MainScreenNavigation}>
// shows the text on the button, so the user knows what they are clicking
          <Text style={styles.buttonFont}>
          Back
          </Text>
      </Pressable>
 
      </ImageBackground>
 
  
    )
  }


// exporting the screen, so can be importing within App.js
export default SignUp;


//after this point is all the styling
const styles = StyleSheet.create({
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
        fontSize:20,
        fontWeight:'bold',
    },

    FirstText:{
        marginTop: '20%',
        textAlign:'center',
        color:'white',
        fontSize:20,
        fontWeight:'bold',
    },

    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'2%'

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

    TextInputError:{
        borderColor:'red',
        borderWidth:'5%',
        marginTop:"50%",
        width:'80%',
        height:'5%',
        alignSelf:'center'
    },


    TextInputFont:{
        fontWeight:"bold"
    },

    ErrorText:{
        fontSize:15,
        marginBottom:'-3.45%',
        fontWeight:'bold',
        color:'red',
        marginTop:'3%',
        alignSelf:"center"
    }

})
