import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation'

import Profile from '../screens/Profile'
import ConfirmScreen from '../screens/ConfirmScreen'

export default createStackNavigator({
  Profile: Profile,
  Confirm: ConfirmScreen
},
{
    defaultNavigationOptions: {
      header: null,
    },
})
