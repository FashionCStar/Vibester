import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon} from 'native-base';
import Footer from '../common/Footer';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import AppUtils from '../../utils/AppUtlls';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const width = Dimensions.get('window').width;

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      showReportBtn: false,
      loading: false,
      userdata: {},
    };
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      let type = this.props.navigation.getParam('type', '1');
      if (type != '1') {
        let uid = this.props.navigation.getParam('uid', '');
        console.log(uid);
        firebase
          .database()
          .ref('users/' + uid)
          .once('value')
          .then(snapshot => {
            this.setState({
              userdata: snapshot.val(),
            });
            console.log(snapshot.val());
          });
      } else {
        this.setState({userdata: global.userdata});
      }
    });
  };

  saveUserData = () => {
    this.setState({loading: true});
    console.log(this._username);
    let _username = this._username._lastNativeText;
    let _fullname = this._fullname._lastNativeText;
    let _bio = this._bio._lastNativeText;
    let _interest = this._interest._lastNativeText;
    let _likes = this._likes._lastNativeText;
    let _links = this._links._lastNativeText;

    global.userdata = {
      ...global.userdata,
      fullname: _fullname,
      username: _username,
      bio: _bio,
      interest: _interest,
      venue_like: _likes,
      link: _links,
    };

    let ref = firebase.database().ref('users/' + global.uid);
    ref
      .set(global.userdata)
      .then(() => {
        this.setState({loading: false});
        AppUtils.showToast('Successfully saved!');
      })
      .catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  };

  updateImage = (path, image_type) => {
    this.setState({loading: true});

    let mime = 'application/octet-stream';

    let uri = path;
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
        if (image_type == 'cover')
          global.userdata = {
            ...global.userdata,
            cover: url,
          };
        if (image_type == 'avatar')
          global.userdata = {
            ...global.userdata,
            avatar: url,
          };
        let ref = firebase.database().ref('users/' + global.uid);
        ref
          .set(global.userdata)
          .then(() => {
            this.setState({loading: false});
            AppUtils.showToast('Successfully saved!');
          })
          .catch(error => {
            this.setState({loading: false});
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let type = this.props.navigation.getParam('type', '1'); //1 - mine, 2 - other
    let uid = this.props.navigation.getParam('uid', '');

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          flexDirection: 'column',
        }}>
        <ScrollView
          style={{flex: 1, width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <Spinner
            size="large"
            visible={this.state.loading}
            textStyle={{color: '#fff'}}
            textContent="Saving User Profile..."
          />
          <TouchableOpacity
            style={{width: width, height: width}}
            activeOpacity={1}
            onPress={() => {
              if (!this.state.isEditMode)
                NavigationService.navigate('Events', {
                  uid: uid,
                });
              else {
                const options = {
                  title: 'Select Cover Image',
                  mediaType: 'image',
                };
                ImagePicker.showImagePicker(options, response => {
                  if (response.didCancel) {
                  } else if (response.error) {
                  } else if (response.customButton) {
                  } else {
                    var path = response.uri;
                    this.updateImage(path, 'cover');
                  }
                });
              }
            }}>
            <ImageBackground
              source={{uri: this.state.userdata.cover}}
              style={{width: '100%', height: '100%'}}
              imageStyle={{resizeMode: 'cover'}}>
              <LinearGradient
                colors={['rgba(100,100,100,1)', 'rgba(0,0,0,0.05)']}
                style={{width: '100%', height: '100%'}}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0.6}}>
                <SafeAreaView>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    {type == '2' && (
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
                    )}
                    {type == '1' && (
                      <TouchableOpacity
                        style={{marginLeft: 'auto'}}
                        activeOpacity={0.7}
                        onPress={() => {
                          this.setState({isEditMode: true});
                        }}>
                        <Icon
                          type={'FontAwesome'}
                          name="edit"
                          style={{color: '#fff', fontSize: 25}}
                        />
                      </TouchableOpacity>
                    )}
                    {type == '1' && (
                      <TouchableOpacity
                        style={{marginLeft: 10, marginRight: 15}}
                        activeOpacity={0.7}
                        onPress={() => {
                          NavigationService.navigate('AccountSetting');
                        }}>
                        <Icon
                          type={'FontAwesome'}
                          name="cog"
                          style={{color: '#fff', fontSize: 25}}
                        />
                      </TouchableOpacity>
                    )}
                    {type == '2' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 'auto',
                        }}>
                        {this.state.showReportBtn && (
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                }}>
                                Report
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                }}>
                                Block
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        <TouchableOpacity
                          style={{
                            marginLeft: 15,
                            marginRight: 10,
                          }}
                          activeOpacity={0.7}
                          onPress={() => {
                            this.setState({
                              showReportBtn: !this.state.showReportBtn,
                            });
                          }}>
                          <Icon
                            type={'MaterialCommunityIcons'}
                            name="dots-vertical"
                            style={{color: '#fff', fontSize: 20}}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </SafeAreaView>
                <View
                  style={{
                    marginTop: 'auto',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    Tap to view
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {this.state.userdata.fullname}'s vibes
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{marginTop: -50, marginLeft: 30}}
                activeOpacity={0.9}
                onPress={() => {
                  if (!this.state.isEditMode)
                    NavigationService.navigate('Events', {
                      uid: global.uid,
                    });
                  else {
                    const options = {
                      title: 'Select Avatar Image',
                      mediaType: 'image',
                    };
                    ImagePicker.showImagePicker(options, response => {
                      if (response.didCancel) {
                      } else if (response.error) {
                      } else if (response.customButton) {
                      } else {
                        var path = response.uri;
                        this.updateImage(path, 'avatar');
                      }
                    });
                  }
                }}>
                <Image
                  style={{
                    width: 95,
                    height: 95,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#fff',
                    backgroundColor: '#fff',
                  }}
                  source={{uri: this.state.userdata.avatar}}
                />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    NavigationService.navigate('Follow', {
                      type: 0,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Following
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    361
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    NavigationService.navigate('Follow', {
                      type: 1,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Followers
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    706
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                paddingLeft: 24,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 15, color: '#fff'}}>User name: </Text>
                <TextInput
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: 0,
                  }}
                  ref={c => (this._username = c)}
                  editable={this.state.isEditMode}>
                  {this.state.userdata.username}
                </TextInput>
                {this.state.isEditMode && (
                  <Icon
                    type={'FontAwesome'}
                    name="pencil"
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      marginLeft: 10,
                    }}
                  />
                )}
                {this.state.isEditMode && (
                  <TouchableOpacity
                    style={{marginLeft: 'auto', marginRight: 20}}
                    activeOpacity={0.7}
                    onPress={() => {
                      this.setState({isEditMode: false});

                      this.saveUserData();
                    }}>
                    <Text style={{fontSize: 15, color: '#467fd7'}}>Done</Text>
                  </TouchableOpacity>
                )}
                {type == '2' && (
                  <TouchableOpacity
                    style={{marginLeft: 'auto', marginRight: 20}}
                    activeOpacity={0.7}
                    onPress={() => {}}>
                    <Text style={{fontSize: 15, color: '#f7ba7b'}}>Follow</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 15, color: '#fff'}}>Full name: </Text>
                <TextInput
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: 0,
                  }}
                  ref={c => (this._fullname = c)}
                  editable={this.state.isEditMode}>
                  {this.state.userdata.fullname}
                </TextInput>
                {this.state.isEditMode && (
                  <Icon
                    type={'FontAwesome'}
                    name="pencil"
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      marginLeft: 10,
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 14}}>Bio: </Text>
                <TextInput
                  ref={c => (this._bio = c)}
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    padding: 0,
                    margin: 0,
                    maxWidth: '70%',
                    fontWeight: 'bold',
                  }}
                  multiline={true}
                  editable={this.state.isEditMode}>
                  {this.state.userdata.bio}
                </TextInput>
                {this.state.isEditMode && (
                  <Icon
                    type={'FontAwesome'}
                    name="pencil"
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      marginLeft: 10,
                    }}
                  />
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 14}}>Interests: </Text>
                <TextInput
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    padding: 0,
                    margin: 0,
                    maxWidth: '70%',
                    fontWeight: 'bold',
                  }}
                  multiline={true}
                  ref={c => (this._interest = c)}
                  editable={this.state.isEditMode}>
                  {this.state.userdata.interest}
                </TextInput>
                {this.state.isEditMode && (
                  <Icon
                    type={'FontAwesome'}
                    name="pencil"
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      marginLeft: 10,
                    }}
                  />
                )}
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 14}}>Liked veues: </Text>
                <View style={{flexDirection: 'column', paddingHorizontal: 10}}>
                  {this.state.userdata.venue_like instanceof Array &&
                    this.state.userdata.venue_like.map((item, index) => {
                      return (
                        <TouchableOpacity key={index}>
                          <Text style={{color: '#fff', fontSize: 16}}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 14}}>Links: </Text>
                <TextInput
                  ref={c => (this._links = c)}
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    padding: 0,
                  }}
                  editable={this.state.isEditMode}>
                  {this.state.userdata.link}
                </TextInput>
                {this.state.isEditMode && (
                  <Icon
                    type={'FontAwesome'}
                    name="pencil"
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      marginLeft: 10,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <SafeAreaView style={{flex: 0}}>
          <Footer />
        </SafeAreaView>
      </View>
    );
  }
}
