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
  { title: 'S.No', width: 50, length: 7 },
  { title: 'Name', width: 100 },
  { title: 'Code', width: 75 },
  { title: 'Quantity', width: 75 },
  { title: 'Price', width: 75 },
  { title: 'Total', width: 75 },
  { title: 'Unit', width: 75 },
];

const supplier = [];//orderType,supplierId,date,description


const DefaultButton = props => {
  const [getTotal, setTotal] = useState(0);
  const [getAllSuppliers, setAllSuppliers] = useState([]);
  const [getLoader,setLoader] = useState(true);

  const gotoSubmit = () => {
    //props.navigation.navigate('SendOrder');
    const finalData = [];
    const finalShowData = [];
        finalData.length=0;
        finalShowData.length=0;
    for (var i=0; i < getAllSuppliers.length; i++) { 
        finalData.push(
          {
            "id":getAllSuppliers[i].productid,
            "quantity":getAllSuppliers[i].quantity,
            "price":getAllSuppliers[i].price
          }
        )

        finalShowData.push(
          {
            "id":i+1,
            "code":getAllSuppliers[i].code,
            "name":getAllSuppliers[i].name,
            "quantity":getAllSuppliers[i].quantity,
            "price":getAllSuppliers[i].price,
            "unit":getAllSuppliers[i].unit,
            "total":getAllSuppliers[i].total,
            "product_id":getAllSuppliers[i].productid,
          }
        )
     }

     gotoSender(finalShowData,finalData)
  };


//Parameters
const orderType = global.orderType;
const supplierId = global.supplierId;
const date = global.date;
const description = global.description;

const gotoSender = (finalShowData,finalData) => {
    global.finalShowData = finalShowData;
    global.totalAmount = getTotal;
    global.finalData = finalData;
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
    var getter = data.filter(x=> x.supplier_id === global.supplierName)
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
            title: i+1,
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
      var total = parseFloat(getTotal + price);
      supplier[serielnumber].total = total;
      supplier[serielnumber].quantity = data[0].quantity;
      setAllSuppliers(supplier);
      if(global.is_GST === 1) {
        global.getTaxAmount = total * 7 / 100
      }else {
        global.getTaxAmount = 0
      }

      setTotal(total)
    } else {
      var totalDecrement = parseFloat(getTotal - price);
      supplier[serielnumber].total = totalDecrement;
      supplier[serielnumber].quantity = data[0].quantity;
      setAllSuppliers(supplier);
      if(global.is_GST === 1) {
        global.getTaxAmount = total * 7 / 100
      }else {
        global.getTaxAmount = 0
      }
      setTotal(total)
    }
  };


  return (
    <View style={styles.mainContainer}>
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
      <Heading datas={data} length={7} />
      {getLoader === false ? (
      <ScrollView horizontal>
      <ListView
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
    </View>
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
