import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import Theme from '../assets/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
const dummyHeight = Dimensions.get('window').height;
const dummyWidth = Dimensions.get('window').width;


const DefaultHeader = props => {
  const getLength = props.length;
  const mainTitlewidth = Dimensions.get('window').width >= 500 ? dummyWidth / getLength : dummyHeight / getLength;
  const mainContainer = {
    padding: 5,
    width: mainTitlewidth,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderBottomColor: Theme.SECONDARY,
    backgroundColor: Theme.WHITE,
    paddingVertical: 8
  };


  return (
    <View>
      <FlatList
        data={props.datas}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View
                style={[mainContainer, { ...props.style, width:40 }]}>
                <Text lines={1}>{item.id}</Text>
              </View>
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.transactionid}</Text>
              </View>
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.suppliername}</Text>
              </View>
              {item.outletname != null ? (
                <View
                  style={[mainContainer, { ...props.style }]}>
                  <Text lines={1}>{item.outletname}</Text>
                </View>
              ) : null}
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.orderdate}</Text>
              </View>
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.deliverydate}</Text>
              </View>
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.deliveryday}</Text>
              </View>
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.ordertotal}</Text>
              </View>
            </View>
            <View style={styles.secondContainer}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                {item.mailStatus === 'no' ? (
                  <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 8, flexDirection: 'row' }}>
                    <Icon name="clock-o" size={25} color={Theme.SECONDARY} />
                    <Text style={{ padding: 5 }}>Unread</Text>
                  </View>
                ) : (
                    <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 8, flexDirection: 'row' }}>
                      <Icon name="check-circle" size={25} color={Theme.SECONDARYGREEN} />
                      <Text style={{ padding: 5 }}>Read {item.mailOpen}</Text>
                    </View>
                  )}

                {item.orderStatus === 0 ? (
                  <View style={{ width: '50%', flexDirection: 'row' }}>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                      {item.hidden ? (
                        <TouchableOpacity hidden={true} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="thumbs-up" size={25} color={"lightgray"} />
                      </TouchableOpacity>
                      ) : (
                          <TouchableOpacity onPress={() => props.receiveHandler(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                            <Icon name="thumbs-up" size={25} color={Theme.GRAY} />
                          </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.cancelHandler(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="thumbs-down" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.getInvoice(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="download" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.resendHandler(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="envelope" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    {item.mailStatus === 'no' ? (
                      <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => props.editOrder(item.transactionid, item.suppliername)} style={{ padding: 5 }} activeOpacity={0.9}>
                          <Icon name="edit" size={25} color={Theme.GRAY} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                        // <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        //   <TouchableOpacity style={{ padding: 5 }} activeOpacity={0.9}>
                        //     <Icon name="check-circle" size={25} color={Theme.GREEN} />
                        //   </TouchableOpacity>
                        // </View>
                        null
                      )}
                  </View>
                ) : item.orderStatus === 1 ? (
                  <View style={{ width: '50%', flexDirection: 'row' }}>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                      <TouchableOpacity onPress={() => props.getInvoice(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="download" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>

                    </View>
                    <View style={{ width: '75%', height: 30, alignSelf: 'center', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: Theme.GREEN }}>
                      <Text style={{ color: Theme.WHITE }}>Received</Text>
                    </View>
                  </View>
                ) : (
                      <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'center' }}>
                        {props.pending === 'Yes' ? (
                          <View style={{ width: '80%', height: 30, alignSelf: 'center', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: Theme.ORANGE }}>
                            <Text style={{ color: Theme.WHITE }}>Pending</Text>
                          </View>
                        ) : (
                            <View style={{ width: '80%', height: 30, alignSelf: 'center', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: Theme.RED }}>
                              <Text style={{ color: Theme.WHITE }}>Cancelled</Text>
                            </View>
                          )}
                      </View>
                    )}
              </View>
            </View>
          </View>

        )}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  secondContainer: {
    width: '100%',
    height: 40,
    backgroundColor: Theme.LIGHT
  }
});

export default DefaultHeader;
