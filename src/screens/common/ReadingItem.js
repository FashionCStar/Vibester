import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import FitImage from 'react-native-fit-image';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

const width = Dimensions.get("window").width


export default class ReadingItem extends Component { 

  constructor (props) {
    super(props);
  }
  render() {
    return (
    <View style={{flexDirection:'column', padding:10, width:this.props.width, alignItems:'center'}}>        
      <Image source = {require("../../assets/images/temp/image2.jpg")} style={{width:this.props.width-20, height:this.props.width-30, borderRadius:10}} />
      <View style={{width:this.props.width-20,flexDirection:'column', marginTop:5}}>
        <Text style={{ color:'#fff', fontSize:9, flexWrap:'wrap',}} textBreakStrategy={"highQuality"} >
        A one of a kind night! Hosted by DJ Colin Franklin and friends to buy your tickets, 
        </Text>
        <View style={{flexDirection:'row',alignItems:'center', marginTop:10}}>
          <Text style={{color:'#fff', fontSize:9,}}>
              10pm-3am
          </Text>
          <Text style={{color:'#fff', fontSize:9, marginLeft:30}}>
              17/11/2019
          </Text>
          <TouchableOpacity style={{marginLeft:'auto'}}>
              <Icon type={"FontAwesome"} name="heart-o" style={{color:'#fff', fontSize:9, marginLeft:'auto'}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    );
  }
}