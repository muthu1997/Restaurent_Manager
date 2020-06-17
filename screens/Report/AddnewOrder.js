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
    Text,
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
import SupplierHandler from '../../functions/getSupplier';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageUploader from '../../functions/uploadImage';
import ReceiveOrderFunctionNewOrder from '../../functions/AddNewOrderSun';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Camera } from 'expo-camera';

const data = [
    { id:'S.No', code: 'Name', name: 'Code', quantity: 'Quantity', price: 'Price', unit: "Total",total:'Unit' },
  ];

const AllSupplierDetails = [];
const supplierNameForOrder = [];
const supplier = [];
const mainDataResult = [];
const supplierPicker = [];
const tempPrice = [];

const AddNewOrder = props => {
    const bs = React.createRef();

    const [getOutletId, setOutletId] = useState(null);
    const [getCompanyId, setCompanyId] = useState(null);
    const [getLoader, setLoader] = useState(false);
    const [getDefaultSupplier, setDefaultSupplier] = useState(null);
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getSupplierId, setSupplierId] = useState(null);
    const [getMail, setMail] = useState(null);
    const [getAllData, setAllData] = useState([]);
    const [getTotalAmount, setTotalAmount] = useState(0);
    const [getTaxAmount, setTaxAmount] = useState(0);
    const [getReceivedAmount, setReceivedAmount] = useState(0);
    const [getInvoiceNumber, setInvoiceNumber] = useState(null);
    const [getDeliveryDate, setDeliveryDate] = useState(null);
    const [getLocalImage, setLocalImage] = useState(null);
    const [getTexter, setTexter] = useState('Capture');
    const [getSubmitText, setSubmitText] = useState('Send Order');
    const [getDeliveryShoaDate, SetDeliveryShowDate] = useState();
    const [getPayment, setPayment] = useState(0);
    const [getSupplier, setSupplier] = useState(null);
    const [getSupplierGST, setSupplierGST] = useState(0);
    const [getMainDataResult, setMainDataResult] = useState([]);
    const [getTextInput, setTextInput] = useState();
    const [getInvoiceUploadResult, setInvoiceUploadResult] = useState(false);
    const [getTempPId, setTempPId] = useState(null);
    const [getTransId, setTransId] = useState(null);
    const [getInvoicePrefix,setInvoicePrefix] = useState(null);
    const [getCompany, setCompany] = useState(null);
    const [getSubmitImage, setSubmitImage] = useState(null);

    useEffect(() => {
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
        setNewOrderDetailsFunction();
    
}, [])

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

