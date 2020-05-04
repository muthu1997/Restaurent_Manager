import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    ActivityIndicator,
    KeyboardAvoidingView,
    CheckBox,
    Alert,
} from 'react-native';
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
    ListView,
    Quantity,
    OrderList
} from '../../components';
import Theme from '../../assets/Theme';
import SupplierProducts from '../../functions/getSuppliersList';
import ReceiveOrderFunctionEdit from '../../functions/receiveOrderEdit';
import SupplierHandler from '../../functions/getSupplier';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ImageUploader from '../../functions/uploadImage';
import PendingData from '../../functions/viewPendingProducts';
import ApproveOrder from '../../functions/receiveOrder';
import EditInvoice from '../../functions/editInvoice';
import ReceiveOrderFunctionNewOrder from '../../functions/AddNewOrderSun';
import moment from 'moment';

const mainDataResult = [];
const AllSupplierDetails = [];

const data = [
    { title: 'S.No', width: 50, length: 7 },
    { title: 'Name', width: 100 },
    { title: 'Code', width: 100 },
    { title: 'Quantity', width: 75 },
    { title: 'Price', width: 75 },
    { title: 'Total', width: 75 },
    { title: 'Unit', width: 75 },
];

const supplier = [];
const supplierPicker = [];
const supplierNameForOrder = [];

