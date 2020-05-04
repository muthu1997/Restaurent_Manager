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
import StepIndicator from 'react-native-step-indicator';
import Theme from '../assets/Theme';
import Text from './Text';

const widther = Dimensions.get('window').width;
const mainImageWidth = Dimensions.get('window').width >= 500 ? 40 : 30;
const labels = ['Cart', 'Delivery Address', 'Order Summary'];

const DefaultStepIndicator = props => {
  return (
    <View style={{ ...props.style, width: '80%' }}>
      <StepIndicator
        customStyles={{
          stepIndicatorSize: widther >= 500 ? 30 : 25,
          currentStepIndicatorSize: widther >= 500 ? 30 : 25,
          separatorStrokeWidth: 3,
          currentStepStrokeWidth: 5,
          stepStrokeCurrentColor: Theme.PRIMARY,
          separatorFinishedColor: Theme.PRIMARY,
          separatorUnFinishedColor: '#aaaaaa',
          stepIndicatorFinishedColor: Theme.PRIMARY,
          stepIndicatorUnFinishedColor: '#aaaaaa',
          stepIndicatorCurrentColor: Theme.PRIMARY,
          stepIndicatorLabelFontSize: widther >= 500 ? 16 : 13,
          currentStepIndicatorLabelFontSize: widther >= 500 ? 16 : 13,
          stepIndicatorLabelCurrentColor: '#ffffff',
          stepIndicatorLabelFinishedColor: '#ffffff',
          stepIndicatorLabelUnFinishedColor: '#ffffff',
          labelColor: '#666666',
          labelSize: widther >= 500 ? 16 : 13,
          currentStepLabelColor: Theme.PRIMARY,
        }}
        stepCount={3}
        style={{ width: 300 }}
        direction="horizontal"
        currentPosition={props.page}
        labels={props.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default DefaultStepIndicator;
