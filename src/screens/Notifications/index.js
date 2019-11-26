import React, {Component} from 'react';
import {View,  SafeAreaView, FlatList,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Button } from 'native-base';
const width = Dimensions.get("window").width
import { SwipeListView } from 'react-native-swipe-list-view';
export default class Notifications extends Component { 

  constructor (props) {
    super(props);
    this.state={
    }
  }

    render() {
      const DATA=[1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,];
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>            
            <View style={{flexDirection:'row', width:'100%',marginTop:10}}>
              <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=>{
                  this.props.navigation.goBack(null);
              }}>
                <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={{marginLeft:'auto', marginRight:10}} onPress={()=>{
                  
              }}>
                <Icon type={"MaterialCommunityIcons"} name="file-document-edit-outline" style={{color:'#fff', fontSize:20}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, width:'100%', marginVertical:20}}>
              <SwipeListView
                data={DATA}
                renderItem={ (item, rowMap) => (
                  <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#000', alignItems:'center',height:70, paddingHorizontal:20}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Profile",{type:'2'})
                  }}>
                    <Image style={{width:40, height:40, borderRadius:25}} source={require('../../assets/images/avatar.png')} />

                    <View style={{flexDirection:'row', marginLeft:30,flex:1}}>
                      <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={()=>{
                          NavigationService.navigate("SnapPage")
                        }}>
                        <Text style={{fontSize:9, color:'#467fd7',}}>Following name{item.index}{"  "}
                        <Icon type="FontAwesome" name="camera" style={{fontSize:9, color:'#467fd7',marginLeft:10}} />
                        </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          NavigationService.navigate("Chat");
                        }}>
                        <Text style={{fontSize:16, color:'#fff',}}>Following name{item.index}</Text> 
                        </TouchableOpacity>
                        <Text style={{fontSize:9, color:'#467fd7',}}>View</Text>
                      </View>
                      <View style={{flexDirection:'column', marginLeft:'auto', marginRight:10}}>
                        <Text style={{fontSize:9, color:'#fff',}}>12.37PM</Text>
                        <View style={{width:18,height:18,borderRadius:10,backgroundColor:'#467fd7', alignItems:'center', justifyContent:'center', marginLeft:'auto'}}>
                          <Text style={{fontSize:12, color:'#fff'}}>1</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                
                renderHiddenItem={ (data, rowMap) => (
                  <View style={{flexDirection:'row',height:70, alignItems:'center', paddingLeft:10}}>
                      <TouchableOpacity>
                        <Icon type={"MaterialIcons"} name="block"  style={{color:'#fff', fontSize:20}} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Icon type={"AntDesign"} name="delete"  style={{color:'#fff', fontSize:20, marginLeft:10}} />
                      </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={75}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
