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
import AddItemScreen from './src/screens/settings/AddItemScreen'
import AddVenueScreen from './src/screens/settings/AddVenueScreen'
import AccountSetting from './src/screens/settings/AccountSetting'
import StorySetting from './src/screens/settings/StorySetting'
import StoryHideList from './src/screens/settings/StoryHideList'

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

