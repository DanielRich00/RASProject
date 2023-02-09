

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// this import is for the icons at the bottom of the screen
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput} from 'react-native';
import { useState, useEffect } from 'react'
import MainScreen from './MainScreen';


// this is creating a const calle notepad, again, the navigation is imported to ensure that the user
// can navigate between the different screens upon calling them.
const NotePad = ({navigation}) => {
 
 // this funciton is for the notepad navigation
  function notePadNavigation(){
    navigation.navigate('NotePad')}
// this funciton is for the main screen navigation
  function MainScreenNavigation(){
      navigation.navigate('MainScreen')}
// this funciton is for the home screen navigation
  function HomeScreenNavigation(){
    navigation.navigate('HomeScreen')
}   
// this is the useState for the notes values, an can be update.
  const [Notes, updateNotes] = useState([]);
 // StringInput is for the input of the user at the bottom of screen 
 // ( being the note itself ) 
  const [StringInput, updateText] = useState(null);
 
// this is the function, onClick, this is performed when called.
  const onClick = () => {
   // this appends the value store in StringInput to the NotesList ( which is a linked list
    Noteslist.appendNode(StringInput)
    Noteslist.addValueToList(StringInput)
  
  }




  //this is the constuctor for the linked list
  class LinkedList {
    constructor() {
    // sets the head of the lsit to null, as currently the list is empty, upon creation
    this.head = null;
     // this sets the tail of teh list to null, as there is not values inside the list. 
     //(no nodes)
    this.tail = null;
    }
    
    
    // adds a new node to the end of the list
    appendNode(value) {
     // creates a newNode, with value being passed, and setting the next value to null
     // considering the next value is null, this essentially means that this is the tail of list
     // as there is no next node.
      const newNode = { value, next: null };
      if (this.tail) {
      // if the current node, is the tail of the list, then it will set the 'next' value of that ndoe
      // to the one we are trying to append
      this.tail.next = newNode;
    }
    // this sets the tail of the list to the new node.
    this.tail = newNode;
    //if its not the head of the list
    if (!this.head) 
     // then the list appears to be empty, so it will set the newNode to the head.
      this.head = newNode;
      
    }
    }

    //this is a backup list incase the linked list doesn't work.
    addValueToList(value){
     //passes value, which again is the input of the user.
      const newNode = { value, next: null};
     // this updates the notes value, copying the array, and just adding the value onto the end
     // this is the only way to do this in react, otherwise it will just rid the list, and then 
     // make the new value the only value in the list.
      updateNotes( arr => [...arr, "\n -" + newNode.value])
    }
    
    
    // Practically a function that removes the node at the specified index
    removeAt(index) 
 // index is the position of the item wanting to be removed
      if (!this.head || index < 0) {
        return null;
    } // checks if either the linked list is empty (!this.head) 
 //or the index provided is negative (index < 0). If either of these conditions is true, the function returns null.
      let current = this.head;
 // creates a vaiable current and sets it equal to the head of the linked list, this acts as somewhat of 
 // a counter
      let previous = null;
 //creates a variable called previous and sets it to null
      let i = 0;
 // another variable creation
      if (index === 0) {
       // checks if index provided is 0, if this condition is true, it will update the head 
       // of the list to be the next node in the list.
       this.head = current.next;
       return current.value;
    }
    // this is a while loop that continues until either, current.next is false or 'i'
 // is equal to the index provided by the parameters
    while (current.next && i < index) {
     //sets the values of previos to the currentnode
      previous = current;
     // sets the value of current to be the next node in the linked list
      current = current.next;
      i++
     // increments i
    }
    
    
    if (previous) {
     // if previous is true, then updates the next property of the previous node to be the next property of the 
     // current node.
      previous.next = current.next;
    }
    if (!previous.next) {
     //sets the tail of the list to be the pervious node.
      this.tail = previous; 
    }
 //returns the value of the current node, this is to determine, which node was removed from the list.
    return current.value;
    }
    
    // prints list 
    printListData(){
      let current = this.head;
      
      while (current) {
        console.log(current.value)
        current=current.next
      }
    }
  }

  // this is for creating the linked list initially, this creates a linked list called NotesList,
  // using the constructors mentioned above.
  const Noteslist = new LinkedList();

    
// this is the returning value that is called , whenever this screen is mentioned in the main stack.
  return(
   // this is for blurring the background
    <ImageBackground
    blurRadius={100}
  // for styling the main background
  // providing a source, which provides a gradient.
    style={{flex:1, alignItems:"center"}}
    source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
     // this is for a button, that allows the user to navigate back to the main screen, this has the
     // styles of 'text'
      <Pressable style={styles.text}
    
        onPress={MainScreenNavigation}>
          <Text>
         // text of the button
          Back Home
          </Text>
      </Pressable>
      <View style={styles.textContainer}>
       // this is a for the container that contains the top half of the screen
       // a button, that gives information of the page, is on the same height as the title screen
        <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null} style={styles.NotePadSticker} onPress={MainScreenNavigation}></Icon.Button>
