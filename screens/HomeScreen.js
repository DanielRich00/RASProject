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
        if (startTimer === false && checkTimeValues() === true) {
          SetEmailError(EmailError=>false)
          setSecond(tempSecond)
          setHour(tempHour)
          setMinute(tempMinute)
        } else {
            SetEmailError(EmailError=>true)

        }
    }

    function checkTimeValues(){
        if (tempHour === "" || (tempHour >= 0 && tempHour < 10)) {
            if (tempMinute === "" || (tempMinute >= 0 && tempMinute <= 60)) {
              if (tempSecond === "" || (tempSecond >= 0 && tempSecond < 60)) {
                return true;
              }
            }
          }
          return false;
    }



    function reduceTime(){
       setSecond(second=>second-1)
    }

   

    
  useEffect(() => {
    let interval = null;
   

    if(startTimer) {
        interval = setInterval(() => {
            reduceTime()
        }, 1000)
            
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [startTimer])

   useEffect(() => {
    if(second<=0){
        if(minute>0){
            setMinute(minute=>minute-1)
            setSecond(59)
        } else {
            if(hour>0){
                setMinute(59)
                setHour(hour=>hour-1)
                setSecond(59)
            } else {
                setStartTimer(false)
                console.log(tempHour, tempSecond, tempMinute)
            }
        }
      
        
    } 
   }, [second])

   function startTimerFun(){
    const docRef = firebase.firestore().collection('usersInformation').doc(String(global.tempUsername)).collection('achievements').doc('StartStudy')
    docRef.set({
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
      <Pressable onPress={MainScreenNavigation}>
      <Text style={styles.TitleText}>
      Study Timer
      </Text>
      </Pressable>
      <View>
        <Text>{inputTime}</Text>
        <Text style={styles.TimingText}>{hour}:{minute}:{second}</Text>
      </View>
      <View style={styles.Line2}></View>
      <Text style={styles.EnterTimeStyle}>Enter Time</Text>
      <View style={styles.textInputs}>
      <View style={styles.placeholderBox}>
        <TextInput style={styles.placeholderStyle} placeholderTextColor="white"  placeholder="Hours"  onChangeText={(val) => setTempHour(val)} ></TextInput>
      </View>
        <Text style={styles.placeholderStyle} > : </Text>
      <View style={styles.placeholderBox}>
        <TextInput style={styles.placeholderStyle} placeholderTextColor="white" placeholder="Minutes" onChangeText={(val) => setTempMinute(val)}></TextInput>
      </View>
        <Text style={styles.placeholderStyle} > : </Text>
      <View style={styles.placeholderBox}>
        <TextInput style={styles.placeholderStyle} placeholderTextColor="white" placeholder="Seconds" onChangeText={(val) => setTempSecond(val)}></TextInput>
      </View>
      </View>
      <View>
      {EmailError && <Text style={styles.ErrorText}>INVALID TIME INPUT</Text>}
      </View>
      <TouchableOpacity onPress={setTime} style={styles.button1}>
      <Text>Set</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=> setStartTimer(false)} style={styles.button2}>
      <Text>Stop</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button3} onPress={startTimerFun}>
      <Text>Start</Text></TouchableOpacity>

      <View style={styles.Line}></View>
      <View flexDirection='row' style={styles.container}>
      <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={achievmentNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={profileNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
      
      </View>

      </ImageBackground>
 
  
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    TitleText:{
        marginTop:'20%',
        fontSize:50,
        color:'white',
        flexDirection:'row',
        alignSelf:"center",

    },
    ErrorText:{
        fontSize:15,
        fontWeight:'bold',
        color:'red',
        marginTop:'-10%',
        marginBottom:'12%',
        alignSelf:'center'
    },

    TimingText:{
        fontSize:100,
        flexDirection:'row',
        alignSelf:'center',
        color:"white",

    },

    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'170%'
    },

    Line2:{
        marginTop:'10%',
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
    },

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
    container:{
        alignItems:'center',
        paddingLeft:"8%"
    },
    EnterTimeStyle:{
        marginTop:'5%',
        alignItems:'center',
        flexDirection:'row',
        alignSelf:'center',
        fontSize:30,
        color:'white',


    },
    placeholderStyle:{
        fontSize:30,
        color:'white',
    },
    placeholderBox:{
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
    },

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
