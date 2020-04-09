import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon, Item, Input} from 'native-base';
const width = Dimensions.get('window').width;
import {TextField} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import AppUtils from '../../utils/AppUtlls';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      working_hour: 0,
      isChecked: false,
      avatarSource: null,
      loading: false,
      checkedAdmins: [],
    };
    global.checkedAdmins = [];
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      console.log(global.checkedAdmins);
      let checkedAdmins = [];

      firebase
        .database()
        .ref('users')
        .orderByChild('isAdmin')
        .equalTo(true)
        .once('value')
        .then(snapshot => {
          snapshot.forEach(item => {
            if (global.checkedAdmins.includes(item.key))
              checkedAdmins.push(item);
          });
          this.setState({checkedAdmins});
        });
    });
  };

  upload = () => {
    if (
      this._name.value() == '' ||
      this._address.value() == '' ||
      this.state.type == 0 ||
      this.state.working_hour == 0 ||
      this.state.avatarSource == null
    ) {
      AppUtils.showToast('Please input information correctly.');
      return;
    }

    this.setState({loading: true});

    let mime = 'application/octet-stream';

    let uri = this.state.avatarSource;
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
        let ref = firebase
          .database()
          .ref('story')
          .push();
        ref.set({
          type: 'activity',
          name: this._name.value(),
          address: this._address.value(),
          venue_type: this.state.type,
          working_hour: this.state.working_hour,
          description: this._description.value(),
          isPublic: !this.state.isChecked,
          admins: global.checkedAdmins,
          imageType: this.state.imageType,
          imageurl: url,
          user: global.uid,
          create_time: Date.now() / 1000,
          location: global.currentLocation,
        });
        this.setState({loading: false});
        Toast.show('Successfully uploaded.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#fff',
          textColor: '#000',
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          onHidden: () => {
            NavigationService.navigate('Home');
          },
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
        AppUtils.showToast('Try again');
      });
  };
  render() {
    let venue_type = [
      {
        id: 1,
        name: 'Bar',
      },
      {
        id: 2,
        name: 'Nightclub',
      },
      {
        id: 3,
        name: 'Pubs',
      },
      {
        id: 4,
        name: 'Other venues',
      },
    ];
    let working_hours = [
      {
        id: 1,
        name: 'Monday - Open - Closed',
      },
      {
        id: 2,
        name: 'Tuesday - Open - Closed',
      },
      {
        id: 3,
        name: 'Wednesday - Open - Closed',
      },
      {
        id: 4,
        name: 'Thursday - Open - Closed',
      },
      {
        id: 5,
        name: 'Friday - Open - Closed',
      },
      {
        id: 6,
        name: 'Saturday - Open - Closed',
      },
      {
        id: 7,
        name: 'Sunday - Open - Closed',
      },
    ];
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Spinner size="large" visible={this.state.loading} />
          <View style={{flexDirection: 'row', marginTop: 10}}>
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
            <TouchableOpacity style={{marginLeft: 'auto', marginRight: 10}}>
              <Text
                style={{color: '#f28500', fontSize: 15}}
                onPress={() => {
                  this.upload();
                }}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              flex: 1,
              marginHorizontal: 30,
              marginTop: 20,
              marginBottom: 10,
              flexDirection: 'column',
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                aspectRatio: 1,
                backgroundColor: '#111',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: this.state.avatarSource}}
                style={{width: '100%', height: '100%'}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  position: 'absolute',
                  alignItems: 'center',
                }}>
                {this.state.avatarSource == null && (
                  <Icon
                    type={'FontAwesome'}
                    name="image"
                    style={{color: '#222', fontSize: 50}}
                  />
                )}
                <TouchableOpacity
                  onPress={() => {
                    if (Platform.OS != 'ios') {
                      Alert.alert('', 'Select Image or Video', [
                        {
                          text: 'Image',
                          onPress: () => {
                            this.SelectCamera('image');
                          },
                        },
                        {
                          text: 'Video',
                          onPress: () => {
                            this.SelectCamera('video');
                          },
                        },
                      ]);
                    } else {
                      this.SelectCamera('mixed');
                    }
                  }}>
                  <Text style={{color: '#fff', fontSize: 12}}>
                    Add Poster / Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{color: '#fff', fontSize: 12}}>
                    Use Existing venue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextField
              ref={c => (this._name = c)}
              autoCorrect={false}
              baseColor={'#8d8d8d'}
              textColor={'#d4d7d9'}
              tintColor={'#fff'}
              autoCapitalize="none"
              autoCorrect={false}
              label={'Name Activity ...'}
            />

            <Dropdown
              label="Type of Activity..."
              data={venue_type}
              baseColor={'#8d8d8d'}
              textColor={'#d4d7d9'}
              itemColor={'#000'}
              selectedItemColor={'#555'}
              labelExtractor={(item, index) => {
                return item.name;
              }}
              valueExtractor={(item, index) => {
                return item.id;
              }}
              onChangeText={(value, index) => {
                this.setState({type: value});
              }}
            />
            <TextField
              ref={c => (this._address = c)}
              autoCorrect={false}
              baseColor={'#8d8d8d'}
              textColor={'#d4d7d9'}
              tintColor={'#fff'}
              autoCapitalize="none"
              autoCorrect={false}
              label={'Address..'}
            />
            <Dropdown
              label="Open hours..."
              data={working_hours}
              baseColor={'#8d8d8d'}
              textColor={'#d4d7d9'}
              itemColor={'#000'}
              selectedItemColor={'#555'}
              labelExtractor={(item, index) => {
                return item.name;
              }}
              valueExtractor={(item, index) => {
                return item.id;
              }}
              onChangeText={(value, index) => {
                this.setState({working_hour: value});
              }}
            />
            <TextField
              ref={c => (this._description = c)}
              autoCorrect={false}
              baseColor={'#8d8d8d'}
              textColor={'#d4d7d9'}
              tintColor={'#fff'}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={true}
              label={'Brief description...'}
            />

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <CheckBox
                style={{flex: 1, height: 30}}
                leftTextStyle={{color: '#fff'}}
                isChecked={this.state.isChecked}
                checkedCheckBoxColor={'#fff'}
                uncheckedCheckBoxColor={'#fff'}
                onClick={() => {
                  NavigationService.navigate('SelectProfiles');
                  this.setState({
                    isChecked: !this.state.isChecked,
                  });
                }}
                leftText={'Share with friends only'}
              />
              <CheckBox
                style={{flex: 1, height: 30, marginLeft: 10}}
                leftTextStyle={{color: '#fff'}}
                isChecked={!this.state.isChecked}
                checkedCheckBoxColor={'#fff'}
                uncheckedCheckBoxColor={'#fff'}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked,
                  });
                }}
                leftText={'Share as public venue'}
              />
            </View>
            <View style={{flexDirection: 'column', marginVertical: 10}}>
              <TouchableOpacity
                style={{marginBottom: 5}}
                onPress={() => {
                  NavigationService.navigate('SelectProfiles', {
                    checkedAdmins: this.state.checkedAdmins,
                  });
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Add admin +{' '}
                </Text>
              </TouchableOpacity>
              {this.state.checkedAdmins.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Image
                      style={{width: 20, height: 20, borderRadius: 20}}
                      source={{uri: item.val().avatar}}
                    />
                    <Text style={{color: '#aaa', marginLeft: 10}}>
                      {item.val().username}{' '}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  SelectCamera = type => {
    this.setState({imageType: type});
    const options = {
      title: 'Select Poster / Video',
      mediaType: type,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        var path = response.uri;
        this.setState({
          avatarSource: path,
        });
      }
    });
  };
}
