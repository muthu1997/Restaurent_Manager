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
    OrderList
} from '../../components';
import Theme from '../../assets/Theme';
import SupplierHandler from '../../functions/getSupplierById';
import URL from '../../assets/url';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setLightEstimationEnabled } from 'expo/build/AR';
const mainTextTitle = Dimensions.get('window').width >= 500 ? 22 : 18;

const mainImageWidth = Dimensions.get('window').width >= 500 ? 115 : 85;

const SupplierList = props => {

    const [getLogo, setLogo] = useState(null);
    const [getMail, setMail] = useState();


    useEffect(() => {
        getCompanyName();
        AsyncStorage.getItem('Company_Logo')
            .then(data => {
                if (data) {
                    setLogo(data);
                } 
            })
    }, [])

    const getCompanyName = () => {
        AsyncStorage.getItem('Email')
            .then(data => {
                if (data) {
                    setMail(data);
                } 
            })
    }

    const logout = () => {
        AsyncStorage.removeItem('Outlet_Id');
        AsyncStorage.removeItem('Company_Id');
        AsyncStorage.removeItem('Company_Logo');
        AsyncStorage.removeItem('Id');
        AsyncStorage.removeItem('Email');
        AsyncStorage.removeItem('LoginStatus');
        AsyncStorage.removeItem('Edit');
        AsyncStorage.removeItem('Role_id');
        AsyncStorage.removeItem('Company_Name');
        AsyncStorage.removeItem('Services');
        props.navigation.navigate('Login');
      }

    return (
        <View style={styles.mainContainer}>
            <Image
              style={{ width: mainImageWidth, height: mainImageWidth,margin:8 }}
              resizeMode="contain"
              source={ global.logo }
            /> 
    <Text style={styles.mailtext}>{getMail}</Text>
            <Button handle={logout} title="Logout Now" />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Theme.BACK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectorStyle: {
        backgroundColor: Theme.WHITE,
        marginTop: 15
    },
    mailtext: {
        fontWeight:'bold',
        color: Theme.PRIMARY,
        fontSize:25,
        marginVertical:10
    }
});

export default SupplierList;
