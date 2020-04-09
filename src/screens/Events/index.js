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
import {Icon, Item, Input} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import AppUtils from '../../utils/AppUtlls';
import VideoView from '../camera/VideoView';

const width = Dimensions.get('window').width;

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      index: 0,
      user: null,
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({loading: true});
      var user = this.props.navigation.getParam('userdata');
      this.setState({user});
      this.setState({loading: false});
    });
  };
  _renderItem({item, index}) {
    return (
      <View style={{borderRadius: 20}}>
        {item.type == 'image' && (
          <Image
            source={{uri: item.url}}
            style={{
              borderRadius: 5,
              width: '100%',
              height: '100%',
            }}
            resizeMode={'cover'}
          />
        )}
        {item.type == 'video' && (
          <VideoView
            videourl={item.url}
            style={{
              borderRadius: 5,
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </View>
    );
  }
  render() {
    if (this.state.loading)
      return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <Spinner
            size="large"
            visible={this.state.loading}
            textContent="Loading..."
            textStyle={{color: '#fff'}}
            animation="fade"
          />
        </View>
      );
    else {
      const {index} = this.state;
      const {user} = this.state;
      var data = user.uploads[index];
      return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
            <View style={{width: '100%', marginVertical: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Icon
                  type="Entypo"
                  name="location-pin"
                  style={{color: '#f00', fontSize: 20}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#f7ba7b',
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}></Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: user.avatar}}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#fff',
                      fontWeight: 'bold',
                      marginLeft: 5,
                    }}>
                    {user.username}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginLeft: 'auto', marginRight: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    this.props.navigation.goBack(null);
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
              }}>
              {data.type == 'image' && (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: data.url,
                  }}
                  resizeMode={'cover'}
                />
              )}
              {data.type == 'video' && (
                <VideoView
                  videourl={data.url}
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}

              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="Feather"
                    name="trending-up"
                    style={{color: '#ccc', fontSize: 18}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      marginLeft: 5,
                    }}>
                    275
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Reach
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: width * 0.4,
                paddingBottom: 10,
              }}>
              <Carousel
                enableSnap={true}
                ref={c => {
                  this._carousel = c;
                }}
                data={user.uploads}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={width * 0.4}
                loop={true}
                onSnapToItem={index => {
                  this.setState({index});
                }}
                loopClonesPerSide={user.uploads.length}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
}
