

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';



const NotePad = ({navigation}) => {
 
  function notePadNavigation(){
    navigation.navigate('NotePad')}

  function MainScreenNavigation(){
      navigation.navigate('MainScreen')}

  function HomeScreenNavigation(){
    navigation.navigate('HomeScreen')
}   

  const [Notes, updateNotes] = useState([]);
  const [StringInput, updateText] = useState(null);


  const onClick = () => {
    updateNotes( arr => [...arr, "\n - " + StringInput]);
  }

  useEffect(() => {
    console.log("I am mounting!");
    return () => console.log("I am UNMOUNTING!");
  }, []);

  return(
    <ImageBackground
    blurRadius={100}
    style={{flex:1, alignItems:"center"}}
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
      <Pressable style={styles.text}
    
        onPress={MainScreenNavigation}>
          <Text>
          Back Home
          </Text>
      </Pressable>
      <View style={styles.textContainer}>
        <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null} style={styles.NotePadSticker} onPress={MainScreenNavigation}></Icon.Button>
        <Text style={styles.text}>Notes</Text>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.TextInputSeperate}>
          <TextInput
          onChangeText={(val)=>updateText(val)}
          placeholder="input text">
          </TextInput>
        </View>
        <View style={styles.sendSticker}>
          <Icon.Button color={'grey'} name="play" size="30%" backgroundColor={null} style={styles.NotePadSticker} onPress={onClick}></Icon.Button>
        </View>

      
      
      </View>
      <View style={styles.box}>
        <Text>{Notes.map( e =>
          <Text style={styles.arrayText}>{ e }</Text>
        )}
        </Text>
      </View>

      <View style={styles.Line}></View>

      <View flexDirection='row' style={styles.container}>
      <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
      </View>
    </ImageBackground>
 
  
  )
}

export default NotePad;

const styles = StyleSheet.create({
    textInput:{
       paddingTop:"10%"

    },

    box:{
      backgroundColor:'white',
      height:"60%",
      width:"80%",
      borderRadius:'20%',
      

    },

    textContainer:{
      alignItems:'center',
      flexDirection:'row',
      paddingTop:"10%",
      paddingBottom:'5%'
    },

    text:{
      color:'white',
      fontSize:'30%',
      alignSelf:'center',
      marginLeft:"-7%"
      
    },

    sendSticker:{
      alignSelf:'center'
      
      
    },

    iconContainer:{

    },

    TextInputSeperate:{
      width:"80%",
      alignSelf:'center'
    },

    overlay:{
      width:'900%',
      height:'90%',
      backgroundColor:"white"
    },

    inputBox: {
      width:"80%",
      backgroundColor:'white',
      height:'7%',
      borderRadius:"20%",
      marginBottom:'5%',
      flexDirection:'row'
    },

    arrayText:{
      fontSize:"18%",
      
    },

    Line:{
      backgroundColor:'white',
      alignSelf:'center',
      width:'80%',
      height:'0.5%',
      marginTop:'10%'

    },

    NotePadSticker:{
        paddingLeft:'4%',
        alignSelf:'center',
        
    },

    container:{
      alignItems:'center',
      paddingLeft:"-2%"
  }


})