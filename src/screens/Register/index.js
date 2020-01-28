import React, {Component} from 'react';
import {View,  SafeAreaView, ImageBackground,StatusBar,Image,Platform,Text,TouchableOpacity,Linking} from 'react-native';
import NavigationService from '../../NavigationService'
import { Icon, Item, Input } from 'native-base';
import Toast from 'react-native-root-toast'; 
import AppUtils from '../../utils/AppUtlls';
import Axios from '../../Axios';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


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

    this.setState({loading:true});     
    
    firebase.auth().createUserWithEmailAndPassword(_email, _password)
      .then((data)=>{

        let mime = 'application/octet-stream';

        let uri = this.state.avatarSource;
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null

        const imageRef = firebase.storage().ref("data").child(Date.now().toString());

        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob.blobPath, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL();
          })
          .then((url)=>{
            let ref = firebase.database().ref("users/"+data.user.uid);
            ref.set({
              fullname : _fullname,
              username : _username,
              email : _email,
              avatar : url
            })
            this.setState({loading:false})
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
          })
          .catch((error) => {
            this.setState({loading:false})
            AppUtils.showToast("Try again");
        })
      })
      .catch((error) => {
        this.setState({loading:false});   
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          AppUtils.showToast('The password is too weak.');
        } else {
          AppUtils.showToast(errorMessage);
        }
        console.log(error);
      });
    
  }

  selectAvatar = () =>{
    const options = {
      title: 'Select Avatar',
      mediaType: "image",
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else if (response.customButton) {
      }
      else {        
        var path = response.uri;
        this.setState({
          avatarSource: path,
        });
      }
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
          <View style={{flex:0.5, flexDirection:'column'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>                
              <Image source={require('../../assets/images/logo.png')} style={{width:'100%', height:'70%'}} resizeMode={"contain"} />
              <Text style={{color:'#717171', fontSize:22}} > Vibester </Text>
            </View>
          </View>
          <View style={{flex:2, flexDirection:'column', paddingHorizontal:30, marginTop:15}}>
            <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                this.selectAvatar();
              }}>
                <Image style={{height:100, width:100, borderRadius:50, borderWidth:1, borderColor:'#fff'}} 
                source={this.state.avatarSource==null?require('../../assets/images/avatar.png'):{uri:this.state.avatarSource}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialIcons"}  name='person'  style={{color:'#717171'}} />
                <Input placeholder='Full name' style={{fontSize:17, color:'#717171'}} ref={c=>this._fullname=c} />
              </Item>
            </View>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialIcons"}  name='person'  style={{color:'#717171'}} />
                <Input placeholder='User name' style={{fontSize:17, color:'#717171'}} ref={c=>this._username=c} />
              </Item>
            </View>
            <View style={{flex:1,}}>
              <Item style={{borderColor:'#717171', marginTop:'auto'}}>
                <Icon active type={"MaterialCommunityIcons"}  name='email'  style={{color:'#717171'}} />
                <Input placeholder='Email' style={{fontSize:17, color:'#717171'}} ref={c=>this._email=c} />
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
          <View style={{flex:0.3, justifyContent:'center', paddingHorizontal:30}}>
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
  
