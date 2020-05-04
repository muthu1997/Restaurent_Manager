import React from 'react';
import {Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Theme from '../assets/Theme';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';

const Date = props => {
    
    return(
    <DatePicker
        style={{width: mainButtonWidth,alignSelf:'center',opacity:1,marginVertical:5,borderWidth:0.5,borderColor:Theme.GRAY,borderRadius:5,...props.style}}
        date={props.date}
        mode="date"
        placeholder={props.placeholder}
        format={props.format} //"YYYY-MM-DD"
        minDate={props.mainDate}
        maxDate={props.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={true}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            borderColor:'transparent',
            borderRadius:5,
            position: 'absolute',
            left: 8,
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={props.handle}
      />)
}

export default Date;