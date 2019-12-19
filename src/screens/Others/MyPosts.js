import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,FlatList,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Tab, Tabs, TabHeading } from 'native-base';
const width = Dimensions.get("window").width

export default class MyPosts extends Component { 

  constructor (props) {
    super(props);
    this.state={
      type:-1,
    }
  }

  componentDidMount = () =>{
    let type = this.props.navigation.getParam("type",0);
    this.setState({type:type});
  }

    render() {
      const DATA=[1,2,3,4];
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column',}}>
            <Text style={{fontSize:18, color:'#fff', marginLeft:10, alignSelf:'center' }}>Posts</Text>   
            <View style={{flexDirection:'row', width:'100%',marginTop:10}}>
              <View style={{width:50}}>
                <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=>{
                    this.props.navigation.goBack(null);
                }}>
                  <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
                </TouchableOpacity>
              </View>
            </View>

              <View style={{flex:1.3}}>
                <FlatList style={{backgroundColor:'#000',paddingHorizontal:20}}
                  data={DATA}
                    renderItem={({ item }) =>{
                        return (
                          <View style={{flexDirection:'column', marginVertical:5, backgroundColor:'#f5a44d', alignItems:'center',paddingHorizontal:20, paddingVertical:10}} activeOpacity={0.8} onPress={()=>{
                            NavigationService.navigate("Profile",{type:'2'})
                          }}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center', marginVertical:5}}>
                            <TouchableOpacity onPress={()=>{
                                NavigationService.navigate("EditPrivateEvent")
                              }}>
                              <Text style={{fontSize:16, color:'#fff', }}>My Birthday Party</Text>   
                              </TouchableOpacity>
                              <Text style={{fontSize:12, color:'#fff',}}>Private Event</Text>   
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center', marginVertical:5}}>
                              <View style={{flexDirection:'row', alignItems:'center'}} >                                
                                <Image style={{width:15, height:15, borderRadius:20}} source={require('../../assets/images/avatar.png')} />
                                <TouchableOpacity style={{ marginLeft:10, }} onPress={()=>{
                                  NavigationService.navigate("Profile",{type:2});
                                }}>
                                <Text style={{fontSize:14, color:'#fff', }}>SUZAN OKORIE</Text>   
                                </TouchableOpacity>
                              </View>
                              <Text style={{fontSize:10, color:'#fff', }}>27/12/2019   10:30PM - 02:00AM</Text>   
                            </View>
                            <Text style={{fontSize:10, color:'#fff', alignSelf:'flex-start'}}>
                              <Icon type={"Ionicons"} name="ios-pin" style={{color:'#fff',fontSize:15}} />15 McDonald St, Reading, Berkshire RG2 2GH</Text> 
                          </View>
                        );
                      }}
                    keyExtractor={item => item.id}
                />
              </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
