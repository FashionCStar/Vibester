'use strict';
import React, {Component, PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  StatusBar,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';
import NavigationService from '../../NavigationService';
import {Icon} from 'native-base';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

export default class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
    };
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {};

  enterFullScreen = () => {};

  onFullScreen = () => {};

  onSeeking = currentTime => this.setState({currentTime});
  render() {
    var uri = this.props.videourl;
    return (
      <View style={this.props.style}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          playInBackground={false} // Audio continues to play when app entering background.
          playWhenInactive={false}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode="contain"
          repeat={true}
          source={{uri: uri}}
          style={styles.mediaPlayer}
          volume={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
