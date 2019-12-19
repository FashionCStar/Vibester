/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import NavigationService from './src/NavigationService';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid']);

import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Home from './src/screens/Home'
import SelectVenues from './src/screens/Home/SelectVenues'
import Profile from './src/screens/Profile'
import Events from './src/screens/Events'
import AddItemScreen from './src/screens/Others/AddItemScreen'
import AddVenueScreen from './src/screens/Others/AddVenueScreen'
import CreateEvent from './src/screens/Others/CreateEvent'
import AccountSetting from './src/screens/Others/AccountSetting'
import StorySetting from './src/screens/Others/StorySetting'
import StoryHideList from './src/screens/Others/StoryHideList'
import AddActivity from './src/screens/Others/AddActivity'
import MyPosts from './src/screens/Others/MyPosts'
import Follow from './src/screens/Others/Follow'
import EditPrivateEvent from './src/screens/Others/EditPrivateEvent'
import Reading from './src/screens/Reading'
import Vibes from './src/screens/Notifications/Vibes'
import SnapPage from './src/screens/Notifications/SnapPage'
import Chat from './src/screens/Notifications/Chat'
import Notifications from './src/screens/Notifications/Notifications'
import PrivateChat from './src/screens/Notifications/PrivateChat'
import SelectProfiles from './src/screens/Others/SelectProfiles'
import EventInvite from './src/screens/Others/EventInvite'
import Camera from './src/screens/camera'
import ImageEdit from './src/screens/camera/ImageEdit'
import CameraComplete from './src/screens/camera/CameraComplete'
import VideoPreview from './src/screens/camera/VideoPreview'

console.disableYellowBox = true;
const ActivityProject = createStackNavigator(
  {
    Login: { screen: Login,navigationOptions: {header: null,}, },
    Register: { screen: Register,navigationOptions: {header: null,}, },
    Home: { screen: Home,navigationOptions: {header: null,}, },
    Profile: { screen: Profile,navigationOptions: {header: null,}, },
    AddItemScreen: { screen: AddItemScreen,navigationOptions: {header: null,}, },
    AddVenueScreen: { screen: AddVenueScreen,navigationOptions: {header: null,}, },
    AccountSetting: { screen: AccountSetting,navigationOptions: {header: null,}, },
    StorySetting: { screen: StorySetting,navigationOptions: {header: null,}, },
    StoryHideList: { screen: StoryHideList,navigationOptions: {header: null,}, },
    MyPosts: { screen: MyPosts,navigationOptions: {header: null,}, },
    Events: { screen: Events,navigationOptions: {header: null,}, },
    Follow: { screen: Follow,navigationOptions: {header: null,}, },
    Reading: { screen: Reading,navigationOptions: {header: null,}, },
    Vibes: { screen: Vibes,navigationOptions: {header: null,}, },
    SelectProfiles: { screen: SelectProfiles,navigationOptions: {header: null,}, },
    SnapPage: { screen: SnapPage,navigationOptions: {header: null,}, },
    Chat: { screen: Chat,navigationOptions: {header: null,}, },
    PrivateChat: { screen: PrivateChat,navigationOptions: {header: null,}, },
    SelectVenues: { screen: SelectVenues,navigationOptions: {header: null,}, },
    CreateEvent: { screen: CreateEvent,navigationOptions: {header: null,}, },
    AddActivity: { screen: AddActivity,navigationOptions: {header: null,}, },
    Notifications: { screen: Notifications,navigationOptions: {header: null,}, },
    EditPrivateEvent: { screen: EditPrivateEvent,navigationOptions: {header: null,}, },
    EventInvite: { screen: EventInvite,navigationOptions: {header: null,}, },
    Camera: { screen: Camera,navigationOptions: {header: null,}, },
    ImageEdit: { screen: ImageEdit,navigationOptions: {header: null,}, },
    CameraComplete: { screen: CameraComplete,navigationOptions: {header: null,}, },
    VideoPreview: { screen: VideoPreview,navigationOptions: {header: null,}, },
  },
  {
    initialRouteName: "Login",
    headerLayoutPreset: 'center'
  },
);

  
const AppContainer = createAppContainer(ActivityProject)

export default class App extends Component { 
  render() {
    return <AppContainer ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />;
  }
}

