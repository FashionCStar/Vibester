import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Item, Input} from 'native-base';
import Toast from 'react-native-root-toast';
import AppUtils from '../../utils/AppUtlls';
import axios from '../../Axios';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}

  signup = () => {
    let _password = this._password._root._lastNativeText;
    let _pwconfirm = this._pwconfirm._root._lastNativeText;
    let _fullname = this._fullname._root._lastNativeText;
    let _username = this._username._root._lastNativeText;
    let _email = this._email._root._lastNativeText;
    if (_password != _pwconfirm) {
      AppUtils.showToast("Password doen't match");
      this._password._root.clear();
      this._pwconfirm._root.clear();
      return;
    }

    // this.setState({loading: true});

    const data = new FormData();
    data.append('fullname', _fullname);
    data.append('username', _username);
    data.append('email', _email);
    data.append('password', _password);
    data.append('_method', 'PATCH');
    if (this.state.avatarSource != null)
      data.append('avatar', {
        uri: this.state.avatarSource.uri,
        type: this.state.avatarSource.type,
        name: 'avatar',
      });
    const config = {
      headers: {
        'content-type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };

    fetch('http://192.168.207.77/api/register', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(res => console.log(res));
    axios
      .post('register', data, config)
      .then(response => {
        this.setState({loading: false});
        let res = response.data;
        console.log(res);
        if (res.status == 'ok') {
          Toast.show('Sign up successed.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: '#fff',
            textColor: '#000',
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onHidden: () => {
              NavigationService.navigate('Login');
            },
          });
        } else if (res.status == 'duplicated') {
          AppUtils.showToast(res.data + ' duplicated. Try other.');
        }
      })
      .catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  };

  selectAvatar = () => {
    const options = {
      title: 'Select Avatar',
      mediaType: 'image',
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        var path = response;
        this.setState({
          avatarSource: path,
        });
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Spinner size="large" visible={this.state.loading} />

          <KeyboardAvoidingView
            style={{flex: 1, height: '100%'}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <ScrollView
              style={{
                flex: 1,
                height: '100%',
              }}>
              <View
                style={{
                  marginTop: 50,
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/logo.png')}
                    style={{width: 100, height: 50}}
                    resizeMode={'contain'}
                  />
                  <Text style={{color: '#717171', fontSize: 22}}>Vibester</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 30,
                  marginTop: 15,
                }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.selectAvatar();
                    }}>
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                      source={
                        this.state.avatarSource == null
                          ? require('../../assets/images/avatar.png')
                          : {uri: this.state.avatarSource.uri}
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <Item style={{borderColor: '#717171', marginTop: 'auto'}}>
                    <Icon
                      active
                      type={'MaterialIcons'}
                      name="person"
                      style={{color: '#717171'}}
                    />
                    <Input
                      placeholder="Full name"
                      style={{fontSize: 17, color: '#717171'}}
                      ref={c => (this._fullname = c)}
                    />
                  </Item>
                </View>
                <View style={{flex: 1}}>
                  <Item style={{borderColor: '#717171', marginTop: 'auto'}}>
                    <Icon
                      active
                      type={'MaterialIcons'}
                      name="person"
                      style={{color: '#717171'}}
                    />
                    <Input
                      placeholder="User name"
                      style={{fontSize: 17, color: '#717171'}}
                      ref={c => (this._username = c)}
                    />
                  </Item>
                </View>
                <View style={{flex: 1}}>
                  <Item style={{borderColor: '#717171', marginTop: 'auto'}}>
                    <Icon
                      active
                      type={'MaterialCommunityIcons'}
                      name="email"
                      style={{color: '#717171'}}
                    />
                    <Input
                      placeholder="Email"
                      style={{fontSize: 17, color: '#717171'}}
                      ref={c => (this._email = c)}
                    />
                  </Item>
                </View>
                <View style={{flex: 1}}>
                  <Item style={{borderColor: '#717171', marginTop: 'auto'}}>
                    <Icon
                      active
                      type={'MaterialCommunityIcons'}
                      name="lock"
                      style={{color: '#717171'}}
                    />
                    <Input
                      placeholder="Password"
                      style={{fontSize: 17, color: '#fff'}}
                      secureTextEntry={true}
                      ref={c => (this._password = c)}
                    />
                  </Item>
                </View>
                <View style={{flex: 1}}>
                  <Item style={{borderColor: '#717171', marginTop: 'auto'}}>
                    <Icon
                      active
                      type={'MaterialCommunityIcons'}
                      name="lock"
                      style={{color: '#717171'}}
                    />
                    <Input
                      placeholder="Confirm password"
                      style={{fontSize: 17, color: '#fff'}}
                      secureTextEntry={true}
                      ref={c => (this._pwconfirm = c)}
                    />
                  </Item>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', marginTop: 'auto'}}>
                    <Text style={{color: '#717171', fontSize: 17}}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        NavigationService.navigate('Login');
                      }}>
                      <Text style={{color: '#717171', fontSize: 17}}>
                        {' '}
                        Sign in
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 20,
                  justifyContent: 'center',
                  paddingHorizontal: 30,
                }}>
                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                  <Text
                    style={{
                      color: '#717171',
                      fontSize: 17,
                      textAlignVertical: 'center',
                    }}>
                    Complete sign up
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.signup();
                    }}>
                    <Image
                      source={require('../../assets/images/signup.png')}
                      style={{width: 35, height: 35}}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}
