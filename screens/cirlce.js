import React from 'react';
//this imports everything from the react library.
import { View, Text } from 'react-native';

//this is creating a circle component const, which takes in two variables, color, and text
// this is becuase each individual circle component represents an achievment, and will have
// different text.
const Circle = ({ color, text }) => {
  return (
    <View
      style={{
    // this is determining the width and height of the achievment node itself
        width: 100,
        height: 100,
    // this is to make it look like a cirlcle, and smooth out the edges
        borderRadius: 100,
    // changing the background colour to white.
        backgroundColor: 'white',
        alignItems: 'center',
    // this is aligning the items so it is in the centre of the circle rather
    // than clipping through the top
        justifyContent: 'center',
    // changing the border colour of the cirlcle, to the colour that is passed through
        borderColor: color,
    // thickening the widht of the border to 4, as the regular is way too thin
    // meaning that the colour would not be visible to the user.
        borderWidth: 4,
        marginHorizontal:'10%',
      }}
    >
      //shows the text, in this case is the value of the achievment
      <Text>{text}</Text>
    </View>
  );
};

// exporting the circle, so it can be used in the achievment screen

export default Circle;
