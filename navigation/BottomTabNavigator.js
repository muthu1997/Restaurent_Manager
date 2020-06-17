import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Image,View,Text, Dimensions} from 'react-native';
import Theme from '../assets/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import Mainscreen from '../screens/MainScreen';
//Add Order
import AddOrder from '../screens/Addorder/createorder';
//Supplier List
import SuppliersList from '../screens/Suppliers/SupplierList';
//Orders
import Orders from '../screens/Orders/orders';
//Approve
import Approve from '../screens/Approvals/approvals';
//Account
import Profile from '../screens/Account/Profile';
//Report
import SunReport from '../screens/Report/sunReport';
//Invoice
import Invoice from '../screens/Invoice/invoice';

const Router = [];

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function ({ navigation, route }) {

  const texter = {
    fontSize: Dimensions.get('screen').width > 500 ? 10 : 7,
    textAlign:'center',
  }

  const imageContainer = {
    width:Dimensions.get('screen').width > 500 ? 28 : 20,
    height:Dimensions.get('screen').width > 500 ? 28 : 20,
    marginTop: Dimensions.get('screen').width > 500 ? 5 : 10,
    marginHorizontal:Dimensions.get('screen').width > 500 ? 35 : 25
  }
  
  return (
    <View style={{flex:1}}>
    {global.Roler === 'ONE' ? (
        <BottomTab.Navigator 
        tabBarOptions={{
          activeTintColor : Theme.PRIMARY,
          tabStyle: {
            backgroundColor:Theme.SECONDARY
          }
        }}
        initialRouteName={INITIAL_ROUTE_NAME}>
          <BottomTab.Screen
            name="Home"
            component={Mainscreen}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1,marginTop:5}}>
              <Image style={[imageContainer,{marginTop:0}]} source={require('../assets/icons/deliverys.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Delivery Schedule</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/delivery.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Delivery Schedule</Text>
              </View>
              ),
            }}
          />
          <BottomTab.Screen
            name="Add Orders"
            component={AddOrder}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/addorders.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Add Orders</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/addorder.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Add Orders</Text>
              </View>
              ),
            }}
          />
           <BottomTab.Screen
            name="Suppliers"
            component={SuppliersList}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/suppliers.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Supplier</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/supplier.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Supplier</Text>
              </View>
              ),
            }}
          />
          <BottomTab.Screen
            name="Orders"
            component={Orders}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/orders.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Orders</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/order.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Orders</Text>
              </View>
              ),
            }}
          />
          {/* <BottomTab.Screen
            name="Invoice"
            component={Invoice}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/images/invs.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Invoice</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/images/inv.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Invoice</Text>
              </View>
              ),
            }}
          /> */}
          <BottomTab.Screen
            name="Account"
            component={SunReport}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/reports.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Accounts Report</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/report.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Accounts Report</Text>
              </View>
              ),
            }}
          />
    
        </BottomTab.Navigator>
      ) : global.Roler === 'TWO' ? (
    <BottomTab.Navigator 
    tabBarOptions={{
      activeTintColor : Theme.PRIMARY,
      tabStyle: {
        backgroundColor:Theme.SECONDARY
      }
    }}
    initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={Mainscreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>(focused ? 
          <View style={{flex:1,marginTop:5}}>
          <Image style={[imageContainer,{marginTop:0}]} source={require('../assets/icons/deliverys.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Delivery Schedule</Text>
          </View> : 
          <View>
          <Image style={imageContainer} source={require('../assets/icons/delivery.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Delivery Schedule</Text>
          </View>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Add Orders"
        component={AddOrder}
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>(focused ? 
          <View style={{flex:1}}>
          <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/addorders.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Add Orders</Text>
          </View> : 
          <View>
          <Image style={imageContainer} source={require('../assets/icons/addorder.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Add Orders</Text>
          </View>
          ),
        }}
      /> */}
       <BottomTab.Screen
        name="Suppliers"
        component={SuppliersList}
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>(focused ? 
          <View style={{flex:1}}>
          <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/suppliers.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Supplier</Text>
          </View> : 
          <View>
          <Image style={imageContainer} source={require('../assets/icons/supplier.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Supplier</Text>
          </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>(focused ? 
          <View style={{flex:1}}>
          <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/orders.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Orders</Text>
          </View> : 
          <View>
          <Image style={imageContainer} source={require('../assets/icons/order.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Orders</Text>
          </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Approvals"
        component={Approve}
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>(focused ? 
          <View style={{flex:1}}>
          <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/approves.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Approvals</Text>
          </View> : 
          <View>
          <Image style={imageContainer} source={require('../assets/icons/approve.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Approvals</Text>
          </View>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Account"
        component={SunReport}
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>(focused ? 
          <View style={{flex:1}}>
          <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/reports.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Accounts Report</Text>
          </View> : 
          <View>
          <Image style={imageContainer} source={require('../assets/icons/report.png')} />
          <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Accounts Report</Text>
          </View>
          ),
        }}
      /> */}

    </BottomTab.Navigator>
      ) : (
        <BottomTab.Navigator 
        tabBarOptions={{
          activeTintColor : Theme.PRIMARY,
          tabStyle: {
            backgroundColor:Theme.SECONDARY
          }
        }}
        initialRouteName={INITIAL_ROUTE_NAME}>
          <BottomTab.Screen
            name="Home"
            component={Mainscreen}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1,marginTop:5}}>
              <Image style={[imageContainer,{marginTop:0}]} source={require('../assets/icons/deliverys.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Delivery Schedule</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/delivery.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Delivery Schedule</Text>
              </View>
              ),
            }}
          />
          <BottomTab.Screen
            name="Add Orders"
            component={AddOrder}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/addorders.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Add Orders</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/addorder.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Add Orders</Text>
              </View>
              ),
            }}
          />
           <BottomTab.Screen
            name="Suppliers"
            component={SuppliersList}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/suppliers.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Supplier</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/supplier.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Supplier</Text>
              </View>
              ),
            }}
          />
          <BottomTab.Screen
            name="Orders"
            component={Orders}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/orders.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Orders</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/order.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Orders</Text>
              </View>
              ),
            }}
          />
          <BottomTab.Screen
            name="Approvals"
            component={Approve}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/approves.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Approvals</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/approve.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Approvals</Text>
              </View>
              ),
            }}
          />
          <BottomTab.Screen
            name="Account"
            component={SunReport}
            options={{
              title: '',
              tabBarIcon: ({ focused }) =>(focused ? 
              <View style={{flex:1}}>
              <Image style={[imageContainer,{marginTop:5}]} source={require('../assets/icons/reports.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.PRIMARY}]}>Accounts Report</Text>
              </View> : 
              <View>
              <Image style={imageContainer} source={require('../assets/icons/report.png')} />
              <Text numberOfLines={1} style={[texter,{color:Theme.BLACK}]}>Accounts Report</Text>
              </View>
              ),
            }}
          />
    
        </BottomTab.Navigator>
           ) }
      </View>
  );
  
}
