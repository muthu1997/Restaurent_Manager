import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Add Order
import * as ScreenOrientation from 'expo-screen-orientation';
import CreateOrder from './screens/Addorder/createorder';
import AddItem from './screens/Addorder/additem';
import SendOrder from './screens/Addorder/sendorder';
//Dashboard
import WebView from './screens/WebView/webView';
import OrderEdit from './screens/Dashboard/ViewSupplierList';
import PreviewOrder from './screens/Dashboard/PreviewOrder';
//Profile
import ProfileScreen from './screens/Account/Profile';
//Report 
import AddNewOrder from './screens/Report/AddnewOrder';
import AddProduct from './screens/Report/AddProduct';
import EditReport from './screens/Report/EditReport';
//Tester
import Test from './test';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import Login from './screens/Onboarding/Login';
import useLinking from './navigation/useLinking';
const Router = ['Logger'];
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [getRouter, setRouter] = React.useState('Login');

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    RouterFunction();
    AsyncStorage.getItem('Company_Logo')
    .then(data => {
      if(data) {
        global.logo = {uri:'http://erp.middlemen.asia/repository/company/'+data};
      }else {
        global.logo = {uri:'http://erp.middlemen.asia/img/logo.png'};
      }
    })
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
          'Lato-Semi': require('./assets/fonts/LatoSemibold.ttf'),
          'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  RouterFunction = () => {
    //Role_id
    AsyncStorage.getItem('LoginStatus')
    .then(data => {
      if(data) {
        setRouter('Home');
      }else {
        setRouter('Login');
      }
    })

    AsyncStorage.getItem('Role_id')
    .then(data => {
      console.log(data)
      global.Roler = data;
    })
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    //getRouter
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer headerShown={false} ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator 
          initialRouteName={getRouter} 
          //initialRouteName="Test" 
          headerMode='none' >
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Home1" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateOrder" component={CreateOrder} />
            <Stack.Screen name="AddOrder" component={AddItem} />
            <Stack.Screen name="SendOrder" component={SendOrder} />
            <Stack.Screen name="WebView" component={WebView} />
            <Stack.Screen name="OrderSupplier" component={OrderEdit} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="NewOrderSun" component={AddNewOrder} />
            <Stack.Screen name="PreviewOrder" component={PreviewOrder} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="EditReport" component={EditReport} />
            <Stack.Screen name="Test" component={Test} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

App.navigationOptions = {
  headerMode: 'none'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
