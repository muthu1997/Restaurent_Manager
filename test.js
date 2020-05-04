import React,{useState,useEffect} from 'react';
import { View, StyleSheet, WebView, SafeAreaView, FlatList, Text } from 'react-native';


export default function SOSApp() {
  const [getText, setText] = useState([]);

  useEffect(() => {
    MainFunction();
  },[])

  const MainFunction = () => {
    fetch('http://erp.middlemen.asia/api/vieworders/tangs@outlets.saladstop.com.sg', {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
        setText(responseJson.data)
        var mainer = responseJson.data.filter(x => x.status === 0);
        console.log(responseJson.data.length)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return(
    <View >
        <FlatList 
        data = {getText}
        renderItem={({item}) => (
        <Text style={{fontSize:30}}>{item.status}</Text>
        )
        } />
    </View>
  )
}

const styles = StyleSheet.create({
  
}) 