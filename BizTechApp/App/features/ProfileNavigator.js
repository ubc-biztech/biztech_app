import React, {Component} from 'react';
import { Text,
         ThemeProvider } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation'

import Profile from '../screens/Profile'
import WelcomeScreen from '../screens/WelcomeScreen'

export default createStackNavigator({
  Profile: Profile,
  Welcome: WelcomeScreen
},
{
    defaultNavigationOptions: {
      header: null,
    },
})
