

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, Linking} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen';
import axios from 'axios'



const Resources = ({navigation}) => {


    function notePadNavigation(){
        navigation.navigate('NotePad')}
    
    function MainScreenNavigation(){
        navigation.navigate('MainScreen')}
    
    function notePadNavigation(){
        navigation.navigate('NotePad')}
    
    function resourcesNavigation(){
        navigation.navigate('Resources')
        }
   

    const MathsData = []
    const [userData, setUserData] = useState([])
    const [resources, setResources] = useState([])
    


    const HomeScreenNavigation = () =>{   
        navigation.navigate('HomeScreen')
    }

    

    const displayMaths = () => {
        setResources(userData)
    }



    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const {data} = await axios.get("https://danielrich00.github.io/RASapi/pastpaper.json")
        setUserData(data)
    }

    function hello(){
        console.log(userData[0].paper)
    }

    useEffect(() => { 
        hello
    }, [resources])  


    return(
        <ImageBackground
    blurRadius={100}
    style={{flex:1, alignItems:"center"}}
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
        <Pressable>
        <Text style={styles.FirstText}
        onPress={HomeScreenNavigation}>
        Hello</Text>
        </Pressable>
        <Pressable>
        <Text style={styles.FirstText}
        onPress={displayMaths}>
        Display Maths Items</Text>
        </Pressable> 
        <View style={styles.itemWrap}>
        <Text style={styles.fullItem}>{resources.map(x=><Text style={styles.linkText}>{x.date} <Pressable style={styles.date} onPress={()=>{Linking.openURL(x.paper)}}><Text style={styles.link}>Paper Link</Text></Pressable> </Text>)}</Text>
        </View>

        <View style={styles.Line}></View>
        <View flexDirection='row' style={styles}>
        <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
        <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
        <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
        <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
        <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
        </View>
        

    
        </ImageBackground>

       
      
    )}



export default Resources

const styles = StyleSheet.create({
    FirstText:{
      marginTop: '10%',
      textAlign:'center',
      color:'white',
      fontSize:"30%",
      fontWeight:'bold',
    },

    linkText:{
        color:'white',
        fontWeight:'bold',
        fontSize:"30%",
        

    },

    link:{
        
        fontSize:"20%",
        color:"white",
        paddingRight:"60%",
        alignSelf:'center',
      
    },

    date:{
        float:"left",
        paddingRight:"10%",
        fontSize:"30%",
        color:"white"        
    },

    fullItem:{
        flexDirection: "row",
        alignItems:"center"
    },

    itemWrap:{
        paddingBottom:"20%",
        position:"fixed",
        height:"68%"
    
    },

    container:{
        height:"70%"
    },

    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'10%'
  
    },

    
})