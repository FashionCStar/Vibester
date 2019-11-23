import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import FitImage from 'react-native-fit-image';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

const width = Dimensions.get("window").width


export default class Venue extends Component { 

  constructor (props) {
    super(props);
  }
  hideMenu = () => {
    this._menu.hide();
  }
  showMenu = () => {
      this._menu.show(this._menubtn.current, Position.BOTTOM_CENTER);
  }
  render() {
    return (
    <View style={{width:'100%', flexDirection:'column'}}>
        <View style={{flexDirection:'row', alignItems:'stretch', justifyContent:'space-between',paddingVertical:5}}>
            <View style={{flexDirection:'row', marginLeft:20, alignItems:'center'}}>
            <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:36, height:36, borderRadius:18, borderWidth:2, borderColor:'#f5a44d',}}/>
            <View style={{flexDirection:'column', marginLeft:5,}}>
                <Text style={{color:'#fff', fontSize:14}}>TRU Ctzn</Text>
                <View style={{flexDirection:'row'}}>
                <Icon type={"Ionicons"} name="ios-pin" style={{color:'#d98020',fontSize:15}} />
                <Text style={{color:'#fff', fontSize:10, marginLeft:5}}>2km</Text>
                </View>
            </View>
            </View>
            <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row', alignItems:'flex-end',paddingHorizontal:10}}>
                <Text style={{color:'#fff', fontSize:12, alignSelf:'center', marginRight:10, marginLeft:'auto'}}>Like</Text>
                <TouchableOpacity>
                <Icon type={"Ionicons"} name="ios-heart-empty" style={{color:'#fff', fontSize:18}} />
                </TouchableOpacity>
            </View>
            <Text style={{color:'#fff', fontSize:12, alignSelf:'flex-end', marginRight:10}}>12.8K users like this venue</Text>
            </View>
        </View>
        <FitImage source = {require("../../assets/images/temp/image2.jpg")} style={{width:width,height:width*0.8}} />
        <View style={{width:'100%', paddingVertical:8,flexDirection:'column'}}>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}>
            <Text style={{color:'#fff', fontSize:10}}>10pm - 2am</Text>
            <Icon type={"Ionicons"} name="ios-send" style={{color:'#d1d1d1', fontSize:20}} />
            </View>
            <View style={{width:'100%', paddingHorizontal:10, justifyContent:'space-between', alignItems:'center', flexDirection:'row' }}>
            <Text style={{flex:1, color:'#fff', fontSize:11, flexWrap:'wrap',}} textBreakStrategy={"highQuality"} >
            A one of a kind night! Hosted by DJ Colin Franklin and friends to buy your tickets, please visit our profile page and click on the link
            </Text>
            <TouchableOpacity ref={(c)=>this._menubtn=c} onPress={()=>{
                this.showMenu();
            }}>
                <Icon type={"MaterialCommunityIcons"} name="dots-vertical" style={{color:'#fff', fontSize:13}} />
            </TouchableOpacity>
            
            <Menu
                ref={(c)=>this._menu=c}
            >
                <MenuItem onPress={()=>{this.hideMenu()}}>Report</MenuItem>
                <MenuItem onPress={()=>{this.hideMenu()}}>Block</MenuItem>
            </Menu>
            </View>
        </View>
    </View>
    );
  }
}