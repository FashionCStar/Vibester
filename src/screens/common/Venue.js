import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Item, Input} from 'native-base';
import FitImage from 'react-native-fit-image';

import firebase from 'react-native-firebase';
import VideoView from '../camera/VideoView';

import AppUtils from '../../utils/AppUtlls';

const width = Dimensions.get('window').width;

export default class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      showMenu: false,
      user: {},
      data: {},
    };
  }
  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  likeVenue = () => {
    let item = this.props.item;
    let ref = firebase.database().ref('story/' + item.key);
    let data = this.state.data;
    let likes = data.likes == null ? [] : data.likes;

    if (!this.state.like) {
      likes.push(global.uid);
    } else {
      likes.splice(likes.indexOf(global.uid), 1);
    }

    data = {
      ...data,
      likes: likes,
    };

    ref.set(data).then(() => {
      userref = firebase.database().ref('users/' + global.uid);

      let venue_data = item.val();

      if (
        global.userdata.venue_like == null ||
        global.userdata.venue_like.length == 0
      )
        global.userdata.venue_like = [];
      if (!this.state.like) {
        global.userdata.venue_like.push({
          name: venue_data.name,
          key: item.key,
        });
      } else {
        global.userdata.venue_like = global.userdata.venue_like.filter(
          like_item => like_item.key != item.key,
        );
      }

      userref.set(global.userdata).then(() => {
        this.setState({
          like: !this.state.like,
          data: data,
        });
      });
    });
  };

  getLikesCount = () => {
    let data = this.state.data;
    let likes = data.likes == null ? [] : data.likes;
    return likes.length;
  };

  componentDidMount() {
    let data = this.props.item.val();
    this.setState({data});

    let likes = data.likes == null ? [] : data.likes;
    if (likes.includes(global.uid)) this.setState({like: true});
    else this.setState({like: false});

    firebase
      .database()
      .ref('users/' + data.user)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() != null) this.setState({user: snapshot.val()});
        else this.setState({user: {avatar: null, fullname: ''}});
      });
  }

  render() {
    let data = this.props.item.val();
    return (
      <View style={{width: '100%', flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}
            onPress={() => {
              firebase
                .database()
                .ref('users/' + data.user)
                .once('value')
                .then(snapshot => {
                  if (snapshot.val() != null) {
                    let userdata = snapshot.val();
                    if (userdata.uploads == undefined) {
                      AppUtils.showToast('No data to show.');
                    } else {
                      userdata.uploads = userdata.uploads.filter(function(el) {
                        return el != null;
                      });
                      NavigationService.navigate('Events', {
                        userdata: userdata,
                      });
                    }
                  } else {
                    AppUtils.showToast('No data to show.');
                  }
                });
            }}>
            <Image
              source={{uri: this.state.user.avatar}}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderWidth: 2,
                borderColor: '#f5a44d',
              }}
            />
            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text style={{color: '#fff', fontSize: 14}}>{data.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type={'Ionicons'}
                  name="ios-pin"
                  style={{color: '#d98020', fontSize: 15}}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 10,
                    marginLeft: 5,
                  }}>
                  2km
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  alignSelf: 'center',
                  marginRight: 10,
                  marginLeft: 'auto',
                }}>
                Like
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.likeVenue();
                }}>
                {!this.state.like && (
                  <Icon
                    type={'Ionicons'}
                    name="ios-heart-empty"
                    style={{color: '#fff', fontSize: 18}}
                  />
                )}
                {this.state.like && (
                  <Icon
                    type={'Ionicons'}
                    name="ios-heart"
                    style={{color: '#fff', fontSize: 18}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                alignSelf: 'flex-end',
                marginRight: 10,
              }}>
              {this.getLikesCount()} users like this venue
            </Text>
          </View>
        </View>

        {data.imageType == 'image' && (
          <FitImage
            source={{uri: data.imageurl}}
            style={{width: width, height: width * 0.8}}
          />
        )}
        {data.imageType == 'video' && (
          <VideoView
            videourl={data.imageurl}
            style={{width: width, height: width * 0.8}}
          />
        )}

        <View
          style={{
            width: '100%',
            paddingVertical: 8,
            flexDirection: 'column',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 10}}>10pm - 2am</Text>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('SelectVenues');
              }}>
              <Icon
                type={'Ionicons'}
                name="ios-send"
                style={{color: '#d1d1d1', fontSize: 20}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                fontSize: 15,
                flexWrap: 'wrap',
              }}
              textBreakStrategy={'highQuality'}>
              {data.description}
            </Text>
            <TouchableOpacity
              ref={c => (this._menubtn = c)}
              onPress={() => {
                this.toggleMenu();
              }}>
              <Icon
                type={'MaterialCommunityIcons'}
                name="dots-vertical"
                style={{color: '#fff', fontSize: 13}}
              />
            </TouchableOpacity>
            {this.state.showMenu && (
              <View
                style={{
                  position: 'absolute',
                  right: 30,
                  bottom: 0,
                  backgroundColor: '#fff',
                  padding: 5,
                }}>
                <TouchableOpacity>
                  <Text>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Block</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
