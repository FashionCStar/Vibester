'use strict';
import React, {Component,PureComponent } from 'react';
import {View,  StyleSheet, Alert,StatusBar,Image,Platform,Text,TouchableOpacity,Linking, SafeAreaView} from 'react-native';
import NavigationService from '../../NavigationService'
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getBottomSpace, isIphoneX  } from 'react-native-iphone-x-helper'
import ImagePicker from 'react-native-image-picker';

export default class Camera extends PureComponent  { 
    constructor (props){
        super(props);
        this.state = {
            flashMode:true,
            recording:false,
            cameramode : true,
        }
    }
    render() {
        return (
            <View style={styles.container}>
            <RNCamera
                ref={ref => {
                this.camera = ref;
                }}
                style={styles.preview}
                type={this.state.cameramode?RNCamera.Constants.Type.back:RNCamera.Constants.Type.front}
                flashMode={this.state.flashMode?(!this.state.recording?RNCamera.Constants.FlashMode.auto:RNCamera.Constants.FlashMode.torch):RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
                }}
            />
            
           
            <View style={{position:'absolute',width:'100%', top:isIphoneX()?getStatusBarHeight()+10:10, flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity style={{position:'absolute', left:10, top:0}} onPress={()=>{
                    this.props.navigation.goBack();
                }}>
                <Icon type={"MaterialIcons"} name="close" style={{color:'#fff', fontSize:25,}} />
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute', top:0}} onPress={()=>{
                    this.setState({flashMode:!this.state.flashMode})
                }}>
                {!this.state.flashMode&&
                 <Icon type={"MaterialIcons"} name="flash-off" style={{color:'#fff', fontSize:25,}} />
                }
                {this.state.flashMode&&
                 <Icon type={"MaterialIcons"} name="flash-on" style={{color:'#fff', fontSize:25,}} />
                }
                </TouchableOpacity>
            </View>
           
            <View style={{position:'absolute',width:'100%', bottom:getBottomSpace()+30, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                <TouchableOpacity 
                     onPress={()=>{
                      if(Platform.OS !="ios")
                      {
                        Alert.alert(
                        '',
                        'Select Image or Video',
                        [
                            {text: 'Image', onPress: () => {
                              this.SelectCamera('image');
                            }},
                            {text: 'Video', onPress: () =>{
                              this.SelectCamera('video');
                            }},
                          ],
                        );
                      }
                      else
                      {
                        this.SelectCamera('mixed');
                      }
                  }}>
                <Icon type={"FontAwesome"} name="image" style={{color:'#fff', fontSize:20,}} />
                </TouchableOpacity>
                {!this.state.recording&&
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture} onLongPress={
                  this.takeVideo.bind(this)
                } >                
                </TouchableOpacity>}
                {this.state.recording&&
                <TouchableOpacity style={styles.capture1} onPress={
                  ()=>{this.stopRecording()}
                } >
                </TouchableOpacity>}
                <TouchableOpacity onPress={()=>{
                    this.setState({cameramode:!this.state.cameramode})
                }}>
                 <Icon type={"MaterialIcons"} name="switch-camera" style={{color:'#fff', fontSize:25,}} />
                </TouchableOpacity>
            </View>
            </View>
        );
        }
    
        takePicture = async() => {
          if (this.camera) {
              const options = { quality: 0.5, base64: true, fixOrientation:true, forceUpOrientation:true, mirrorImage:!this.state.cameramode };
              const data = await this.camera.takePictureAsync(options);
              NavigationService.navigate("ImageEdit",{image_uri:data.uri});
          }
        };
        
        takeVideo = async() => {
          if (this.camera) {
              this.setState({ recording: true });

              if(this.state.flashMode)
              {
                
              }
              
              const { uri, codec = "mp4" } = await this.camera.recordAsync({
                maxDuration :15,
                mirrorVideo:!this.state.cameramode 
              });
              this.setState({ recording: false });

              NavigationService.navigate("VideoPreview",{image_uri:uri});
          }
        };
        
        stopRecording = async() => {
          if (this.camera) {
              this.setState({ recording: false });
              this.camera.stopRecording();
          }
        };

        SelectCamera = (type) => {
            const options = {
              title: 'Select Poster / Video',
              mediaType: type,
            };
            ImagePicker.launchImageLibrary(options, (response) => {
              console.log('Response = ', response);
              if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let image_uri = null;
                if(response.type !=null)
                {
                  image_uri = response.uri;
                }
                
                NavigationService.navigate("ImageEdit",{image_uri:image_uri});
              }
            });
          }
    }
        
const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems:'center'
    },
    preview: {
    flex: 1,
    width:'100%',
    height:'100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    },
    capture: {
    width:70,height:70,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 50,
    borderColor:'#fff',
    borderWidth:4,
    },
    capture1: {
      width:70,height:70,
      backgroundColor: 'rgba(0,0,0,0)',
      borderRadius: 50,
      borderColor:'#f00',
      borderWidth:4,
      },
});
  
