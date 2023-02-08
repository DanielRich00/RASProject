

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, Linking, Modal} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import axios from 'axios'
import { Route } from 'react-router-dom';
import { useRoute } from '@react-navigation/native';
import DisplayResources from './displayDataAlgorithm'


const Resources = ({navigation}) => {
    const route = useRoute();


    function notePadNavigation(){
        navigation.navigate('NotePad')}
    
    function MainScreenNavigation(){
        navigation.navigate('MainScreen')}
    
    function notePadNavigation(){
        navigation.navigate('NotePad')}
    
    function resourcesNavigation(){
        navigation.navigate('Resources')
        }

    function ProfileScreenNavigation(){
        navigation.navigate("ProfileScreen")
    }
   

    const MathsData = []
    const [userData, setUserData] = useState([])
    const [resources, setResources] = useState([])
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [visiblePopup2, setVisiblePopup2] = useState(false)
    
    


    const DateWebsite = ({ date, website }) => (
        <View>
          <Text>{date}</Text>
          <Text>{website}</Text>
        </View>
      );
    


    const HomeScreenNavigation = () =>{   
        navigation.navigate('HomeScreen')
    }

    

    const displayMaths = () => {
        setVisiblePopup(true)
        setResources(userData)
    }

    const displayChemistry = () => {
        setVisiblePopup2(true)
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
        console.log(userData.maths.dates[1])
    }



    return(
        <ImageBackground
         blurRadius={100}
        style={{flex:1, alignItems:"center"}}
        source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
            <Modal
            transparent={false}
            visible={visiblePopup}
            animationType="slide"
            onRequestClose={()=> setVisiblePopup(false)}>                           
                <ImageBackground
                blurRadius={100}
                style={{flex:1, alignItems:"center"}}
                source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
                    <Text style={styles.TitleText}> Maths Resources </Text>
                    <View style={styles.Line}></View>
                    <DisplayResources resources={userData} subject="maths"/>
                    <Pressable onPress={() => setVisiblePopup(false)}>
                    <Text style={styles.popUpText}>
                    Close
                    </Text>
                </Pressable>
                 </ImageBackground>
            </Modal>


            <Modal
                 transparent={false}
                visible={visiblePopup2}
                animationType="slide"
                onRequestClose={()=> setVisiblePopup2(false)}>
                
                <ImageBackground
                 blurRadius={100}
                style={{flex:1, alignItems:"center"}}
                source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
                    <Text style={styles.TitleText}> Chemistry Resources </Text>
                    <View style={styles.Line}></View>
                    <DisplayResources resources={userData} subject="chemistry"/>

                    <Pressable onPress={() => setVisiblePopup2(false)}>
                    <Text style={styles.popUpText}>
                    Close
                    </Text>
                </Pressable>
                    
                </ImageBackground>
            
            </Modal>


            <Pressable>
            <Text style={styles.FirstText}
            onPress={HomeScreenNavigation}>
                Hello</Text>
            </Pressable>
            <Pressable>
            <Text style={styles.FirstText}
            onPress={displayMaths}>
            Display Maths Items</Text>
            <Text style={styles.FirstText}
            onPress={displayChemistry}>
            Display Chemistry Items</Text>
            <Text style={styles.FirstText}>
            Display Physics Items</Text>
            <Text style={styles.FirstText}>
            Display CS Items</Text>
            </Pressable> 

            <View style={styles.Line2}></View>
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
      textAlign:'left',
      color:'white',
      fontSize:"30%",
      fontWeight:'bold',
    },
    Line2:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'100%'
    },

    popUpText:{
        fontSize:45,
        color:'white'
    },

    TitleText:{
        fontSize:35,
        color:'white',
        fontWeight:'bold',
        marginTop:'10%'
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