// this is the title screen, and has the style 'text' also.
        <Text style={styles.text}>Notes</Text>
      </View>
//this is the first input box.
      <View style={styles.inputBox}>
        <View style={styles.TextInputSeperate}>
          <TextInput
// placeholde of input text.
          onChangeText={(val)=>updateText(val)}
          placeholder="input text">
          </TextInput>
        </View>
        <View style={styles.sendSticker}>
         // the send sticker acts as a button, in which when the user clicks it the inforation
         // or the note that the user wants to add in this case
         // will be added to a variable, and displayed on screen.
          <Icon.Button color={'grey'} name="play" size="30%" backgroundColor={null} style={styles.NotePadSticker} onPress={onClick}></Icon.Button.
        </View>

      
      
      </View>
// this view style shows the box that the notes are displayed on 
      <View style={styles.box}>
       // using a mapping function to iterate throughout the linked list to display the data.
        <Text>{Notes.map( e =>
               // each of the notes is given its style, so that it looks nice on the user's screen.
          <Text style={styles.arrayText}>{ e }</Text>
        )}</Text>
      </View>
// a line to seperate the different sections of the screen.
      <View style={styles.Line}></View>
// this is again, te container for the different buttons to navigate through the screens shown as icons. 
// I used buttons to saved space and give a professional look, this has the property of 'row', so all the icons
// will line up in a row, rather than a column
      <View flexDirection='row' style={styles.container}>
       // this is the button for the home screen navigation
      <Icon.Button color={'white'} name="home" size="40%" backgroundColor={null}  onPress={HomeScreenNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is the button for the home screen navigation
      <Icon.Button color={'white'} name="file" size="40%" backgroundColor={null}  onPress={notePadNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is the button for the note pad screen navigation
      <Icon.Button color={'white'} name="zap" size="40%" backgroundColor={null}  onPress={achievmentNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is the button for the achievement screen navigation
      <Icon.Button color={'white'} name="user" size="40%" backgroundColor={null}  onPress={profileNavigation} style={styles.NotePadSticker}></Icon.Button>
// this is the button for the profile screen navigation
      <Icon.Button color={'white'} name="book-open" size="40%" backgroundColor={null}  onPress={resourcesNavigation} style={styles.NotePadSticker}></Icon.Button>
      // this is the button for the resource navigation
</View>
    </ImageBackground.
  )
}

//this exports the notepad, so that it can be imported in the stack.
export default NotePad;

//using the previously imporrted stylesSheet, to create the various styles for the different
// components

const styles = StyleSheet.create({
 // creates the textInput style, which is for the different text input boxes.
    textInput:{
     // gives it padding, so the text will not be too close the borders of the input fields.
       paddingTop:"10%"
    },
 // this is creates a box style
    box:{
     // sets the background colour to white, and increases the height
      backgroundColor:'white',
      height:"60%",
     // this increases the width to 80 percent of the screen
      width:"80%",
     // this rounsd the borders of the box, to give it a more clean look.
      borderRadius:'20%',
      

    },
// this creates a textContainer style.
    textContainer:{
     // aligns the item to the cetre of the screen, and gives it a flex direction of row.
      alignItems:'center',
      flexDirection:'row',
      paddingTop:"10%",
     // this gives the items padding, from both the top and bottom
      paddingBottom:'5%'
    },
 // the reason for usign percentages in my styles is so it will fit multiple devices, 
 // and depending on the size of your screen it will scale accordingly.

 // creates a text style, with the colour white
    text:{
     // this is becuase it goes against the pink background, and needs to be visible.
      color:'white',
     // this increases the font size.
      fontSize:'30%',
     // aligns the text to the centre.
      alignSelf:'center',
      marginLeft:"-7%"
    },

 // creates a style for the send sticker, aligning itself to the centre.
    sendSticker:{
      alignSelf:'center' 
    },
 
 // creates a styles for the textInput
    TextInputSeperate:{
      width:"80%",
      alignSelf:'center'
    },
 
 // creates a style for the overlay of the image.
    overlay:{
     // sets the width to 900 percent
      width:'900%',
      height:'90%',
      backgroundColor:"white"
    },

 //creates a style for the input box 
    inputBox: {
     // sets the width to 80 percent of the screen, as the input box needs to be long
     // and not very tall
      width:"80%",
     // sets the background colour to white
      backgroundColor:'white',
      height:'7%',
      borderRadius:"20%",
      marginBottom:'5%',
      flexDirection:'row'
    },

 // creates a style for the arrayText.
    arrayText:{
      fontSize:"18%",
    },

 // creates a style for the Line.
    Line:{
      backgroundColor:'white',
      alignSelf:'center',
      width:'80%',
      height:'0.5%',
      marginTop:'10%'

    },
 
 // creates the style of the nodepadstickers
 // this is applied to all the stickers.
    NotePadSticker:{
        paddingLeft:'4%',
        alignSelf:'center',
    },

 //creates the style for the container
    container:{
      alignItems:'center',
      paddingLeft:"-2%"
  }


})
