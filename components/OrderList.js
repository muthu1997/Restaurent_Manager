import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import Theme from '../assets/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const mainButtonWidth = Dimensions.get('window').width >= 500 ? '50%' : '80%';
const dummyHeight = Dimensions.get('window').height;
const dummyWidth = Dimensions.get('screen').width;
const mainImage = Dimensions.get('window').width >= 500 ? 40 : 30;


const DefaultHeader = props => {
  const getLength = props.length; 
  const mainTitlewidth = Dimensions.get('screen').width >= 500 ? dummyWidth/getLength : dummyHeight/getLength;
  const mainContainer = {
                padding: 5,
                paddingVertical:8,
                width: mainTitlewidth,
                borderBottomWidth: 0.5,
                justifyContent:'center',
                borderBottomColor: Theme.SECONDARY,
                backgroundColor: Theme.SECONDARY,
              };

              const EmptyView = () => {
                return (
                  <View style={{width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center',marginTop:50}}>
                    <Text style={{color:"gray"}}>No data found...</Text>
                  </View>
                )
              }

  return (
    <View>
      <FlatList
        data={props.datas}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{flex:1,borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
          <View style={{flexDirection:'row',flex:1}}>
            {item.id ? (
            <View
              style={[mainContainer,{...props.style,width:40}]}> 
              <Text lines={1}>{item.id}</Text>
            </View> 
            ) : null }
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.code}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.name}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.quantity}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.price}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.unit}</Text>
            </View>
            <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.total}</Text>
            </View>
            {item.next1 ? (
              <View
              style={[mainContainer,{...props.style}]}>
              <Text lines={1}>{item.next1}</Text>
            </View>
            ) : null }
            {/* {item.next2 ? (
              <View
              style={[mainContainer,{...props.style, backgroundColor:Theme.GREEN}]}>
                  <Text lines={1}>Downloaded</Text>
              </View>
            ) : (
              <View
              style={[mainContainer,{...props.style, backgroundColor:Theme.RED}]}>
                  <Text lines={1}>Not Downloaded</Text>
              </View>
            ) } */}
            
          </View>
          
          <View style={{width:'100%',flexDirection:'row', justifyContent:'flex-start'}}>

          <View style={{width:'10%',justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>props.addOrder(item.name,item.price,item.code)} style={{padding:5}} activeOpacity={0.9}>
              <Icon name = "plus-circle" size={25} color={Theme.GRAY} />
            </TouchableOpacity>
          </View>
          
          <View style={{width:'10%',justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>props.getInvoice(item.name,item.price,item.code,item.quantity)} style={{padding:5}} activeOpacity={0.9}>
              <Icon name = "edit" size={25} color={Theme.GRAY} />
            </TouchableOpacity>
          </View>
          {props.third ? (
          <View style={{width:'10%',justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>props.handle3(item.quantity)} style={{padding:5}} activeOpacity={0.9}>
              <Icon name = "image" size={25} color={Theme.GRAY} />
            </TouchableOpacity>
          </View>
          ) : null }

          </View>
          </View>
          
        )}
        ListEmptyComponent = {EmptyView}
        refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.mainFunction} />}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
 
});

export default DefaultHeader;
