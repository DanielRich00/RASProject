import React from 'react';
import { View, Text } from 'react-native';

const Circle = ({ color, text }) => {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: color,
        borderWidth: 4,
        marginHorizontal:'10%',
      }}
    >
      <Text>{text}</Text>
    </View>
  );
};

export default Circle;
