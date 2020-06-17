import * as React from 'react';
import { View, StyleSheet, Dimensions, TextInput, Switch } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Theme from '../assets/Theme';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';

const DefaultText = props => {
  return (
      <Switch
        trackColor={{ false: "lightgray", true: "rgb(56,192,164)" }}
        thumbColor={true ? "#FFFF" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.handle}
        value={props.value}
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



