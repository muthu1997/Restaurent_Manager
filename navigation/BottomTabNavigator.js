import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Theme from '../assets/Theme';
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

const Router = [];

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function ({ navigation, route }) {

  return (
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
          title: 'Delivery Schedule',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-checkbox" />,
        }}
      />
      <BottomTab.Screen
        name="Add Orders"
        component={AddOrder}
        options={{
          title: 'Add Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
        }}
      />
       <BottomTab.Screen
        name="Suppliers"
        component={SuppliersList}
        options={{
          title: 'Suppliers',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-archive" />,
        }}
      />
      <BottomTab.Screen
        name="Approvals"
        component={Approve}
        options={{
          title: 'Approvals',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-checkmark-circle" />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={SunReport}
        options={{
          title: 'Accounts Report',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-contact" />,
        }}
      />

    </BottomTab.Navigator>
  );
}
