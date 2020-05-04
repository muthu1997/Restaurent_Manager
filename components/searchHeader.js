import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Theme from '../assets/Theme';
import Text from './Text';
import Icon from 'react-native-vector-icons/FontAwesome';

const widther = Dimensions.get('window').width;
const mainImageWidth = Dimensions.get('window').width >= 500 ? 40 : 30;
const mainIconSize = Dimensions.get('window').width >= 500 ? 40 : 30;

const DefaultText = props => {
  return (
    <View elevation={0} {...props} style={styles.mainCard}>
    <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
      <View
        style={{
          flexDirection: 'row',
          height: Dimensions.get('window').width >= 500 ? 50 : 40,
          marginTop: 5,
          width: '70%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 5,
          borderColor: 'gray',
          backgroundColor: '#FFFF',
          paddingHorizontal: 8,
        }}>
        <Icon name="search" size={20} color="gray" />
        <TextInput
        value={props.value}
          placeholder={props.placeholder}
          underlineColorAndroid="transparent"
          onChangeText={data=>props.search(data)}
          style={styles.input}
        />
      <TouchableOpacity onPress={props.handleClear} style={{margin:5}}>
        <Icon name="times-circle" size={20} color="gray" />
      </TouchableOpacity>
      </View>
      {props.handle != null ? (
      <TouchableOpacity onPress={props.handle} style={{margin:5}}>
        <Text style={{color:Theme.GRAY}}>Cancel</Text>
      </TouchableOpacity>
      ) : null }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    backgroundColor: Theme.SECONDARY,
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default DefaultText;
