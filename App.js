
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// this is importing all of the screens from ./screens folder in directory.
import MainScreen from './screens/MainScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import NotePad from './screens/NotePad';
import React from 'react';
import Resources from './screens/Resources'
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

//creates the stack
const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    {/*headerShown decides whether or not the head is shown*/}
    <Stack.Navigator screenOptions={{headerShown: false}}>
    {/*this is stack for screens*/}


      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NotePad" component={NotePad} />
      <Stack.Screen name="Resources" component={Resources} />
    
    
    
    </Stack.Navigator>
    </NavigationContainer>
  
  )
}

export default App