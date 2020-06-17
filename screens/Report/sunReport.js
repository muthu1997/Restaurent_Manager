import { Ionicons } from '@expo/vector-icons';
import React,{useEffect, useState} from 'react';
import { StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView, Dimensions,Image } from 'react-native';
import Constants from 'expo-constants';
import {
    Text,
    Input,
    Button,
    Header,
    Stepper,
    RefreshControl,
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
import { WebView } from 'react-native-webview';
import URL from '../../assets/url';
import Theme from '../../assets/Theme';
import GetInvoiceDetails from '../../functions/viewInvoice';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import MonthSelectorCalendar from 'react-native-month-selector';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';

const imageIndex=[];
const data = [
    { id: 'Po Number', code: 'Supplier', name: 'Invoice No', quantity: 'Price', price: "Tax",unit:'Total',total:'Received Date', },
  ];
  const getimage = [];
  const PdfReader = ({ url: uri }) => <Image style={{ width:100,height:100 }} source={{ uri: "http://erp.middlemen.asia/repository/received/"+getimage[0]+".jpg" }} />

const report = [];
const InvoiceData = [];
const mainDatas = [];
const images=[];
const compny = [];

const LinksScreen = (props) => {
    const [getLoader,setLoader] = useState(true);
    const [getMail,setMail] = useState(null);
    const [getCId,setCId] = useState(null);
    const [getSearchStatus, setSearchStatus] = useState(false)
    const [getOutletId,setOutletId] = useState(null);
    const [getMonth, setMonth] = useState(moment("MM-YYYY"));
    const [getMainData,setMainData] = useState([]);
    const [getModelVisible, setModelVisible] = useState(false);
    const [getReportMonth, setReportMonth] = useState(moment().format("YYYY-MM"));
    const [getSelectedMonth, setSelectedMonth] = useState(moment().format('MMM'));
    const [refreshing, setRefreshing] = useState(false);
    const [getImageVisible, setImageVisible] = useState(false)
    const [getCompany, setCompany] = useState(null)


    useEffect(() => {
        compny.length=0;
        AsyncStorage.getItem('Company_Name')
        .then(data => {
            if(data) {
                compny.push(data)
            }
        })
       mainFunction();
        //SunReport(email,id,showDate,cid,dataSetter);
        setInterval(() => {
            if(global.sunRefresh === 'Yes') {
                mainFunction();
                global.sunRefresh = 'No';
                console.log('Run')
            }
        },3000)
    },[])

    const mainFunction = () => {
        setRefreshing(true)
        setLoader(true)
       
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

    // setRefreshing(false)
    // setLoader(false)
    } 


    const setSuppliersData = (data) => {
        console.log('enter')
        setLoader(false)
        setRefreshing(false)
        if (data === 'error') {
           alert('There is some error. Please try again later.');
           setLoader(false)
        }else if(data.total === 1) {
            setLoader(false)
        } else {
            console.log('enter2')
            report.length = 0;
            images.length = 0;
            var mainResult = data.rows;
            mainDatas.length=0;
            mainDatas.push(data.rows);
            {
                mainResult.map(item => {
                    report.push({
                        next1: item.received_date,
                        code: item.transaction_no,
                        name: item.supplier_name,
                        quantity: item.invoice_no,
                        price: item.amount,
                        unit: item.tax_amount,
                        total: item.total_amount,
                    });
                    console.log(item.received_img)

                    //images.push({url:"http://erp.middlemen.asia/repository/received/"+compny[0]+"/"+item.invoice_prefix+item.invoice_no+"_"+item.transaction_no+".jpg"})
                    images.push({url:"http://erp.middlemen.asia/repository/received/"+compny[0]+"/"+item.received_img})

                });
            }
            //http://erp.middlemen.asia/repository/received/"+getimage[0]+".jpeg
            setMainData(report);
            console.log(images)
        }
    }

    const EditOrderFunction = (name,price,code, quantity) => {
        global.orderTitle = "Edit Orders"; 
        global.Track_Id = code;
        global.invoice_number = quantity;
        var email = getMail;
        var id=code;
        global.Invoice_No = price;

        var result = mainDatas[0].filter(x=>x.transaction_no === code)
        //console.log(result)
        global.total = result[0].amount;
        global.tax = result[0].tax_amount;
        global.totalAmount = result[0].total_amount;


        global.isGST = result[0].supplier.is_gst;
        global.created = result[0].received_date;
        global.cid = result[0].company_id;
        global.supplierId = result[0].supplier_id;
        global.outlet_id = result[0].outlet_id;
        global.invoice = result[0].invoice_no;
        global.viewInvoice = result;
        global.invoice_prefix = result[0].invoice_prefix;
       props.navigation.navigate('EditReport');
    }

    const setInvoiceDetails1 = (data) => {
        InvoiceData.length = 0;
        InvoiceData.push(data);
        global.viewInvoice = InvoiceData;
        // console.log(InvoiceData);
        props.navigation.navigate('EditReport');
    }

    const addNewOrderFunction = () => {
        global.orderTitle = "Add New Order";
        props.navigation.navigate('NewOrderSun');
    }


    const ViewInvoiceFunction = (name,price,code) => {
        global.orderTitle = "Receive Orders";
        global.Track_Id = code;
        var email = getMail;
        var id=code;
        global.Invoice_No = price;

        var result = mainDatas[0].filter(x=>x.transaction_no === code)
        //console.log(result)
        // global.total = result[0].amount;
        // global.tax = result[0].tax_amount;
        // global.totalAmount = result[0].total_amount;

        global.isGST = result[0].supplier.is_gst;
        global.created = result[0].received_date;
        global.cid = result[0].company_id;
        global.supplierId = result[0].supplier_id;
        global.outlet_id = result[0].outlet_id;
        global.invoice_prefix = result[0].invoice_prefix;
        props.navigation.navigate('AddProduct');
        
        // var dataSetter = setInvoiceDetails.bind(this);
        // GetInvoiceDetails(email,id,dataSetter);
    }


    const dateSetterFunction = (date) => {
        setReportMonth(date.format('YYYY-MM'))
        FilterFunction();
        setSelectedMonth(date.format('MMM'))
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

    const loadImage = (quantity) => {
        imageIndex.length=0;
        getimage.length=0;
        getimage.push(quantity)

        var getLength = report;
        var finalLength = [];
        finalLength.length = 0;
        var finalLength1 = [];
        finalLength1.length = 0;
        for(var i=0; i<getLength.length;i++) {
            if(getLength[i].quantity != quantity) {
                finalLength.push({data: getLength[i].code})
            }else {
                finalLength1.push(finalLength);
                setImageVisible(true)
                imageIndex.push(finalLength1[0].length);
                console.log(quantity)
            }
        }
        // setImageVisible(true)
        // console.log("http://erp.middlemen.asia/repository/received/"+getimage[0]+".jpeg")
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
    
    const dummyWidth = Dimensions.get('window').width;
    const dummyHeight = Dimensions.get('window').height;
    var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 7 : dummyHeight / 7;
  var lengther = [widthers,widthers,widthers,widthers,widthers,widthers,widthers]; 

  const renderLoader = () => {
      return (
        <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
            <ActivityIndicator color={Theme.PRIMARY} size="large" />
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
                icon="search"
                handle1={() => setSearchStatus(!getSearchStatus)}
                handle2={()=>setModelVisible(true)}
                image={ URL.Logo}
                image2="icon"
                icon2="calendar"
                month={getSelectedMonth}
                title="Account Report">
                {getSearchStatus ? (
                <SearchHeader
                    style={styles.selectorStyle}
                    placeholder="Search by name.."
                />
                ) : (
                   
                            <View style={{width:10,height:10}} />
                       
                ) }
        </Header>
        <Heading datas={data} length={lengther} />
        {getLoader ? (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            ) : (
                <ScrollView
                horizontal={true} > 
                    <OrderList 
                        length={7}
                        addOrder={(name,price,code)=>ViewInvoiceFunction(name,price,code)}
                        getInvoice={(name,price,code,quantity)=>EditOrderFunction(name,price,code,quantity)}
                        style={{ backgroundColor: Theme.BACK }}
                        datas={getMainData}
                        mainFunction={mainFunction}
                        refreshing={refreshing}
                        third='Enable'
                        handle3={(quantity)=>loadImage(quantity)}
                    />
                </ScrollView>
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
            
            <Modal isVisible={getImageVisible}>
                <View syle={{flex:1,alignItems:'center',justifyContent: 'center',}}>
                <View style={{width:'90%',height:'90%',borderRadius:5,alignSelf:'center',overflow:'hidden'}}>
                {/* <PdfReader/> */}
                <ImageViewer loadingRender={renderLoader} index={imageIndex[0]} enablePreload={true} imageUrls={images}/>
                </View>
                <View style={{width:'100%',flexDirection:'row',justifyContent: 'center',marginTop:5}}>
                <Button 
                    title={"Close"} 
                    handle={()=>setImageVisible(false)} 
                    style={{width:Dimensions.get('screen').width > 500 ? '40%' : '40%',marginHorizontal:10}}  />
                </View>
                </View>
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