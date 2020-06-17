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
import * as ScreenOrientation from 'expo-screen-orientation';
//<ion-icon name="add-circle"></ion-icon>
//<ion-icon name="person-circle"></ion-icon>
//material
//check_circle,
const widther = Dimensions.get('window').width;

const data = [
  { id: 'Id', name: 'Name', quantity: 'Qty', price: 'Price', unit: 'Unit', total: 'Total' },
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

  const dummyWidth = Dimensions.get('window').width;
  const dummyHeight = Dimensions.get('window').height;
  var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 7 : dummyHeight / 7;
  var lengtherTab = [widthers,widthers,widthers,widthers,widthers,widthers,widthers]; 
  var lengtherMobile = ['10%','10%','30%','10%','15%','15%','20%']; 
  var lengther = lengtherMobile;
  var Result = global.viewInvoice;
  //alert(JSON.stringify(finalShowData))

  // useEffect(async() => {
  //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  // })
  return ( 
    <View style={{flex:1}}>
    <View style={styles.mainContainer}>
      <Header
        elevation={0}
        handle={()=>props.navigation.goBack(null)}
        image={"icon"}
        titlestyle={{ fontSize: 16, fontWeight: '500' }}
        title={"Order Preview"}>
          <View style={{width:50,height:15}} />
      </Header>
      <ScrollView style={{marginBottom:5}} nestedScrollEnabled = {true}>
      <View style={{width:'100%',padding:5,alignItems: 'center',justifyContent: 'space-between',marginVertical:5}}>
          <Text style={{fontWeight:'400'}}>{Result[0].data.transaction_id} </Text>
        </View>
      <View style={styles.amountContainer}>
          <Image
                source={global.logo}
                style={styles.imagestyle}
              />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          
          <View style={styles.addressContainer}>
            <Text>{Result[0].data.company.name}</Text>
            <Text>{Result[0].data.company.address}</Text>
            <Text>Ph: {Result[0].data.company.phone}</Text>
          </View>

          <View style={[styles.addressContainer, { alignItems: 'flex-end' }]}>
            <Text
              style={{
                fontSize: Dimensions.get('window').width >= 500 ? 20 : 16,
                fontWeight: 'bold',
              }}>
              Purchase Order
            </Text>
            <View style={styles.priceContainer}>
              <Text style={{ color: Theme.WHITE }}>Total:${Result[0].data.total}</Text>
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
          <Text>{Result[0].data.supplier.name}</Text>
          <View style={{flex:1}}>
            <Text>{Result[0].data.supplier.address}</Text>
            <Text>Mail: {Result[0].data.supplier.email}</Text>
            <Text>Ph: {Result[0].data.supplier.contact_number}</Text>
          </View>
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
          <Text>{Result[0].data.outlet.name}</Text>
          <Text>{Result[0].data.outlet.address}</Text>
          <Text>{Result[0].data.outlet.email}</Text>
          <Text>Ph: {Result[0].data.outlet.phone}</Text>
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
          <Text>{Result[0].data.order_date}</Text>
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
          <Text>{Result[0].data.delivery_date}</Text>
        </View>
      </View>

        <Heading 
        length={lengther}
        headerData="Enabled"
        right='Yes'
        style={{backgroundColor:Theme.BACK}}
        datas={data} />
        <SendOrder
        length={lengther}
        style={{backgroundColor:Theme.BACK}}
        datas={finalShowData} />


        <View style={{width:100,height:15}} />
        <View style={{width:'100%',padding:5,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',}}>
          <Text style={{marginLeft:Dimensions.get('screen').width > 500 ? '75%' : '60%'}}>Subtotal</Text>
          <View style={{overflow:'hidden'}}><Text>${parseFloat(Result[0].data.subtotal).toFixed(2)} </Text></View>
        </View>
        <View style={{width:'100%',padding:5,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <Text style={{marginLeft:Dimensions.get('screen').width > 500 ? '75%' : '60%'}}>GST </Text>
          <View style={{overflow:'hidden'}}><Text >${Result[0].data.gst_amount} </Text></View>
        </View>
        <View style={{width:'100%',padding:5,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <Text style={{marginLeft:Dimensions.get('screen').width > 500 ? '75%' : '60%'}}>Total </Text>
          <View style={{overflow:'hidden'}}><Text>${Result[0].data.total} </Text></View>
        </View>


        
        <View style={{width:'100%',padding:5,justifyContent: 'space-between'}}>
          <Text style={{marginLeft:5,fontWeight:'400'}}>{Result[0].data.internel_desc}</Text>
        </View>
        </ScrollView>

    </View>

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
