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

console.disableYellowBox = true;
const ActivityProject = createStackNavigator(
  {
    Login: { screen: Login,navigationOptions: {header: null,}, },
    Register: { screen: Register,navigationOptions: {header: null,}, },
    Home: { screen: Home,navigationOptions: {header: null,}, },
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

