import React, {Component} from 'react';
import {View,  SafeAreaView, ScrollView,StatusBar,Image,Platform,Text,TouchableOpacity,Dimensions} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import FitImage from 'react-native-fit-image';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
import firebase from 'react-native-firebase'

const width = Dimensions.get("window").width


export default class Venue extends Component { 

  constructor (props) {
    super(props);
    this.state={
        like:false,
        showMenu:false,
        data:{},
        user:{}
    }
  }
  toggleMenu = () => {
    this.setState({
        showMenu:!this.state.showMenu
    })
  }

  componentDidMount(){      
    let data = this.props.item;
    this.setState({data:data});
    firebase.database().ref("users/"+data.user).orderByKey().limitToFirst(1).once("value").then((snapshot)=>{
        snapshot.forEach((item)=>{            
            this.setState({user:item.val()});
        })
    })
  }

  render() {


    return (
    <View style={{width:'100%', flexDirection:'column'}}>
        <View style={{flexDirection:'row', alignItems:'stretch', justifyContent:'space-between',paddingVertical:5}}>
            <TouchableOpacity style={{flexDirection:'row', marginLeft:20, alignItems:'center'}} onPress={()=>{
                NavigationService.navigate("Events")
            }}>
            <Image source={require('../../assets/images/temp/image1.jpg')} style={{width:36, height:36, borderRadius:18, borderWidth:2, borderColor:'#f5a44d',}}/>
            <View style={{flexDirection:'column', marginLeft:5,}}>
                <Text style={{color:'#fff', fontSize:14}}>{this.state.user.fullname}</Text>
                <View style={{flexDirection:'row'}}>
                <Icon type={"Ionicons"} name="ios-pin" style={{color:'#d98020',fontSize:15}} />
                <Text style={{color:'#fff', fontSize:10, marginLeft:5}}>2km</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row', alignItems:'flex-end',paddingHorizontal:10}}>
                <Text style={{color:'#fff', fontSize:12, alignSelf:'center', marginRight:10, marginLeft:'auto'}}>Like</Text>
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        like:!this.state.like
                    })
                }}>
                {!this.state.like&&
                <Icon type={"Ionicons"} name="ios-heart-empty" style={{color:'#fff', fontSize:18}} />}
                {this.state.like&&
                <Icon type={"Ionicons"} name="ios-heart" style={{color:'#fff', fontSize:18}} />}
                </TouchableOpacity>
            </View>
            <Text style={{color:'#fff', fontSize:12, alignSelf:'flex-end', marginRight:10}}>12.8K users like this venue</Text>
            </View>
        </View>
        <FitImage source = {{uri:this.state.data.imageurl}} style={{width:width,height:width*0.8}} />
        <View style={{width:'100%', paddingVertical:8,flexDirection:'column'}}>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}>
            <Text style={{color:'#fff', fontSize:10}}>10pm - 2am</Text>
            <TouchableOpacity onPress={()=>{
                NavigationService.navigate("SelectVenues")
            }}>
            <Icon type={"Ionicons"} name="ios-send" style={{color:'#d1d1d1', fontSize:20}} />
            </TouchableOpacity>
            </View>
            <View style={{width:'100%', paddingHorizontal:10, justifyContent:'space-between', alignItems:'center', flexDirection:'row' }}>
                <Text style={{flex:1, color:'#fff', fontSize:11, flexWrap:'wrap',}} textBreakStrategy={"highQuality"} >
               {this.state.data.description}
                </Text>
                <TouchableOpacity ref={(c)=>this._menubtn=c} onPress={()=>{
                    this.toggleMenu();
                }}>
                    <Icon type={"MaterialCommunityIcons"} name="dots-vertical" style={{color:'#fff', fontSize:13}} />
                </TouchableOpacity>
                {this.state.showMenu&&
                <View style={{position:'absolute', right:20, top:20, backgroundColor:'#fff', padding:5}}>
                    <TouchableOpacity>
                        <Text>Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Block</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    </View>
    );
  }
}