const LinksScreen = props => {
    const bs = React.createRef();

    const mainData = global.viewInvoice;
    const [getAllData, setAllData] = useState([]);
    const [getMail, setMail] = useState(null);

    const [getTotalAmount, setTotalAmount] = useState(0);
    const [getTaxAmount, setTaxAmount] = useState(0);
    const [getReceivedAmount, setReceivedAmount] = useState(0);
    const [getInvoiceNumber, setInvoiceNumber] = useState(0);
    const [getDeliveryDate, setDeliveryDate] = useState();
    const [getDeliveryShoaDate, SetDeliveryShowDate] = useState();


    const [getSupplierGST, setSupplierGST] = useState(0);
    const [getOutletId, setOutletId] = useState(null);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getCreatedAt, setCreatedAt] = useState(null);
    const [getSupplier, setSupplier] = useState(null);
    const [getDefaultSupplier, setDefaultSupplier] = useState(null);
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getIsGST, setIsGST] = useState(null);
    const [getPayment, setPayment] = useState(0);

    const [getLocalImage, setLocalImage] = useState(null);
    const [getTexter, setTexter] = useState('Capture');
    const [getSubmitText, setSubmitText] = useState('Send Order');
    const [getSubmitText1, setSubmitText1] = useState('Update');

    const Track_Id = global.Track_Id;

    useEffect(() => {
            AsyncStorage.getItem('Outlet').then(data => {
             if(data) {
                setOutletId(data);
             }
           })
           AsyncStorage.getItem('Company_Id').then(data => {
            if(data) {
               setCompanyId(data);
            }
          })
        //global.orderTitle = "Add New Order"
        if(global.orderTitle === "Receive Orders") {
            setMainDataFunction1();
        }else if(global.orderTitle === "Edit Orders") {
            setEditSunReportFunction();
        }else if(global.orderTitle === "Add New Order") {
            setNewOrderDetailsFunction();
        } else {
            setMainDataFunction()
        }
    }, [])

    const setMainDataFunction = () => {
        supplier.length = 0;
        setTotalAmount(mainData[0].data.subtotal)
        setReceivedAmount(mainData[0].data.total)
        setTaxAmount(mainData[0].data.gst_amount)
        setDeliveryDate(mainData[0].data.delivery_date)
        var inserter = mainData[0].data.order_details;
        setSupplierGST(mainData[0].data.supplier.is_gst);
        setCreatedAt(mainData[0].data.order_date)
        setCompanyId(mainData[0].company.company_id);
        setSupplier(mainData[0].data.supplier.id);
        setIsGST(mainData[0].data.gst_percent);
        setOutletId(mainData[0].data.outlet.id);

        for (var i = 0; i < inserter.length; i++) {
            supplier.push({
                title: parseInt(i + 1),
                image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                name: inserter[i].product_name,
                code: inserter[i].item_code,
                quantity: inserter[i].quantity,
                price: inserter[i].rate,
                total: inserter[i].total,
                unit: inserter[i].unit,
            });
        }
        setAllData(supplier)
    }


    const setEditSunReportFunction = () => {
        var id = mainData[0].data.transaction_id;
        fetch('https://erp.middlemen.asia/api/viewOrderedProducts/'+id+'/123',{
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            setEditableOrder(responseJson)
        })
        .catch(err => {
            console.log(err)
            setEditSunReportFunction()
        })
    }


    const setNewOrderDetailsFunction = () => {
        AsyncStorage.getItem('Email').then(data => {
            if (data) {
                setMail(data)
              var dataSetter = setSupplierFetchResult.bind(this);
              var email = data;
              SupplierHandler(email, dataSetter);
            }
          });
    }

    const setTopSupplierFunction = (data) => {
        var result = AllSupplierDetails[0];
        
        var name = result.filter(x => x.supplier_id === data);
        setSupplier(name[0].name);
        global.supplierName = name[0].name;
        global.supplierId = data;
        var namer = name[0].name;
        supplierNameForOrder.length = 0;
        supplierNameForOrder.push(name);
        console.log(name[0].name)
        setIsGST(name[0].is_gst);
        runSupplierProductFunction()
      }

      const runSupplierProductFunction = () => {
        var email = getMail;
        var dataSetter = SupplierHandlerAddNewOrder.bind(this);
        SupplierProducts(email, dataSetter);
      }


    const SupplierHandlerAddNewOrder = (data) => {
    supplier.length=0;
    var getter = data.filter(x=> x.supplier_id === supplierNameForOrder[0])
    var i = parseInt(0);
    var totalAmount = 0;
    for (i; i < getter.length; i++) {  
      var getDatas = getter[i];
      var getDatas1 = [getDatas];
    var mainResult = getDatas1;
    
      {
        mainResult.map(item => {
          supplier.push({ 
                    title: parseInt(i + 1),
                    image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                    name: item.name,
                    code: item.item_code,
                    quantity: 0,
                    price: item.price,
                    total: totalAmount,
                    unit: item.unit + '(' + item.unit_description + ')'
          });
        });
      }
    } 
    setAllData(supplier);
  };

    const setSupplierFetchResult = data => {
        var getter = data.data;
        supplierPicker.length = 0;
        {
          getter.map(item => {
            supplierPicker.push({ label: item.name, value: item.supplier_id });
          });
        }
        AllSupplierDetails.push(getter);
        setAllSuppliers(supplierPicker);
      };

    const setEditableOrder = (data) => {
        setTotalAmount(mainData[0].data.subtotal)
        setReceivedAmount(mainData[0].data.total)
        setTaxAmount(mainData[0].data.gst_amount)
        setDeliveryDate(mainData[0].data.delivery_date)
        setSupplierGST(mainData[0].data.supplier.is_gst);
        setCreatedAt(mainData[0].data.order_date)
        setCompanyId(mainData[0].company.company_id);
        setSupplier(mainData[0].data.supplier.id);
        setIsGST(mainData[0].data.gst_percent);
        setOutletId(mainData[0].data.outlet.id);
        const inserter = data;
        supplier.length = 0;
        for (var i = 0; i < inserter.length; i++) {
            supplier.push({
                title: parseInt(i + 1),
                image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                name: inserter[i].name,
                code: inserter[i].item_code,
                quantity: inserter[i].quantity,
                price: inserter[i].rate,
                total: inserter[i].total,
                unit: inserter[i].unit,
            });
        }
        setAllData(supplier)
    }

    const setMainDataFunction1 = () => {
        supplier.length = 0;
        // setTotalAmount(mainData[0].data.subtotal)
        // setReceivedAmount(mainData[0].data.total)
        // setTaxAmount(mainData[0].data.gst_amount)
        var inserter = mainData[0].data.order_details;
        setSupplierGST(mainData[0].data.supplier.is_gst);
        setCreatedAt(mainData[0].data.order_date)
        setCompanyId(mainData[0].company.company_id);
        setSupplier(mainData[0].data.supplier.id);
        setIsGST(mainData[0].data.gst_percent);
        setOutletId(mainData[0].data.outlet.id);

        var invno = global.Invoice_No;
        var id = mainData[0].data.transaction_id;
        var dataSetter = setMainResult.bind(this);
        PendingData(id,dataSetter);
    }

    const setMainResult = (data) => {
        var datas = data.data;
        var inserter = datas;
        for (var i = 0; i < inserter.length; i++) {

            supplier.push({
                title: parseInt(i + 1),
                image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                name: inserter[i].name,
                code: inserter[i].product_code,
                quantity: inserter[i].quantity,
                price: inserter[i].price,
                total: inserter[i].total,
                unit: inserter[i].unit,
                pid: inserter[i].id
            });
        }
        setAllData(supplier)
    }

    const getPermissionImageAsync = async () => {
        
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }else {
            selectInvoiceImageFunction();
          }
        
      };
 
    const selectInvoiceImageFunction = async() => {
            try {
              let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
              });
              if (!result.cancelled) {
                setLocalImage(result.uri);
                var image = result.uri;
                var invNo = getInvoiceNumber;
                var dataResult = setUploadResult.bind(this);
                ImageUploader(image,invNo,dataResult);
                setTexter('Uploading...');
              }
        
            } catch (E) {
              console.log(E);
            }
    };

    const setUploadResult = (data) => {
        if(data != 'error') {
            setTexter('Uploaded Successfully.');
        } else {
            setTexter('Please try again.');
        }
    }
        

    const getQuantityData = data => {
        var quantity = data[0].quantity;
        var serielnumber = data[0].seriel - 1;
        var price = getAllData[serielnumber].price;

        if (data[0].action === 'INCREMENT') {
            var total = getReceivedAmount + price;
            supplier[serielnumber].total = parseFloat(price*quantity);
            supplier[serielnumber].quantity = data[0].quantity;
            setAllData(supplier);
            setTotalAmount(parseFloat(getTotalAmount+price));
            if (getSupplierGST === 0) {
                setReceivedAmount(getTotalAmount+getTaxAmount);
            } else {
                const GST = parseFloat((Number(price) * (Number(7) / 100)))
                var taxer = parseFloat(getTaxAmount + GST);
                setTaxAmount(taxer);
                var totaler=getTotalAmount+price;
                setReceivedAmount(totaler+taxer);
            }
        } else {
            var totalDecrement = getReceivedAmount - price;
            var priceAmount = getTotalAmount - price;
            supplier[serielnumber].total = parseFloat(price*quantity);
            supplier[serielnumber].quantity = data[0].quantity;
            setAllData(supplier);
            setTotalAmount(parseFloat(getTotalAmount-price));
            if (getSupplierGST === 0) {
                setReceivedAmount(getTotalAmount-getTaxAmount);
            } else {
                const GST = parseFloat((Number(price) * (Number(7) / 100)))
                var taxer = parseFloat(getTaxAmount - GST);
                setTaxAmount(taxer);
                var totaler=getTotalAmount-price;
                setReceivedAmount(totaler+taxer);
            }

        }
    };

    //EditInvoice

    const submitEditDatasFunctionInvoice =()=> {
        setSubmitText1('Loading...');
        if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText1('Receive Order');
        }else {
            var inserter = mainData[0].data.order_details;
            mainDataResult.length = 0;
            for (var i = 0; i < inserter.length; i++) {
                var transId = mainData[0].data.transaction_id
                var cmpid = getCompanyId
                var outid = getOutletId
                var pid = inserter[i].product_id
                var quantity = getAllData[i].quantity
                var rate = getAllData[i].price
                var createdat = getCreatedAt
                var supplier = getSupplier
                var receivedat = getDeliveryDate
                var invoiceno = getInvoiceNumber
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = null
                var isgst = getIsGST
                var isdownload = 'none'

                mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload })
           }
            var datas = setReceiveResultInvoive.bind(this);
            EditInvoice(mainDataResult,datas);
        }
    }


    const setReceiveResultInvoive = (data) => {
        setSubmitText1('Update');
        if(data === "Success") {
            alert('Order received...');
            global.refresher = 'Yes';
            props.navigation.navigate('Home');
        }
    }


    const submitEditDatasFunction =()=> {
        setSubmitText1('Loading...');
        if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText1('Receive Order');
        }else {
            var inserter = mainData[0].data.order_details;
            mainDataResult.length = 0;
            for (var i = 0; i < inserter.length; i++) {
                var transId = mainData[0].data.transaction_id
                var cmpid = getCompanyId
                var outid = getOutletId
                var pid = inserter[i].product_id
                var quantity = getAllData[i].quantity
                var rate = getAllData[i].price
                var createdat = getCreatedAt
                var supplier = getSupplier
                var receivedat = getDeliveryDate
                var invoiceno = getInvoiceNumber
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = null
                var isgst = getIsGST
                var isdownload = 'none'

                mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload, amountPaid: getPayment })
           }
            var datas = setReceiveResult1.bind(this);
            ReceiveOrderFunctionEdit(mainDataResult,datas);
        }
    }


    const submitSetter = () => {
        if(global.orderTitle === "Receive Orders") {
            AddOrderFunction()
        }else {
            submitDatasFunction()
        }
    }

    const submitDatasFunction =()=> {
        setSubmitText('Loading...');
        if(getInvoiceNumber === 0) {
            alert('Please enter invoice number..')
            setSubmitText('Receive Order');
        }else if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText('Receive Order');
        }else {
            var inserter = mainData[0].data.order_details;
            mainDataResult.length = 0;
            for (var i = 0; i < inserter.length; i++) {
                var transId = mainData[0].data.transaction_id
                var cmpid = getCompanyId
                var outid = getOutletId
                var pid = inserter[i].product_id
                var quantity = getAllData[i].quantity
                var rate = getAllData[i].price
                var createdat = getCreatedAt
                var supplier = getSupplier
                var receivedat = getDeliveryDate
                var invoiceno = getInvoiceNumber
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = null
                var isgst = getIsGST
                var isdownload = 'none'

                mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload })
           }
            var datas = setReceiveResult.bind(this);
            //ReceiveOrderFunction(mainDataResult,datas);
            ApproveOrder(mainDataResult,datas)

        }
        
    }

    const AddOrderFunction =()=> {
        setSubmitText('Loading...');
        if(getInvoiceNumber === 0) {
            alert('Please enter invoice number..')
            setSubmitText('Receive Order');
        }else if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText('Receive Order');
        }else {
            var inserter = getAllData;
            mainDataResult.length = 0;
            for (var i = 0; i < inserter.length; i++) {
                var transId = mainData[0].data.transaction_id
                var cmpid = getCompanyId
                var outid = getOutletId
                var pid = getAllData[i].pid
                var quantity = getAllData[i].quantity
                var rate = getAllData[i].price
                var createdat = getCreatedAt
                var supplier = getSupplier
                var receivedat = getDeliveryDate
                var invoiceno = getInvoiceNumber
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = null
                var isgst = getIsGST
                var isdownload = 'none'

                mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload })
           }

            var datas = setReceiveResult.bind(this);
            //ReceiveOrderFunction(mainDataResult,datas);
            ApproveOrder(mainDataResult,datas)

        }
        
    }

    const setReceiveResult = (data) => {
        setSubmitText('Receive Order');
        if(data === 'Success') {
            global.refresher = 'Yes';
            props.navigation.navigate('Home')
        }
    }

    const setReceiveResult1 = (data) => {
        setSubmitText1('Update');
        if(data === "Success") {
            alert('Order received...');
            global.refresher = 'Yes';
            props.navigation.navigate('Home');
        }
    }

    const AddNewOrderFunction = () => {
        var inserter = finalShowData;
        mainDataResult.length = 0;
        var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
        for (var i = 0; i < inserter.length; i++) {
            var transId = "MID_"+moment().format("DD")+"_"+RandomNumber;
            var cmpid = getCompanyId
            var outid = getOutletId
            var pid = getAllData[i].product_id
            var quantity = getAllData[i].quantity
            var rate = getAllData[i].price
            var createdat = 'getCreatedAt' //----
            var supplier = global.supplierId //-------
            var receivedat = finalData //=======
            var invoiceno = getInvoiceNumber
            var amount = getTotalAmount
            var taxamount = getTaxAmount
            var totalamount = getReceivedAmount
            var receivedimg = null
            var isgst = getIsGST // -----------
            var isdownload = 'none'

            mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload })
       }
        var datas = setReceiveResultAddNewOrder.bind(this);
        ReceiveOrderFunctionNewOrder(mainDataResult,datas);
    
}

