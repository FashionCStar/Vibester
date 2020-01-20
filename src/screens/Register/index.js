import React, {Component} from 'react';
import {View,  SafeAreaView, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import Toast from 'react-native-root-toast'; 
import AppUtils from '../../utils/AppUtlls';
import Axios from '../../Axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Register extends Component { 

  constructor(props){
    super(props);
    this.state = {
      loading:false
    }
  }

  componentDidMount(){

  }

  signup = () => {
    let _password = this._password._root._lastNativeText;
    let _pwconfirm = this._pwconfirm._root._lastNativeText;
    let _fullname = this._fullname._root._lastNativeText;
    let _username = this._username._root._lastNativeText;
    let _email = this._email._root._lastNativeText;
    if(_password!=_pwconfirm)
    {
      AppUtils.showToast("Password doen't match");
      this._password._root.clear();
      this._pwconfirm._root.clear();
      return;
    }
    if (!AppUtils.validateEmail(_email))
    {
      AppUtils.showToast("Please input valid email address");
      return;
    }
    this.setState({loading:true});      
    Axios.post('register', {
      fullname: _fullname,
      username: _username,
      email: _email,
      password: _password,
    })
    .then((response) => {
      console.log(response);
      let res=response.data;
      this.setState({loading:false});
      if(res.status=='ok')
      {        
        Toast.show('Sign up successed.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor:'#fff',
          textColor:'#000',
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          onHidden: () => {
            NavigationService.navigate("Login");
          }
        });      
      } 
      else if(res.status=='duplicated')
      {
        AppUtils.showToast(res.data);  
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
              <Image source={require('../../assets/images/logo.png')} style={{width:'100%', height:'70%'}} resizeMode={"contain"} />
              <Text style={{color:'#717171', fontSize:22}} > Vibester </Text>
            </View>
          </View>
          <View style={{flex:2, flexDirection:'column', paddingHorizontal:30}}>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialIcons"}  name='person'  style={{color:'#717171'}} />
                <Input placeholder='Full name' style={{fontSize:17, color:'#fff'}} ref={c=>this._fullname=c} />
              </Item>
            </View>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialIcons"}  name='person'  style={{color:'#717171'}} />
                <Input placeholder='User name' style={{fontSize:17, color:'#fff'}} ref={c=>this._username=c} />
              </Item>
            </View>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialCommunityIcons"}  name='email'  style={{color:'#717171'}} />
                <Input placeholder='Email' style={{fontSize:17, color:'#fff'}} ref={c=>this._email=c} />
              </Item>
            </View>
            <View style={{flex:1, }}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialCommunityIcons"}  name='lock'  style={{color:'#717171'}} />
                <Input placeholder='Password' style={{fontSize:17, color:'#fff'}} secureTextEntry={true} ref={c=>this._password=c} />
              </Item>
            </View>
            <View style={{flex:1, }}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialCommunityIcons"}  name='lock'  style={{color:'#717171'}} />
                <Input placeholder='Confirm password' style={{fontSize:17, color:'#fff'}}  secureTextEntry={true} ref={c=>this._pwconfirm=c} />
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
              <TouchableOpacity activeOpacity={0.7} onPress = {()=>{
                this.signup();
              }}>
                <Image source={require('../../assets/images/signup.png')} style={{width:35, height:35}} resizeMode={"contain"} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
  
