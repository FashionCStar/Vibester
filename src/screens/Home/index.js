import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Image,
  Alert,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Item, Input, Button} from 'native-base';
import Footer from '../common/Footer';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
import Venue from '../common/Venue';
import Modal from 'react-native-modal';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
var moment = require('moment');

const width = Dimensions.get('window').width;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      entries: [1, 23, 4, 5, 6, 0, 8, 9, 1],
      filter: false,
      loading: true,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      Geolocation.getCurrentPosition(info => {
        Geocoder.geocodePosition({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        })
          .then(res => {
            global.currentLocation = {
              lat: info.coords.latitude,
              lng: info.coords.longitude,
              city: res[0].adminArea,
            };
          })
          .catch(error => {
            console.log(error);
          });
      });
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );

      this.setState({
        shows: [],
        loading: true,
      });

      let shows = [];

      this.setState({loading: true});

      firebase
        .database()
        .ref('story')
        .once('value')
        .then(snapshot => {
          snapshot.forEach(item => {
            let data = item.val();
            var date = new Date();
            date.setDate(date.getDate() - 1);
            let timestamp = date.getTime() / 1000;
            //  if (data.isPublic && data.create_time > timestamp) {
            shows.push(item);

            //   }
          });

          console.log(shows);

          this.setState({
            shows: shows,
            loading: false,
          });
        })
        .catch(error => {
          this.setState({loading: false});
          console.log(error);
        });
    });
  };
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    Alert.alert(
      '',
      'Are you sure exit?',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  }

  _renderItem({item, index}) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={{flexDirection: 'column', width: '100%', height: '100%'}}
          onPress={() => {
            NavigationService.navigate('Events');
          }}>
          <Text style={{color: '#fff', fontSize: 13}}> Jess S </Text>
          <View style={{flex: 1, width: '90%', borderRadius: 10}}>
            <FitImage
              source={require('../../assets/images/temp/image1.jpg')}
              style={{borderRadius: 10, overflow: 'hidden'}}
              resizeMode={'cover'}
            />
          </View>
          <Text style={{color: '#fff', fontSize: 13, alignSelf: 'flex-end'}}>
            {' '}
            10k{' '}
            <Icon
              type="Feather"
              name="trending-up"
              style={{color: '#fff', fontSize: 13}}
            />{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  _renderItem1({item, index}) {
    return (
      <View
        style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('Profile', {type: 2});
          }}>
          <Image
            source={require('../../assets/images/temp/image1.jpg')}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: '#f5a44d',
            }}
          />
        </TouchableOpacity>
        <Text style={{color: '#fff', marginLeft: 5}}>
          Jess S{'\n'}10k Impressions{item}
        </Text>
      </View>
    );
  }
  render() {
    const DATA = [1, 2, 3, 4, 5, 6, 7, 8];

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
    else
      return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <Modal
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            isVisible={this.state.filter}
            style={{
              padding: 0,
              backgroundColor: '#0f1e2e',
              width: '75%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              margin: 0,
            }}>
            <SafeAreaView
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 18, alignSelf: 'center'}}>
                Filter
              </Text>
              <View style={{width: '100%', flexDirection: 'row'}}>
                <Text style={{color: '#fff', fontSize: 13}}>Reading</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{marginLeft: 'auto'}}>
                  <Text style={{color: '#fff', fontSize: 13}}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{marginLeft: 30}}
                  onPress={() => {
                    this.setState({filter: false});
                  }}>
                  <Text style={{color: '#fff', fontSize: 13}}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                <Text style={{color: '#fff', fontSize: 13}}>Show only</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#f5f2f2',
                    paddingVertical: 20,
                    width: '100%',
                    marginVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#0f1e2e',
                      fontSize: 13,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Nightclub
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#f5f2f2',
                    paddingVertical: 20,
                    width: '100%',
                    marginVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#0f1e2e',
                      fontSize: 13,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Bars
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#f5f2f2',
                    paddingVertical: 20,
                    width: '100%',
                    marginVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#0f1e2e',
                      fontSize: 13,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Events
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#f5f2f2',
                    paddingVertical: 20,
                    width: '100%',
                    marginVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#0f1e2e',
                      fontSize: 13,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Activities
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#f5f2f2',
                    paddingVertical: 20,
                    width: '100%',
                    marginVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#0f1e2e',
                      fontSize: 13,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
          <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 7,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    NavigationService.navigate('AddItemScreen');
                  }}>
                  {/* <Icon type={"AntDesign"} name="plus" style={{color:'#fff', fontSize:25, fontWeight:'bold'}}/> */}
                  <Text
                    style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                    +
                  </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('Notifications');
                    }}>
                    <Icon
                      type={'FontAwesome'}
                      name="bell-o"
                      style={{color: '#e2e2e2', fontSize: 25}}
                    />
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: '#e20f00',
                        alignItem: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        position: 'absolute',
                        top: 0,
                        right: -4,
                        borderRadius: 7,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 9,
                          textAlign: 'center',
                        }}>
                        4
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 30}}
                    activeOpacity={0.7}
                    onPress={() => {
                      this.setState({filter: true});
                    }}>
                    <Icon
                      type={'FontAwesome'}
                      name="filter"
                      style={{color: '#e2e2e2', fontSize: 25}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{width: '100%', flex: 1, flexDirection: 'column'}}>
                <View
                  style={{
                    width: '100%',
                    height: width * 0.25,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      flexDirection: 'column',
                      width: '25%',
                      height: '100%',
                    }}
                    onPress={() => {
                      NavigationService.navigate('Events');
                    }}>
                    <Text style={{color: '#d98020', fontSize: 13}}>
                      {' '}
                      Local Story{' '}
                    </Text>
                    <View style={{flex: 1, width: '90%', borderRadius: 10}}>
                      <FitImage
                        source={require('../../assets/images/temp/image1.jpg')}
                        style={{borderRadius: 10, overflow: 'hidden'}}
                        resizeMode={'cover'}
                      />
                    </View>
                    <Text style={{color: '#fff', fontSize: 13}}> </Text>
                  </TouchableOpacity>
                  <View style={{flex: 1}}>
                    <Carousel
                      enableSnap={true}
                      ref={c => {
                        this._carousel = c;
                      }}
                      data={this.state.entries}
                      renderItem={this._renderItem}
                      sliderWidth={width * 0.75}
                      itemWidth={width * 0.25}
                      inactiveSlideScale={1}
                      inactiveSlideOpacity={1}
                      loop={true}
                      onSnapToItem={index => {
                        //     this._carousel1.snapToItem(index);
                      }}
                      loopClonesPerSide={this.state.entries.length}
                    />
                  </View>
                </View>
                <View style={{flex: 2, flexDirection: 'column'}}>
                  <Text style={{color: '#fff', fontSize: 12, marginLeft: 10}}>
                    Venues
                  </Text>
                  <ScrollView style={{width: '100%', flex: 1}}>
                    {this.state.shows.map((item, index) => {
                      return <Venue item={item} key={index} />;
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>
            <Footer />
          </SafeAreaView>
        </View>
      );
  }
}
