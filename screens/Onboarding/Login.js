import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, AsyncStorage,SafeAreaView, ActivityIndicator, Text } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Input, Button, Loader } from '../../components';
import Theme from '../../assets/Theme';
import LoginHandler from '../../functions/login';
import URL from '../../assets/url';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const mainImageWidth = Dimensions.get('window').width >= 500 ? 115 : 85;
const mainFontWidth = Dimensions.get('window').width >= 500 ? 35 : 30; 

const DefaultButton = props => {
  const [getMail, setMail] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [getLoader, setLoader] = useState(false);

  const LoginHandlerFunction = () => {
    if(getMail === null) {
      alert('Please enter Email!')
    }else if(getPassword === null) {
      alert('Please enter Password!')
    }else {
      setLoader(true);
      var email = getMail;
      var password = getPassword;
      var data = resultSetter.bind(this);
      LoginHandler(email,password,data);
    }
  }
  
  const resultSetter = (data) => {
    setLoader(false);  
    //alert(JSON.stringify(data.data))
    //console.log(data.data); 
    if(data.success === true) {
      //alert(data.data.outlet_id)
      var roler = data.data.role_id;
      var edit = data.data.edit_receive;
      //roleid(6-show all exept approval, 5-excet accounts report, add order)(invoice roll id 10 - add invoice,)
      if(roler === 6) {
        AsyncStorage.setItem('Role_id','ONE');
        global.Roler = 'ONE';
      }else if(roler === 5) {
        AsyncStorage.setItem('Role_id','TWO');
        global.Roler = 'TWO';
      }else if(roler === 8) {
        AsyncStorage.setItem('Role_id','TWO');
        global.Roler = 'TWO';
      }else {
        var dummy = 'Hi';
      }

      if(edit === 1) {
        AsyncStorage.setItem('Edit','ZERO');
      }else {
        AsyncStorage.setItem('Edit','ONE');
      }
      console.log(data)
      var logog = data.data.company_id+'_'+data.data.company_logo;
      AsyncStorage.setItem('Outlet',JSON.stringify(data.data.outlet_id));
      AsyncStorage.setItem('Company_Id',JSON.stringify(data.data.company_id));
      AsyncStorage.setItem('Company_Logo',logog);
      AsyncStorage.setItem('Email',getMail);
      //AsyncStorage.setItem('Edit',data.data.edit_receive);
      AsyncStorage.setItem('Services',data.data.services); 
      AsyncStorage.setItem('LoginStatus','Yes'); 
      global.logo = {uri:'http://erp.middlemen.asia/repository/company/'+logog};

      AsyncStorage.getItem('HomeStatus')
      .then(data => {
        if(data) {
          global.refresher = 'Yes';
          if(data === 'Home') {
            AsyncStorage.setItem('HomeStatus','Home1');
            props.navigation.navigate('Home');
          }else {
            AsyncStorage.setItem('HomeStatus','Home');
            props.navigation.navigate('Home1');
          }
        }else {
          AsyncStorage.setItem('HomeStatus','Home1');
          props.navigation.navigate('Home');
        }
      })
    }else {
      if(data.error === 'Invalid Credentials') {
        alert(data.error);
      }else {
        alert(data.error.email[0]);
      }
    } 
  }

  var logos = "http://erp.middlemen.asia/repository/company/null";
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          width: '100%',
          height: '30%',
          position: 'absolute',
          top: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          { global.logo === null || global.logo['uri'] === logos ? (
        <Image
          style={{ width: mainImageWidth, height: mainImageWidth,margin:8 }}
          resizeMode="contain"
          source={{uri:'http://erp.middlemen.asia/img/logo.png'}}
        /> 
          ) : (
            <Image
              style={{ width: mainImageWidth, height: mainImageWidth,margin:8 }}
              resizeMode="contain"
              source={ global.logo }
            /> 
          )}
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: '600', fontSize: mainFontWidth }}>
            Middle
          </Text>
          <Text style={{ fontSize: mainFontWidth, fontfamily:'Lato-Light' }}>
            Men
          </Text>
        </View> */}
      </View>
      <Input handle={data=>setMail(data)} align="center" placeholder="Email" />
      <Input secureTextEntry={true} handle={data=>setPassword(data)} align="center" placeholder="Password" />
      <View style={{ height: 20 }} />
      {getLoader ? (
        <ActivityIndicator color={Theme.PRIMARY} />
      ) : (
      <Button
      handle={LoginHandlerFunction}
      title="Login" />
      ) }
      <View style={{ height: 20 }} />
      <Text>Forgot Password?</Text>

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderTopWidth:1,
          borderColor:Theme.LIGHT
        }}>
        
        <View style={{ flexDirection: 'row',alignItems:'center' }}>
        <View style={{paddingTop:10}}>
        <Image
          style={{ width: 30, height: 30, margin:5 }}
          resizeMode="contain"
          source={URL.Logo}
        />
        </View>
        <View>
          <Text style={{ fontWeight: '200', fontSize: 12 }}>
            Powered by
          </Text>
        <View style={{ flexDirection: 'row',alignItems:'center' }}>
          <Text style={{ fontWeight: '600', fontSize: 20 }}>
            Middle
          </Text>
          <Text style={{ fontWeight: '200', fontSize: 20,fontfamily:'Lato-Light' }}>
            Men
          </Text>
        </View>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.BACK,
  },
});

export default DefaultButton;
