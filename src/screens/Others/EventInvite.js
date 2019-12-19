import React, {Component} from 'react';
import {View,  SafeAreaView, StatusBar,Image,FlatList,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Tab, Tabs, TabHeading } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
const width = Dimensions.get("window").width

export default class EventInvite extends Component { 

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
            <View style={{flexDirection:'row', width:'100%',marginVertical:10}}>
              <View style={{width:50}}>
                <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=>{
                    this.props.navigation.goBack(null);
                }}>
                  <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex:1.3, paddingHorizontal:10,}}>
              <Image source={require('../../assets/images/temp/image2.jpg')} style={{width:'100%', height:300,}} />
              <View style={{marginVertical:10, flexDirection:'row', justifyContent:'space-between', padding:10}}>
                <Text style={{color:'#fff'}}>Suzan Okorie</Text>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{
                    NavigationService.navigate("PrivateChat")
                  }}>
                    <Text style={{color:'#0f0'}}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{color:'#f00', marginLeft:10}}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView>
                <Text style={{color:'#fff',fontSize:20}}>My Birthday Party</Text>
                <View style={{paddingHorizontal:10}}>
                <Text style={{color:'#fff',fontSize:13, marginTop:20}}>Event description</Text>
                <Text style={{color:'#fff',fontSize:13}}>_______________________________________________________________________________________________________</Text>
                <Text style={{color:'#fff',fontSize:13, marginTop:20}}>Address</Text>
                <Text style={{color:'#fff',fontSize:13}}>_______________________________________________________________________________________________________</Text>
                </View>
                <Text style={{color:'#fff', fontSize:12, textDecorationStyle:'dashed', textDecorationLine:'underline', marginLeft:10, marginTop:10}}>Invited</Text>
                {
                  DATA.map(({item, index})=>{
                    return (
                      <View style={{flexDirection:'row', marginVertical:5, paddingHorizontal:10}}>
                      <TouchableOpacity onPress={()=>{
                        NavigationService.navigate("Profile",{type:2});
                      }}>
                        <Image style={{width:20, height:20, borderRadius:20}} source={require('../../assets/images/avatar.png')} />
                        </TouchableOpacity>
                          <Text style={{fontSize:13, color:'#fff', marginLeft:10,  }}>Profile name{item}</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
