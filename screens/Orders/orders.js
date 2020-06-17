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
    const [getSearchContent, setSearchContent] = useState(null);
    const [getSecondarySupplierData, setSecondarySupplierData] = useState(null);
    const [getMainResult, setMainResult] = useState([]);
    const [getDashStatus, setDashStatus] = useState(1);
    const [getMail, setMail] = useState(null);
    const [getLoader,setLoader] = useState(true);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getSelectedMonth, setSelectedMonth] = useState(moment().format('MMM'));
    const [refreshing, setRefreshing] = useState(true);
    const [getReportMonth, setReportMonth] = useState(moment().format("YYYY-MM")+"-31");
    const [getMonth, setMonth] = useState(moment().format("YYYY-MM")+"-01");
    const [getMonther, setMonther] = useState(moment("MM-YYYY"));
    const [getModelVisible, setModelVisible] = useState(false);


    useEffect(() => {
        global.startDate = getMonth;
        global.enddate = getReportMonth;
        getMainData();
        
    }, [])

    
    const getMainData = () => {
        setInterval(()=>{
            if(global.refresher === 'Yes') {
                setLoader(true);
                global.refresher = 'No';
                getMainData();
            }
        },3000)
        setRefreshing(true)
        setLoader(true)
        AsyncStorage.getItem('Company_Id')
        .then(data => {
            setCompanyId(data)
        })
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
        setMainResult(data.data);
        AllResult.length=0;
        AllResult.push(data.data);
        Dboard.length = 0;
        var datasss = data.data;
        var dataResult1 = datasss.sort((a, b) => a.status - b.status);
        var today = moment().format("YYYY-MM-DD");
        
        var dataResult = dataResult1.filter(x => x.delivery_date > global.startDate && x.delivery_date < global.enddate)
        for (var i = 0; i < dataResult.length; i++) {
            Dboard.push({
                transactionid: dataResult[i].transaction_no, 
                suppliername: dataResult[i].supplier_name, 
                orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY'), 
                deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), 
                deliveryday:  days[moment(dataResult[i].delivery_date).day()], 
                ordertotal: (dataResult[i].is_gst === '0' ? parseInt(dataResult[i].total) : parseInt((Number(dataResult[i].total)*(Number(7)/100)+Number(dataResult[i].total)))), 
                mailOpen: moment(dataResult[i].email_open_datetime).format('DD-MM-YYYY HH:mm:ss'),
                mailStatus: dataResult[i].email_status, 
                hidden: dataResult[i].delivery_date  > today ? true : false,
                orderStatus: dataResult[i].status })
        }
            setAllData(Dboard);
            setSecondarySupplierData(Dboard);
        //console.log(dataResult)
        setLoader(false)
        setRefreshing(false)
    }


    const SearchFilterFunction = (text) => {
        const newData = getSecondarySupplierData.filter(function(item){
            const itemData = item.suppliername.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        setAllData(newData)
        text = text;
    }

    const dateSetterFunction = (date) => {
        //console.log(date.format(moment.HTML5_FMT.DATE))
        setReportMonth(date.format('YYYY-MM')+"-31")
        global.enddate = date.format('YYYY-MM')+"-31";
        global.startDate = date.format('YYYY-MM')+"-01";
        setMonth(date.format('YYYY-MM')+"-01")
        setSelectedMonth(date.format('MMM'))
        getMainData();
        setModelVisible(false)
    }

    const renderModel = () => {
        return(
            <View style={styles.modelContainer}>
                <MonthSelectorCalendar
                selectedDate={getMonther}
                onMonthTapped={(date) => dateSetterFunction(date)}
      />
                <View style={{width:'100%',flexDirection:'row',justifyContent: 'center',}}>
                <Button 
                    title={"Cancel"} 
                    handle={()=>setModelVisible(false)} 
                    style={{width:Dimensions.get('screen').width > 500 ? '40%' : '40%',marginHorizontal:10}}  />
                </View>
            </View>
        )
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
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
                //handle={() => props.navigation.goBack(null)}
                image={ URL.Logo}
                image1="icon"
                icon="search"
                handle1={() => setSearchStatus(!getSearchStatus)}
                handle2={()=>setModelVisible(true)}
                image2="icon"
                icon2="calendar"
                month={getSelectedMonth}
                title="Orders">
                {getSearchStatus ? (
                <SearchHeader
                    search={data=>SearchFilterFunction(data)}
                    style={styles.selectorStyle}
                    placeholder="Search by name.."
                />
                ) : (
                    <View>
                            <View style={{width:10,height:10}} />
                    </View>
                ) }
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

            <Modal
            isVisible={getModelVisible}>
            {renderModel()}
            </Modal>
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