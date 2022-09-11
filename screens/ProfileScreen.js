

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen'


const ProfileScreen = ({navigation}) =>{
   
    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')}


    return(
    <ImageBackground
    blurRadius={100}
    style={{flex:1, alignItems:"center"}}
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
        <Pressable
        onPress={HomeScreenNavigation}>
        <Text style={styles.text}>
        helo</Text>
        </Pressable>
    
    </ImageBackground>
    
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    text:{
        fontSize:30,
        marginTop:20,
    }

})



