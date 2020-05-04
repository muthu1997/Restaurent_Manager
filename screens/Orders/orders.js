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
    Alert,
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
import ViewProduct from '../../functions/ViewProdct';
import GetInvoice from '../../functions/getInvoiceDetails';
import Modal from 'react-native-modal';
import MonthSelectorCalendar from 'react-native-month-selector';
import moment from 'moment';

const InvoiceData = [];

const data = [
    { title: 'S.No', width: 50, length: 7 },
    { title: 'Transaction Id', width: 100 },
    { title: 'Supplier Name', width: 100 },
    { title: 'Order Date', width: 75 },
    { title: 'Delivery Date', width: 75 },
    { title: 'Delivery Day', width: 75 },
    { title: 'Order Total', width: 75 },
];



const Dboard = [];

const SupplierList = props => {

    const [getMainResult, setMainResult] = useState(null);
    const [getMail, setMail] = useState(null);
    const [getAllData, setAllData] = useState([]);
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getSecondarySupplierData, setSecondarySupplierData] = useState(null);
    const [getLoader,setLoader] = useState(true);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getModelVisible, setModelVisible] = useState(false);
    const [getReportMonth, setReportMonth] = useState(moment().format("YYYY-MM")+"-31");
    const [getMonth, setMonth] = useState(moment().format("YYYY-MM")+"-01");
    const [getMonther, setMonther] = useState(moment("MM-YYYY"));


    useEffect(() => {
        global.startDate = getMonth;
        global.enddate = getReportMonth;
        getMainData();
        setInterval(()=>{
            if(global.refresher === 'Yes') {
                setLoader(true);
                global.refresher = 'No';
                getMainData();
            }
        },5000)
    }, [])

    
    const getMainData = () => {
        console.log(global.startDate)
        console.log(global.enddate)
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
        Dboard.length = 0;
        var datasss = data.data;
        var dataResult1 = datasss;
        var dataResult = dataResult1.filter(x => x.delivery_date > global.startDate && x.delivery_date < global.enddate)
        for (var i = 0; i < dataResult.length; i++) {
            Dboard.push({ id: i + 1, 
                transactionid: dataResult[i].transaction_no, 
                suppliername: dataResult[i].supplier_name, 
                orderdate: moment(dataResult[i].created_at).format('DD-MM-YYYY'), 
                deliverydate: moment(dataResult[i].delivery_date).format('DD-MM-YYYY'), 
                deliveryday: dataResult[i].delivery_day, 
                ordertotal: dataResult[i].total, 
                mailOpen: dataResult[i].email_open_datetime, 
                mailStatus: dataResult[i].email_status, 
                orderStatus: dataResult[i].status })
        }
            setAllData(Dboard);
            setSecondarySupplierData(Dboard);
        //console.log(dataResult)
        setLoader(false)
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

    const getInvoiceDetailsFunction = (data) => {
        var id = data;
        var dataSetter = setInvoiceData.bind(this);
        GetInvoice(id,dataSetter);
    }

    const setInvoiceData = async(data) => {
        var result = [data];
        //console.log(result.length);
        //console.log(result[0])
        var id = result[0].email_track_code;
        await WebBrowser.openBrowserAsync('http://erp.middlemen.asia/printEmail/VGVzdF8yMF8xNTU=/'+id);
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
        setReportMonth(date.format('YYYY-MM')+"-31")
        global.enddate = date.format('YYYY-MM')+"-31";
        global.startDate = date.format('YYYY-MM')+"-01";
        setMonth(date.format('YYYY-MM')+"-01")
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

    return (
        <View style={styles.mainContainer}>
            <Header
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
                //handle={() => props.navigation.goBack(null)}
                image={ global.logo != null ? global.logo : URL.Logo}
                image1="icon"
                icon="filter"
                handle1={()=>setModelVisible(true)}
                title="Orders">
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
                getInvoice={data=>getInvoiceDetailsFunction(data)}
                resendHandler={data=>ResendOrderFunction(data)}
                editOrder = {(transactionid,suppliername) => EditOrderFunction(transactionid,suppliername)}
                length={7}
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
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Theme.BACK,
    },
    selectorStyle: {
        backgroundColor: Theme.WHITE,
        marginTop: 15
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

export default SupplierList;
