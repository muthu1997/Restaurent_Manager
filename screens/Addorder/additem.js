import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  AsyncStorage,
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
} from '../../components';
import Theme from '../../assets/Theme';
import URL from '../../assets/url';
import SupplierHandler from '../../functions/getSuppliersList';
//<ion-icon name="add-circle"></ion-icon>
//<ion-icon name="person-circle"></ion-icon>
//material
//check_circle,
const widther = Dimensions.get('window').width;
const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const mainImageWidth = Dimensions.get('window').width >= 500 ? 115 : 85;
const mainFontWidth = Dimensions.get('window').width >= 500 ? 35 : 30;
const mainTextTitle = Dimensions.get('window').width >= 500 ? 22 : 18;



const data = [
  { id:'Name',code: Dimensions.get('screen').width > 5000 ? 'Code' : null, name: 'Qty', quantity: 'Price', price: 'Total', unit: "Unit" },
];

const supplier = [];//orderType,supplierId,date,description
const finalData = [];
const finalShowData = [];

const DefaultButton = props => {
  const [getTotal, setTotal] = useState(0.00);
  const [getAllSuppliers, setAllSuppliers] = useState([]);
  const [getLoader,setLoader] = useState(true);

  const gotoSubmit = () => {
    //props.navigation.navigate('SendOrder');
 
        finalData.length=0;
        finalShowData.length=0;
        var lengther = getAllSuppliers.filter(x => x.quantity != 0);
    if(lengther.length > 0) {
    for (var i=0; i < lengther.length; i++) { 
        finalData.push(
          {
            "id":lengther[i].productid,
            "quantity":lengther[i].quantity,
            "price":lengther[i].price
          }
        )
        finalShowData.push(
          {
            "id": i+1,
            // "code":lengther[i].code,
            "name":lengther[i].name,
            "quantity":lengther[i].quantity,
            "price":lengther[i].price,
            "unit":lengther[i].unit,
            "total":lengther[i].total,
            "product_id":lengther[i].productid,
          }
        )
     }
      global.finalShowData = finalShowData;
      global.totalAmount = getTotal;
      global.finalData = finalData;
     gotoSender(finalShowData,finalData)
    }else {
      alert('Please select atleast one product.')
    }
  };


//Parameters
const orderType = global.orderType;
const supplierId = global.supplierId;
const date = global.date;
const description = global.description;

const gotoSender = () => {
    props.navigation.navigate('SendOrder');
  }

  useEffect(() => {
    AsyncStorage.getItem('Email').then(data => {
      if (data) {
        var dataSetter = setResult.bind(this);
        var email = data;
        SupplierHandler(email, dataSetter);
      }
    });
  }, []);

  const setResult = data => {
    supplier.length=0;
    var getter = data.filter(x=> x.supplier_id === global.supplierName & x.is_active === 1)
    var i = parseInt(0);
    var totalAmount = 0;
    for (i; i < getter.length; i++) {  
      var getDatas = getter[i];
      var getDatas1 = [getDatas];
    var mainResult = getDatas1.filter(datas => datas.delivery_type === parseInt(orderType));
    
    var getMainResult = [mainResult];
      {
        mainResult.map(item => {
          supplier.push({ 
            id: i+1,
            image:
              'https://images.codedaily.io/lessons/general/verify_input/stripe_example.png',
            name: item.name,
            code: item.item_code,
            quantity: 0,
            price: item.price,
            total: totalAmount,
            unit: item.unit + '(' + item.unit_description + ')',
            productid: item.id
          });
        });
      }
    } 
    setAllSuppliers(supplier);
    setLoader(false)
  };

  const getQuantityData = data => {
    var quantity = data[0].quantity;
    var serielnumber = data[0].seriel - 1;
    console.log(serielnumber);
    var price = getAllSuppliers[serielnumber].price;
    var totalcost = getAllSuppliers[serielnumber].total;

    if (data[0].action === 'INCREMENT') {
      var total = parseFloat(getTotal) + parseFloat(price);
      supplier[serielnumber].total = parseFloat(data[0].quantity*price);
      supplier[serielnumber].quantity = data[0].quantity;
      setAllSuppliers(supplier);
      if(global.is_GST === 1) {
        global.getTaxAmount = total * 7 / 100
      }else {
        global.getTaxAmount = 0
      }

      setTotal(parseFloat(total).toFixed(2))
    } else {
      // supplier[serielnumber].total = parseFloat(data[0].quantity*price);
      // supplier[serielnumber].quantity = parseFloat(data[0].quantity);
      // setAllSuppliers(supplier);
      // if(global.is_GST === 1) {
      //   global.getTaxAmount = parseFloat(total * 7 / 100)
      // }else {
      //   global.getTaxAmount = parseFloat(0)
      // }
      // setTotal(parseFloat(total))


      var total = parseFloat(getTotal) - parseFloat(price);
      supplier[serielnumber].total = parseFloat(data[0].quantity*price);
      supplier[serielnumber].quantity = data[0].quantity;
      setAllSuppliers(supplier);
      if(global.is_GST === 1) {
        global.getTaxAmount = total * 7 / 100
      }else {
        global.getTaxAmount = 0
      }

      setTotal(parseFloat(total).toFixed(2))
    }
  };

  const dummyWidth = Dimensions.get('window').width;
  const dummyHeight = Dimensions.get('window').height;
  var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 6 : dummyHeight / 6;
  var widthers1 = Dimensions.get('window').width >= 500 ? dummyWidth / 8 : dummyHeight / 8;

  var mobilelengther = [widthers,widthers,widthers,widthers1,widthers,widthers,widthers]; 
   var tablength = ['40%','10%','20%','10%','10%','10%','10%']
   var lengther = Dimensions.get('screen').width > 500 ? tablength : mobilelengther; 
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        titlestyle={{ fontSize: 16, fontWeight: '500' }}
        elevation={0}
        handle={()=>props.navigation.goBack(null)}
        image='icon'
        title="Add Order">
        <Stepper
          page={1}
          label={['Create Order', 'Add Item', 'Send Order']}
          style={{ width: '80%', alignSelf: 'center', marginVertical: 8 }}
        />
      </Header> 
      <Heading headerData = {Dimensions.get('screen').width > 500 ? 'Yes' : null} datas={data} length={lengther} />
      {getLoader === false ? (
      <ScrollView horizontal style={{marginBottom:75}}>
      <ListView
      headerData = {Dimensions.get('screen').width > 500 ? 'Yes' : null}
        handle={data => getQuantityData(data)}
        style={{ backgroundColor: Theme.BACK }}
        datas={getAllSuppliers}
      />
      </ScrollView>
      ) : (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            )}

      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: mainTextTitle, fontWeight: '500' }}>
          ${getTotal}
        </Text>
        <Button
          handle={gotoSubmit}
          style={{ alignSelf: 'center', marginVertical: 8 }}
          title="Next"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.BACK,
  },
  bottomContainer: {
    width: '100%',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Theme.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DefaultButton;
