import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  AsyncStorage,
  BackHandler,
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
  Selector,
  Date,
  Checkbox,
  Heading,
  ListView,
  Quantity,
  OrderList,
  SendOrder
} from '../../components';
import Theme from '../../assets/Theme';
import LoginHandler from '../../functions/login';
import SupplierDetails from '../../functions/getSupplierDetails';
import CompanyDetails from '../../functions/getCompanyDetails';
import GetSubmitFunction from '../../functions/sendOrder';
import getOutletData from '../../functions/getOutletDetails';
import OrderApproval from '../../functions/orderApproval';
import URL from '../../assets/url';
import moment from 'moment';
//<ion-icon name="add-circle"></ion-icon>
//<ion-icon name="person-circle"></ion-icon>
//material
//check_circle,
const widther = Dimensions.get('window').width;

const data = [
  { title: 'Id', width: 50 },
  { title: 'Code', width: 50 },
  { title: 'Name', width: 100 },
  { title: 'Quantity', width: 75 },
  { title: 'Price', width: 75 },
  { title: 'Unit', width: 75 },
  { title: 'Total', width: 75 },
];
const mainDataResult = [];
const data1 = [
  { id: 'S.No', code: 'Hello', name: "Dummy Name",quantity: 5, price: 12000, total:15000,unit: "Dummy"}
];

