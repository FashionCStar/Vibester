import React, {Component} from 'react';
import {View,  SafeAreaView, FlatList,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Button } from 'native-base';
import Footer from '../common/Footer'
const width = Dimensions.get("window").width
import { SwipeListView } from 'react-native-swipe-list-view';
import { from } from 'rxjs';
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
            <View style={{flexDirection:'row', width:'100%',marginTop:10}}>
              <Text style={{color:'#fff', fontSize:30, marginLeft:20}}>
                Vibes
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', right:20, bottom:0}} onPress={()=>{
                  NavigationService.navigate("SelectProfiles")
              }}>
                <Icon type={"MaterialCommunityIcons"} name="file-document-edit-outline" style={{color:'#fff', fontSize:25}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, width:'100%', marginTop:20, marginBottom:5}}>
              <SwipeListView
                data={DATA}
                renderItem={ (item, rowMap) =>{ 
                  if(item.index%4==0)
                  return (
                  <View style={{flexDirection:'row', backgroundColor:'#000', alignItems:'center',height:70, paddingLeft:30, paddingRight:20}}>
                    <TouchableOpacity activeOpacity={0.8}  onPress={()=>{
                      NavigationService.navigate("Profile",{type:'2'})
                    }}>
                      <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row', marginLeft:30,flex:1}} onPress={()=>{
                          NavigationService.navigate("SnapPage")
                        }}>
                      <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:9, color:'#467fd7',}}>Vibes{"  "}
                        <Icon type="FontAwesome" name="camera" style={{fontSize:9, color:'#467fd7',marginLeft:10}} />
                        </Text>  
                        <Text style={{fontSize:16, color:'#fff',}}>Following name{item.index}</Text> 
                        <Text style={{fontSize:9, color:'#467fd7',}}>View</Text>
                      </View>
                      <View style={{flexDirection:'column', marginLeft:'auto', marginRight:10}}>
                        <Text style={{fontSize:9, color:'#fff',}}>12.37PM</Text>
                        <View style={{width:18,height:18,borderRadius:10,backgroundColor:'#467fd7', alignItems:'center', justifyContent:'center', marginLeft:'auto'}}>
                          <Text style={{fontSize:12, color:'#fff'}}>1</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
                else  if(item.index%4==1)
                {
                  return (
                  <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#000', alignItems:'center',height:70, paddingLeft:30, paddingRight:20}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Profile",{type:'2'})
                  }}>
                    <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />

                    <View style={{flexDirection:'row', marginLeft:30,flex:1}}>
                      <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={()=>{
                          NavigationService.navigate("Chat")
                        }}>
                        <Text style={{fontSize:9, color:'#467fd7',}}>message{"  "}
                        <Icon type="SimpleLineIcons" name="bubble" style={{fontSize:9, color:'#467fd7',marginLeft:10}} />
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
                )
                }
                else  if(item.index%4==2)
                {
                  return (
                  <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#000', alignItems:'center',height:70, paddingLeft:30, paddingRight:20}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Profile",{type:'2'})
                  }}>
                    <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />

                    <View style={{flexDirection:'row', marginLeft:30,flex:1}}>
                      <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={()=>{
                        }}>
                        <Text style={{fontSize:9, color:'#fff',}}>Sam's Birthday
                        </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          NavigationService.navigate("PrivateChat");
                        }}>
                        <Text style={{fontSize:16, color:'#fff',}}>Tiana Sabro{item.index}</Text> 
                        </TouchableOpacity>
                        <Text style={{fontSize:9, color:'#fff',}}>Opened...</Text>
                      </View>
                      <View style={{flexDirection:'column', marginLeft:'auto', marginRight:10}}>
                        <Text style={{fontSize:9, color:'#fff',}}>Yesterday</Text>
                        {/* <View style={{width:18,height:18,borderRadius:10,backgroundColor:'#467fd7', alignItems:'center', justifyContent:'center', marginLeft:'auto'}}>
                          <Text style={{fontSize:12, color:'#fff'}}>1</Text>
                        </View> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )
                }
                
                else  if(item.index%4==3)
                {
                  return (
                  <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#000', alignItems:'center',height:70, paddingLeft:30, paddingRight:20}} activeOpacity={0.8} onPress={()=>{
                    NavigationService.navigate("Home")
                  }}>
                    <Image style={{width:35, height:35, borderRadius:25}} source={require('../../assets/images/avatar.png')} />

                    <View style={{flexDirection:'row', marginLeft:30,flex:1}}>
                      <View style={{flexDirection:'column'}}>
                        <View onPress={()=>{
                        }}>
                        <Text style={{fontSize:9, color:'#fff',}}>Venue{"  "}
                        <Icon type="SimpleLineIcons" name="location-pin" style={{fontSize:9, color:'#ffffff',marginLeft:10}} />
                        </Text>  
                        </View>
                        <TouchableOpacity onPress={()=>{
                          NavigationService.navigate("Home");
                        }}>
                        <Text style={{fontSize:16, color:'#fff',}}>Tiana Sabro{item.index}</Text> 
                        </TouchableOpacity>
                        <Text style={{fontSize:9, color:'#fff',}}>Opened...</Text>
                      </View>
                      <View style={{flexDirection:'column', marginLeft:'auto', marginRight:10}}>
                        <Text style={{fontSize:9, color:'#fff',}}>Yesterday</Text>
                        {/* <View style={{width:18,height:18,borderRadius:10,backgroundColor:'#467fd7', alignItems:'center', justifyContent:'center', marginLeft:'auto'}}>
                          <Text style={{fontSize:12, color:'#fff'}}>1</Text>
                        </View> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )
                }
                }}
                
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
            
            <Footer />
          </SafeAreaView>
        </View>
      );
    }
  }
  