const setSupplierFetchResult = data => {
    var getter = data.data;
    supplierPicker.length = 0;
    console.log(getter)
    {
      getter.map(item => {
        supplierPicker.push({ label: item.name, value: item.supplier_id });
      });
    }
    AllSupplierDetails.push(getter);
    setAllSuppliers(supplierPicker);
    setDefaultSupplier(getter[0].name)
  };

    const setTopSupplierFunction = (data) => {
        if(data != null) {
        setLoader(true);
        var result = AllSupplierDetails[0];
        setSupplierId(data)
        var name = result.filter(x => x.supplier_id === data);
        setSupplier(name[0].name);
        global.supplierName = name[0].name;
        setInvoicePrefix(name[0].invoice_prefix)
        global.supplierId = data;
        supplierNameForOrder.length = 0;
        setSupplierGST(name[0].is_gst);
        runSupplierProductFunction()
        supplierNameForOrder.push(name);

        setTotalAmount(0);
        setTaxAmount(0);
        setReceivedAmount(0);
        }
      }

      const runSupplierProductFunction = () => {
        var email = getMail;
        var dataSetter = SupplierHandlerAddNewOrder.bind(this);
        SupplierProducts(email, dataSetter);
      }

      const setDateFunction = (data) => {
        var result = data;
        var resulter = (result[6]+result[7]+result[8]+result[9]+'-'+result[3]+result[4]+'-'+result[0]+result[1]);
        setDeliveryDate(resulter);
        SetDeliveryShowDate(data);
        //result[6]+result[7]+result[8]+result[9]
    }

    const SupplierHandlerAddNewOrder = (data) => {
        var sipplierIdentifier = supplierNameForOrder[0];
    supplier.length=0;
    var getter = data.filter(x=> x.supplier_id === sipplierIdentifier[0].name & x.is_active === 1)
    var i = parseInt(0);
    var totalAmount = 0;
    for (i; i < getter.length; i++) {  
      var getDatas = getter[i];
      var getDatas1 = [getDatas];
    var mainResult = getDatas1;
      {
        mainResult.map(item => {
          supplier.push({ 
                    id:parseInt(i + 1),
                    title: parseInt(i + 1),
                    image:'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
                    name: item.name,
                    code: item.item_code,
                    quantity: 0,
                    price: item.price,
                    total: totalAmount,
                    unit: item.unit + '(' + item.unit_description + ')',
                    product_id: item.id
          });
        });
      }
    } 
    setLoader(false);
    setAllData(supplier);
  };

  const getQuantityData = data => {
    var quantity = data[0].quantity;
    var serielnumber = data[0].seriel - 1;
    var price = getAllData[serielnumber].price;

    if (data[0].action === 'INCREMENT') {
        var total = getReceivedAmount + price;
        supplier[serielnumber].total = parseFloat(price*quantity);
        supplier[serielnumber].quantity = data[0].quantity;
        setAllData(supplier);
        
            setTotalAmount(getTotalAmount+price === 'NaN' ? 0 : parseFloat(getTotalAmount+price));
        
        if (getSupplierGST === 0) {
            var totaler=getTotalAmount+price;
            setReceivedAmount(totaler);
        } else {
            const GST = parseFloat((Number(price) * (Number(7) / 100)))
            var taxer = parseFloat(getTaxAmount + GST);
            setTaxAmount(taxer);
            var totaler=getTotalAmount+price;
            setReceivedAmount(totaler+taxer);
        }
    } else {
        supplier[serielnumber].total = parseFloat(price*quantity);
        supplier[serielnumber].quantity = data[0].quantity;
        setAllData(supplier);
        setTotalAmount(getTotalAmount-price === 'NaN' ? 0 : parseFloat(getTotalAmount-price));
        
        if (getSupplierGST === 0) {
            var totaler=getTotalAmount-price;
            setReceivedAmount(totaler);
        } else {
            const GST = parseFloat((Number(price) * (Number(7) / 100)))
            var taxer = parseFloat(getTaxAmount - GST);
            setTaxAmount(taxer);
            var totaler=getTotalAmount-price;
            setReceivedAmount(totaler+taxer);
        }

    }
};

const AddNewOrderFunction = () => {
    if(getSupplierId === null) {
        alert('Please select Supplier')
    }else if(getInvoiceNumber === null) {
        alert('Please enter invoice number');
    }else if(getDeliveryDate === null) {    
        alert('Please select delivery date.')
    }else if(getInvoiceUploadResult === false) {
        alert('Please select invoice image')
    }else {
    mainDataResult.length = 0;
    var Results = [] ;
    Results.length=0;
    var rest = AllSupplierDetails[0];
    var invoicenumber = rest.filter(x=> x.supplier_id === getSupplierId)
    var inv = invoicenumber[0].invoice_prefix+getInvoiceNumber
    console.log(inv)
    for (var i = 0; i < getAllData.length; i++) {
        var transId = getTransId;
        var cmpid = getCompanyId
        var outid = getOutletId
        var pid = getAllData[i].product_id
        var quantity = getAllData[i].quantity
        var rate = getAllData[i].price
        var supplier = getSupplierId //-------
        var receivedat = moment(getDeliveryDate).format('YYYY-MM-DD') //=======
        var invoiceno = inv
        var amount = getTotalAmount
        var receivedimg = getSubmitImage
        var taxamount = getTaxAmount
        var totalamount = getReceivedAmount
        var isgst = getSupplierGST // -----------
        var paid = getPayment
        Results.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,isgst:isgst, paid:paid,receivedimg:receivedimg })
        setMainDataResult({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,isgst:isgst, paid:paid })
   }
    var datas = setReceiveResultAddNewOrder.bind(this);
    ReceiveOrderFunctionNewOrder(Results,datas);
    }
}

