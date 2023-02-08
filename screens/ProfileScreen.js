

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen'
import { firebase, db } from "../firebase"



const ProfileScreen = ({navigation}) =>{
    const docRef = firebase.firestore().collection('usersInformation').doc(String(global.tempUsername))
    const docRef2 = firebase.firestore().collection('users').doc(String(global.tempUsername))

    const[userStudyTime, setUserStudyTime] = useState(0)
    const[totalStudyAmount, setTotalStudyAmount] = useState(0)
    const[userEmail, setUserEmail] = useState("")
    const[userUsername, setUserUsername] = useState("")

     
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
        navigation.navigate("ProfileScreen")
    }
    
    docRef.get().then(doc => {
        if (doc.exists){
            setUserStudyTime(doc.data().totalStudied)
            setTotalStudyAmount(doc.data().totalStudies)
        } else {
            console.log('doc does not exists')
            
        }
    })

    docRef2.get().then(doc => {
        if (doc.exists){
            setUserEmail(doc.data().email)
            setUserUsername(doc.data().username)
        } else {
            console.log('doc does not exists')
        }
    })

   
   
    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')}


    return(
    <ImageBackground
    blurRadius={100}
    style={{flex:1, alignItems:"center"}}
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
    <Text style={styles.information}>User Information</Text>
    <View style={styles.userInformationColumn}>
        <Text style={styles.userInformationTitle}>Username: </Text>
        <Text style={styles.userInformationData}> {userUsername} </Text>
    </View>
    <View style={styles.userInformationColumn}>
        <Text style={styles.userInformationTitle}>Email: </Text>
        <Text style={styles.userInformationData}> {userEmail} </Text>
    </View>
    <Text style={styles.information}>User Statistics</Text>
    <View style={styles.userInformationColumn}>
        <Text style={styles.userInformationTitle}>Time Studied: </Text>
        <Text style={styles.userInformationData}> {userStudyTime} </Text>
    </View>
    <View style={styles.userInformationColumn}>
        <Text style={styles.userInformationTitle}>Study Sessions: </Text>
        <Text style={styles.userInformationData}> {totalStudyAmount} </Text>
    </View> 
       
        <Pressable
        onPress={HomeScreenNavigation}>
    

        </Pressable>
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

export default ProfileScreen


const styles = StyleSheet.create({
    text:{
        fontSize:30,
        marginTop:20,
    },
    information:{
        marginTop: '20%',
        textAlign:'center',
        color:'white',
        fontSize:40,
        fontWeight:'bold',

    },
    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'65%'
    },
    userInformationTitle:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,

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
    userInformationData:{
        fontSize:20,
    },
    userInformationColumn:{
        flexDirection:'row',
        marginTop:'10%'
    }

})







