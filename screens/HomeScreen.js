import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Image } from 'react-native-web';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import { Route } from 'react-router-dom';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { RANDOM_FACTOR } from '@firebase/util';


const HomeScreen = ({navigation}) => {
    const route = useRoute()
   
    function notePadNavigation(){
        navigation.navigate('NotePad')}
    function resourcesNavigation(){
        navigation.navigate('Resources')
    }
    function MainScreenNavigation(){
          navigation.navigate('MainScreen')}
    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')
    }
    function profileNavigation(){
        navigation.navigate("ProfileScreen",{
            email: route.params.email, 
            password: route.params.password,
          })
    }

    const [inputTime, setInputTime] = useState("");
    const [second, setSecond] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
  
    const [tempSecond, setTempSecond] = useState(0);
    const [tempHour, setTempHour] = useState(0);
    const [tempMinute, setTempMinute] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    const [random, setRandom] = useState(50);

    function setTime() {
        if (startTimer === false && checkTimeValues() === true) {
          console.log("why have i not ended it all yet?");
          setSecond(tempSecond)
          setHour(tempHour)
          setMinute(tempMinute)
          console.log(route.params.password)
        }
    }

    function checkTimeValues(){
        if(tempSecond<0 || tempSecond>60){
            return false
        } else if (tempMinute<0 || tempMinute>60){
            return false
        } else if (tempHour>10 || tempHour<0 ){
            return false
        } else {
            return true
        }
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
    if(second<0){
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
            }
        }
      
        
    } 
   }, [second])



    return(
      <ImageBackground
      blurRadius={100}

      style={{flex:1}}
      source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
      <Pressable style={styles.text}
      onPress={MainScreenNavigation}>

      <Text>
      Back Home
      </Text>
      <View>
        <Text>{inputTime}</Text>
        <Text>Hours : Minutes : Seconds</Text>
        <Text>{hour}:{minute}:{second}</Text>
      </View>
      <TextInput placeholder="hour" onChangeText={(val) => setTempHour(val)}></TextInput>
      <TextInput placeholder="minute" onChangeText={(val) => setTempMinute(val)}></TextInput>
      <TextInput placeholder="second" onChangeText={(val) => setTempSecond(val)}></TextInput>
      </Pressable>
      <TouchableOpacity onPress={setTime} style={styles.button}>
      <Text>Set</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=> setStartTimer(false)} style={styles.button}>
      <Text>Stop</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => setStartTimer(true)}>
      <Text>Start</Text></TouchableOpacity>

      <View style={styles.Line}></View>
      <View flexDirection='row' style={styles.container}>
      <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={profileNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
      
      </View>

      </ImageBackground>
 
  
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    text:{
        marginTop:'20%',
        height:"10%"

    },

    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'170%'
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
    button:{
            width:'60%',
            alignSelf:'center',
            alignItems:'center',
            paddingVertical:20,
            height:'7%',
            backgroundColor:'white',
            borderRadius:100,
            marginTop:'5%',
         
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
        marginBottom: "-80%"
},

})
