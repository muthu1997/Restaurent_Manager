import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  RefreshControl,
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
            {item.id != null ? (
              <View
                style={[mainContainer, { ...props.style }]}>
                <Text lines={1}>{item.id}</Text>
              </View>
            ) : null }
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
              <View style={{ flexDirection: 'row', flex: 1}}>
                
                {item.orderStatus === 0 ? (
                  <View style={{flexDirection: 'row' }}>
                    <View style={{ marginHorizontal:5,justifyContent: 'center', alignItems: 'center' }}>
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
                    <View style={{ marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.cancelHandler(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="thumbs-down" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.getInvoice(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="download" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    <View style={{marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.resendHandler(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="envelope" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.share(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="share-alt" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => props.previewOrder(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="eye" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>
                    </View>
                    {item.mailStatus === 'false' ? (
                      <View style={{ marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => props.editOrder(item.transactionid, item.suppliername)} style={{ padding: 5 }} activeOpacity={0.9}>
                          <Icon name="edit" size={25} color={Theme.GRAY} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{ marginHorizontal:5, justifyContent: 'center', alignItems: 'center' }}>
                      {/* <TouchableOpacity hidden={true} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="edit" size={25} color={'lightgray'} />
                      </TouchableOpacity> */}
                    </View>
                      )}
                  </View>
                ) : item.orderStatus === 1 ? (
                  <View style={{ width: 310, flexDirection: 'row' }}>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>

                      <TouchableOpacity onPress={() => props.getInvoice(item.transactionid)} style={{ padding: 5 }} activeOpacity={0.9}>
                        <Icon name="download" size={25} color={Theme.GRAY} />
                      </TouchableOpacity>

                    </View>
                    <View style={{ width: 180, height: 30, alignSelf: 'center', borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                      <View style={[styles.receiver,{borderColor:'rgb(109,212,0)',backgroundColor:'rgba(109,212,0,0.1)'}]}>
                        <Icon name="thumbs-up" size={18} style={{marginRight:8}} color={'rgb(109,212,0)'} />
                        <Text style={{ color: 'rgb(109,212,0)' }}>Received</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                      <View style={{ width: 310, flexDirection: 'row', justifyContent: 'center' }}>
                        {props.pending === 'Yes' ? (
                            <View style={{ width: 180, position:'absolute',left:'20%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                              <View style={[styles.receiver,{borderColor:'rgb(247,181,0)',backgroundColor:'rgba(247,181,0,0.1'}]}>
                                <Icon name="hourglass-3" size={18} style={{marginRight:8}} color={'rgb(247,181,0)'} />
                                <Text style={{ color: 'rgb(247,181,0)' }}>Pending</Text>
                              </View>
                            </View>
                        ) : (
                          <View style={{ width: 180, position:'absolute',left:'20%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.receiver,{borderColor:'rgb(224,32,32)',backgroundColor:'rgba(224,32,32,0.1)'}]}>
                              <Icon name="thumbs-down" size={18} style={{marginRight:8}} color={'rgb(224,32,32)'} />
                              <Text style={{ color: 'rgb(224,32,32)' }}>Canceled</Text>
                            </View>
                          </View>
                          )}
                      </View>
                    )}

{item.mailStatus === 'false' ? (
                  <View style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 8, flexDirection: 'row' }}>
                    <Icon name="clock-o" size={25} color={Theme.GRAY} />
                    <Text style={{ padding: 5 }}>  Unread</Text>
                  </View>
                ) : (
                    <View style={{ width: '30%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 8, flexDirection: 'row' }}>
                      <Icon name="check-circle" size={25} color={Theme.SECONDARYGREEN} />
                      <Text style={{ padding: 5 }}>  Read {item.mailOpen}</Text>
                    </View>
                  )}
              </View>
            </View>
          </View>

        )}
        refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.mainFunction} />}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  secondContainer: {
    width: '100%',
    height: 40,
    backgroundColor:'rgb(250,250,250)' ,
    borderBottomWidth:0.5,
    borderColor:'gray'
  },
  receiver: {
    borderRadius:8,
    flexDirection:'row',
    width:'80%',
    height:'95%',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default DefaultHeader;
