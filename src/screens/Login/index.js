import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Item, Input} from 'native-base';
import AppUtils from '../../utils/AppUtlls';
import Axios from '../../Axios';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  signin = () => {
    let _password = this._password._root._lastNativeText;
    let _email = this._username._root._lastNativeText;

    if (_password == undefined || _email == undefined) {
      AppUtils.showToast('Please input email and password');
      return;
    }

    this.setState({loading: true});

    //  NavigationService.navigate("Home");

    firebase
      .auth()
      .signInWithEmailAndPassword(_email, _password)
      .then(result => {
        console.log(result);

        firebase
          .database()
          .ref('/users/' + result.user.uid)
          .once('value')
          .then(snapshot => {
            this.setState({loading: false});
            if (snapshot.val() == null) {
              firebase
                .auth()
                .currentUser.delete()
                .then(() => {
                  AppUtils.showToast('Wrong Email or password.');
                });
            } else {
              global.userdata = snapshot.val();
              global.uid = result.user.uid;
              AppUtils.showToast('Login Success!');
              NavigationService.navigate('Home');
            }
          })
          .catch(error => {
            this.setState({loading: false});
            AppUtils.showToast('Try again.');
          });
      })
      .catch(error => {
        this.setState({loading: false});
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          AppUtils.showToast('Wrong password.');
        } else if (errorCode === 'auth/not-found') {
          AppUtils.showToast('Not Registered.');
        } else {
          AppUtils.showToast('Wrong email or password, Or Not registered');
        }
        console.log(error);
      });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Spinner size="large" visible={this.state.loading} />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1}}></View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{width: '100%', height: '30%'}}
                resizeMode={'contain'}
              />
              <Text style={{color: '#717171', fontSize: 22}}> Vibester </Text>
            </View>
          </View>
          <View
            style={{flex: 1, flexDirection: 'column', paddingHorizontal: 30}}>
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
                  ref={c => (this._username = c)}
                  value="maxjerry0107@hotmail.com"
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
                  secureTextEntry={true}
                  style={{fontSize: 17, color: '#717171'}}
                  ref={c => (this._password = c)}
                  value="wyet7e38w6w"
                />
              </Item>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '70%',
                  backgroundColor: '#717171',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 'auto',
                }}
                activeOpacity={0.7}
                onPress={() => {
                  this.signin();
                }}>
                <Text style={{color: '#c6c6c6', fontSize: 17}}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', marginTop: 30}}>
              <Text style={{color: '#717171', fontSize: 17}}>
                Dont have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  NavigationService.navigate('Register');
                }}>
                <Text style={{color: '#717171', fontSize: 17}}>
                  {' '}
                  Create One
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 30}}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={{color: '#717171', fontSize: 17}}>
                  {' '}
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
