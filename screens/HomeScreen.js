// The same imports as previously
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
// useState and useEffect, usestate explained previously, useState is for the timer which is on the main Screen.
import { useState, useEffect } from 'react'
import { firebase } from "../firebase"



// creates a const HomeScreen, navigation is passed through, so it can switch screens.
const HomeScreen = ({navigation}) => {
    const route = useRoute()
   
// function to navigate to the notepad
    function notePadNavigation(){
        navigation.navigate('NotePad')}
// function to navigate to resources
    function resourcesNavigation(){
        navigation.navigate('Resources')
    }
// function to navigate to the acheivement screen
    function achievmentNavigation(){
        navigation.navigate('AchievementScreen')
    }
// function to navigate the mainscreen screen
    function MainScreenNavigation(){
          navigation.navigate('MainScreen')}
// function to navigate to the home screen
    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')
    }
// function to navigate to the profile screen
    function profileNavigation(){
        navigation.navigate("ProfileScreen")
    }
  
// this is a usestate for time entries, has a default value of ""
    const [inputTime, setInputTime] = useState("");
// the useState values for the seconds, is updated when the user inputs into the fields
// these are the final values, that are altered on the click of a button.
    const [second, setSecond] = useState(0);
// values for the hours, is updated when the user inputs into the fields
    const [hour, setHour] = useState(0);
// values for the minutes, the default value is 0 for all of these.
    const [minute, setMinute] = useState(0);
  
 // values that are altered when the fields are changed ( seconds )
    const [tempSecond, setTempSecond] = useState(0);
 // values that are altered when the fields are changed ( Hour )
    const [tempHour, setTempHour] = useState(0);
  // values that are altered when the fields are changed ( Minute )
    const [tempMinute, setTempMinute] = useState(0);
 // this useState determines whever the timer is running or not, false, then the timer is off
    const [startTimer, setStartTimer] = useState(false);
 // this is for a random value
    const [random, setRandom] = useState(50);
 // similarly this is for the email errors.
    const [EmailError, SetEmailError] = useState(false);

 
// this function takes the time entered by the users in the fields, and sets it so it displays it on screen
//finalising the details, and ensuring that they are valid. 
    function setTime() {
// if the timer is not started, and the values come back as valid, then it will execute.
        if (startTimer === false && checkTimeValues() === true) 
            // removes any errors
          SetEmailError(EmailError=>false)
        // sets the seconds, minutes, and hours
          setSecond(tempSecond)
          setHour(tempHour)
          setMinute(tempMinute)
        } else {
// else is will give an error
            SetEmailError(EmailError=>true)

        }
    }
// this is the function to check all the inputted values in the time fields.
    function checkTimeValues(){
        if (tempHour === "" || (tempHour >= 0 && tempHour < 10)) {
           //this checks whether ot no the hour fits the requirements of being either blank or greater than zero and less than 10
            if (tempMinute === "" || (tempMinute >= 0 && tempMinute <= 60)) {
            // does the same but for seconds, and minutes.
              if (tempSecond === "" || (tempSecond >= 0 && tempSecond < 60)) {
                  // a return of true means that the time is valid.
                return true;
                  
              }
            }
          }
        // a return of false means that the time is invalid
          return false;
    }


