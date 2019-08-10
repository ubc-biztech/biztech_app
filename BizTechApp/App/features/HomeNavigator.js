import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation'
import { AMAZON_API } from 'react-native-dotenv';

import EventCard from '../components/EventCard'
import HomeScreen from '../screens/HomeScreen'
import EventScreen from '../screens/EventScreen'

export default createStackNavigator({
  Home: HomeScreen,
  Event: EventScreen
},
{
    defaultNavigationOptions: {
      header: null,
    },
})
