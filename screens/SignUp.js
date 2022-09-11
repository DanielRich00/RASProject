
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, TurboModuleRegistry} from 'react-native';
import { Box } from '../components/Box';
import { firebase } from "../firebase"







const SignUp = ({navigation}) => { 
   

    function EmailValidation(){

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

    

    function PasswordValidation(){
        if(LoopThrough()===false){
            return(false)

        } else if (password.length<6 || password.length>20 ) {
            return(false)
        } else {
            return(true)
        }
        //bulk of password val
        
        
    }

   
  
    
     // this is checks for validation for email.
    function Checks(){
      if(EmailValidation() === true && PasswordValidation() === true){
          SetEmailError(EmailError => false)
          AddData()
          SignInNavigation()
    
          
          
          
      } else {
          SetEmailError(EmailError => true)
          
          
      }
    }


    function AddData(){
        firebase.firestore().collection('users').add({
        email: email,
        password: password
    })};


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
        fontSize:'20',
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
        marginTop:'1%',
        alignSelf:"center"
    }

})