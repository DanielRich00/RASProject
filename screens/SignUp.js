
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, TurboModuleRegistry} from 'react-native';
import { Box } from '../components/Box';
import { firebase } from "../firebase"
import { mergeSorter } from './mergeSort.js'
import { hasher } from './hashingAlgorithm';
import { ref } from 'firebase/database';
import { doc } from 'firebase/firestore';





const SignUp = ({navigation}) => {

    function usernameValidation(){
        let error = 0
        for(let i = 0; i < usersData.length; i ++ ){
            if (usersData[i].username == Username){
                setAlreadyUsedError(AlreadyUsedError => true)
                error = error + 1 
            } 
        }
        if(error === 0){
            setAlreadyUsedError(AlreadyUsedError => false)
            return true
        }

    }



    function EmailValidation(){    
      //DOESNT PULL DATA STRAIGHT AWAY
      for(let i = 0; i < usersData.length; i ++ ){
        if (usersData[i].email == email){
            setAlreadyUsedError(AlreadyUsedError => true)
            return false
        }
      }

      var SplitEmail = email.split('.');
      var SplitDomain = SplitEmail[0].split('@');
      if(!email.includes('@')){
          return false
      } else if (!email.includes('.')){
          return false
      } else if (email.length > 100 || email.length < 10){
          return false
      } else if (SplitEmail[1].length <= 0){
          return false
      } else if (SplitDomain[0].length == 0 || SplitDomain[1].length == 0){
          return false
      } else {
          setAlreadyUsedError(AlreadyUsedError => false)
          return true
    }}

    const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`


    function LoopThrough(){
        // loops through
        let value = 0;
        for (let i = 0; i<=password.length; i++){
            for (let j = 0; j<specialChars.length; j++){
                if (password[i] == specialChars[j]){
                    value = value+1
                } 
            }
        }

        if(value==0){
            return false
        }
    }

    function sortAlphabets(str) {
        return [...str].sort((a, b) => a.localeCompare(b)).join("");
      }
  

    

    function PasswordValidation(){
        if(LoopThrough()===false){
            return(false)

        } else if (password.length<6 || password.length>20 ) {
            return(false)
        } else {
            return(true)
        } 
    }
  const usersData = []

    
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




     // this is checks for validation for email.
    function Checks(){
      pullData()
      if(EmailValidation() === true && PasswordValidation() === true && usernameValidation() === true){
        
          SetEmailError(EmailError => false)
          let temp = (sortAlphabets(Username))
          let tempList = temp.split()
          let usernameTemp = (hasher(tempList))
          AddData(usernameTemp)
         
      } else {
          SetEmailError(EmailError => true)
      }
    }


    function AddData(usernameTemp){
        var docRef2 = firebase.firestore().collection("usersInformation").doc(String(usernameTemp))
        var docRef = firebase.firestore().collection("users").doc(String(usernameTemp));
        docRef.set({
            username: Username,
            email: email,
            password: password
        }) 
        docRef2.set({
            totalStudied: 0,
            totalStudies: 0,
        })
        docRef2.collection('achievements').doc("LaunchApp").set({
            achieved: true,
            tracking: false,
        })
        docRef2.collection('achievements').doc("StartStudy").set({
            achieved: false,
            tracking: true,
        })
        docRef2.collection('achievements').doc("OneNote").set({
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
  
    {/*These usestate constants are for updating compoments on the screen, usually you wouldn't be able to readily update things like this but with UseState it works.*/}
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [EmailError, SetEmailError] = useState(false);
    const [Username, SetUsername] = useState('');
    const [AlreadyUsedError, setAlreadyUsedError] = useState(false);


    const ToggleOverlay = () =>{
        setVisible(!visible)

    }
    
  
    return(
      <ImageBackground
      blurRadius={100}

      style={{flex:1}}
      source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
      <Text style={styles.FirstText}> Start With Study Assistant </Text>

    
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
      {EmailError && <Text style={styles.ErrorText}>INSUFFICIENT EMAIL OR PASSWORD</Text>}
      {AlreadyUsedError && <Text style={styles.ErrorText}>EMAIL OR USERNAME ALREADY USED</Text>}


    


      <Pressable style={styles.button2}
      onPress={Checks}>
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
