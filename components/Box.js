
import { StyleSheet, Text, View, Pressable, ImageBackground} from 'react-native';
const Box = () => {
    return(
        <View styles={styles.TextInputError}>
        </View>
    )

    }



const styles = StyleSheet.create({
    TextInputError:{
        borderColor:'red',
        borderWidth:'5%',
        marginTop:"50%",
        width:'80%',
        height:'5%',
        alignSelf:'center'
    }
})
