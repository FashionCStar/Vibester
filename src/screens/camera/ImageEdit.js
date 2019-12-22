'use strict';
import React, {Component,PureComponent } from 'react';
import {View,  Alert, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking, SafeAreaView} from 'react-native';
import NavigationService from '../../NavigationService'
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getBottomSpace, isIphoneX  } from 'react-native-iphone-x-helper'

export default class ImageEdit extends PureComponent  { 
    constructor (props){
        super(props);
        this.state = {
            image_uri:"",
            width:0,
            height:0
        }
    }

    componentDidMount = () =>{
        let image_uri = this.props.navigation.getParam("image_uri","");
        if(image_uri == "")
        {
            this.props.navigation.goBack();
        }
        this.setState({
            image_uri:image_uri
        })
        Image.getSize(image_uri, (width, height) => {this.setState({width, height})});
    }

    render() {
        
        return (
            <View style={{flex:1}}>
                       
            <Image source={{uri:this.state.image_uri}} style={{width:'100%', height:'100%', backgroundColor:'#000'}} resizeMode={this.state.width>this.state.height?"contain":"stretch"} />

            <View style={{position:'absolute',width:'100%', top:isIphoneX()?getStatusBarHeight()+10:10, flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity style={{position:'absolute', left:10, top:0}} onPress={()=>{
                    this.props.navigation.goBack();
                }}>
                <Icon type={"MaterialIcons"} name="close" style={{color:'#fff', fontSize:25,}} />
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute', right:10, top:0}} onPress={()=>{
                    NavigationService.navigate("CameraComplete", {type:0});
                }}>
                 <Icon type={"Ionicons"} name="ios-send" style={{color:'#fff', fontSize:30,}} />
                </TouchableOpacity>
            </View>
           
            </View>
        );
        }
    
    }
        