import React, {Component} from 'react';
import {View,  SafeAreaView, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import AppUtils from '../../utils/AppUtlls';
import Axios from '../../Axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component { 
  
  constructor(props){
    super(props);
    this.state = {
      loading:false
    }
  }
  signin = () => {
    let _password = this._password._root._lastNativeText;
    let _username = this._username._root._lastNativeText;

    if(_password == undefined || _username == undefined)
    {
      AppUtils.showToast("Please input username and password");        
      return;
    }

    this.setState({loading:true});   
    
  //  NavigationService.navigate("Home");

    Axios.post('login', {
      username: _username,
      password: _password,
    })
    .then((response) => {
      console.log(response);
      let res=response.data;
      this.setState({loading:false});
      if(res.status=='ok')
      {        
        global.user_data = res.user;
        NavigationService.navigate("Home");
      } 
      else
      {
        AppUtils.showToast("Wrong username or password.");  
      }
    })
    .catch( (error) => {   
      console.log(error);
      this.setState({loading:false}); 
      AppUtils.showToast("Failed. Try again.");     
    });
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#000'}}>
        <SafeAreaView style={{flex:1, flexDirection:'column'}}>
          <Spinner
            size="large"
            visible={this.state.loading}
          />
          <View style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>                
              <Image source={require('../../assets/images/logo.png')} style={{width:'100%', height:'30%'}} resizeMode={"contain"} />
              <Text style={{color:'#717171', fontSize:22}} > Vibester </Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection:'column', paddingHorizontal:30}}>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialCommunityIcons"}  name='email'  style={{color:'#717171'}} />
                <Input placeholder='Email / User name' style={{fontSize:17, color:'#fff'}}  ref={c=>this._username=c} />
              </Item>
            </View>
            <View style={{flex:1, }}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialCommunityIcons"}  name='lock'  style={{color:'#717171'}} />
                <Input placeholder='Password' style={{fontSize:17, color:'#fff'}}  ref={c=>this._password=c} />
              </Item>
            </View>
            <View style={{flex:1,flexDirection:'row', }}>
              <TouchableOpacity style={{width:'100%', height:'70%', backgroundColor:'#717171', alignItems:'center', justifyContent:'center', marginTop:'auto'}} activeOpacity={0.7} onPress={()=>{
                this.signin();
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
  
