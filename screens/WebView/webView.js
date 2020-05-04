import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const PdfReader = ({ url: uri }) => <WebView style={{ flex: 1 }} source={{ uri }} />

export default function LinksScreen() {
  const source = {uri:'http://erp.middlemen.asia/printEmail/VGVzdF8yMF8xNTU=/Test_20_49',cache:true};
  alert(global.getLink)
  var linker= 'erp.middlemen.asia/printEmail/VGVzdF8yMF8xNTU=/Test_20_49';
  return (
    <View style={styles.container}>
        <PdfReader url="https://erp.middlemen.asia/printEmail/VGVzdF8yMF8xNTU=/Test_20_49" />
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding:5
  },
});


