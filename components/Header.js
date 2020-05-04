import * as React from 'react';
import { View, StyleSheet, Dimensions, TextInput, Image, StatusBar, TouchableOpacity } from 'react-native';
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
      <Card elevation={3} {...props} style={styles.mainCard}>
      
        <View style={{flexDirection:'row',marginTop:5,width:'100%',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{position:'absolute',left:5}} activeOpacity={1.0} onPress={props.handle}>
          {props.image === 'icon' ? (
            <Icon name = "angle-left" size={mainIconSize} />
          ) : (
            <Image 
            resizeMode="contain"
            style={{width:mainImageWidth,height:mainImageWidth}}
            source={props.image} />
          ) }
          </TouchableOpacity>  
          <View style={{alignSelf:'center'}}>
            <Text style={{textAlign:'center',fontWeight:'500',...props.titlestyle}}>{props.title}</Text>
          </View>
          <TouchableOpacity style={{position:'absolute',right:5}} activeOpacity={1.0} onPress={props.handle1}>
          {props.image1 === 'icon' ? (
            <Icon name = {props.icon} color={Theme.GRAY} size={Dimensions.get('window').width >= 500 ? 30 : 20} />
          ) : (
            <Image 
            resizeMode="contain"
            style={{width:mainImageWidth,height:mainImageWidth}}
            source={props.image1} />
          ) }
          </TouchableOpacity> 
        </View>
        {props.children}
      </Card>
  );
}

const styles = StyleSheet.create({
  mainCard: { 
    width:'100%',
    backgroundColor:Theme.SECONDARY,
    padding:5,
    paddingTop: Constants.statusBarHeight
  },
  searchContainer: {
    flex:1
  }
});

export default DefaultText;
