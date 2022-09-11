import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TouchableOpacity} from 'react-native';

const MainScreen =({navigation})=>{
    function SignInNavigation(){
        navigation.navigate('SignIn')}
    function SignUpNavigation(){
        navigation.navigate('SignUp')
    }

    function ProfileNavigation(){
        navigation.navigate("ProfileScreen")
    }
    return( 
        <ImageBackground
        blurRadius={100}

        style={{flex:1}}
        source={{uri: 'https://i.pinimg.com/originals/65/b6/be/65b6bed2caffc39538346d90f04d1270.jpg'}}>
        <Text style={styles.FirstText}>Your Study Assistant</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={SignInNavigation}>
            <Text style={styles.buttonFont}>
            Sign In
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button2}
        onPress={SignUpNavigation}>
            <Text style={styles.buttonFont}>
            Sign Up
            </Text>
        </TouchableOpacity>
        


        </ImageBackground>
    )
}


export default MainScreen;

const styles = StyleSheet.create({
    whiteBox:{
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center',
    },
    white:{
        
        backgroundColor:'#FFFFFF',
        opacity:0.70,
        height:'20%',
        width:'90%',
        alignSelf:'center',
    },
    FirstText:{
        marginTop: '20%',
        textAlign:'center',
        color:'white',
        fontSize:'50%',
        fontWeight:'bold',
    },
    button:{
        width:'60%',
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:20,
        height:'7%',
        backgroundColor:'white',
        borderRadius:100,
        marginTop:'100%'
    },
    buttonFont:{
        fontSize:'20',
        fontWeight:'bold',

    },
    button2:{
        width:'60%',
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:20,
        height:'7%',
        backgroundColor:'white',
        borderRadius:100,
        marginTop:'5%'
      

    }





})
