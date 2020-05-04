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
  return (
    <View style={styles.mainContainer}>
          <FlatList
              horizontal={true}
              data={props.datas}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => 
                <View>
                  {item.title === 'S No' || item.title === 'Id' ? (
                    <View style={{ padding: 5,width:40,borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.title}</Text>
                    </View>
                  ) : (
                  <View style={{ padding: 5,width:mainTitlewidth,borderBottomWidth:0.5,borderBottomColor:Theme.SECONDARY, backgroundColor: Theme.SECONDARY,...props.style }}>
                      <Text lines={1} style={{fontWeight:'500'}} >{item.title}</Text>
                  </View>
                  ) }
                </View>
              }
          /> 
    </View>
  );

  
};  

const styles = StyleSheet.create({
  mainContainer: {},
});

export default DefaultHeader;


