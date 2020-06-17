import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
  Dimensions,
  ScrollView,
  AsyncStorage,
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
var widthers1 = Dimensions.get('window').width >= 500 ? dummyWidth / 8 : dummyHeight / 8;

 
const mainTitlewidth =
  Dimensions.get('window').width >= 500 ? dummyWidth / 6 : dummyHeight / 6;

const DefaultHeader = props => { 
  const [getTextInput, setTextInput] = React.useState(false);
  const [getEdit, setEdit] = React.useState('No');

  React.useEffect(() => {
    AsyncStorage.getItem('Edit')
    .then(data => {
      if(data === 1) {
        setEdit('No');
      }else {
        setEdit('Yes');
      }
    })
  })

  const setInput = () => {
    setTextInput(!getTextInput)
  }
  const st = {width: Dimensions.get('window').width,};
  const st1 = {flex:1}
  const mainCont = props.headerData != null ?  st : st1
  return (
    <View>
      <FlatList
        data={props.datas}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[mainCont,{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'lightgray'}]}>
            {item.title != null ? (
            <View
              style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '10%' : 40}]}>
              <Text lines={1}>{item.title}</Text>
            </View>
            ) : null }
            <View
              style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '40%' : mainTitlewidth}]}>
              <Text lines={1}>{item.name}</Text>
            </View>
            {Dimensions.get('screen').width > 5000 ? (
            <View
              style={[styles.mainContainer,{...props.style}]}>
              <Text lines={1}>{item.code}</Text>
            </View>
            ) : null }
            <View
              style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '20%' : mainTitlewidth}]}>
              <Quantity
              seriel={item.id}
              quantity={item.quantity}
              handle={props.handle}  />
            </View>
            {props.edit === true ? (
            <TouchableOpacity activeOpacity={0.9}
              onPress={()=>props.handleinput(item.code)}
              style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '10%' : mainTitlewidth}]}>
              
                <Text lines={1}>{item.price}</Text>
                
            </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.9}
                style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '10%' : widthers1}]}>
                
                  <Text lines={1}>{item.price}</Text>
                  
              </TouchableOpacity>
            )}
            <View
              style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '10%' : mainTitlewidth}]}>
              <Text lines={1}>{item.total}</Text>
            </View>
            <View
              style={[styles.mainContainer,{...props.style, width: Dimensions.get('screen').width > 500 ? '10%' : mainTitlewidth}]}>
              <Text lines={1}>{item.unit}</Text>
            </View>
          </View>
          
        )}

        refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.mainFunction} />}
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
