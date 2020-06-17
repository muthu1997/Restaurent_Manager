import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Animated, View,Alert,Share, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Text,
    Input,
    Button,
    Loader,
    Header,
    Stepper,
    Selector,
    Date,
    Checkbox,
    Heading,
    SearchHeader,
    Segment,
    ListView,
    DashList,
    Switch,
} from '../../components';

import DashboardHandler from '../../functions/getMainDashboard';
import SupplierHandler from '../../functions/getSupplierById';
import GetInvoice from '../../functions/getInvoiceDetails';
import ResendOrder from '../../functions/resendOrder';
import CancelOrder from '../../functions/cancelOrder';
import GetInvoiceDetails from '../../functions/viewInvoice';
import ViewProduct from '../../functions/ViewProdct';
import base64 from 'react-native-base64';
import * as ScreenOrientation from 'expo-screen-orientation';
import MonthSelectorCalendar from 'react-native-month-selector';
import Modal from 'react-native-modal';

import moment from 'moment';
import URL from '../../assets/url';
import Theme from '../../assets/Theme';
const Dboard = [];
const DelayedOrders = [];
const UpcomingOrders = [];
const InvoiceData =[];
const AllResult = [];

const data = [
    { id: 'Po Number', code: 'Supplier Name', name: 'Order Date', quantity: 'Delivery Date', price: 'Delivery Day',unit:"Order Total" },
  ];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const loadeFirst = [1];

const HomeScreen = (props) => {
    const [getSearchStatus, setSearchStatus] = useState(false)
    const [getAllData, setAllData] = useState([]);
    const [getAllCompany,setAllCompany] = useState([]);
    const [getCompany, setCompany] = useState(null);
    const [getSelectedMonth, setSelectedMonth] = useState(moment().format('MMM'));
    const [refreshing, setRefreshing] = useState(true);
    const [getReportMonth, setReportMonth] = useState(moment().format("YYYY-MM")+"-31");
    const [getMonth, setMonth] = useState(moment().format("YYYY-MM")+"-01");
    const [getMonther, setMonther] = useState(moment("MM-YYYY"));
    const [getModelVisible, setModelVisible] = useState(false);

   
    const dummyWidth = Dimensions.get('window').width;
    const dummyHeight = Dimensions.get('window').height;
    var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 6 : dummyHeight / 6;
  var lengther = [widthers,widthers,widthers,widthers,widthers,widthers]; 

  const getHeaders = () => {
    return (
        <View>
            {getSearchStatus === false ? (
                <Segment
                    style={{ marginVertical: 8 }}
                    getIndex={0}
                    handle={data => getScreenDetails(data)}
                    value={["Invoice", "Quotation"]} />
            ) : (
                    <SearchHeader
                        value={getSearchContent}
                        placeholder="Search by name.."
                        search={data => SearchFilterFunction(data)}
                        handle={() => setSearchStatus(!getSearchStatus)} />
                )}
        </View>
    )
}

    return (
        <View style={styles.container}>
            <Header
                titlestyle={{ fontWeight: '500' }}
                nomargin='Yes'
                elevation={0}> 
                {getHeaders()}

                <Stepper
                    page={0}
                    label={['Create Invoice', 'Add Item', 'Send Invoice']}
                    style={{ width: '80%', alignSelf: 'center', marginVertical: 8 }}
                    />
            </Header>
            
            <ScrollView horizontal={true} >
                <View style={{width:Dimensions.get('screen').width,paddingTop: 10}}>
                <Selector
                    handle={data => setSupplierFunction(data)}
                    value={getCompany}
                    label={"Select company"}
                    item={getAllCompany}
                    />

                <View style={{ height: 10 }} />

                <Selector
                    handle={data => setSupplierFunction(data)}
                    value={getCompany}
                    label={"Select customer"}
                    item={getAllCompany}
                    />

                <View style={{ height: 10 }} />

                <Text style={{ paddingLeft: Dimensions.get('screen').width >= 500 ? '25%' : '10%', marginBottom:5 }}>
                Address
                </Text>
                <Input
                style={{
                    width: Dimensions.get('screen').width >= 500 ? '50%' : '80%',
                    elevation: 0,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    backgroundColor: Theme.WHITE,
                    borderColor: Theme.GRAY,
                    textAlignVertical: 'top',
                    padding: 6,
                    alignSelf: 'center',
                }}
                handle={data => setDescription(data)}
                />

                <View style={{ height: 10 }} />

                <Text style={{ paddingLeft: Dimensions.get('screen').width >= 500 ? '25%' : '10%', marginBottom:5 }}>
                Email
                </Text>
                <View style={{width: Dimensions.get('screen').width , flexDirection:'row', alignItems: 'center'}}>
                    <Input
                    style={{
                        width: Dimensions.get('screen').width >= 500 ? '30%' : '50%',
                        elevation: 0,
                        borderWidth: 0.5,
                        borderRadius: 5,
                        backgroundColor: Theme.WHITE,
                        borderColor: Theme.GRAY,
                        textAlignVertical: 'top',
                        padding: 6,
                        alignSelf: 'flex-start',
                        marginLeft: Dimensions.get('screen').width >= 500 ? '25%' : '10%'
                    }}
                    handle={data => setDescription(data)}
                    />
                    <View>
                    {Dimensions.get('screen').width >= 500 ? (
                        <View style={{marginRight:Dimensions.get('screen').width >= 500 ? Dimensions.get('screen').width/4 : Dimensions.get('screen').width/7, alignItems: 'center',}}>
                        <Switch />
                        <Text style={{ marginBottom:5 }}>
                        Send Email
                        </Text>
                        </View>
                    ) : (
                        <View style={{marginRight:Dimensions.get('screen').width >= 500 ? Dimensions.get('screen').width/4 : '30%', alignItems: 'center',}}>
                        <Switch />
                        <Text style={{ marginBottom:5 }}>
                        Send Email
                        </Text>
                        </View>
                    )}
                    
                    </View>
                </View>
                </View>
            </ScrollView>

        </View>
    );
}

HomeScreen.navigationOptions = {
    headerShown: false,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modelContainer: {
        width: Dimensions.get('screen').width > 500 ? '50%' : '80%',
        padding:5,
        borderRadius:10,
        backgroundColor:Theme.WHITE,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
    }
});


export default HomeScreen; 