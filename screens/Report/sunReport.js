import { Ionicons } from '@expo/vector-icons';
import React,{useEffect, useState} from 'react';
import { StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {
    Text,
    Input,
    Button,
    Loader,
    Header,
    Stepper,
    Selector,
    OrderList,
    Date,
    Checkbox,
    Heading,
    SearchHeader,
    Segment,
    ListView,
    DashList,
    Quantity,
} from '../../components';
import SunReport from '../../functions/sunReport';
import URL from '../../assets/url';
import Theme from '../../assets/Theme';
import GetInvoiceDetails from '../../functions/viewInvoice';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import MonthSelectorCalendar from 'react-native-month-selector';
import moment from 'moment';

const data = [
    { title: 'Received Date', width: 100 },
    { title: 'Po Number', width: 100 },
    { title: 'Supplier', width: 75 },
    { title: 'Invoice No', width: 75 },
    { title: 'Price', width: 75 },
    { title: 'Tax', width: 75 },
    { title: 'Total', width: 75 },
];

const report = [];
const InvoiceData = [];

const LinksScreen = (props) => {
    const [getLoader,setLoader] = useState(true);
    const [getMail,setMail] = useState(null);
    const [getCId,setCId] = useState(null);
    const [getOutletId,setOutletId] = useState(null);
    const [getMonth, setMonth] = useState(moment("MM-YYYY"));
    const [getMainData,setMainData] = useState([]);
    const [getModelVisible, setModelVisible] = useState(false);
    const [getReportMonth, setReportMonth] = useState(moment().format("YYYY-MM"));

    useEffect(() => {
        AsyncStorage.getItem('Email')
            .then(data => {
                if (data) {
                    var email = data;
                    setMail(data);
                    AsyncStorage.getItem('Company_Id')
                        .then(cdata => {
                            if (cdata) {
                                var cid = cdata;
                                setCId(cdata);
                                AsyncStorage.getItem('Outlet')
                                    .then(odata => {
                                        if (odata) {
                                            var id = odata;
                                            setOutletId(odata)
                                            //console.log(id+','+email+','+cid)
                                            var dataSetter = setSuppliersData.bind(this);
                                            var showDate = getReportMonth;
                                            SunReport(email,id,showDate,cid,dataSetter);
                                        }
                                    })
                            }
                        })
                } else {
                    alert('There is some problem. Please logout and login again.')
                }
        })
        //SunReport(email,id,showDate,cid,dataSetter);
    })


    const setSuppliersData = (data) => {
        if (data === 'error') {
           alert('There is some error. Please try again later.');
        }else if(data.total === 1) {
            setLoader(false)
        } else {
            report.length = 0;
            var mainResult = data.rows;
            {
                mainResult.map(item => {
                    report.push({
                        id: moment(item.received_date).format('DD-MM-YYYY'),
                        code: item.transaction_no,
                        name: item.supplier_name,
                        quantity: item.invoice_no,
                        price: item.rate,
                        unit: item.tax_amount,
                        total: item.total_amount,
                    });
                    //console.log(item.is_downloaded)
                });
            }
            setMainData(report);
            setLoader(false)
        }
    }

    const EditOrderFunction = (name,price) => {
        console.log(name);
        global.orderTitle = "Edit Orders";
        global.Track_Id = data;
        var id=name;
        var email = getMail;
        var dataSetter = setInvoiceDetails1.bind(this);
        GetInvoiceDetails(email,id,dataSetter);
    }

    const setInvoiceDetails1 = (data) => {
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        //console.log(InvoiceData);
        props.navigation.navigate('OrderSupplier');
    }

    const addNewOrderFunction = () => {
        global.orderTitle = "Add New Order";
        props.navigation.navigate('NewOrderSun');
    }


    const ViewInvoiceFunction = (name,price) => {
        global.orderTitle = "Receive Orders";
        global.Track_Id = name;
        var email = getMail;
        var id=name;
        global.Invoice_No = price;
        var dataSetter = setInvoiceDetails.bind(this);
        GetInvoiceDetails(email,id,dataSetter);
    }
    const setInvoiceDetails = (data) => {
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        props.navigation.navigate('OrderSupplier');
    }

    const dateSetterFunction = (date) => {
        setReportMonth(date.format('YYYY-MM'))
        FilterFunction();
    }

    const FilterFunction = () => {
        setLoader(true);
        setModelVisible(false)
        var dataSetter = setSuppliersData.bind(this);
        var showDate = getReportMonth;
        var id = getOutletId;
        var email = getMail;
        var cid = getCId;
        SunReport(email,id,showDate,cid,dataSetter);
    }

    const renderModel = () => {
        return(
            <View style={styles.modelContainer}>
                <MonthSelectorCalendar
                selectedDate={getMonth}
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
    <View style={styles.container}>
        <Header
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
                //handle={() => props.navigation.goBack(null)}
                image1="icon"
                icon="filter"
                handle1={()=>setModelVisible(true)}
                image={ global.logo != null ? global.logo : URL.Logo}
                title="Account Report">
                <SearchHeader
                    style={styles.selectorStyle}
                    placeholder="Search by name.."
                />
        </Header>
        <Heading datas={data} length={7} />
        {getLoader === false ? (
            <ScrollView horizontal={true} >
                <OrderList
                    length={7}
                    addOrder={(name,price)=>ViewInvoiceFunction(name,price)}
                    getInvoice={(name,price)=>EditOrderFunction(name,price)}
                    style={{ backgroundColor: Theme.BACK }}
                    datas={getMainData}
                />
            </ScrollView>
            ) : (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            )}
        <ActionButton buttonColor={Theme.PRIMARY}>
            <ActionButton.Item buttonColor={Theme.SECONDARY} title="New Order" onPress={addNewOrderFunction}>
                <Icon name="cubes" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>

        <Modal
            isVisible={getModelVisible}>
            {renderModel()}
            </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
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



export default LinksScreen;