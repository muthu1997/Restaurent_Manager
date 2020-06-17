import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Theme from '../assets/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
const mainButtonWidth = Dimensions.get('window').width >= 500 ? 20 : 18;

const DefaultCheckbox = props => {

  const [getBtnColor, setBtnColor] = React.useState(Theme.GRAY)
  const [getValue, setValue] = React.useState(0)

  const functionHandler = () => {
    var value = 0;
    if(getValue === 0) {
      setValue(1);
      value=1;
      setBtnColor(Theme.GREEN)
    }else {
      setValue(0);
      value = 0;
      setBtnColor(Theme.GRAY)
    }
    props.handle(value)
  }

  return (
    <TouchableOpacity onPress={functionHandler} style={{
                    backgroundColor:getBtnColor,
                    width:mainButtonWidth,
                    height:mainButtonWidth,
                    borderRadius: mainButtonWidth/2,
                    alignItems: 'center',
                    justifyContent: 'center',}}>
      <Icon name="check" size={12} color={Theme.WHITE} />
    </TouchableOpacity>
  ); 

} 

const styles = StyleSheet.create({
  
});

export default DefaultCheckbox;
