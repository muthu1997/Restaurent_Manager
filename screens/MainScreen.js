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
import * as ScreenOrientation from 'expo-screen-orientation';

import moment from 'moment';
import URL from '../assets/url';
import Theme from '../assets/Theme';
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
    const [getSearchContent, setSearchContent] = useState(null);
    const [getMainResult, setMainResult] = useState([]);
    const [getDashStatus, setDashStatus] = useState(1);
    const [getMail, setMail] = useState(null);
    const [getLoader,setLoader] = useState(true);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getSupplierDaetails,setSupplierDetails] = useState(null)
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        //await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        AsyncStorage.getItem('Edit')
        .then(data => {
            global.editable = data
        })
        console.disableYellowBox = true;
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
        
    },[])


    const getCompanyDetails = (data) => {
        fetch('http://erp.middlemen.asia/api/supplierindex/'+data, {
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
        })
        .then(response => response.json())
        .then(responseJson => {
            AsyncStorage.setItem('Company_Name',responseJson.company.name)
        })
        .catch(err => console.log(err))
    }

    const getMainData = () => {
        setRefreshing(true)
        setLoader(true)
        // var dat = [];
        // if(dat.length <= 1 ) {
        //     dat.push('oi');
        //     console.log(dat.length)
        // }
        AsyncStorage.getItem('Email')
            .then(data => {
                if (data) {
                    setMail(data);
                    var email = data;
                    AsyncStorage.getItem('Company_Name')
                        .then(cnamer => {
                            if(!cnamer) {
                                getCompanyDetails(email);
                            }
                        })
                    AsyncStorage.getItem('Company_Id')
                    .then(data => {
                        setCompanyId(data)

                        const id = data;
                        var dataSetter = (data) => {
                            setSupplierDetails(data);
                    
                            var data = setDashboardResult.bind(this);
                            DashboardHandler(email, data);
                        };
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


    const setDashboardResult = (datas) => {
        var data =datas.data;
        AllResult.length=0;
        AllResult.push(data);
        //secondary(data);
        // setDelayedData(data);
        // setMainResult(data);
        // var ret = data.filter(c => c.status === 0)


        Dboard.length = 0;
        UpcomingOrders.length = 0;
        DelayedOrders.length = 0;

        // var value = Number(data.length);
        // var today = moment().format("YYYY-MM-DD");
        // var i=0;
        // for(i=0;i<value;i++) {
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

        Dboard.length = 0;
        var datas = [data];
        var length = datas[0].length;
        var today = moment().format("YYYY-MM-DD");
        //var dataResult = datas.filter(x => x.status === 0)
        //var dataResult = dataResultBegin.filter(x => x.delivery_date == today)
        var data = datas[0];
        // for(var i = 0; i === length-1; i++) {
        //     console.log(dataResult[i].transaction_no)
        //     Dboard.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY') , deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), deliveryday: dataResult[i].delivery_date, 
        //     ordertotal: (dataResult[i].is_gst === '0' ? dataResult[i].total : parseFloat((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))),
        //      mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status,orderStatus: dataResult[i].status, hidden: false })
        // }
        console.log(data)
        for(var i = 0;i != length-1; i++) {
            if(data[i].status === 0 && data[i].delivery_date  === today) {
            Dboard.push({
                transactionid: data[i].transaction_no,
                suppliername: data[i].supplier_name,
                orderdate: moment(data[i].created_at).format('DD-MM-YYYY') , 
                deliverydate: moment(data[i].delivery_date).format('DD-MM-YYYY'),
                deliveryday: days[moment(data[i].delivery_date).day()],
                ordertotal: data[i].is_gst === 0 ? parseFloat(data[i].total).toFixed(2) : parseFloat((Number(data[i].total)*(Number(7)/100)+Number(data[i].total))).toFixed(2),
                mailOpen: moment(data[i].email_open_datetime).format('DD-MM-YYYY HH:mm:ss'),
                mailStatus: data[i].email_status,
                orderStatus: data[i].status,
                hidden: false })
            }
        }


        for(var i = 0;i != length-1; i++) {
            if(data[i].status === 0 && data[i].delivery_date  > today) {
            UpcomingOrders.push({
                suppliername: data[i].supplier_name,
                transactionid: data[i].transaction_no,
                orderdate: moment(data[i].created_at).format('DD-MM-YYYY') , 
                deliverydate: moment(data[i].delivery_date).format('DD-MM-YYYY'),
                deliveryday: days[moment(data[i].delivery_date).day()],
                ordertotal: data[i].is_gst === 0 ? parseFloat(data[i].total).toFixed(2) : parseFloat((Number(data[i].total)*(Number(7)/100)+Number(data[i].total))).toFixed(2),
                mailOpen: moment(data[i].email_open_datetime).format('DD-MM-YYYY HH:mm:ss'),
                mailStatus: data[i].email_status,
                orderStatus: data[i].status,
                hidden: true })
            }
        }
        

        for(var i = 0;i != length-1; i++) {
            if(data[i].status === 0 && data[i].delivery_date  < today) {
            DelayedOrders.push({
                suppliername: data[i].supplier_name,
                transactionid: data[i].transaction_no,
                orderdate: moment(data[i].created_at).format('DD-MM-YYYY') , 
                deliverydate: moment(data[i].delivery_date).format('DD-MM-YYYY'),
                deliveryday: days[moment(data[i].delivery_date).day()],
                ordertotal: data[i].is_gst === 0 ? parseFloat(data[i].total).toFixed(2) : parseFloat((Number(data[i].total)*(Number(7)/100)+Number(data[i].total))).toFixed(2),
                mailOpen: moment(data[i].email_open_datetime).format('DD-MM-YYYY HH:mm:ss'),
                mailStatus: data[i].email_status,
                orderStatus: data[i].status,
                hidden: false })
            }
        }

        if(getDashStatus === 0) {
            setAllData(DelayedOrders);
        }else if(getDashStatus === 2) {
            setAllData(UpcomingOrders);
        }else {
            setAllData(Dboard);
        }
        


        //     UpcomingOrders.length = 0;
        // var datass = data;
        // var today = moment().format("YYYY-MM-DD");
        // var dataResultBegin = datass.filter(x => x.status === 0)
        // var dataResult = dataResultBegin.filter(x => x.delivery_date > today)

        // for (var i = 0; i < dataResult.length; i++) {
        //     UpcomingOrders.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY') , deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), deliveryday: dataResult[i].delivery_date, 
        //     ordertotal: (getSupplierDaetails[i].is_gst === '0' ? dataResult[i].total : parseFloat((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))),
        //      mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status,orderStatus: dataResult[i].status, track_code: dataResult[i].email_track_code, hidden: false })
        // }
        // if(getDashStatus === 2) {
        //         setAllData(UpcomingOrders);
        //     }


        //     DelayedOrders.length = 0;
        // var data1 = data;
        // var today = moment().format("DD-MM-YYYY");
        // var dataResult1 = data1.filter(x => x.status === 0)
        // var dataResult = dataResult1.filter(x => moment(x.delivery_date).format("DD-MM-YYYY") < today)
        // console.log(dataResult)
        // for (var i = 0; i < dataResult.length; i++) {
        //     DelayedOrders.push({ id: i + 1, transactionid: dataResult[i].transaction_no, suppliername: dataResult[i].supplier_name, orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY'), deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), deliveryday: dataResult[i].delivery_day, 
        //     ordertotal: (getSupplierDaetails[i].is_gst === '0' ? dataResult[i].total : parseFloat((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))),
        //     mailOpen: dataResult[i].email_open_datetime, mailStatus: dataResult[i].email_status,orderStatus: dataResult[i].status, track_code: dataResult[i].email_track_code, hidden: false })
        // }
        // if(getDashStatus === 0) {
        //     setAllData(DelayedOrders);
        // }
        
        setLoader(false)
        setRefreshing(false)
    }

    const secondary = (data) => {
        UpcomingOrders.length = 0;
        var datass = data;
        var dataResult1 = datass.filter(x => x.status === 0)

        var today = moment().format("YYYY-MM-DD");
        var dataResult = dataResult1.filter(x => x.delivery_date > today);
        setSecondaryData(dataResult);
    }

    
    const setSecondaryData = (data) => {
        var dataResult= data;
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
        if(data == 0) {
            setAllData(DelayedOrders);
        }else if(data == 1) {
            setAllData(Dboard);
        }else if(data == 2) {
            setAllData(UpcomingOrders);
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
        var conversion = AllResult[0].filter(x => x.transaction_no === data);
        var invoice = conversion[0].convert_to_invoive;
        global.invoiceStatusForReceiveOrder = invoice;
        if(invoice ===1) {
            console.log('1')
            fetch('https://erp.middlemen.asia/api/viewOrderedProducts/'+data+'/12345',{
                method:"GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response=>response.json())
            .then(responseJson => {
                global.invoiceProducts = responseJson;
                var dataSetter = setInvoiceDetails.bind(this);
                GetInvoiceDetails(email,id,dataSetter);
            })
            .catch(err => {
                console.log(err)
            })
        }else {
            var dataSetter = setInvoiceDetails.bind(this);
            GetInvoiceDetails(email,id,dataSetter);
        }
    } 
    const setInvoiceDetails = (data) => {
        global.orderTitle = "Receive Order";
        console.log(data)
        InvoiceData.length = 0; 
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        var filterData = getAllData.filter(x => x.transactionid === global.Track_Id)
        global.receiveDeliveryDate = filterData[0].deliverydate;
        props.navigation.navigate('OrderSupplier');
    }

    const PreviewOrderFunction = (data) => {
        global.orderTitle = "Receive Order";
        global.Track_Id = data;
        var email = getMail;
        var id=data;
        var dataSetter = setPreviewOrderFunction.bind(this);
        GetInvoiceDetails(email,id,dataSetter);
    }
    const setPreviewOrderFunction = (data) => {

        global.orderTitle = "Receive Order";
        InvoiceData.length = 0;
        InvoiceData.push(data);

        var resulter = InvoiceData[0].data.order_details;
        var finalShowData = [];
        finalShowData.length = 0;
        for (var i=0; i < resulter.length; i++) { 
           
            finalShowData.push(
              {
                "id":i+1,
                //"code":resulter[i].item_code,
                "name":resulter[i].product_name,
                "quantity":resulter[i].quantity,
                "price":resulter[i].price,
                "unit":resulter[i].unit,
                "total":resulter[i].total,
                "product_id":resulter[i].product_id,
              }
            )
        }

        global.viewInvoice = InvoiceData;
        global.finalShowData=finalShowData;
        props.navigation.navigate('PreviewOrder');
    }


    const EditOrderFunction = (transactionid,suppliername) =>  {
        global.orderTitle = "Edit Order";
        console.log(suppliername)
        global.SupplierNameForEdit = suppliername;
        global.Track_Id = transactionid;

        var filterData = getAllData.filter(x => x.transactionid === transactionid)
        global.receiveDeliveryDate = filterData[0].deliverydate;

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
        //console.log(product)
    }

    const setInvoiceDetails1 = (data) => {
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        //console.log(InvoiceData)
        var invoice = InvoiceData[0].data.supplier.convert_to_invoive;
        global.invoiceStatusForReceiveOrder = invoice;
        props.navigation.navigate('OrderSupplier');
    }

    const SearchFilterFunction = (text) => {
        const newData = getAllData.filter(function(item){
            const itemData = item.suppliername.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        setAllData(newData)
        text = text;
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
                            search={data => SearchFilterFunction(data)}
                            handle={() => setSearchStatus(!getSearchStatus)} />
                    )}
            </View>
        )
    }

    const getInvoiceDetailsFunction = (data) => {
        var id = data;
        //alert('http://erp.middlemen.asia/printEmail/'+base64.encode(id)+'=/'+data)
        var dataSetter = async(data) => {await WebBrowser.openBrowserAsync('http://erp.middlemen.asia/printEmail/'+base64.encode(id)+'=/'+data)};
        GetInvoice(id,dataSetter);
    }

    const shareFunction = (data) => {
        var id = data;
        var dataSetter =async(data) => await Share.share({
            message:
            'Download Invoice for your order now. Link http://erp.middlemen.asia/printEmail/'+base64.encode(id)+'=/'+data,
          })
        GetInvoice(id,dataSetter);
    }

   
    const dummyWidth = Dimensions.get('window').width;
    const dummyHeight = Dimensions.get('window').height;
    var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 6 : dummyHeight / 6;
  var lengther = [widthers,widthers,widthers,widthers,widthers,widthers]; 
    return (
        <View style={styles.container}>
            <Header
                titlestyle={{ fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
                handle1={() => setSearchStatus(!getSearchStatus)}
                image={ URL.Logo}
                image1="icon"
                icon="search"
                title="Delivery Schedule"> 
                {getHeaders()}
            </Header>
            <Heading datas={data} length={lengther} />
            {getLoader === false ? (
            <ScrollView horizontal={true} >
                <DashList
                    receiveHandler={(data)=>ViewInvoiceFunction(data)}
                    cancelHandler={data=>cancelAlertFunction(data)}
                    getInvoice={data=>getInvoiceDetailsFunction(data)}
                    resendHandler={data=>ResendOrderFunction(data)}
                    previewOrder={data=>PreviewOrderFunction(data)}
                    share={data=>shareFunction(data)}
                    editOrder = {(transactionid,suppliername) => EditOrderFunction(transactionid,suppliername)}
                    length={6}
                    mainFunction={getMainData}
                    refreshing={refreshing}
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