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
    SearchHeader,
    Date,
    Checkbox,
    Heading,
    ListView,
    Quantity,
    OrderList,
    SendOrder
} from '../../components';
import Theme from '../../assets/Theme';
import SupplierHandler from '../../functions/getSupplierById';
import URL from '../../assets/url';
import call from 'react-native-phone-call';

const mainTextTitle = Dimensions.get('window').width >= 500 ? 22 : 18;

const data = [
    { id: 'Name', code: 'Contact', name: 'Sales Contact' },
  ];
const option = [
    { label: 'All Suppliers', value: 'All Suppliers' },
    { label: 'Supplier 1', value: '2' },
    { label: 'Supplier 2', value: '3' },
];

const supplier = [];

const SupplierList = props => {

    const [getSearchStatus, setSearchStatus] = useState(false)
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getSecondarySupplierData, setSecondarySupplierData] = useState(null);
    const [getLoader,setLoader] = useState(true);
    const [refreshing, setRefreshing] = useState(true);


    useEffect(() => {
       mainFunction()
    }, [])

    const mainFunction = () => {
        setRefreshing(true)
        AsyncStorage.getItem('Email')
        .then(data => {
            if (data) {
                var email = data;
                AsyncStorage.getItem('Company_Id')
                    .then(cdata => {
                        if (cdata) {
                            var id = cdata;
                            var dataSetter = setSuppliersData.bind(this);
                            SupplierHandler(email, id, dataSetter);
                        }
                    })
            } else {
                alert('There is some problem. Please logout and login again.')
            }
        })
    }

    const setSuppliersData = (data) => {
        if (data === 'error') {
            alert('There is some error. Please try again later.');
        } else {
            supplier.length = 0;
            var mainResult = data;
            {
                mainResult.map(item => {
                    supplier.push({
                        id: item.name,
                        code: item.contact_number,
                        name: item.sales_contact,
                    });
                });
            }
            setAllSuppliers(supplier);
            setSecondarySupplierData(supplier);
            setLoader(false)
            setRefreshing(false)
        }
    }
 
   const SearchFilterFunction = (text) => {
        const newData = getSecondarySupplierData.filter(function(item){
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        setAllSuppliers(newData)
        text = text;
        console.log(newData);
    }

    const dummyWidth = Dimensions.get('window').width;
    const dummyHeight = Dimensions.get('window').height;
    var widthers = Dimensions.get('window').width >= 500 ? dummyWidth / 3: dummyWidth / 3;
  var lengther = [widthers,widthers,widthers]; 
    return (
        <View style={styles.mainContainer}>
            <Header
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
               // handle={() => props.navigation.goBack(null)}
                image={ URL.Logo}
                image1="icon"
                icon="search"
                handle1={() => setSearchStatus(!getSearchStatus)}
                title="Suppliers">
                {getSearchStatus ? (
                <SearchHeader
                    search={data=>SearchFilterFunction(data)}
                    style={styles.selectorStyle}
                    placeholder="Search by name.."
                />
                ) : <View style={{width:10,height:10}} /> }
            </Header>
            <Heading datas={data} length={lengther} />
            {getLoader === false ? (
            <ScrollView horizontal={true} >
                <SendOrder
                    length={lengther}
                    style={{ backgroundColor: Theme.BACK }}
                    datas={getAllSuppliers}
                    mainFunction={mainFunction}
                    refreshing={refreshing}
                    handlecode={data=>call({number:data})}
                    handlename={data=>call({number:data})}
                />
            </ScrollView>  
            ) : (
                <View style={{flex:1,alignItems: 'center',justifyContent: 'center',}}>
                    <ActivityIndicator color={Theme.PRIMARY} size="large" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Theme.BACK,
    },
    selectorStyle: {
        backgroundColor: Theme.WHITE,
        marginTop: 15
    }
});

export default SupplierList;