const DefaultButton = props => {

  const [getLoginEmail, setLoginEmail] = useState(null);

  const [getCompanyId, setCompanyId] = useState(null);
  const [getCName, setCName] = useState(null);
  const [getCAddress, setCAddress] = useState([]);
  const [getCPhone, setCPhone] = useState([]);
  const [getCLogo, setCLogo] = useState(null);
  const [getGst, setGst] = useState(null);

  const [getPName, setPName] = useState(null);
  const [getPAddress, setPAddress] = useState([]);
  const [getPPhone, setPPhone] = useState(null);
  const [getPEmail, setPEmail] = useState(null);

  const [getOutlet, setOutlet] = useState(null);
  const [getOutletDatas, setOutletDatas] = useState([]);
  const [getLogo, setLogo] = useState(null);
  const [getButton, setButton] = useState('Send Order')

  const orderType = global.orderType;
  const supplierId = global.supplierId; 
  const date = global.deliveryDate;
  const description = global.description;

  const fin = global.finalShowData;
  const finalShowData = fin.filter(x => x.quantity > 0);
  const finalData = global.finalData;
  const totalAmount = global.totalAmount;
  const [getLoader,setLoader] = useState(true);
  //finalShowData,finalData,orderType,supplierId,date,description,totalAmount


  const  getOutletId = () => {
     AsyncStorage.getItem('Outlet').then(data => {
      if(data) {
      setOutlet(data);
      var id = data;
      var dataSetter = setOutletDetails.bind(this);
      getOutletData(id,dataSetter);
      }
    })
   }

  const setOutletDetails = (data) => {
    setOutletDatas(data);
  }

  useEffect(() => {
    getCompanyLogoFunction();
    getOutletId();
    AsyncStorage.getItem('Email').then(data => {
      if (data) {
        setLoginEmail(data);
        var dataSetter = setResult.bind(this); 
        var dataSetter1 = setResultCompany.bind(this); 
        var email = data;
        var supplier_Id = supplierId;
        SupplierDetails(supplier_Id, dataSetter);
        CompanyDetails(email, dataSetter1);
      }
    })

    AsyncStorage.getItem('Company_Id').then(data => {
      if (data) {
        setCompanyId(data);
      }
    })
  },[]);

  const setResult = (data) => {
    setGst(data.is_gst);
    setPName(data.name);
    var address = [data.address];
    setPAddress(address);
    setPPhone(data.contact_number);
    setPEmail(data.sales_email);
  }

  const setResultCompany = (data) => { 
    var result = data.company;
    setCName(result.name);
    var address = [result.address];
    setCAddress(address);
    setCPhone(result.phone)
    setCLogo(result.company_logo);

    setLoader(false)
  }

  const getCompanyLogoFunction = () => {
    AsyncStorage.getItem('Company_Logo')
    .then(data => {
      if(data) {
        setLogo(data)
      }
    })
  }

  const submitFunction = () => {
    setButton('Loading..')
    var data = finalData;
    var outlet_id = getOutlet;
    var internel_desc = description;
    var delivery_date = date;
    var supplier_id = supplierId;
    var email = getLoginEmail;
    var getResult = resultSetterFunction.bind(this);

    GetSubmitFunction(email,data,outlet_id,internel_desc,delivery_date,supplier_id,getResult);
  }

  const AddNewOrderFunction = () => {
            var inserter = finalShowData;
            mainDataResult.length = 0;
            var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
            for (var i = 0; i < inserter.length; i++) {
                var transId = "MID_"+moment().format("DD")+"_"+RandomNumber;
                var cmpid = getCompanyId
                var outid = getOutlet
                var pid = inserter[i].product_id
                var quantity = getAllData[i].quantity
                var rate = getAllData[i].price
                var createdat = 'getCreatedAt' //----
                var supplier = supplierId //-------
                var receivedat = finalData
                var invoiceno = getInvoiceNumber
                var amount = totalAmount
                var taxamount = global.getTaxAmount
                var totalamount = cgst
                var receivedimg = null
                var isgst = global.is_GST // -----------
                var isdownload = 'none'

                mainDataResult.push({transId: transId,cmpid:cmpid,outid:outid,pid:pid,quantity:quantity,rate: rate, createdat: createdat, supplier: supplier,receivedat:receivedat,invoiceno:invoiceno,amount:amount,taxamount:taxamount,totalamount:totalamount,receivedimg:receivedimg,isgst:isgst,isdownload:isdownload })
           }
            var datas = setReceiveResult1.bind(this);
            ReceiveOrderFunctionEdit(mainDataResult,datas);
  }

  const setReceiveResult1 = (data) => {
    if(data === 'success') {
      global.refresher = 'Yes';
      alert('Order placed successfully!');
      props.navigation.navigate('Home');
    }else {
      alert('oops! something went wrong.')
    }
  }

  const resultSetterFunction = (data) => {
    var datas = data;
    if(datas.Message === 'success') {
      alert('Order placed successfully!');
      setButton('Receive Order')
      global.refresher = 'Yes';
      props.navigation.navigate('Home');
    }else {
      alert('oops! something went wrong.')
      setButton('Receive Order')
    }
  }

  const cgst = getGst === 1 ? parseFloat((Number(totalAmount)*(Number(7)/100)+Number(totalAmount))) : parseFloat((Number(totalAmount)));
  const getGSTData = parseFloat(cgst)-parseFloat(totalAmount);
  return ( 
    <View style={{flex:1}}>
      {getLoader === false ? (
    <View style={styles.mainContainer}>
      <Header
        elevation={0}
        handle={()=>props.navigation.goBack(null)}
        image={"icon"}
        titlestyle={{ fontSize: 16, fontWeight: '500' }}
        title={"Day "+global.SelectDay+","+global.supplierName+","+global.currentDate}>
        <Stepper
          page={2}
          label={['Create Order', 'Add Item', 'Send Order']}
          style={{ width: '80%', alignSelf: 'center', marginVertical: 8 }}
        />
      </Header>
      <ScrollView style={{marginBottom:5}}>
      <View style={styles.amountContainer}>
        {getLogo != null ? (
          <Image
                source={{
                  uri:'http://erp.middlemen.asia/repository/company/'+getLogo,
                }}
                style={styles.imagestyle}
              />
        ) : null }
        <View style={{ flex: 1, flexDirection: 'row' }}>
        {getCAddress.map((item,key)=> 
          <View style={styles.addressContainer}>
            <Text>{getCName}</Text>
            <Text>{item}</Text>
            <Text>Ph: {getCPhone}</Text>
          </View>
          )}

          <View style={[styles.addressContainer, { alignItems: 'flex-end' }]}>
            <Text
              style={{
                fontSize: Dimensions.get('window').width >= 500 ? 20 : 16,
                fontWeight: 'bold',
              }}>
              Purchase Order
            </Text>
            <View style={styles.priceContainer}>
              <Text style={{ color: Theme.WHITE }}>Total:${totalAmount}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <View style={styles.addressContainer}>
          <Text
            style={{
              fontSize: Dimensions.get('window').width >= 500 ? 18 : 14,
              fontWeight: 'bold',
              color: Theme.BLUE,
            }}>
            Purchase Order to
          </Text>
          <Text>{getPName}</Text>
          {getPAddress.map((item,key)=> 
          <View style={{flex:1}}>
            <Text>{item}</Text>
            <Text>Mail: {getPEmail}</Text>
            <Text>Ph: {getPPhone}</Text>
          </View>
          )}
        </View>

        <View style={[styles.addressContainer, { alignItems: 'flex-end' }]}>
          <Text
            style={{
              fontSize: Dimensions.get('window').width >= 500 ? 18 : 14,
              fontWeight: 'bold',
              color: Theme.BLUE,
            }}>
            Delivered to
          </Text>
          <Text>{getOutletDatas.name}</Text>
          <Text>{getOutletDatas.address}</Text>
          <Text>{getOutletDatas.email}</Text>
          <Text>Ph: {getOutletDatas.phone}</Text>
        </View>
      </View>

      <View
        style={[styles.amountContainer, { justifyContent: 'space-between',marginVertical:8,paddingVertical:5,paddingBottom:10 }]}>
        
        <View>
          <Text
            style={{
              fontSize: Dimensions.get('window').width >= 500 ? 18 : 14,
              fontWeight: 'bold',
              color: Theme.BLUE,
            }}>
            Purchase Order Date
          </Text>
          <Text>{global.currentDate}</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: Dimensions.get('window').width >= 500 ? 18 : 14,
              fontWeight: 'bold',
              color: Theme.BLUE,
            }}>
            Delivery Date
          </Text>
          <Text>{date}</Text>
        </View>
      </View>

        <Heading 
        length={7}
        style={{backgroundColor:Theme.BACK}}
        datas={data} />
        <ScrollView horizontal={true}>
        <SendOrder
        length={7}
        style={{backgroundColor:Theme.BACK}}
        datas={finalShowData} />
        </ScrollView>
        <View style={{width:'100%',padding:5,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',}}>
          <Text style={{marginLeft:'30%'}}>Subtotal</Text>
          <View style={{overflow:'hidden'}}><Text>${totalAmount} </Text></View>
        </View>
        <View style={{width:'100%',padding:5,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <Text style={{marginLeft:'30%'}}>GST </Text>
          <View style={{overflow:'hidden'}}><Text >${global.getTaxAmount} </Text></View>
        </View>
        <View style={{width:'100%',padding:5,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <Text style={{marginLeft:'30%'}}>Total </Text>
          <View style={{overflow:'hidden'}}><Text>${cgst} </Text></View>
        </View>
        </ScrollView>

      <View style={styles.bottomContainer}>
        {global.OrderType === "Add New Order" ? (
        <Button
        handle={AddNewOrderFunction}
          style={{ alignSelf: 'center', marginVertical: 8 }}
          title="Send Order"
        />
        ) : (
          <Button
        handle={submitFunction}
          style={{ alignSelf: 'center', marginVertical: 8 }}
          title={getButton}
        />
        )}
      </View>
    </View>
    ) : (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            )}
    </View>
  );
};

const imageDimension = Dimensions.get('window').width >= 500 ? 80 : 60;
const mainTitlewidth = Dimensions.get('window').width >= 500 ? widther/7 : widther/7;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.BACK,
  },
  amountContainer: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Theme.SECONDARY,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: '100%',
    padding: 5, 
    bottom: 0,
    backgroundColor: Theme.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle: {
    width: imageDimension,
    height: imageDimension,
  },
  addressContainer: {
    width: '50%',
    padding: 5,
  },
  priceContainer: {
    width: Dimensions.get('window').width >= 500 ? '70%' : '90%',
    padding: 5,
    backgroundColor: Theme.PRIMARY,
    alignItems: 'flex-end',
    paddingVertical: 8,
  },
});

export default DefaultButton;