const setReceiveResultAddNewOrder = (data) => {
    if(data === 'Success') {
        global.sunRefresh = 'Yes';
        alert('Order created successfully.')
        props.navigation.navigate('Home')
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

const renderContent = () => {
    return (
        <View style={{backgroundColor:'#ecf0f1'}}>
        </View>
    )
}

const renderHeader = () => {
    return (
       <View>
        {renderReceive()}
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
            <View style={{ width: '25%', paddingLeft: '5%', height:'100%' }}>
                <Text style={styles.headingText}>Amount</Text>
                <View style={{width:75,height:15,overflow:'hidden'}}>
                <Text style={styles.totalText}>{parseFloat(getTotalAmount.toFixed(4))}</Text>
                </View>
            </View>
            <View style={{ width: '25%', paddingLeft: '5%', height:'100%' }}>
                <Text style={styles.headingText}>Tax Amount</Text>
                <View style={{width:75,height:15,overflow:'hidden'}}>
                <Text style={styles.totalText}>{parseFloat(getTaxAmount.toFixed(4))}</Text>
                </View>

            </View>
            <View style={{ width: '25%', paddingLeft: '5%', height:'100%' }}>
                <Text style={styles.headingText}>Received Amount</Text>
                <View style={{width:75,height:15,overflow:'hidden'}}>
                <Text style={styles.totalText}>{parseFloat(getReceivedAmount.toFixed(4))}</Text>
                </View>
            </View>
            <View style={{ width: '25%', paddingLeft: '5%', height:'100%' }}>
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
            <View style={{ width: '50%', justifyContent: 'center', }}>
                <Text style={[styles.headingText,{marginLeft:'3%'}]}>Date</Text>
                {renderDate()}
            </View>
        </View>
    )
}

const renderDate = () => {
    var year = Number(moment().format("YYYY"))+Number(2);
    return (
            <Date
            style={{ width: '95%', height: 40 }}
            date={getDeliveryShoaDate}
            handle={date => setDateFunction(date)}
            mainDate = {moment().format('DD-MM-YYY')}
            format={"DD-MM-YYYY"}
            placeholder="dd/mm/yyyy"
            />
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

                    <Button 
                        title={getSubmitText} 
                        handle={AddNewOrderFunction} 
                        style={styles.receiveButton} />
                
            </View>
    )
}

const getPermissionImageAsync = async () => {
        
    //const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status } = await Camera.requestPermissionsAsync()
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
          quality: 0.4,
        });
        if (!result.cancelled) {
          setLocalImage(result.uri);
          var path = getCompany;
          var trans = getOutletId+moment().format("DD")+"_"+(Math.floor(Math.random() * 1000) + 1);
          var image = result.uri;
          var invNo = getInvoiceNumber;
          var invNo = getInvoicePrefix+getInvoiceNumber+'_'+trans;
          setSubmitImage(invNo+'.jpg')
          var dataResult = setUploadResult.bind(this);
          ImageUploader(image,invNo,path,dataResult);
          setTexter('Uploading...');
          setTransId(trans);
        }
  
      } catch (E) {
        console.log(E);
      }
};

const setUploadResult = (data) => {
  if(data != 'error') {
      setTexter('Uploaded Successfully.');
      setInvoiceUploadResult(true)
  } else {
      setTexter('Please try again.');
  }
}

const setInput = (data) => {
    console.log(data)
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
    console.log(supplier);
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



const dummyWidth = Dimensions.get('window').width;
const dummyHeight = Dimensions.get('window').height;
var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 6 : dummyHeight / 6;
var lengther = [40,widthers,widthers,widthers,widthers,widthers,widthers]; 

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Header
                    titlestyle={{ fontSize: 16, fontWeight: '500' }}
                    elevation={0}
                    handle={() => props.navigation.goBack(null)}
                    image="icon"
                    title={global.orderTitle}>
                        
                    <View style={{ width: '100%', padding: 5, alignItems: 'center', justifyContent: 'center', }}>
                        <Selector
                            handle={data => setTopSupplierFunction(data)}
                            style={{backgroundColor:'#FFFF'}}
                            value={getDefaultSupplier} 
                            item={getAllSuppliers}
                            label="Select Supplier"
                            />
                    </View>
                    
                </Header>
                <Heading datas={data} length={lengther} />
                <ScrollView horizontal={true} style={{marginBottom:75}} >
                {getLoader === true ? (
                    <View style={{width:Dimensions.get('screen').width,alignItems: 'center',justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={Theme.PRIMARY} />
                    </View>
                ) : (
                    <ListView
                        quantitys={10}
                        handle={data => getQuantityData(data)}
                        handleinput={data=>setInput(data)}
                        style={{ backgroundColor: Theme.BACK }}
                        datas={getAllData}
                    />
                ) }
                </ScrollView>
            </View>
            {getBottomSlider()}

            
            <Modal
            isVisible={getTextInput}>
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
        width: Dimensions.get('window').width > 500 ? '30%' : '45%',
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
    }
});



export default AddNewOrder;