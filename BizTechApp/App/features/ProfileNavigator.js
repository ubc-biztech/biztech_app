import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation'

import Profile from '../screens/Profile'
import ConfirmScreen from '../screens/ConfirmScreen'
import EditProfile from '../screens/EditProfile'


export default createStackNavigator({
  Profile: Profile,
  Confirm: ConfirmScreen,
  'Edit Profile': EditProfile,
},
{
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
})
