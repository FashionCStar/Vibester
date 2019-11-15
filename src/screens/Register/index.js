import React, {Component} from 'react';
import {View,  SafeAreaView, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

export default class Register extends Component { 
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
            <View style={{flex:2, flexDirection:'column', paddingHorizontal:30}}>
              <View style={{flex:1,}}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialIcons"}  name='person'  style={{color:'#717171'}} />
                  <Input placeholder='Full name' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1,}}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialIcons"}  name='person'  style={{color:'#717171'}} />
                  <Input placeholder='User name' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1,}}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialCommunityIcons"}  name='email'  style={{color:'#717171'}} />
                  <Input placeholder='Email' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1, }}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialCommunityIcons"}  name='lock'  style={{color:'#717171'}} />
                  <Input placeholder='Password' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1, }}>
                <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                  <Icon active type={"MaterialCommunityIcons"}  name='lock'  style={{color:'#717171'}} />
                  <Input placeholder='Confirm password' style={{fontSize:17}} />
                </Item>
              </View>
              <View style={{flex:1, alignItems:'center'}}>
                <View style={{flexDirection:'row', marginTop:'auto',}}>
                  <Text  style={{color:'#717171', fontSize:17}}>
                    Already have an account?  
                  </Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                    NavigationService.navigate("Login")
                  }}>
                    <Text  style={{color:'#717171', fontSize:17}}> Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flex:1, justifyContent:'center', paddingHorizontal:30}}>
              <View style={{flexDirection:'row', marginLeft:'auto',}}>
                <Text  style={{color:'#717171', fontSize:17, textAlignVertical:'center'}}>
                  Complete sign up 
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Image source={require('../../assets/images/signup.png')} style={{width:35, height:35}} resizeMode={"contain"} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
  
