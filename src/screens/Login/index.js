import React, {Component} from 'react';
import {View,  SafeAreaView, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component { 
    render() {
      return (
        <View style={{flex:1, backgroundColor:'#000'}}>
          <SafeAreaView style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1, flexDirection:'column'}}>
              <View style={{flex:1}}></View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>                
                <Image source={require('../../assets/images/logo.png')} style={{width:'100%', height:'70%'}} resizeMode={"contain"} />
                <Text style={{color:'#717171', fontSize:22}} > Vibester </Text>
              </View>
            </View>
            <View style={{flex:1, flexDirection:'column', paddingHorizontal:30}}>
              <View style={{flex:1,}}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialCommunityIcons"}  name='email'  style={{color:'#717171'}} />
                  <Input placeholder='Email / User name' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1, }}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialCommunityIcons"}  name='lock'  style={{color:'#717171'}} />
                  <Input placeholder='Password' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1,flexDirection:'row', }}>
                <TouchableOpacity style={{width:'100%', height:'70%', backgroundColor:'#717171', alignItems:'center', justifyContent:'center', marginTop:'auto'}} activeOpacity={0.7} onPress={()=>{
                  NavigationService.navigate("Home")
                }} >
                  <Text style={{color:'#c6c6c6',fontSize:17}}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
              <View style={{flexDirection:'row', marginTop:30,}}>
                <Text  style={{color:'#717171', fontSize:17}}>
                  Dont have an account?  
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                  NavigationService.navigate("Register")
                }} >
                  <Text  style={{color:'#717171', fontSize:17}}> Create One</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', marginTop:30,}}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text  style={{color:'#717171', fontSize:17}}> Forgot your password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
