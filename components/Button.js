import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Text from './Text';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';

const DefaultButton = props => {
  return (
      <TouchableOpacity activeOpacity={0.8} onPress={props.handle} style={[styles.mainButton,{...props.style}]}>
        <Text style={{color:'#FFFF',fontWeight:'500'}}>{props.title}</Text>
      </TouchableOpacity>
  ); 
} 

const styles = StyleSheet.create({
  mainButton: {
    width:mainButtonWidth,
    height:40,
    backgroundColor: '#38c0a4',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    elevation:2
  },
});

export default DefaultButton;
