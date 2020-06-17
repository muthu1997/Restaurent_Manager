import React,{useState} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from '../assets/Theme';
import Text from './Text';
const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const mainIconSize = Dimensions.get('window').width >= 500 ? 15 : 20;

const DefaultQuantity = props => {
  const [getValue,setValue] = useState(props.quantity);

  const decreaser = () => {
    if(getValue === 0) {
      alert('Cannot reduce after 0.');
    }else { 
      setValue(getValue-1);
    var quantity=getValue-1;
    var seriel=props.seriel;
    var result = [{quantity:quantity,seriel:seriel,action:'DECREMENT'}];
    props.handle(result)
    }
  }
  const increaser = () => {
    setValue(getValue+1);
    var quantity=getValue+1;
    var seriel=props.seriel;
    var result = [{quantity:quantity,seriel:seriel,action:'INCREMENT'}];
    props.handle(result)
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={decreaser} activeOpacity={0.8} style={[styles.buttonStyle,{...props.style}]}>
        <Icon name='remove' color={Theme.PURPLE} size={mainIconSize} />
      </TouchableOpacity>
      <View style={{padding:8,alignItems:'center',justifyContent:'center',...props.style}}>
        <Text>{getValue}</Text>
      </View>
      <TouchableOpacity onPress={increaser} activeOpacity={0.8} style={[styles.buttonStyle,{...props.style}]}>
        <Icon name='add' color={Theme.GREEN} size={mainIconSize} />
      </TouchableOpacity>
    </View>
  ); 
} 

const styles = StyleSheet.create({
  mainContainer: {
    width:'100%',
    height:40,
    alignSelf:'center',
    borderRadius:5,
    flexDirection:'row',
    alignItems: 'center',
  },
  buttonStyle: {
    width:25,
    height:25,
    backgroundColor:Theme.SECONDARY,
    alignItems:'center',
    borderRadius:2,
    borderWidth:0.5,
    borderColor:'lightgray',
    justifyContent:'center'
    }
})

export default DefaultQuantity;
 