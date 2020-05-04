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

const mainTextTitle = Dimensions.get('window').width >= 500 ? 22 : 18;

const data = [
    { title: 'S.No', width: 50, length: 7 },
    { title: 'Name', width: 100 },
    { title: 'Description', width: 75 },
    { title: 'Contact', width: 75 },
    { title: 'Sales Contact', width: 75 },
];

const option = [
    { label: 'All Suppliers', value: 'All Suppliers' },
    { label: 'Supplier 1', value: '2' },
    { label: 'Supplier 2', value: '3' },
];

const supplier = [];

const SupplierList = props => {

    const [getCompanyId, setCompanyId] = useState(null);
    const [getAllSuppliers, setAllSuppliers] = useState([]);
    const [getSecondarySupplierData, setSecondarySupplierData] = useState(null);
    const [getLoader,setLoader] = useState(true);


    useEffect(() => {
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
    }, [])

    const setSuppliersData = (data) => {
        if (data === 'error') {
            alert('There is some error. Please try again later.');
        } else {
            supplier.length = 0;
            var mainResult = data;
            {
                mainResult.map(item => {
                    supplier.push({
                        id: item.s_no,
                        code: item.name,
                        name: item.description,
                        quantity: item.contact_number,
                        price: item.sales_contact,
                    });
                });
            }
            setAllSuppliers(supplier);
            setSecondarySupplierData(supplier);
            setLoader(false)
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

    return (
        <View style={styles.mainContainer}>
            <Header
                titlestyle={{ fontSize: 16, fontWeight: '500' }}
                elevation={0}
                handle={()=>props.navigation.navigate('Profile')}
               // handle={() => props.navigation.goBack(null)}
                image={ global.logo != null ? global.logo : URL.Logo}
                title="Suppliers">
                <SearchHeader
                    search={data=>SearchFilterFunction(data)}
                    style={styles.selectorStyle}
                    placeholder="Search by name.."
                />
            </Header>
            <Heading datas={data} length={5} />
            {getLoader === false ? (
            <ScrollView horizontal={true} >
                <SendOrder
                    length={5}
                    style={{ backgroundColor: Theme.BACK }}
                    datas={getAllSuppliers}
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
