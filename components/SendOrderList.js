


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
            
              var lengths = props.length;
            
              return (
                <View>
                  <FlatList
                    data={props.datas}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View>
                        <View style={{flexDirection:'row',width:Dimensions.get('screen').width,borderBottomWidth:0.5,borderBottomColor:'lightgray'}}>
                        {item.id != null ? (
                        <View
                          style={[mainContainer,{...props.style,width:lengths[0]}]}> 
                          <Text lines={1}>{item.id}</Text>
                        </View> 
                        ) : null }
            
            {item.code != null ? (
                        <View
                          style={[mainContainer,{...props.style,width:lengths[1]}]}>
                          {props.handlecode != null ? (
                            <TouchableOpacity onPress={()=>props.handlecode(item.code)} >
                            <Text style={{textDecorationLine: 'underline',}} lines={1}>{item.code}</Text>
                            </TouchableOpacity>
                          ) : (
                            <Text lines={1}>{item.code}</Text>
                          )}
                        </View>
                        ) : null }
                        
                        {item.name != null ? (
                        <View
                          style={[mainContainer,{...props.style,width:lengths[2]}]}>
                          {props.handlename != null ? (
                            <TouchableOpacity onPress={()=>props.handlename(item.name)} >
                            <Text style={{textDecorationLine: 'underline',}} lines={1}>{item.name}</Text>
                            </TouchableOpacity>
                          ) : (
                            <Text lines={1}>{item.name}</Text>
                          )}
                        </View>
                        ) : null }
                        {item.quantity != null ? (
                        <View
                          style={[mainContainer,{...props.style,width:lengths[3]}]}>
                          <Text lines={1}>{item.quantity}</Text>
                        </View>
                        ) : null }
                        {item.price != null ? (
                        <View
                          style={[mainContainer,{...props.style,width:lengths[4]}]}>
                          <Text lines={1}>{item.price}</Text>
                        </View>
                        ) : null }
                        
                        <View
                          style={[mainContainer,{...props.style,width:lengths[5]}]}>
                          <Text lines={1}>{item.unit}</Text>
                        </View> 
                        
                        {item.total != null ? (
                        <View
                          style={[mainContainer,{...props.style,width:lengths[6],alignItems:'flex-end'}]}>
                          <Text lines={1}>{parseFloat(item.total).toFixed(2)}</Text>
                        </View>
                        ) : null }
                        
            
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
            