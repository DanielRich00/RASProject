// importing all the of the things needed for the program.
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen'
import { firebase, db } from "../firebase"


//creates a const profile screen, this uses navigation aswell
// to allow the user to navigate through screens.
const ProfileScreen = ({navigation}) =>{
    // refrencing the collection usersInfomation, in position set by the hased username
    const docRef = firebase.firestore().collection('usersInformation').doc(String(global.tempUsername))
    // refrencing the users collection 'users', this is for the emails, and username.
    const docRef2 = firebase.firestore().collection('users').doc(String(global.tempUsername))

    const[userStudyTime, setUserStudyTime] = useState(0)
    // this is the userStudyTime, whislt initially set to 0, will be ammended to the value in the database
    const[totalStudyAmount, setTotalStudyAmount] = useState(0)
    // this is the amount of study sessions the user has done
    // this will be fetched from the database, and set.
    const[userEmail, setUserEmail] = useState("")
    // this is the user mail, which is also taken from the database.
    const[userUsername, setUserUsername] = useState("")
    // this is the userUsename, which will be displayed on the profile screen.
    
    // function for the notepad navigation
    function notePadNavigation(){
        // this navigates to the notepad screen.
        navigation.navigate('NotePad')}
    
    //function for resources navigation
    function resourcesNavigation(){
        navigation.navigate('Resources')
    }
    //function for main screen navigation
    function MainScreenNavigation(){
          navigation.navigate('MainScreen')}
    //function for the home screen navigation
    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')
    }
    //function for the profile screen navigation
    function profileNavigation(){
        navigation.navigate("ProfileScreen")
    }
    
    // this is a type of firebase commands then selects the total time studied and total studient fom teh docRef collection
    // it then performs the following:
    SELECT SUM(totalTimeStudied) AS totalTimeStudied, SUM(totalStudied) AS totalStudied
    FROM usersInfomation FROM docRef.then(doc => {
        // if the doc exists then it does the following, if it doesn't then the progam outputs an error.
        if (doc.exists){
            //sets the studyTime to the database studyTime
            setUserStudyTime(doc.data().totalStudied)
            // sets the studyAmount to the database studyAmount
            setTotalStudyAmount(doc.data().totalStudies)
        } else {
            // this is the error.
            console.log('doc does not exists')  
        }
    })
    
  
    // this uses firebase commands to fetch the userEmails, and userUsername froms the database in the location
    // of the hashed username.
    SELECT userEmail AS userEmail, userUsername AS userUsername FROM users FROM docRef2.get().then(doc => {\
        // if the doc exists then it will do the following
        if (doc.exists){
            // set the user email to the email in the database
            setUserEmail(doc.data().email)
            // set the username to the username in the database
            setUserUsername(doc.data().username)
        } else {
            // else it will log that the dog does not exists.
            console.log('doc does not exists')
        }
    })

   
   // this is a function for homescreen navigation.
    function HomeScreenNavigation(){
        navigation.navigate('HomeScreen')}

// this is what is returned when teh profile screen is called to the stack
    return(
        // this is the usual blu for the background, and the image background.
    <ImageBackground
    blurRadius={100}
    style={{flex:1, alignItems:"center"}}
    // this is the link to the image that is used in the backgound.
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
    <Text style={styles.information}>User Information</Text>
// title screen for teh page, with the style called information
    <View style={styles.userInformationColumn}>
        // this is a boxing for the column to ensure all of the components within the container
        // are aligned accordingly.
        <Text style={styles.userInformationTitle}>Username: </Text>
// this shows the text 'username' to tell the user what information is besides it, it has the style
// userInformation
        <Text style={styles.userInformationData}> {userUsername} </Text>
    </View>
    <View style={styles.userInformationColumn}>
        // this displays the user email, which was peviously from the database.
        <Text style={styles.userInformationTitle}>Email: </Text>
        <Text style={styles.userInformationData}> {userEmail} </Text>
    </View>
// this is a container that shows the user statistics, this is more to do with the study amount the 
// user has done and the progress they have done on the application.
    <Text style={styles.information}>User Statistics</Text>
    <View style={styles.userInformationColumn}>
        // this shows the total time studied, which is added everytime the user completes a study session.
        <Text style={styles.userInformationTitle}>Time Studied: </Text>
        <Text style={styles.userInformationData}> {userStudyTime} </Text>
    </View>
// this shows the total amount of times, the user has studied.
    <View style={styles.userInformationColumn}>
        <Text style={styles.userInformationTitle}>Study Sessions: </Text>
        <Text style={styles.userInformationData}> {totalStudyAmount} </Text>
    </View> 
       // this is a button for the home screen Navigation.
        <Pressable
        onPress={HomeScreenNavigation}>
    

        </Pressable>
// a line to seperate the different aspects of the profile screen.
        <View style={styles.Line}></View>
// this a cotnaien to ensure taht they all display in a row.
        <View flexDirection='row' style={styles.container}>
            // this is a icon button, which navigates to the homescreen
            <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is an icon button which navigates to the notepad screen
            <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is an icon button which navigates to the achievement screen
            <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={achievementPadNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is an icon button which navigates to the profiel screen
            <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={profileNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is an icon button which navigates to the resources screen.
            <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
        </View>
    </ImageBackground>
    
    )
}
//exports the profile screen so it can be imported
// and added to the stack.
export default ProfileScreen

// this is for creating for the styles.
const styles = StyleSheet.create({
    // creates a text style
    text:{
        // this changes the font size
        fontSize:30,
        // and adds a margin to the top.
        marginTop:20,
    },
    // this creates an inforamation styles.
    information:{
        // this adds a margin to the top, so it creates space between the different components
        marginTop: '20%',
        // and aligns the items to the centre.
        textAlign:'center',
        color:'white',
        fontSize:40,
        fontWeight:'bold',

    },
    // this creates a line style.
    Line:{
        // this is for seperating the different aspects of the screen
        // adds a background colour to the line making it white
        backgroundColor:'white',
        // this centres the line
        alignSelf:'center',
        // width stretches it out and makes it really thin.
        width:'80%',
        height:'0.5%',
        marginTop:'65%'
    },
    // this creates a userInforamtionTitleStyle
    userInformationTitle:{
        // setting the colour to white, as it needs to stand out agaisnt the pink background
        color:'white',
        fontWeight:'bold',
        fontSize:20,

    },
    // these are the styling for the previous stickers.
    NotePadSticker1:{
        paddingLeft:'21%',
        paddingRight:'-20%',
        paddingTop:"-8%",
    },
    NotePadSticker2:{
        paddingLeft:'7%' 
    },
    // creates a style for the container
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



