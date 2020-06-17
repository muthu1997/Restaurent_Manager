import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Theme from '../assets/Theme';

const mainWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';

const DefaultLoader = props => {
  return (
    <View
      style={{
        ...props.style,
        width: mainWidth,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: Theme.GRAY,
        marginVertical: 5,
        paddingLeft: 8
      }}>
      <RNPickerSelect
        itemKey={props.value}
        style={{color:'black'}}
        placeholder={{
          label: props.label,
          value: null,
        }}
        onValueChange={props.handle}
        items={props.item}
      />
    </View>
  );
};

export default DefaultLoader;
