
// imports for the container of the navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// this is importing all the react 
import Icon from 'react-native-vector-icons/Feather';
// this is for the icons
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, Linking, Modal} from 'react-native';
// this is for useState and useEffects, which is used for the majority of my variables
import { useState, useEffect } from 'react'
// mainScreen imported for the different Navigational
import MainScreen from './MainScreen';
// homeScreen imported for the different Navigations
import HomeScreen from './HomeScreen';
// profileScreen  imported for navigation to the profile screen
import ProfileScreen from './ProfileScreen';
// axios is used for delays with fetching from regularly updated databases
import axios from 'axios'
// routing is used for transferring data between screens
import { Route } from 'react-router-dom';
import { useRoute } from '@react-navigation/native';
import DisplayResources from './displayDataAlgorithm'


//creates a const resources that i later exported, and imported into the main stack
// navigation is used for the different navigation to teh screens
const Resources = ({navigation}) => {
    // routing for data transfer
    const route = useRoute();

// this function is to be able to travel between the screens and notepad
    function notePadNavigation(){
        navigation.navigate('NotePad')}
   // for navigation to the mainscreen
    function MainScreenNavigation(){
        navigation.navigate('MainScreen')}
    
    // for navigation to the notepad screen
    function notePadNavigation(){
        navigation.navigate('NotePad')}
    
    // for navigation to the resources screen
    function resourcesNavigation(){
        navigation.navigate('Resources')
        }

    // for navigation to the profile screen screen
    function ProfileScreenNavigation(){
        navigation.navigate("ProfileScreen")
    }
   

    // this is an empty arry for maths data.
    const MathsData = []
    // this is for the userData
    const [userData, setUserData] = useState([])
    // this is for the resrouces, whill be edited when the database data is fetched.
    const [resources, setResources] = useState([])
    // this determines whether the popup for each individual subject is visible
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [visiblePopup2, setVisiblePopup2] = useState(false)
    
    

// this is for showing date of the websites, date is passed, and the website is also passed
    const DateWebsite = ({ date, website }) => (
        <View>
        // shows the date
          <Text>{date}</Text>
        // shows the website link
          <Text>{website}</Text>
        </View>
      );
    

// this is for the homescreen navigation
    const HomeScreenNavigation = () =>{   
        navigation.navigate('HomeScreen')
    }

    
// this is for displaying the maths resources, this is called when the user
    // clicks the button and asks to display the maths resources
    const displayMaths = () => {
        //this sets the visibiltiy of the popup to true
        // it is orginally false, and this means that it will be displayed
        // over the previous screen
        setVisiblePopup(true)
        // the edits the rersouces variable with the usersData, which is pulled from the database
        // and passes it through, meaning that the popup can access this data.
        setResources(userData)
    }

    // this is the same as the display maths but is for chemistry instead
    const displayChemistry = () => {
        // this changes the visisbility of the popup to true
        // meaning the user can see it
        setVisiblePopup2(true)
        //pases the database inforamtion to resources.
        setResources(userData)
    }
    
    //useEffect is put into use, whenever the array passed at the end is changed
    // howeer this one isn't changed, so it just isntantly gets the data.
    useEffect(() => 
              //calls the get data function
        getData()
    }, [])

    const getData = async () => {
        // axios ensures the program waits until all the data is pulled
        // this is incase the data is very large.
        const {data} = await axios.get("https://danielrich00.github.io/RASapi/pastpaper.json")
        // sets the Userdata array to the data that is fetched from teh previous API.
        setUserData(data)
    }


