import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Item, Input} from 'native-base';
const width = Dimensions.get('window').width;
import {Switch} from 'react-native-switch';
import {CheckBox} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class SelectProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      checks: [],
    };
  }

  componentDidMount = () => {
    let users = [];
    let checks = [];
    firebase
      .database()
      .ref('users')
      .orderByChild('isAdmin')
      .equalTo(true)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          users.push(item);
          if (global.checkedAdmins.includes(item.key)) checks.push(true);
          else checks.push(false);
        });
        this.setState({users, checks});
      });
  };

  tickCheck = index => {
    let checks = this.state.checks;
    checks[index] = !checks[index];
    this.setState({checks});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginVertical: 10, marginLeft: 10}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                type={'AntDesign'}
                name="arrowleft"
                style={{color: '#fff', fontSize: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: 10,
                marginLeft: 'auto',
                marginRight: 10,
              }}
              onPress={() => {
                global.checkedAdmins = [];
                for (let i = 0; i < this.state.checks.length; i++) {
                  if (this.state.checks[i]) {
                    global.checkedAdmins.push(this.state.users[i].key);
                  }
                }
                this.props.navigation.goBack();
              }}>
              <Text style={{color: '#fff', fontSize: 15}}>Done</Text>
            </TouchableOpacity>
          </View>
          <SearchBar
            containerStyle={{
              backgroundColor: '#000',
              padding: 0,
              height: undefined,
            }}
            inputContainerStyle={{
              padding: 0,
              margin: 0,
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderColor: '#fff',
              borderWidth: 1,
              margin: 0,
              height: 30,
            }}
            inputStyle={{padding: 0, fontSize: 14, margin: 0}}
            leftIconContainerStyle={{paddingVertical: 0}}
            placeholder="Search"
          />
          <View
            style={{
              flex: 1,
              width: '100%',
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FlatList
              data={this.state.users}
              extraData={this.state.checks}
              renderItem={item => {
                data = item.item.val();
                return (
                  <View
                    key={item.index}
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      backgroundColor: '#000',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                      source={{uri: data.avatar}}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        marginLeft: 10,
                      }}>
                      {data.username}
                    </Text>
                    <CheckBox
                      containerStyle={{marginLeft: 'auto'}}
                      checked={this.state.checks[item.index]}
                      onPress={() => this.tickCheck(item.index)}
                    />
                  </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
