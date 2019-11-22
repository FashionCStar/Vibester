import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
const width = Dimensions.get("window").width


export default class AddItemScreen extends Component { 

  constructor (props) {
    super(props);
  }

    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column'}}>
            <TouchableOpacity activeOpacity={0.8} style={{marginTop:10, marginLeft:10}} onPress={()=>{
                this.props.navigation.goBack(null);
            }}>
              <Icon type={"AntDesign"} name="arrowleft" style={{color:'#fff', fontSize:20}}/>
            </TouchableOpacity>
            <View style={{flex:1, width:'100%', padding:30}}>
              <TouchableOpacity style={{width:'100%', height:'18%', marginVertical:10, backgroundColor:'#1c1b1b', justifyContent:'center'}} activeOpacity={0.7}>
                <Text style={{color:'#fff', fontSize:27, alignSelf:'center'}}>Create an event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width:'100%', height:'18%', marginVertical:10, backgroundColor:'#1c1b1b', justifyContent:'center'}} activeOpacity={0.7} onPress={()=>{
                NavigationService.navigate("AddVenueScreen");
              }}>
                <Text style={{color:'#fff', fontSize:27, alignSelf:'center'}}>Add a venue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width:'100%', height:'18%', marginVertical:10, backgroundColor:'#1c1b1b', justifyContent:'center'}} activeOpacity={0.7}>
                <Text style={{color:'#fff', fontSize:27, alignSelf:'center'}}>Add activity</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
