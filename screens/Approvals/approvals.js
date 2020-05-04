import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    AsyncStorage,
    ActivityIndicator,
    KeyboardAvoidingView,
    CheckBox,
} from 'react-native';
import {
    Text,
    Input,
    Button,
    Loader,
    Header,
    Stepper,
    SearchHeader,
    Date,
    DashList,
    Checkbox,
    Heading,
    ListView,
    Quantity,
    OrderList
} from '../../components';
import Theme from '../../assets/Theme';
import * as WebBrowser from 'expo-web-browser';
import URL from '../../assets/url';

import DashboardHandler from '../../functions/getMainDashboard';
import ResendOrder from '../../functions/resendOrder';
import CancelOrder from '../../functions/cancelOrder';
import GetInvoiceDetails from '../../functions/viewInvoice';

const mainTextTitle = Dimensions.get('window').width >= 500 ? 22 : 18;

const data = [
    { title: 'S.No', width: 50, length: 7 },
    { title: 'Registration No', width: 100 },
    { title: 'Name', width: 100 },
    { title: 'Address', width: 75 },
    { title: 'Description', width: 75 },
    { title: 'Contact', width: 75 },
    { title: 'Sales Contact', width: 75 },
];



const Dboard = [];

const SupplierList = props => {

    const [getMainResult, setMainResult] = useState(null);
    const [getMail, setMail] = useState(null);
    const [getAllData, setAllData] = useState([]);
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getSecondarySupplierData, setSecondarySupplierData] = useState(null);
    const [getLoader,setLoader] = useState(true);


    useEffect(() => {
        getMainData();
    }, [])

    
    const getMainData = () => {
        AsyncStorage.getItem('Email')
            .then(data => {
                if (data) {
                    setMail(data);
                    var email = data;
                    var data = setDashboardResult.bind(this);
                    DashboardHandler(email, data);
                } else {
                    getMainData();
                }
            })
    }

    const setDashboardResult = (data) => {
        setMainResult(data);
        Dboard.length = 0;
        var datasss = data;
        var dataResult = datasss.filter(x => x.status === 3);
        for (var i = 0; i < dataResult.length; i++) {
            Dboard.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, outletname: dataResult[i].outlet_name, orderdate: dataResult[i].created_at, deliverydate: dataResult[i].delivery_date, deliveryday: dataResult[i].delivery_day, ordertotal: dataResult[i].total, mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status, orderStatus: dataResult[i].status })
        }
            setAllData(Dboard);
            setSecondarySupplierData(Dboard);
        //console.log(dataResult.length)
        setLoader(false)
    }

    const ViewInvoiceFunction = (data) => {
        global.Track_Id = data;
        var email = getMail;
        var id=data;
        var dataSetter = setInvoiceDetails.bind(this);
        GetInvoiceDetails(email,id,dataSetter);
    }
    const setInvoiceDetails = (data) => {
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        props.navigation.navigate('OrderSupplier');
    }

    const cancelAlertFunction = (data) => {
        Alert.alert('Cancel Order','Are you sure want to cancel the order '+data+'?',
        [{text:'Yes', onPress: ()=>cancelOrderFunction(data)},
        {text:'No'}]);
    }

    const cancelOrderFunction = (orderId) => {
        var id = orderId;
        var datas = setCancelOrderResult.bind(this);
        CancelOrder(id,datas);
    }
    const setCancelOrderResult = (data) => {
        if(data === 'error') {
            alert('Error. Please try again.')
        }else {
            getMainData();
            alert('Order Cancelled successfully!');
        }
    }

    const PreviewInvoiceFunction = async(data) => {
        await WebBrowser.openBrowserAsync('http://erp.middlemen.asia/printEmail/VGVzdF8yMF8xNTU=/'+data);
    }

    const ResendOrderFunction = (data) => {
        Alert.alert('Resend Order','Are you sure want to resend the order '+data+'?',
        [{text:'Yes', onPress: ()=>resender(data)},
        {text:'No'}]);
    }

    const resender = (data) => {
        var id = data;
        var dataSetter = setResendResult.bind(this);
        ResendOrder(id,dataSetter);
    }

    const setResendResult = (data) => {
        if(data.Message === 'success') {
            alert('Order resent successfully.')
        }
    }

 
   const SearchFilterFunction = (text) => {
        const newData = getSecondarySupplierData.filter(function(item){
            const itemData = item.suppliername.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        setAllData(newData)
        text = text;
        console.log(newData);
    }

    return (
        <View style={styles.mainContainer}>
            <Header
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
                //handle={() => props.navigation.goBack(null)}
                image={ global.logo != null ? global.logo : URL.Logo}
                title="Approvals">
                <SearchHeader
                    search={data=>SearchFilterFunction(data)}
                    style={styles.selectorStyle}
                    placeholder="Search by name.."
                />
            </Header>
            <Heading datas={data} length={7} />
            {getLoader === false ? (
            <ScrollView horizontal={true} >
                <DashList
                receiveHandler={(data)=>ViewInvoiceFunction(data)}
                cancelHandler={data=>cancelAlertFunction(data)}
                getInvoice={data=>PreviewInvoiceFunction(data)}
                resendHandler={data=>ResendOrderFunction(data)}
                length={8}
                pending = 'Yes'
                datas={getAllData} />
            </ScrollView>
            ) : (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Theme.BACK,
    },
    selectorStyle: {
        backgroundColor: Theme.WHITE,
        marginTop: 15
    }
});

export default SupplierList;
