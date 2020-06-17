import React,{useState,useEffect} from 'react';
import { View, StyleSheet, WebView, SafeAreaView, FlatList, Text } from 'react-native';


export default function SOSApp() {
  const [getText, setText] = useState([]);

  useEffect(() => {
    MainFunction();
  },[])

  const MainFunction = () => {
    console.log('Enter')
    fetch('http://131.181.190.87:3001/all', {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return(
    <View >
       <Text>Hello buddy</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
}) 