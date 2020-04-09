import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Tab, Tabs, TabHeading} from 'native-base';
const width = Dimensions.get('window').width;
import {SearchBar} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
import firebase from 'react-native-firebase';
import AppUtils from '../../utils/AppUtlls';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class CameraComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: -1,
      stories: [],
      loading: false,
    };
  }

  saveImage = () => {
    this.setState({loading: true});
    let imageurl = this.props.navigation.getParam('image_uri', '');
    let image_type = this.props.navigation.getParam('image_type', '');

    console.log(image_type);

    let mime = 'application/octet-stream';

    let uri = imageurl;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;

    const imageRef = firebase
      .storage()
      .ref('data')
      .child(Date.now().toString());

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob.blobPath, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        let user_ref = firebase.database().ref('users/' + global.uid);
        if (global.userdata.uploads == undefined) global.userdata.uploads = [];
        global.userdata.uploads.push({url: url, type: image_type});
        user_ref
          .set(global.userdata)
          .then(() => {
            this.state.stories.forEach(item => {
              if (item.checked) {
                let story_ref = firebase
                  .database()
                  .ref('story/' + item.item.key);
                let story_data = item.item.val();

                if (story_data.uploads == undefined) story_data.uploads = [];
                story_data.uploads.push({url: url, type: image_type});
                story_ref
                  .set(story_data)
                  .then(() => {
                    this.setState({loading: false});
                    AppUtils.showToast('Successfully saved!');
                    NavigationService.navigate('Home');
                  })
                  .catch(error => {
                    console.log(error);

                    AppUtils.showToast('Try again!');
                    this.setState({loading: false});
                  });
              }
            });
            this.setState({loading: false});
          })
          .catch(error => {
            console.log(error);
            this.setState({loading: false});
          });
      });
  };

  componentDidMount = () => {
    let type = this.props.navigation.getParam('type', 0);
    this.setState({type: type});

    firebase
      .database()
      .ref('story')
      .orderByChild('user')
      .equalTo(global.uid)
      .once('value')
      .then(snapshot => {
        let stories = [];
        snapshot.forEach(item => {
          stories.push({item: item, checked: false});
        });
        this.setState({stories});
      });
  };

  render() {
    const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <Spinner size="large" visible={this.state.loading} />
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: 10}}
              onPress={() => {
                this.props.navigation.goBack(null);
              }}>
              <Icon
                type={'AntDesign'}
                name="arrowleft"
                style={{color: '#fff', fontSize: 20}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginRight: 10}}
              onPress={() => {
                this.saveImage();
                //NavigationService.navigate('Home');
              }}>
              <Icon
                type={'Ionicons'}
                name="ios-send"
                style={{color: '#fff', fontSize: 20}}
              />
            </TouchableOpacity>
          </View>

          {this.state.type != -1 && (
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    {paddingVertical: 10, paddingHorizontal: 20},
                    this.state.type == 0 && {
                      borderBottomColor: '#fff',
                      borderBottomWidth: 2,
                    },
                  ]}
                  onPress={() => {
                    this.setState({type: 0});
                  }}>
                  <Text style={{fontSize: 14, color: '#fff'}}>
                    Add to venue
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    {paddingVertical: 10, paddingHorizontal: 20},
                    this.state.type == 1 && {
                      borderBottomColor: '#fff',
                      borderBottomWidth: 2,
                    },
                  ]}
                  onPress={() => {
                    this.setState({type: 1});
                  }}>
                  <Text style={{fontSize: 14, color: '#fff'}}>Friends</Text>
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
                  backgroundColor: '#000',
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                  borderWidth: 1,
                  margin: 0,
                  height: 30,
                }}
                inputStyle={{
                  padding: 0,
                  fontSize: 14,
                  margin: 0,
                }}
                leftIconContainerStyle={{paddingVertical: 0}}
                placeholder="Search"
              />
              <View style={{flex: 1.3}}>
                {this.state.type == 0 && (
                  <FlatList
                    style={{backgroundColor: '#000'}}
                    data={this.state.stories}
                    renderItem={({item, index}) => {
                      let story_data = item.item.val();
                      return (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}
                          activeOpacity={0.8}
                          onPress={() => {
                            NavigationService.navigate('Profile', {
                              type: '2',
                              uid: story_data.user,
                            });
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              marginLeft: 10,
                            }}>
                            {story_data.name}
                          </Text>
                          <CheckBox
                            containerStyle={{marginLeft: 'auto'}}
                            checked={item.checked}
                            onPress={() => {
                              let stories = this.state.stories;
                              stories[index].checked = !stories[index].checked;
                              this.setState({stories});
                            }}
                          />
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={item => item.id}
                  />
                )}
                {this.state.type == 1 && (
                  <FlatList
                    style={{backgroundColor: '#000'}}
                    data={DATA}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#000',
                            alignItems: 'center',
                          }}
                          activeOpacity={0.8}
                          onPress={() => {
                            NavigationService.navigate('Profile', {type: '2'});
                          }}>
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                            }}
                            source={require('../../assets/images/avatar.png')}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              marginLeft: 10,
                            }}>
                            Following name{item}
                          </Text>
                          <CheckBox
                            containerStyle={{marginLeft: 'auto'}}
                            checked={true}
                          />
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={item => item.id}
                  />
                )}
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }
}
