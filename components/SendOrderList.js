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
import Text from './Text';
import Theme from '../assets/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const dummyHeight = Dimensions.get('window').height;
const dummyWidth = Dimensions.get('window').width;
const mainImage = Dimensions.get('window').width >= 500 ? 40 : 30;


const DefaultHeader = props => {


  const getLength = props.length; 
  const mainTitlewidth = Dimensions.get('window').width >= 500 ? dummyWidth/getLength : dummyHeight/getLength;
  const mainContainer = {
                padding: 5,
                width: mainTitlewidth,
                borderBottomWidth: 0.5,
                justifyContent:'center',
                borderBottomColor: Theme.SECONDARY,
                backgroundColor: Theme.SECONDARY,
              };

  return (
    <View>
      <FlatList
        data={props.datas}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{flex:1}}>
          <View style={{flexDirection:'row',flex:1}}>
            <View
              style={[mainContainer,{...props.style}]}> 
              <Text lines={1}>{item.id}</Text>
            </View> 
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.code}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.name}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.quantity}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.price}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.unit}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.total}</Text>
            </View>

          </View>
          
          
          </View>
          
        )}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
 
});

export default DefaultHeader;
