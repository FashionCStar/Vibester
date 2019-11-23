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
import Profile from './src/screens/Profile'
import Events from './src/screens/Events'
import AddItemScreen from './src/screens/Others/AddItemScreen'
import AddVenueScreen from './src/screens/Others/AddVenueScreen'
import AccountSetting from './src/screens/Others/AccountSetting'
import StorySetting from './src/screens/Others/StorySetting'
import StoryHideList from './src/screens/Others/StoryHideList'
import Follow from './src/screens/Others/Follow'
import Reading from './src/screens/Reading'
import Notifications from './src/screens/Notifications'

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
    Events: { screen: Events,navigationOptions: {header: null,}, },
    Follow: { screen: Follow,navigationOptions: {header: null,}, },
    Reading: { screen: Reading,navigationOptions: {header: null,}, },
    Notifications: { screen: Notifications,navigationOptions: {header: null,}, },
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