//this is a simple function that just reduces the time, reducing the second by 1.
    function reduceTime(){
       setSecond(second=>second-1)
    }

   

  // useEffect is called to decide whenever a startTimer is changed, then the code will execute  
  useEffect(() => {
    let interval = null;
   
// if start timer is true, then it will execute the code below.
    if(startTimer) {
// intervals are to do with timing of the program.
        interval = setInterval(() => {
// reduces the time, every 1000 ticks, also a second.
            reduceTime()
        }, 1000)
            //else, it will just clear the interval, stopping the timer.
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
      // this is the line that decides whether or not the timer is started.
    }, [startTimer])

// this is a second use effect to check if the second has gone below 0, same for each other aspect of time.
// such as minutes, and hours, as time after all cannot be negative.
   useEffect(() => {
    // if second is less than or equal to 0 it will execute the code below.
    if(second<=0){
        // if minute is less than or equal to 0 then it will execute the code below.
        if(minute>0){
            // it will set minute to (minute - 1), reducing the minute, an setting the second to 59.
            setMinute(minute=>minute-1)
            // it made sense to put it to 59, rather than 60. this is becuase there is a tick when it is reduced.
            setSecond(59)
        } else {
            // checks if hour is greater than 0.
            if(hour>0){
                // if it is then sets minute to 59, an reduces the hour, does the same for seconds.
                setMinute(59)
                setHour(hour=>hour-1)
                setSecond(59)
            } else {
                // this condition is whenever each field has a 0 in it, this means time has finished
                // hence, it stops the timer.
                setStartTimer(false)
            }
        }
      
        
    } 
   // this runs this section of code every time the second variable is changes, thus checking it to make sure 
   // the timer executes quickly
   }, [second])

   function startTimerFun(){
   // this is the function that whenever the timer is started, then it will alter the achievement.
   // referencing the firestore database.
    const docRef = firebase.firestore().collection('usersInformation').doc(String(global.tempUsername)).collection('achievements').doc('StartStudy')
    INSERT INTO docRef VALUES({
      
      achieved: true,
      tracking: false
    }) 
     setStartTimer(true)
   }



    return(
      <ImageBackground
      blurRadius={100}

      style={{flex:1}}
      source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
      // this is a button that navigates to the mainscreen
      <Pressable onPress={MainScreenNavigation}>
      // THis is the title, having the titleText style.
      <Text style={styles.TitleText}>
      Study Timer
      </Text>
      // this is for displaying the hour, minute, an seconds that the user has input.
      <View>
        <Text>{inputTime}</Text>
        <Text style={styles.TimingText}>{hour}:{minute}:{second}</Text>
      </View>
       // this is a line seperator, between the time and the various buttons
      <View style={styles.Line2}></View>
        // corrospoding text labelling what the user needs to o 
      <Text style={styles.EnterTimeStyle}>Enter Time</Text>
//this is a styling box to keep all the text inputs in the same row
      <View style={styles.textInputs}>
      <View style={styles.placeholderBox}>
          // this is for hours, an when changed, the val is tacken from the text input, and set to tempHour
        <TextInput style={styles.placeholderStyle} placeholderTextColor="white"  placeholder="Hours"  onChangeText={(val) => setTempHour(val)} ></TextInput>
      </View>
        <Text style={styles.placeholderStyle} > : </Text>
      <View style={styles.placeholderBox}>
          // this is for minutes, an when changed, the val is tacken from the text input, and set to tempMinutes
        <TextInput style={styles.placeholderStyle} placeholderTextColor="white" placeholder="Minutes" onChangeText={(val) => setTempMinute(val)}></TextInput>
      </View>
        <Text style={styles.placeholderStyle} > : </Text>
      <View style={styles.placeholderBox}>
          // this is for seconds, an when changed, the val is tacken from the text input, and set to tempSeconds
        <TextInput style={styles.placeholderStyle} placeholderTextColor="white" placeholder="Seconds" onChangeText={(val) => setTempSecond(val)}></TextInput>
      </View>
      </View>
      <View>
            // this is an error message that is given when the user inputs an invalid time, for example its a character
            // or not within the desired range
      {EmailError && <Text style={styles.ErrorText}>INVALID TIME INPUT</Text>}
      </View>
// this is the button to set the time, this replaces the values on screen with the tiem that the user has entered
      <TouchableOpacity onPress={setTime} style={styles.button1}>
      <Text>Set</Text></TouchableOpacity>
          // this is the button that stops the time, by setting sthe startTimer value to false.
      <TouchableOpacity onPress={()=> setStartTimer(false)} style={styles.button2}>
      <Text>Stop</Text></TouchableOpacity>
          // this button starts the time
      <TouchableOpacity style={styles.button3} onPress={startTimerFun}>
      <Text>Start</Text></TouchableOpacity>

      <View style={styles.Line}></View>
      <View flexDirection='row' style={styles.container}>
          // felxirection row, means that all of the buttons followed will be displaye in a row rather than the default column.
          // this first button is for the home screen navigation
      <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
// button is for the notepad navigation, and shows a file symbol
      <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
// button is for the achievment screen navigation, an shows a zap.
      <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={achievmentNavigation} style={styles.NotePadSticker}></Icon.Button>
// button is for the profile screen navigation, and displays a user icon.
      <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={profileNavigation} style={styles.NotePadSticker}></Icon.Button>
//button is for resources navigation and shows an open book.
      <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
      
      </View>

      </ImageBackground>
 
  
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    // creates a style calle title text.
    TitleText:{
        marginTop:'20%',
        fontSize:50,
        color:'white',
        flexDirection:'row',
        alignSelf:"center",
    //creates a style called error text.
    },
    ErrorText:{
        fontSize:15,
        fontWeight:'bold',
        color:'red',
        marginTop:'-10%',
        marginBottom:'12%',
        alignSelf:'center'
    },

    //creates a style called TimingText
    TimingText:{
        fontSize:100,
        flexDirection:'row',
        alignSelf:'center',
        color:"white",

    },
    //creates a style called Line

    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'170%'
    },
    //creates a style called Line2
    Line2:{
        marginTop:'10%',
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
    },
    // these are all styles for the stickers.
    NotePadSticker:{
        paddingLeft:'4%',
        alignSelf:'center',
     
    },
    NotePadSticker1:{
        paddingLeft:'21%',
        paddingRight:'-20%',
        paddingTop:"-8%",
    },
    NotePadSticker2:{
        paddingLeft:'7%' 

    },
     //creates a style for the container
    container:{
        alignItems:'center',
        paddingLeft:"8%"
    },
    //this is a style for the text for the enter time function
    EnterTimeStyle:{
        marginTop:'5%',
        // this ensures taht all the items inside the container, are centred.
        alignItems:'center',
        flexDirection:'row',
        alignSelf:'center',
        fontSize:30,
        color:'white',


    },
    // determines the style for the placeholder, creating a style calle placeholderstyle.
    placeholderStyle:{
        fontSize:30,
        color:'white',
    },
    placeholderBox:{
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
    },
// these are styling for the buttons; however, have to be different as the each look slightly different 
    // this is to ensure that they fit hte screen nicely, and plus, the first button needs a slightly bigger margin.
    button1:{
        width:'60%',
            alignSelf:'center',
            alignItems:'center',
            paddingVertical:20,
            height:'7%',
            backgroundColor:'white',
            borderRadius:100,
            marginTop:'-10%',

    },
   
    button2:{
            width:'60%',
            alignSelf:'center',
            alignItems:'center',
            paddingVertical:20,
            height:'7%',
            backgroundColor:'white',
            borderRadius:100,
            marginTop:'5%',
         
    },
    textInputs:{
        flexDirection:'row',
        alignSelf:'center',
        marginBottom:"20%",
        marginTop:"2%"
 
    },


    placeholderStyles:{
       fontSize:50,
    },
    button3:{
        width:'60%',
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:20,
        height:'7%',
        backgroundColor:'white',
        borderRadius:100,
        marginTop:'5%',
        marginBottom: "-155%"
},


})
