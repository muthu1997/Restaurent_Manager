import * as React from 'react';
import { View, StyleSheet, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Text from './Text';
import Theme from '../assets/Theme';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const dummyHeight = Dimensions.get('window').height;
const dummyWidth = Dimensions.get('window').width;



const DefaultHeader = props => {
const getLength = props.length; 
const mainTitlewidth = Dimensions.get('window').width >= 500 ? dummyWidth/getLength : dummyHeight/getLength;
var lengths = props.length;

const st = {width: Dimensions.get('window').width,};
const st1 = {flex:1}
const mainCont = props.headerData != null ?  st : st1
  return (
    <View style={styles.mainContainer}>
          <FlatList
              data={props.datas}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={mainCont}>
                <View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
                  {item.id != null ? (
                  <View style={{ padding: 5,width:lengths[0],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.id}</Text>
                  </View>
                  ) : null }

                  {item.code != null ? (
                  <View style={{ padding: 5,width:lengths[1],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.code}</Text>
                  </View>
                  ) : null }
                   {item.name != null ? (
                  <View style={{ padding: 5,width:lengths[2],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.name}</Text>
                  </View>
                  ) : null }
                   {item.quantity != null ? (
                  <View style={{ padding: 5,width:lengths[3],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.quantity}</Text>
                  </View>
                  ) : null }
                   {item.price != null ? (
                  <View style={{ padding: 5,width:lengths[4],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.price}</Text>
                  </View>
                  ) : null }
                   {item.unit != null ? (
                  <View style={{ padding: 5,width:lengths[5],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.unit}</Text>
                  </View>
                  ) : null }
                   {item.total != null ? (
                  <View style={{ padding: 5,width:lengths[6],borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style, alignItems: props.right != null ? 'flex-end' : 'flex-start', }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.total}</Text>
                  </View>
                  ) : null }
                </View>
                </View>
               ) }
          /> 
    </View>
  );

  
};  

const styles = StyleSheet.create({
  mainContainer: {
    
  },
});

export default DefaultHeader;


