import React, {Component} from 'react';
import {View,  SafeAreaView, FlatList,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Button } from 'native-base';
const width = Dimensions.get("window").width
import { SwipeListView } from 'react-native-swipe-list-view';
export default class Vibes extends Component { 

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
            <View style={{flexDirection:'column', width:'100%',marginTop:10}}>
            <TouchableOpacity activeOpacity={0.8} style={{marginVertical:10, marginLeft:10}} onPress={()=>{
                this.props.navigation.goBack(null);
            }}>
              <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
            </TouchableOpacity>
              <Text style={{color:'#fff', fontSize:20, marginLeft:20}}>
                Notifications
              </Text>
            </View>
            <View style={{flex:1, width:'100%', marginVertical:20}}>
              <SwipeListView
                data={DATA}
                renderItem={ (item, rowMap) =>{ 
                  if(item.index%4==0)
                  {
                    return (
                      <View style={{flexDirection:'row', backgroundColor:'#111', alignItems:'center',height:100, paddingLeft:30, paddingRight:20, margin:5}} activeOpacity={0.8}>
                        <TouchableOpacity  onPress={()=>{
                        NavigationService.navigate("Profile",{type:'2'})
                      }}>
                        <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'column', marginLeft:30,flex:1}} onPress={
                            ()=>{
                                NavigationService.navigate("EventInvite");
                            }
                        }>
                            <Text style={{fontSize:16, color:'#fff',}}>A. Samanther sent you a friend request </Text> 
                            
                          <View style={{flexDirection:'row', }}>
                          <TouchableOpacity>
                            <Text style={{fontSize:16, color:'#0f0',}}>Accept</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20}}>
                            <Text style={{fontSize:16, color:'#f00',}}>Reject</Text> 
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }
                  else if(item.index%4==1)
                  {
                    return (
                      <View style={{flexDirection:'row', backgroundColor:'#111', alignItems:'center',height:100, paddingLeft:30, paddingRight:20, margin:5}} activeOpacity={0.8}>
                        <TouchableOpacity  onPress={()=>{
                        NavigationService.navigate("Profile",{type:'2'})
                      }}>
                        <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'column', marginLeft:30,flex:1}}>
                          <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:16, color:'#fff',}}>Taz Summer added an event to their likes. </Text> 
                            <Text style={{fontSize:16, color:'#048',}}>"House Every Evening"</Text> 
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }  
                  if(item.index%4==2)
                  {
                    return (
                      <View style={{flexDirection:'row', backgroundColor:'#111', alignItems:'center',height:100, paddingLeft:30, paddingRight:20, margin:5}} activeOpacity={0.8}>
                        <TouchableOpacity  onPress={()=>{
                        NavigationService.navigate("Profile",{type:'2'})
                      }}>
                        <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'column', marginLeft:30,flex:1}} onPress={
                            ()=>{
                                NavigationService.navigate("EventInvite");
                            }
                        }>
                            <Text style={{fontSize:16, color:'#fff',}}>SUZAN OKORIE sent you an invites to a private event </Text> 
                            <Text style={{fontSize:16, color:'#048',}}> "MY BIRTHDAY PARTY".</Text> 
                            
                          <View style={{flexDirection:'row', }}>
                          <TouchableOpacity>
                            <Text style={{fontSize:16, color:'#0f0',}}>Accept</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:20}}>
                            <Text style={{fontSize:16, color:'#f00',}}>Reject</Text> 
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }   
                  else if(item.index%4==3)
                  {
                    return (
                      <View style={{flexDirection:'row', backgroundColor:'#111', alignItems:'center',height:100, paddingLeft:30, paddingRight:20, margin:5}} activeOpacity={0.8}>
                        <TouchableOpacity  onPress={()=>{
                        NavigationService.navigate("Profile",{type:'2'})
                      }}>
                        <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'column', marginLeft:30,flex:1}}>
                          <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize:16, color:'#fff',}}>Jordan Avery accepted your friend request</Text> 
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }        
                }}
                
                renderHiddenItem={ (data, rowMap) => (
                  <View style={{flexDirection:'row',height:100, alignItems:'center', paddingLeft:10}}>
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
  
