import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Animated, View,Alert, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';
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
    Quantity,
} from '../components';

import DashboardHandler from '../functions/getMainDashboard';
import SupplierHandler from '../functions/getSupplierById';
import GetInvoice from '../functions/getInvoiceDetails';
import ResendOrder from '../functions/resendOrder';
import CancelOrder from '../functions/cancelOrder';
import GetInvoiceDetails from '../functions/viewInvoice';
import ViewProduct from '../functions/ViewProdct';
import base64 from 'react-native-base64';

import moment from 'moment';
import URL from '../assets/url';
import Theme from '../assets/Theme';
const Dboard = [];
const DelayedOrders = [];
const UpcomingOrders = [];
const InvoiceData =[];
const ProductData = [];

const data = [
    { title: 'Id', width: 50, length: 7 },
    { title: 'Po Number', width: 100 },
    { title: 'Supplier Name', width: 75 },
    { title: 'Order Date', width: 75 },
    { title: 'Delivery Date', width: 75 },
    { title: 'Delivery Day', width: 75 },
    { title: 'Order Total', width: 75 },
];



const HomeScreen = (props) => {
    const [getSearchStatus, setSearchStatus] = useState(false)
    const [getAllData, setAllData] = useState([]);
    const [getSearchContent, setSearchContent] = useState(null);
    const [getMainResult, setMainResult] = useState([]);
    const [getDashStatus, setDashStatus] = useState(1);
    const [getMail, setMail] = useState(null);
    const [getLoader,setLoader] = useState(true);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getLogo, setLogo] = useState(null);
    const [getSupplierDaetails,setSupplierDetails] = useState(null)



    useEffect(() => {
        getMainData();
        global.thisMonth = moment().format("YYYY-MM")
        global.getCurrentDate = moment().format("DD-MM-YYYY");

        setInterval(()=>{
            if(global.refresher === 'Yes') {
                setLoader(true);
                global.refresher = 'No';
                getMainData();
            }
        },5000)
    }, [])

    const getMainData = () => {
       
        AsyncStorage.getItem('Company_Logo')
        .then(data => {
            global.logo = data;
            setLogo(data);
        })
        AsyncStorage.getItem('Email')
            .then(data => {
                if (data) {
                    setMail(data);
                    var email = data;
                    AsyncStorage.getItem('Company_Id')
                    .then(data => {
                        setCompanyId(data)

                        const id = data;
                        var dataSetter = setSupplierData.bind(this);
                        SupplierHandler(email, id, dataSetter);
                    })


                    var pluDate = moment().format("DD");
                    var setDater = [];
                    setDater.length=0;
                    if(pluDate === 30) {
                        setDater.push(1);
                    }else if(pluDate === 31) {
                        setDater.push(1);
                    }else {
                        setDater.push(pluDate);
                    }
                    
                } else {
                    getMainData();
                }
            })
    }

    const setSupplierData = (datas) => {
        setSupplierDetails(datas);

        var email = getMail;
        var data = setDashboardResult.bind(this);
        DashboardHandler(email, data);
    }

    const setDashboardResult = (datas) => {
        var data =datas.data;

        // setSecondaryData(data);
        // setDelayedData(data);
        // setMainResult(data);
        // var ret = data.filter(c => c.status === 0)


        Dboard.length = 0;
        UpcomingOrders.length = 0;
        DelayedOrders.length = 0;

        console.log(data.filter(c => c.status === 0));

        var today = moment().format("YYYY-MM-DD");
        var i=0;
        // for(i=0; i<data.length;i++) {
        //     if(data[i].status === 0 && data[i].delivery_date  === today) {
        //         Dboard.push({ id: i + 1, transactionid: data[i].transaction_no, suppliername: data[i].supplier_name, orderdate: moment(data[i].created_at).format('DD-MM-YYYY') , deliverydate: moment(data[i].delivery_date).format('DD-MM-YYYY'), deliveryday: data[i].delivery_date, 
        //         ordertotal: (getSupplierDaetails[i].is_gst === '0' ? data[i].total : parseFloat((Number(data[i].total)*(Number(7)/100)+Number(data[i].total)))),
        //         mailOpen: data[i].email_open_datetime, mailStatus: data[i].email_status,orderStatus: data[i].status, track_code: data[i].email_track_code, hidden: false })
        //     }else if(data[i].status === 0 && data[i].delivery_date > today) {
        //         UpcomingOrders.push({ id: i + 1, transactionid: data[i].transaction_no, suppliername: data[i].supplier_name, orderdate: moment(data[i].created_at).format('DD-MM-YYYY'), deliverydate: moment(data[i].delivery_date).format('DD-MM-YYYY'), deliveryday: data[i].delivery_day, 
        //         ordertotal: (getSupplierDaetails[i].is_gst === '0' ? data[i].total : parseFloat((Number(data[i].total)*(Number(7)/100)+Number(data[i].total)))), 
        //         mailOpen: data[i].email_open_datetime, mailStatus: data[i].email_status,orderStatus: data[i].status, track_code: data[i].email_track_code, hidden: true })    
        //     }else if(data[i].status === 0 && data[i].delivery_date < today) {
        //         DelayedOrders.push({ id: i + 1, transactionid: data[i].transaction_no, suppliername: data[i].supplier_name, orderdate: moment(data[i].created_at).format('DD-MM-YYYY'), deliverydate: moment(data[i].delivery_date).format('DD-MM-YYYY'), deliveryday: data[i].delivery_day, 
        //         ordertotal: (getSupplierDaetails[i].is_gst === '0' ? data[i].total : parseFloat((Number(data[i].total)*(Number(7)/100)+Number(data[i].total)))),
        //         mailOpen: data[i].email_open_datetime, mailStatus: data[i].email_status,orderStatus: data[i].status, track_code: data[i].email_track_code, hidden: false })    
        //     }else {
        //         console.log('Main Data Not Matched..')
        //     }
        // }

        // if(getDashStatus === 0) {
        //     setAllData(DelayedOrders);
        // }else if(getDashStatus === 2) {
        //     setAllData(UpcomingOrders);
        // }else {
        //     setAllData(DelayedOrders);
        // }

        // Dboard.length = 0;
        // var datas = data;
        // var dataResultBegin = datas.filter(x => x.status === 0)
        // var dataResult = dataResultBegin.filter(x => x.delivery_date === moment().format("YYYY-MM-DD"))

        // for (var i = 0; i < dataResult.length; i++) {
        //     Dboard.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY') , deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), deliveryday: dataResult[i].delivery_date, 
        //     ordertotal: (getSupplierDaetails[i].is_gst === '0' ? dataResult[i].total : parseFloat((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))),
        //      mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status,orderStatus: dataResult[i].status, track_code: dataResult[i].email_track_code, hidden: false })
        // }
        
        setLoader(false)

    }

    
    const setSecondaryData = (data) => {
        UpcomingOrders.length = 0;
        var datass = data;
        //console.log(data)
        var dataResult1 = datass.filter(x => x.status === '0')

        var today = moment().format("YYYY-MM-DD");
        var dataResult = dataResult1.filter(x => x.delivery_date > today)
        for (var i = 0; i < dataResult.length; i++) {
            UpcomingOrders.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY'), deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), deliveryday: dataResult[i].delivery_day, 
            ordertotal: (getSupplierDaetails[i].is_gst === '0' ? dataResult[i].total : parseFloat((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))), 
            mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status,orderStatus: dataResult[i].status, track_code: dataResult[i].email_track_code, hidden: true })
        }
        if(getDashStatus === 2) {
            setAllData(UpcomingOrders);
        }
    }

    const setDelayedData = (data) => {
        DelayedOrders.length = 0;
        var datas = data;
        var today = moment().format("YYYY-MM-DD");
        var dataResult1 = datas.filter(x => x.status === 0)
        var dataResult = dataResult1.filter(x => x.delivery_date < today)
        for (var i = 0; i < dataResult.length; i++) {
            DelayedOrders.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY'), deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), deliveryday: dataResult[i].delivery_day, 
            ordertotal: (getSupplierDaetails[i].is_gst === '0' ? dataResult[i].total : parseFloat((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))),
            mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status,orderStatus: dataResult[i].status, track_code: dataResult[i].email_track_code, hidden: false })
        }
        if(getDashStatus === 0) {
            setAllData(DelayedOrders);
        }
    }

    const getScreenDetails = (data) => {
        setDashStatus(data);
        if(data === 0) {
            setAllData(DelayedOrders);
        }else if(data === 1) {
            setAllData(Dboard);
        }else {
            setAllData(UpcomingOrders)
        }
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
            setLoader(true);
            getMainData();
            alert('Order Cancelled successfully!');
        }
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
        }else {
            alert('Unable to resend. Please try again.')
        }
    }

    const ViewInvoiceFunction = (data) => {
        global.orderTitle = "Receive Order";
        global.Track_Id = data;
        var email = getMail;
        var id=data;
        var dataSetter = setInvoiceDetails.bind(this);
        GetInvoiceDetails(email,id,dataSetter);
    }
    const setInvoiceDetails = (data) => {
        global.orderTitle = "Receive Order";
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        props.navigation.navigate('OrderSupplier');
    }


    const EditOrderFunction = (transactionid,suppliername) => {
        global.orderTitle = "Edit Order";
        global.SupplierNameForEdit = suppliername;
        global.Track_Id = transactionid;
        var email = getMail;
        var id=transactionid;
        var dataSetter = setInvoiceDetails1.bind(this);
        GetInvoiceDetails(email,id,dataSetter);

        var dataSetter1 = setInvoiceDetailsProduct.bind(this);
        var cid = getCompanyId;
        ViewProduct(email,cid,dataSetter1);
    }

    const setInvoiceDetailsProduct = (data) => {
        //suppliername
        var product = data.filter(x => x.supplier_id === global.SupplierNameForEdit)
        
        global.ProductDatas = product;
    }

    const setInvoiceDetails1 = (data) => {
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        props.navigation.navigate('OrderSupplier');
    }


    const getHeaders = () => {
        return (
            <View>
                {getSearchStatus === false ? (
                    <Segment
                        style={{ marginVertical: 8 }}
                        getIndex={1}
                        handle={data => getScreenDetails(data)}
                        value={["Delayed", "Today", "Upcoming"]} />
                ) : (
                        <SearchHeader
                            value={getSearchContent}
                            placeholder="Search by name.."
                            search={data => setSearchContent(data)}
                            handleClear={() => setSearchContent(null)}
                            handle={() => setSearchStatus(!getSearchStatus)} />
                    )}
            </View>
        )
    }

    const getInvoiceDetailsFunction = (data) => {
        alert(data)
        console.log(getAllData)
        var id = data;
        // var dataSetter = setInvoiceData.bind(this);
        // GetInvoice(id,dataSetter);
    }

    const setInvoiceData = async(data) => {
        var result = [data];
        //console.log(result.length);
        //console.log(result[0])
        var id = result[0].email_track_code;
        //var transactionid = result[0].transaction_no;
        //var tid = base64.encode(transactionid);
        //await WebBrowser.openBrowserAsync('http://erp.middlemen.asia/printEmail/'+tid+'=/'+id);
        console.log(result);
    }

    
    return (
        <View style={styles.container}>
            <Header
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
                handle1={() => setSearchStatus(!getSearchStatus)}
                image={ getLogo != null ? getLogo : URL.Logo}
                image1="icon"
                icon="search"
                title="Delivery Schedule">
                {getHeaders()}
            </Header>
            <Heading datas={data} length={7} />
            {getLoader === false ? (
            <ScrollView horizontal={true} >
                <DashList
                    receiveHandler={(data)=>ViewInvoiceFunction(data)}
                    cancelHandler={data=>cancelAlertFunction(data)}
                    getInvoice={data=>getInvoiceDetailsFunction(data)}
                    resendHandler={data=>ResendOrderFunction(data)}
                    editOrder = {(transactionid,suppliername) => EditOrderFunction(transactionid,suppliername)}
                    length={8}
                    datas={getAllData} />
            </ScrollView>
            ) : (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            )}
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
    
});


export default HomeScreen; 