//this is what is returned when the main stack calls resources.
    return(
        // this is for the iamge background
        <ImageBackground
        // provides the blur for the image
         blurRadius={100}
// applies flex and aligns all the components inside to the center.
        style={{flex:1, alignItems:"center"}}
        // this is the image url provided for the image background
        source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
            <Modal
// modal is reacts way of poviding a popup
            transparent={false}
// trransparent = false, means that when the popup is visible it will not be transparent.
            visible={visiblePopup}
// animation type is the way that the pop-up appears on the screen, and is set to slide
            animationType="slide"
            onRequestClose={()=> setVisiblePopup(false)}>                           
                <ImageBackground
// this is the same as the main screen, and has the same properites, but this time is for the popup
                blurRadius={100}
// this is the blur
                style={{flex:1, alignItems:"center"}}
                // this is the image url source.
                source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
                    // providing a title for the pop-up, which is the same as the resource being accessed
                    <Text style={styles.TitleText}> Maths Resources </Text>
// a line is used here for seperating the different components of the screen
                    <View style={styles.Line}></View>
// this is calling the displayResources function, with resources passed as the inforamtion brought 
// by the api, and the subject displayed as maths, 'maths' is used as a prerequisite for the
// component, and filters the data, so the program only displays the data required, for the subject.
                    <DisplayResources resources={userData} subject="maths"/>
                        // onPress, means that when the user clicks the button for closing, it will set the visisbility
                        // to false, hence getting rid of the pop-up
                    <Pressable onPress={() => setVisiblePopup(false)}>
                    <Text style={styles.popUpText}>
                        // this is the text for the button 'close"
                    Close
                    </Text>
                </Pressable>
// closing tag for the image background
                 </ImageBackground>
            </Modal>


            <Modal
// this is for the chemistry resources.
// initially the visibility is set to false.
                 transparent={false}
                visible={visiblePopup2}
// this is the animation type of the modal popup
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
                Back</Text>
            </Pressable>
// this is for the displaying of the different data
            <Pressable>
                // pressable aer for buttons, and clicking this button will call the function displayMaths
            <Text style={styles.FirstText}
            onPress={displayMaths}>
                // this is a button for displaying the chemistry items.
            Display Maths Items</Text>
            <Text style={styles.FirstText}
            onPress={displayChemistry}>
            Display Chemistry Items</Text>
            <Text style={styles.FirstText}>
                  // this is a button for displaying the Physics items.
            Display Physics Items</Text>
            <Text style={styles.FirstText}>
                // this is a button for displaying the CS items.
            Display CS Items</Text>
            </Pressable> 

            <View style={styles.Line2}></View>
            <View flexDirection='row' style={styles}>
                // this is for the various component navigations
                // this is for the homeScreen navigation
            <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is for note pad navigation
            <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is for the achievment screen navigation
            <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={achievmentNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is for the profile screen navigation
            <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={profileScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is for the resources screen navigation
            <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
            </View>
        </ImageBackground>



    )}


    
//this exports the resources const, so it can imported into the stack.
export default Resources

// this creates a style sheet for creating the different styles.
const styles = StyleSheet.create({
    // this creates a first text style.
    FirstText:{
      marginTop: '10%',
      textAlign:'left',
        // sets the colour to white, to contrast with the background
      color:'white',
      fontSize:"30%",
        // this sets the weight of the font to bold so it furthur stands out as a  title.
      fontWeight:'bold',
    },
    //this is a line for seperating the different components.
    Line2:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'100%'
    },
    // this is the style for the popup text
    popUpText:{
        fontSize:45,
        // this fontsize is slightly smaller than the other font sizes
        color:'white'
    },
// this is the style for the titleText
    TitleText:{
        // this is to set the fontsize, and the color of the font
        fontSize:35,
        color:'white',
        fontWeight:'bold',
        marginTop:'10%'
    },
    // this is for the style of the link text, the part of the display
    // that the users clicks to navigate to the links
    linkText:{
        color:'white',
        fontWeight:'bold',
        fontSize:"30%",
        

    },
// this is for the style of the link text
    link:{
        
        fontSize:"20%",
        color:"white",
        paddingRight:"60%",
        alignSelf:'center',
      
    },
// this is the styling for the date
    date:{
        float:"left",
        paddingRight:"10%",
        fontSize:"30%",
        color:"white"        
    },
// this is the styling for the fullItem
    fullItem:{
        flexDirection: "row",
        alignItems:"center"
    },
    
//this is the style for the item wrap
    itemWrap:{
        paddingBottom:"20%",
        position:"fixed",
        height:"68%"
//this is the style for the container
    },

    container:{
        height:"70%"
    },
// this is the style for the Line
    Line:{
        backgroundColor:'white',
        alignSelf:'center',
        width:'80%',
        height:'0.5%',
        marginTop:'10%'
  
    },

    
})
