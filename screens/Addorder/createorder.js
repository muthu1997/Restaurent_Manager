import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  KeyboardAvoidingView,
  CheckBox,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
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
} from '../../components';
import Theme from '../../assets/Theme';
import URL from '../../assets/url';
import SupplierHandler from '../../functions/getSupplier';
import SupplierById from '../../functions/getSupplierById';

const widther = Dimensions.get('window').width;

const option = [
  { label: 'Day 1', value: '1' },
  { label: 'Day 2', value: '2' },
  { label: 'Day 3', value: '3' },
];

const supplier = [];
const GSTAnalyzer = [];


const DefaultButton = props => {
  const [getAllSuppliers, setAllSuppliers] = useState([]);
  const [getMail, setMail] = useState(null);
  const [getOrderType, setOrderType] = useState(null);
  const [getSupplier, setSupplier] = useState(null);
  const [getDate, setDate] = useState(null);
  const [getHeight, setHeight] = useState(null);
  const [getOldOrder, setOldOrder] = useState(false);
  const [getDescription, setDescription] = useState('None')

  const gotoOrder = () => {
    if (getOrderType === null) {
      alert('Select order type!')
    } else if (getSupplier === null) {
      alert('Select supplier!')
    } else if (getDate === null) {
      alert('Select delivery date!')
    } else {
      global.orderType = getOrderType;
      global.supplierId = getSupplier;
      global.deliveryDate = getDate;
      global.description = getDescription;
      props.navigation.navigate('AddOrder');
    }
    //orderType,supplierId,date,description
  };

  const netwrokChecker = () => {
    var alertHandler = [];

    setInterval(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected === false) {
          if (alertHandler.length === 0) {
            alertHandler.push('Not Connected');
            alert('It seems, your network is slow or not connected to internet Connection.');
          } else {
            console.log('Connection type: ' + state.type);
          }
        } else {
          alertHandler.length = 0;
        }

      });
    }, 3000)
  }

  useEffect(() => {
    netwrokChecker();
    global.currentDate = moment().format("DD/MM/YYYY");
    AsyncStorage.getItem('Email').then(data => {
      if (data) {
        var dataSetter = setResult.bind(this);
        var email = data;
        setMail(data);
        SupplierHandler(email, dataSetter);
      }
    });
    AsyncStorage.getItem('Outlet').then(data => {
      global.outletID = data;
    })
  }, []);

  const setResult = data => {
    var getter = data.data;
    var i = 0;
    GSTAnalyzer.push(getter);
    supplier.length = 0;
    {
      getter.map(item => {
        supplier.push({ label: item.name, value: item.supplier_id });
      });
    }

    setAllSuppliers(supplier);
  };

  const setOrderTypeFunction = (data) => {
    setOrderType(data);
    global.SelectDay = data;
  }


  const setSupplierFunction = (data) => {
    setSupplier(data);
    if(data != null) {
    var suppliernamer = supplier.filter(x => x.value === data);
    global.supplierName = suppliernamer[0].label;
    }

    var res = GSTAnalyzer[0];
    for(var i =0; i<res.length; i++) {
      if(res[i].supplier_id === data) {
        global.is_GST = res[i].is_gst;
        return;
      }
    }
  }
  

  const dateToFormat = '1976-04-19T12:59-0500';
  return (
    <View style={styles.mainContainer}>
      <Header
        titlestyle={{ fontSize: 16, fontWeight: '500' }}
        image={ global.logo != null ? global.logo : URL.Logo}
        handle={()=>props.navigation.navigate('Profile')}
        title="Add Order">
        <Stepper
          page={0}
          label={['Create Order', 'Add Item', 'Send Order']}
          style={{ width: '80%', alignSelf: 'center', marginVertical: 8 }}
        />
      </Header>
      <KeyboardAwareScrollView extraScrollHeight={50} enableOnAndroid={true}>
        <View style={{ height: 10 }} />

        <Text style={{ paddingLeft: widther >= 500 ? '25%' : '10%' }}>
          Order type
        </Text>
        <Selector
          handle={data => setOrderTypeFunction(data)}
          value={getOrderType}
          item={option}
        />
        <View style={{ height: 10 }} />

        <Text style={{ paddingLeft: widther >= 500 ? '25%' : '10%' }}>
          Supplier
        </Text>
        <Selector
          handle={data => setSupplierFunction(data)}
          value={getSupplier}
          item={getAllSuppliers}
        />
        <View style={{ height: 10 }} />

        <Text style={{ paddingLeft: widther >= 500 ? '25%' : '10%' }}>
          Delivery date
        </Text>
        <Date
          date={getDate}
          handle={date => setDate(date)}
          placeholder="dd/mm/yyyy"
        />
        <View style={{ height: 10 }} />
        {global.OrderType === "Add New Order" ? (
        <View>
        <Text style={{ paddingLeft: widther >= 500 ? '25%' : '10%' }}>
          Invoice Number
        </Text>
        <Input
          style={{
            width: widther >= 500 ? '50%' : '80%',
            elevation: 0,
            borderWidth: 0.5,
            borderRadius: 5,
            backgroundColor: Theme.BACK,
            borderColor: Theme.GRAY,
            height: 40,
            textAlignVertical: 'top',
            padding: 6,
            alignSelf: 'center',
          }}
          handle={data => setDescription(data)}
        />
        </View>
        ) : (
          <View>
        <Text style={{ paddingLeft: widther >= 500 ? '25%' : '10%' }}>
          Description
        </Text>
        <Input
          style={{
            width: widther >= 500 ? '50%' : '80%',
            elevation: 0,
            borderWidth: 0.5,
            borderRadius: 5,
            backgroundColor: Theme.BACK,
            borderColor: Theme.GRAY,
            height: 100,
            textAlignVertical: 'top',
            padding: 6,
            alignSelf: 'center',
          }}
          multiline={true}
          handle={data => setDescription(data)}
        />
        </View>
        )}
        <View style={{ height: 10 }} />

        <Button
          handle={gotoOrder}
          style={{ alignSelf: 'center', marginVertical: 8 }}
          title="Next"
        />

      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.BACK,
  },
});

export default DefaultButton;