const setReceiveResultAddNewOrder = (data) => {
if(data === 'success') {
  global.refresher = 'Yes';
  alert('Order placed successfully!');
  props.navigation.navigate('Home');
}else {
  alert('oops! something went wrong.')
}
}

    const getBottomSlider = () => {
        return (
            <BottomSheet
                ref={bs}
                snapPoints={[75, 280, 280]}
                initialSnap={0}
                enabledManualSnapping={true}
                renderContent={renderContent}
                renderHeader={renderHeader}
            />
        )
    }

    const renderHeader = () => {
        return (
           <View>
               {global.orderTitle === "Edit Order" ? (
                   renderEditOrder()
               ) : (
                    renderReceive()
               )}
           </View>
        )
    }

    const renderEditOrder = () => {
        return (
            <View>
            <View style={styles.bottomHeader}>
                <View style={{ width: Dimensions.get('window').width > 500 ? 75 : 50, height: 2, backgroundColor: Theme.GRAY }} />
            </View>
            <View style={{ width: '100%', height: 50, backgroundColor: Theme.SECONDARY, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={styles.totalText}>${getTotalAmount}</Text>
            </View>
            <View>
                
            {getEditableDatas1()}
            </View>

<View style={{backgroundColor:'#ecf0f1'}}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={styles.headingText}>Amount</Text>
                    <View style={{overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTotalAmount}</Text>
                    </View>
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={styles.headingText}>Tax Amount</Text>
                    <View style={{overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTaxAmount}</Text>
                    </View>

                </View>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={styles.headingText}>Received Amount</Text>
                    <View style={{overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getReceivedAmount}</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={{flexDirection:'row'}}>
                        <Checkbox 
                        handle={data=>setPayment(data)} />
                        <Text style={styles.headingText}>  {getPayment === 0 ? "No" : "Yes"}</Text>
                    </TouchableOpacity>

            </View>
                {bottomButton1()}
        </View>
        </View>
        )
    }

    const renderReceive = () => {
        return (
            <View style={{backgroundColor:'#ecf0f1'}} >
            <View style={styles.bottomHeader}>
                <View style={{ width: Dimensions.get('window').width > 500 ? 75 : 50, height: 2, backgroundColor: Theme.GRAY }} />
            </View>
            <View style={{ width: '100%', height: 50, backgroundColor: Theme.SECONDARY, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={styles.totalText}>${getTotalAmount}</Text>
            </View>
            <View>
                
            {getEditableDatas()}
            </View>

<View style={{backgroundColor:'#ecf0f1'}}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={styles.headingText}>Amount</Text>
                    <View style={{width:75,height:15,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTotalAmount}</Text>
                    </View>
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={styles.headingText}>Tax Amount</Text>
                    <View style={{width:75,height:15,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTaxAmount}</Text>
                    </View>

                </View>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={styles.headingText}>Received Amount</Text>
                    <View style={{width:75,height:15,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getReceivedAmount}</Text>
                    </View>
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', }}>
                    <Text style={[styles.headingText]}>Amount Paid</Text>
                    <TouchableOpacity activeOpacity={0.9} style={{flexDirection:'row'}}>
                        <Checkbox 
                        handle={data=>setPayment(data)} />
                        <Text style={styles.headingText}>  {getPayment === 0 ? "No" : "Yes"}</Text>
                    </TouchableOpacity>
                </View>

            </View>
                {bottomButton()}
        </View>
        </View>
        )
    }

    const setDateFunction = (data) => {
        var result = data;
        var resulter = (result[6]+result[7]+result[8]+result[9]+'-'+result[3]+result[4]+'-'+result[0]+result[1]);
        setDeliveryDate(resulter);
        SetDeliveryShowDate(data);
        //result[6]+result[7]+result[8]+result[9]
    }

    const renderDate = () => {
        var year = Number(moment().format("YYYY"))+Number(2);
        return (
                <Date
                    style={{ width: '95%', height: 40 }}
                    date={getDeliveryShoaDate}
                    format={"YYYY-MM-DD"}
                    minDate={moment().format("YYYY-MM-DD")}
                    maxDate={year+'-'+moment().format("MM-DD")}
                    //handle={date => setDeliveryDate(date)}
                    handle={date => setDateFunction(date)}
                    placeholder="dd/mm/yyyy"
                />
        )
    }

    const getEditableDatas = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, paddingBottom: 5, borderBottomColor: Theme.GRAY }}>
                <View style={{ width: '50%', paddingLeft: '5%' }}>
                    <Text style={styles.headingText}>Invoice number</Text>
                    <Input
                        handle={data => setInvoiceNumber(data)}
                        style={{ width: '94%', height: 40, borderWidth: 0.5, borderRadius: 5, paddingLeft: 8, marginVertical: 5 }}
                        placeholder="Enter Invoice Number" />
                </View>
                <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={styles.headingText}>Date</Text>
                    {renderDate()}
                </View>
            </View>
        )
    }

    const getEditableDatas1 = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.5, paddingBottom: 5, borderBottomColor: Theme.GRAY }}>
               
                <View style={{ width: '75%', alignItems: 'center', justifyContent: 'center',alignSelf:'center' }}>
                    <Text style={styles.headingText}>Date</Text>
                    {renderDate()}
                </View>
            </View>
        )
    }

    const bottomButton = () => {
        return(
            <View style={{ width: '100%',height:45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity onPress={getPermissionImageAsync} style={{ width: '50%', flexDirection: 'row', paddingLeft: '5%', alignItems:'center' }}>
                        {getLocalImage === null ? (
                        <Icon name="camera" size={Dimensions.get('window').width > 500 ? 30 : 20} />
                        ) : (
                        <Image source={{uri: getLocalImage}} style={{width:30,height:30,borderRadius:5,marginRight:5}} />
                        )}
                        <Text style={styles.headingTextcamera}>   {getTexter}</Text>
                    </TouchableOpacity>
                    {global.orderTitle === "Edit Orders" ? (
                        <Button 
                            title={getSubmitText1} 
                            handle={submitEditDatasFunction} 
                            style={styles.receiveButton} />
                    ) : global.orderTitle === "Add New Order" ? (
                        <Button 
                            title={getSubmitText} 
                            handle={AddNewOrderFunction} 
                            style={styles.receiveButton} />
                    ) : (
                        <Button 
                            title={getSubmitText} 
                            handle={submitSetter} 
                            style={styles.receiveButton} />
                    )}
                </View>
        )
    }

    const bottomButton1 = () => {
        return(
            <View style={{ width: '100%',height:45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                   
                {global.orderTitle === "Edit Order" ? (
                <Button 
                        title={getSubmitText1} 
                        handle={submitEditDatasFunctionInvoice} 
                        style={styles.receiveButton} />
                    ) : (
                <Button 
                    title="Receive Order" 
                    handle={submitEditDatasFunction} 
                    style={styles.receiveButton} />
                    )}
                </View>
        )
    }

    const renderContent = () => {
        return (
            <View style={{backgroundColor:'#ecf0f1'}}>
                
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Header
                    titlestyle={{ fontSize: 16, fontWeight: '500' }}
                    elevation={0}
                    handle={() => props.navigation.goBack(null)}
                    image="icon"
                    title={global.orderTitle}>
                    {global.orderTitle === "Add New Order" ? (
                    <View style={{ width: '100%', padding: 5, alignItems: 'center', justifyContent: 'center', }}>
                        <Selector
                            handle={data => setTopSupplierFunction(data)}
                            style={{backgroundColor:'#FFFF'}}
                            value={getDefaultSupplier}
                            item={getAllSuppliers}
                            />
                    </View>
                    ) : (
                    <View style={{ width: '100%', padding: 5, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontWeight: '600', padding: 5 }}>Order Date: {mainData[0].data.order_date}</Text>
                        <Text style={{ fontWeight: '600', padding: 5 }}>Order Id: {mainData[0].data.transaction_id}</Text>
                    </View>
                    )}
                </Header>
                <Heading datas={data} length={7} />
                <ScrollView horizontal={true} >
                    <ListView
                        quantitys={10}
                        handle={data => getQuantityData(data)}
                        style={{ backgroundColor: Theme.BACK }}
                        datas={getAllData}
                    />
                </ScrollView>
            </View>
            {getBottomSlider()}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    bottomHeader: {
        width: '100%',
        height: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Theme.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').width > 500 ? 22 : 13
    },
    receiveButton: {
        width: Dimensions.get('window').width > 500 ? '45%' : '45%',
        marginRight: Dimensions.get('window').width > 500 ? '5%' : '3%'
    },
    headingTextcamera: {
        fontSize: Dimensions.get('screen').width > 500 ? 14 : 10
    }
});



export default LinksScreen;