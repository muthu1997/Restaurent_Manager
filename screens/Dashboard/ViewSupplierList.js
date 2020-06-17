import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    CameraRoll,
    AsyncStorage,
    ActivityIndicator,
    KeyboardAvoidingView,
    CheckBox,
    Text,
    Alert,
} from 'react-native';
import {
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
import Modal from 'react-native-modal';
import { Camera } from 'expo-camera';

const mainDataResult = [];
const AllSupplierDetails = [];

const data = [
    { id:'S.No', code: 'Name',  quantity: 'Qty', price: 'Price', unit: "Total",total:'Unit' },
  ];

const supplier = [];
const supplierPicker = [];
const supplierNameForOrder = [];
const tempPrice = [];

const LinksScreen = props => {
    const bs = React.createRef();

    const mainData = global.viewInvoice;
    const [getAllData, setAllData] = useState([]);
    const [getMail, setMail] = useState(null);

    const [getTotalAmount, setTotalAmount] = useState(0);
    const [getTaxAmount, setTaxAmount] = useState(0);
    const [getReceivedAmount, setReceivedAmount] = useState(0);
    const [getInvoiceNumber, setInvoiceNumber] = useState(0);
    const [getDeliveryDate, setDeliveryDate] = useState(null);
    const [getDeliveryShoaDate, SetDeliveryShowDate] = useState();
    const [getTextInput, setTextInput] = useState();
    const [getEdit, setEdit] = useState();
    const [getTempPId, setTempPId] = useState(null);
    const [getLoader, setLoader] = useState(true);

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [getCameraModel, setCameraModel] = useState(false)

    const [getSupplierGST, setSupplierGST] = useState(0);
    const [getOutletId, setOutletId] = useState(null);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getCreatedAt, setCreatedAt] = useState(null);
    const [getSupplier, setSupplier] = useState(null);
    const [getDefaultSupplier, setDefaultSupplier] = useState(null);
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getIsGST, setIsGST] = useState(null);
    const [getPayment, setPayment] = useState(0);
    const [getCompany, setCompany] = useState(null);

    const [getLocalImage, setLocalImage] = useState(null);
    const [getTexter, setTexter] = useState('Capture');
    const [getSubmitText, setSubmitText] = useState('Receive Order');
    const [getSubmitText1, setSubmitText1] = useState('Update');
    const [getUpload,setUpload] = useState(false);
    const [getInvoicePrefix, setInvoicePrefix] = useState(null);
    const [getSubmitImage, setSubmitImage] = useState(null);
    const [getIncrementer, setIncrementer] = useState(0)

    const Track_Id = global.Track_Id;

    useEffect(() => {

        setCameraModel(false)
        AsyncStorage.getItem('Email').then(data => {
            if(data) {
               setMail(data);
            }
        })
        AsyncStorage.getItem('Company_Name')
        .then(data => {
            if(data) {
                setCompany(data);
            }
        })
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

          AsyncStorage.getItem('Edit')
        .then(data => {
          if(data === 1) {
            setEdit('No');
          }else {
            setEdit('Yes');
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
        setLoader(false)
    }, [])
 
      const awakeCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if(status === 'granted') {
            setCameraModel(true);
        }else {
            alert('No permission for camera.')
        }  
      }

    const setMainDataFunction = () => {
        supplier.length = 0;

        var result = global.receiveDeliveryDate;
        var resulter = (result[6]+result[7]+result[8]+result[9]+'-'+result[3]+result[4]+'-'+result[0]+result[1]);
        
        getInvoiceNumberFunction(); 
        setTotalAmount(mainData[0].data.subtotal)
        setReceivedAmount(parseFloat(mainData[0].data.total).toFixed(2))
        setTaxAmount(parseFloat(mainData[0].data.gst_amount).toFixed(2))
        setDeliveryDate(resulter)
        SetDeliveryShowDate(global.receiveDeliveryDate)
        var inserter = mainData[0].data.order_details;
        setSupplierGST(mainData[0].data.supplier.is_gst);
        setCreatedAt(mainData[0].data.order_date)
        setCompanyId(mainData[0].company.company_id);
        setSupplier(mainData[0].data.supplier.id); 
        setIsGST(mainData[0].data.gst_percent);
        setOutletId(mainData[0].data.outlet.id);
        setInvoicePrefix(mainData[0].data.supplier.invoice_prefix);
        console.log('Global'+global.invoiceStatusForReceiveOrder)
        if(global.orderTitle === "Edit Order") {
            fetch('http://erp.middlemen.asia/api/edit/line/receive/'+getMail+'/'+mainData[0].data.transaction_id,{
                method:'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(responseJson => {
                console.log('responseJson')
                console.log(responseJson)
                for (var i = 0; i < responseJson.length; i++) {
                    supplier.push({
                        id:parseInt(i + 1),
                        title: parseInt(i + 1),
                        image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                        name: responseJson[i].name,
                        code: responseJson[i].item_code,
                        pid: responseJson[i].id,
                        quantity: parseInt(responseJson[i].quantity),
                        price:parseFloat(responseJson[i].price).toFixed(2),
                        total: responseJson[i].total,
                        unit: responseJson[i].unit,
                        status: parseInt(responseJson[i].quantity) === 0 ? 'Yes' : 'No',
                        customer_id: responseJson[i].customer_id, 
                        customer_shippingid: responseJson[i].customer_shippingid,
                        due_type: responseJson[i].due_type,
                        email_track_code: responseJson[i].email_track_code,
                        gst_type: responseJson[i].gst_type,
                        is_gst: responseJson[i].is_gst,
                        item_id: responseJson[i].item_id,

                    });
                }
                setAllData(supplier)
            })
            .catch(err => console.log(err))

        }else if(global.invoiceStatusForReceiveOrder === 1) {
            var dataInvoice = global.invoiceProducts;
           
            for (var i = 0; i < dataInvoice.length; i++) {
                
                
                supplier.push({
                    id:parseInt(i + 1),
                    title: parseInt(i + 1),
                    image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                    name: dataInvoice[i].name,
                    code: dataInvoice[i].item_code,
                    quantity: dataInvoice[i].quantity,
                    price: parseFloat(dataInvoice[i].rate).toFixed(2),
                    total: parseFloat(dataInvoice[i].rate * dataInvoice[i].quantity),
                    unit: dataInvoice[i].unit,
                });
            }
            setAllData(supplier)
        
        }else {

                for (var i = 0; i < inserter.length; i++) {
                    supplier.push({
                        id:parseInt(i + 1),
                        title: parseInt(i + 1),
                        image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                        name: inserter[i].product_name,
                        code: inserter[i].item_code,
                        quantity: inserter[i].quantity,
                        price: parseFloat(inserter[i].rate).toFixed(2),
                        total: inserter[i].total,
                        unit: inserter[i].unit,
                    });
                
            }

           

        //     for (var i = 0; i < productsAvailable.length; i++) {
        //     if(productsAvailable[i].name === inserter[i].product_name) {
        //         editorderProduct.push({
        //             id:parseInt(i + 1),
        //             title: parseInt(i + 1),
        //             image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
        //             name: inserter[i].product_name,
        //             code: inserter[i].item_code,
        //             quantity: inserter[i].quantity,
        //             price: inserter[i].rate,
        //             total: parseFloat(inserter[i].rate * inserter[i].quantity),
        //             unit: inserter[i].unit,
        //         })
        //     }
        // }
            setAllData(supplier)
         }
    }


    const setEditSunReportFunction = () => {
        // getInvoiceNumberFunction();
        AsyncStorage.getItem('Email').then(data => {
            if(data) {
               setMail(data);
           
        var id = mainData[0].data.transaction_id;
        fetch('https://erp.middlemen.asia/api/viewLineReceiveOrdernew/'+data+'?transaction_id='+global.Track_Id,{
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
        })
    }

    const getInvoiceNumberFunction = () => {
        var id = mainData[0].data.transaction_id;
        fetch('http://erp.middlemen.asia/Newapp/getInvoiceNumber.php',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tno: mainData[0].data.transaction_id,
                code: 1
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(responseJson != 'No data found.') {
                setInvoiceNumber(responseJson)
            }
        })
        .catch(err => {
            console.log(err)
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
                    id: i+1,
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
        setTotalAmount(parseFloat(data.data.subtotal))
        setReceivedAmount(parseFloat(data.data.total))
        setTaxAmount(parseFloat(data.data.gst_amount))
        setDeliveryDate(data.data.received_date)
        SetDeliveryShowDate(moment(data.data.received_date).format('DD-MM-YYYY'))
        setSupplierGST(mainData[0].data.supplier.is_gst);
        setCreatedAt(mainData[0].data.order_date)
        setCompanyId(mainData[0].company.company_id);
        setSupplier(mainData[0].data.supplier.id);
        setIsGST(mainData[0].data.gst_percent);
        setOutletId(mainData[0].data.outlet.id);
        setInvoiceNumber(data.data.invoice_no)
        const inserter = data.data.order_details;
        supplier.length = 0;
        for (var i = 0; i < inserter.length; i++) {
            supplier.push({
                id: i+1,
                title: parseInt(i + 1),
                image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                name: inserter[i].product_name,
                code: inserter[i].item_code,
                quantity: inserter[i].quantity,
                price: parseFloat(inserter[i].rate).toFixed(3),
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
        setSupplierGST(global.isGST);
        setCreatedAt(global.created)
        setCompanyId(global.cid);
        setSupplier(global.supplierId);
        setOutletId(global.outlet_id);

        var invno = global.Invoice_No;
        var id = global.Track_Id;
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
                price: parseFloat(inserter[i].rate).toFixed(3),
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
                quality: 0.3,
                base64: true,
              });
              if (!result.cancelled) {
                setLocalImage(result.uri);
                var image = result.uri;
                var path = getCompany;
                var invNo = getInvoicePrefix+getInvoiceNumber+'_'+mainData[0].data.transaction_id;
                setSubmitImage(invNo+'.jpg')
                var dataResult = setUploadResult.bind(this); 
                ImageUploader(image,invNo,path,dataResult);
                setTexter('Uploading..');
              }
              //CameraRoll.saveToCameraRoll(getLocalImage)
        
            } catch (E) { 
              console.log(E);
            }
    };

    const setUploadResult = (data) => {
        //console.log(data)
        if(data != 'error') {
            setTexter('Uploaded Successfully.');
            setUpload(true);
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
            supplier[serielnumber].total = price*quantity;
            supplier[serielnumber].quantity = data[0].quantity;
            setAllData(supplier);
            var totalAmount = parseFloat(getTotalAmount)+parseFloat(price);
            setTotalAmount(parseFloat(totalAmount).toFixed(2));
            if (getSupplierGST === 0) {
                var nogstresult = parseFloat(getTotalAmount)+parseFloat(price);
                setReceivedAmount(parseFloat(nogstresult).toFixed(2));
            } else {
                const GST = parseFloat(price * 7 / 100).toFixed(2)
                var taxer = parseFloat(getTaxAmount) + parseFloat(GST);
                setTaxAmount(parseFloat(taxer).toFixed(2));
                var totaler=parseFloat(getTotalAmount)+parseFloat(price);
                setReceivedAmount(parseFloat(totaler+taxer).toFixed(2));
            }
        } else {
            var totalDecrement = getReceivedAmount - price;
            var priceAmount = getTotalAmount - price;
            supplier[serielnumber].total = parseFloat(price*quantity);
            supplier[serielnumber].quantity = data[0].quantity;
            setAllData(supplier);
            var totalAmount = parseFloat(getTotalAmount)-parseFloat(price);
            setTotalAmount(parseFloat(totalAmount).toFixed(2));
            if (getSupplierGST === 0) {
                setReceivedAmount(parseFloat(getTotalAmount-price).toFixed(2));
            } else {
                const GST = parseFloat((Number(price) * (Number(7) / 100))).toFixed(2)
                var taxer = parseFloat((getTaxAmount - GST).toFixed(2));
                setTaxAmount(parseFloat(taxer).toFixed(2));
                var totaler=getTotalAmount-price;
                setReceivedAmount(parseFloat(totaler+taxer).toFixed(2));
            }

        }
    };

    //EditInvoice

    const submitEditDatasFunctionInvoice =()=> {
        setSubmitText1('Loading...');
        var dummyProduct = [];
        dummyProduct.length = 0;

        var result = getDeliveryDate;
        var resulter = (result[6]+result[7]+result[8]+result[9]+'-'+result[3]+result[4]+'-'+result[0]+result[1]);
        if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText1('Update');
        }else {
            var inserter = mainData[0].data.order_details;
            mainDataResult.length = 0;
            for (var i = 0; i < getAllData.length; i++) {
                if(getAllData[i].status === 'No' && getAllData[i].quantity > 0 || getAllData[i].status === 'No' && getAllData[i].quantity === 0 || getAllData[i].status === 'Yes' && getAllData[i].quantity > 0) {
                var transId = mainData[0].data.transaction_id
                var cmpid = getCompanyId
                var outid = getOutletId
                var pid = getAllData[i].pid
                var quantity = getAllData[i].quantity;
                var rate = getAllData[i].price
                var createdat = getCreatedAt
                var supplier = getSupplier
                var receivedat = getDeliveryDate
                var invoiceno = getInvoiceNumber
                var prodtotal = getAllData[i].total
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = getSubmitImage
                var isgst = getIsGST
                var isdownload = 'none'
                var status = getAllData[i].status
                var customer_id = getAllData[i].customer_id
                var customer_shippingid = getAllData[i].customer_shippingid
                var due_type = getAllData[i].due_type
                var email_track_code = getAllData[i].email_track_code
                var gst_type = getAllData[i].gst_type
                var is_gst = getAllData[i].is_gst
                var item_id = getAllData[i].item_id

                mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload,status:status,prodtotal:prodtotal, customer_id:customer_id,customer_shippingid:customer_shippingid,due_type:due_type,email_track_code:email_track_code,gst_type:gst_type,is_gst:is_gst,item_id:item_id })
                }
           }

           console.log(mainDataResult)
        //    var datas = setReceiveResultInvoive.bind(this);
        //    EditInvoice(mainDataResult,datas);
        }
    }

    const setReceiveResultInvoive = (data) => {
        setSubmitText1('Update');
        // alert(JSON.stringify(data))
        console.log(data)
        if(data === "Success") {
            alert('Order updated');
            global.refresher = 'Yes';
            global.sunRefresh = 'Yes';
            props.navigation.navigate('Home');
        }
    }


    const submitEditDatasFunction =()=> {
        setSubmitText1('Loading...');
        if(getDeliveryDate === null) {
            setSubmitText1('Receive Order');
        }else { 
            var result = getDeliveryDate;
            var resulter = (result[6]+result[7]+result[8]+result[9]+'-'+result[3]+result[4]+'-'+result[0]+result[1]);
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
                var receivedat = resulter
                var invoiceno = getInvoiceNumber
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = getSubmitImage
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
            alert('Please enter invoice number.')
            setSubmitText('Receive Order');
        }else if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText('Receive Order');
        }else if(getUpload != true) {
            alert('Please upload invoice image..')
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
                var receivedimg = getSubmitImage
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
        var result = getDeliveryDate;
        var resulter = (result[6]+result[7]+result[8]+result[9]+'-'+result[3]+result[4]+'-'+result[0]+result[1]);
        if(getInvoiceNumber === 0) {
            alert(moment(getDeliveryDate).format('YYYY-MM-DD'))
            alert('Please enter invoice number..')
            setSubmitText('Receive Order');
        }else if(getDeliveryDate === null) {
            alert('Please select delivery date..')
            setSubmitText('Receive Order');
        }else  {
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
                var receivedat = resulter
                var invoiceno = getInvoiceNumber
                var amount = getTotalAmount
                var taxamount = getTaxAmount
                var totalamount = getReceivedAmount
                var receivedimg = getSubmitImage
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
            alert('Order received.')
            global.refresher = 'Yes';
            global.sunRefresh = 'Yes';
            props.navigation.navigate('Home')
        }
    }

    const setReceiveResult1 = (data) => {
        setSubmitText1('Update');
        if(data === "Success") {
            alert('Order received...');
            global.refresher = 'Yes';
            global.sunRefresh = 'Yes';
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
            var receivedimg = getSubmitImage
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
  global.sunRefresh = 'Yes';
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
                snapPoints={[75, 300, 300]}
                initialSnap={0}
                enabledManualSnapping={true}
                renderContent={renderContent}
                renderHeader={renderHeader}
            />
        )
    }

    const renderHeader = () => {
        return (
           <View style={{}}>
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
            <View style={{ width: '100%', flexDirection: 'row',padding:5, alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%' }}>
                    <Text style={styles.headingText}>Amount</Text>
                    <View >
                    <Text style={styles.totalText}>{getTotalAmount}</Text>
                    </View>
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', flexDirection:'row' }}>
                    <View style={{width:'90%',height:'100%'}}>
                    <Text style={styles.headingText}>Tax Amount</Text>
                    <View style={{width:75,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTaxAmount}</Text>
                    </View>
                    </View>

                </View>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', }}> 
                    <Text style={styles.headingText}>Received Amount</Text>
                    <View >
                    <Text style={styles.totalText}>{getReceivedAmount}</Text>
                    </View>
                </View>

                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', }}>
                    <Text style={[styles.headingText]}>Amount Paid</Text>
                    <TouchableOpacity activeOpacity={0.9} style={{flexDirection:'row'}}>
                        <Checkbox 
                        handle={data=>setPayment(data)} />
                        <Text style={styles.totalText}>  {getPayment === 0 ? "No" : "Yes"}</Text>
                    </TouchableOpacity>
                </View>

            </View>
                {bottomButton1()}
        </View>
        </View>
        )
    }

    const incrementerFunction = () => {
        if(getIncrementer <= 9) {
            setIncrementer(getIncrementer+1)
            var resultTax = parseFloat(getTaxAmount)+parseFloat(0.01)
            var resultTotal = parseFloat(getReceivedAmount)+parseFloat(0.01)
            setTaxAmount(parseFloat(resultTax).toFixed(2))
            setReceivedAmount(parseFloat(resultTotal).toFixed(2))
        }
        console.log(getIncrementer)
    }

    const decrementerFunction = () => {
        if(getIncrementer >= -9) {
            setIncrementer(getIncrementer-1)
            var resultTax = parseFloat(getTaxAmount)-parseFloat(0.01)
            var resultTotal = parseFloat(getReceivedAmount)-parseFloat(0.01)
            setTaxAmount(parseFloat(resultTax).toFixed(2))
            setReceivedAmount(parseFloat(resultTotal).toFixed(2))
        }
        console.log(getIncrementer)
    }

    const renderIncrementer = () => {
        return(
            <View style={{width:15}}>
                <TouchableOpacity onPress={incrementerFunction} style={[styles.incrementer,{paddingTop:4}]}>
                    <Icon name="sort-up" size={10} />
                </TouchableOpacity>
                <TouchableOpacity onPress={decrementerFunction} style={[styles.incrementer,{paddingBottom:4}]}>
                    <Icon name="sort-desc" size={10} />
                </TouchableOpacity>
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
        <Text style={styles.totalText}>${getTotalAmount} {BottomSheet.initialSnap}</Text>
            </View>
            <View style={{flex:1}}>
            {getEditableDatas()}
            </View>

<View style={{backgroundColor:'#ecf0f1'}}>
            <View style={{ width: '100%', flexDirection: 'row',padding:5, alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', }}>
                    <Text style={styles.headingText}>Amount</Text>
                    <View style={{width:75,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTotalAmount}</Text>
                    </View>
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', flexDirection:'row' }}>
                    <View style={{width:'90%',height:'100%'}}>
                    <Text style={styles.headingText}>Tax Amount</Text>
                    <View style={{width:75,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getTaxAmount}</Text>
                    </View>
                    </View>
                    {getTaxAmount != 0 ? (
                    <View style={{alignItems: 'center',justifyContent: 'center',}}>
                        {renderIncrementer()}
                    </View>
                    ) : null }
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', }}>
                    <Text style={styles.headingText}>Received Amount</Text>
                    <View style={{width:75,overflow:'hidden'}}>
                    <Text style={styles.totalText}>{getReceivedAmount}</Text>
                    </View>
                </View>
                <View style={{ width: '25%', paddingLeft: '5%', height:'100%', }}>
                    <Text style={[styles.headingText]}>Amount Paid</Text>
                    <TouchableOpacity activeOpacity={0.9} style={{flexDirection:'row'}}>
                        <Checkbox 
                        handle={data=>setPayment(data)} />
                        <Text style={styles.totalText}>  {getPayment === 0 ? "No" : "Yes"}</Text>
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
        console.log(resulter)
        //result[6]+result[7]+result[8]+result[9]
    } 

    const renderDate = () => {
        var year = Number(moment().format("YYYY"))+Number(2);
        return (
                <Date
                    style={{ width: Dimensions.get('screen').width > 500 ? '80%' : '94%', height: 40 }}
                    date={getDeliveryShoaDate}
                    format={"DD-MM-YYYY"}
                    minDate={moment().format("YYYY-MM-DD")}
                    maxDate={"01-01-2025"}
                    //handle={date => setDeliveryDate(date)}
                    handle={date => setDateFunction(date)}
                    placeholder="dd/mm/yyyy"
                />
        )
    }

    const getEditableDatas = () => {
        return (
            <View style={{ width: '100%', height:'100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, paddingBottom: 5, borderBottomColor: Theme.GRAY }}>
                <View style={{ width: '50%', paddingLeft: '5%' }}>
                    <Text style={styles.headingText}>Invoice number</Text>
                    <View style={{flexDirection:'row',height:40,alignItems:'center',justifyContent:'space-between',borderWidth:0.5,borderColor:Theme.GRAY,borderRadius:6,overFlow:'hidden',paddingLeft:3}}>
                        <Text style={[styles.headingText,{color:Theme.GRAY}]}>{getInvoicePrefix}</Text>
                        <Input
                            value={getInvoiceNumber}
                            handle={data => setInvoiceNumber(data)}
                            style={{ width: Dimensions.get('screen').width > 500 ? '85%' : '80%', height: 40, paddingLeft: 8, marginVertical: 5 }}
                            placeholder="Invoice Number" />
                    </View>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', }}>
                    <Text style={[styles.headingText,{marginLeft:Dimensions.get('screen').width > 500 ? '10%' : '4%'}]}>Date</Text>
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
                    <TouchableOpacity 
                    onPress={getPermissionImageAsync} 
                    //onPress={awakeCamera} 
                    style={{ width: '50%', flexDirection: 'row', paddingLeft: '5%', alignItems:'center' }}>
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
            <View style={{backgroundColor:'#ecf0f1',height:50}}>
                
            </View>
        )
    }
    
      const setInput = (data) => {
          setTempPId(data);
        setTextInput(!getTextInput)
      }

      const setChangePrice = (data) => {
          tempPrice.length=0;
          tempPrice.push(parseInt(data));
      }

      const priceSetter = () => {
          setLoader(true)
          var result = supplier.filter(x=>x.code === getTempPId)
          result[0].price = tempPrice[0];
          setAllData(supplier);
          setLoader(false)
          setTextInput(false)
      }

      const renderModel = () => {
        return(
            <View style={styles.modelContainer}>
                <TextInput
                placeholder="Enter Price"
                style={{width:'80%',height:40,borderBottomWidth:1,borderBottomColor:Theme.PRIMARY,marginVertical:15}}
                onChangeText={data=>setChangePrice(data)} />
                <View style={{width:'100%',flexDirection:'row',justifyContent: 'center',}}>
                <Button 
                    title={"Submit"} 
                    handle={priceSetter} 
                    style={{width:Dimensions.get('screen').width > 500 ? '40%' : '40%',marginHorizontal:10}}  />
                <TouchableOpacity onPress={()=>setTextInput(false)} style={{padding:5,marginVertical:15}}><Text style={{fontSize:15,color:Theme.PRIMARY}}>Cancel</Text></TouchableOpacity>
                </View>
            </View>
        )
    }


    const renderCameraModel = () => {
        <View style={[styles.modelContainer,{height:Dimensions.get('screen').height -30 ,overflow:'hidden'}]}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={ref => {
                setCameraRef(ref) ;
                }}>
                    <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
                    if(cameraRef){
                    let photo = await cameraRef.takePictureAsync();
                    }
                }}></TouchableOpacity>
            </Camera>
        </View>
    }

    const dummyWidth = Dimensions.get('window').width;
    const dummyHeight = Dimensions.get('window').height;
    var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 6 : dummyHeight / 6;
  var mobilelengther = [40,widthers,widthers,widthers,widthers,widthers,widthers]; 
   var tablength = ['10%','40%','20%','20%','10%','10%','10%']
   var lengther = Dimensions.get('screen').width > 500 ? tablength : mobilelengther;
  if(getLoader === true) {
      return(
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
          <ActivityIndicator color={Theme.PRIMARY} size="large" />
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
                            label={'Select Supplier'}
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
                <Heading headerData={Dimensions.get('screen').width > 500 ? 'Tab' : null} datas={data} length={lengther} />
                <ScrollView horizontal={true} style={{marginBottom:75}} > 
                    <ListView
                        quantitys={10}
                        edit={global.editable === "ZERO" ? false : true} 
                        headerData={Dimensions.get('screen').width > 500 ? 'Tab' : null}
                        handle={data => getQuantityData(data)}
                        handleinput={data=>setInput(data)}
                        style={{ backgroundColor: Theme.BACK }}
                        datas={getAllData}
                    />
                </ScrollView>
            </View>
            {getBottomSlider()}


            <Modal
            isVisible={getTextInput}>
            {renderModel()}
            </Modal>

            <Modal
            isVisible={getCameraModel}>
            {renderCameraModel()}
            </Modal>
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
        borderTopLeftRadius: 150,
        borderTopRightRadius: 150,
        backgroundColor: Theme.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').width > 500 ? 18 : 13,
    },
    headingText: {
        fontSize: Dimensions.get('window').width > 500 ? 14 : 10,
    },
    receiveButton: {
        width: Dimensions.get('window').width > 500 ? '45%' : '45%',
        marginRight: Dimensions.get('window').width > 500 ? '5%' : '3%'
    },
    headingTextcamera: {
        fontSize: Dimensions.get('screen').width > 500 ? 14 : 10
    },
    modelContainer: {
        width: Dimensions.get('screen').width > 500 ? '50%' : '80%',
        padding:5,
        borderRadius:10,
        backgroundColor:Theme.WHITE,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
    },
    incrementer: {
        width: Dimensions.get('screen').width > 500 ? 18 : 15,
        height: Dimensions.get('screen').width > 500 ? 10 : 8,
        marginVertical:3,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    }
});



export default LinksScreen;