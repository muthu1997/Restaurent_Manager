import * as React from 'react';
import { View, StyleSheet, Dimensions, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Theme from '../assets/Theme';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';

const DefaultText = props => {
  return (
      <TextInput
      style={[styles.mainInput,{...props.style}]}
      {...props}
      defaultValue={props.value}
      multiline={props.multiline}
      textAlign={props.align}
      placeholder={props.placeholder}
      onChangeText={props.handle}
      underlineColorAndroid={Theme.BACK} 
      />
  );
}

const styles = StyleSheet.create({
  mainInput: { 
    width:mainButtonWidth,
    height:40,
    borderRadius:10,
    backgroundColor:Theme.WHITE,
    paddingHorizontal:5,
    marginVertical:8,
    elevation:1,
    alignSelf:'center'
  },
});

export default DefaultText;



