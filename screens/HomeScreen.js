

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Image } from 'react-native-web';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import { Route } from 'react-router-dom';
import { useRoute } from '@react-navigation/native';


const HomeScreen = ({navigation}) => {
    const route = useRoute()

  


    function notePadNavigation(){
        navigation.navigate('NotePad')
        console.log(route.acceptedEmail)}
    
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

export default HomeScreen;

const styles = StyleSheet.create({
    text:{
        marginTop:'20%'

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
    }

})