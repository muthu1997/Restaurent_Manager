import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';

const DefaultLoader = props => {
  return (
    <View>
      </View>
  ); 
} 


export default DefaultLoader;
 