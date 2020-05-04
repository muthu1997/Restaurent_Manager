import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Text from './Text';
import Theme from '../assets/Theme';
import Quantity from './quantity';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const dummyHeight = Dimensions.get('window').height;
const dummyWidth = Dimensions.get('window').width;
const mainImage = Dimensions.get('window').width >= 500 ? 40 : 30;
 
const mainTitlewidth =
  Dimensions.get('window').width >= 500 ? dummyWidth / 7 : dummyHeight / 7;

const DefaultHeader = props => { 
  return (
    <View>
      <FlatList
        data={props.datas}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{flexDirection:'row'}}>
            <View
              style={[styles.mainContainer,{...props.style, width: 50}]}>
              <Text lines={1}>{item.title}</Text>
            </View>
            <View
              style={[styles.mainContainer,{...props.style}]}>
              <Text lines={1}>{item.name}</Text>
            </View>
            <View
              style={[styles.mainContainer,{...props.style}]}>
              <Text lines={1}>{item.code}</Text>
            </View>
            <View
              style={[styles.mainContainer,{...props.style}]}>
              <Quantity
              seriel={item.title}
              quantity={item.quantity}
              handle={props.handle} 
              style={{height:mainImage}} />
            </View>
            <View 
              style={[styles.mainContainer,{...props.style}]}>
              <Text lines={1}>{item.price}</Text>
            </View>
            <View
              style={[styles.mainContainer,{...props.style}]}>
              <Text lines={1}>{item.total}</Text>
            </View>
            <View
              style={[styles.mainContainer,{...props.style}]}>
              <Text lines={1}>{item.unit}</Text>
            </View>
          </View>
          
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
                padding: 5,
                width: mainTitlewidth,
                borderBottomWidth: 0.5,
                justifyContent:'center',
                borderBottomColor: Theme.SECONDARY,
                backgroundColor: Theme.SECONDARY,
              },
});

export default DefaultHeader;
