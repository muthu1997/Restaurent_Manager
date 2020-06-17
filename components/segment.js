import React,{useState} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import Theme from '../assets/Theme';
import Text from './Text';
import SegmentedControlTab from "react-native-segmented-control-tab";

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '80%' : '80%';

const DefaultButton = props => {
  const [getIndex, setIndex] = useState(props.getIndex);

  const indexHandler = (data) => {
      setIndex(data);
      props.handle(data); 
  }
  return (
        <View style={[styles.mainTabStyle,props.viewStyle]}>
        <SegmentedControlTab
          values={props.value}
          selectedIndex={getIndex}
          tabTextStyle={{color:Theme.PRIMARY,...props.textStyle}}
          activeTabStyle={{backgroundColor:Theme.PRIMARY,...props.style1}}
          tabStyle={{...styles.mainTab,...props.style}}
          onTabPress={data=>indexHandler(data)}
        />
      </View>
  ); 
} 
 
const styles = StyleSheet.create({
  mainTabStyle: {
    width:mainButtonWidth,
    marginVertical:8,
    alignSelf:'center'
  },
  mainTab: {
    backgroundColor:Theme.SECONDARY,
    borderColor:Theme.PRIMARY
  }
});

export default DefaultButton;
