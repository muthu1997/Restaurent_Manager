import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Constants from 'expo-constants';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const mainTextWidth = Dimensions.get('window').width >= 500 ? 14 : 14;

const DefaultText = props => {
  return (
      <Text numberOfLines = {props.lines} style={{...props.style,fontSize:mainTextWidth}}>
        {props.children}
      </Text>
  );
} 
 
const styles = StyleSheet.create({
  mainText: {
    fontSize:mainTextWidth,  
    //fontFamily: 'space-mono'
  },
});

export default DefaultText;
