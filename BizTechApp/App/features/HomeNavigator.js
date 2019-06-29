import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         StatusBar,
         ActivityIndicator } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation'
import { AMAZON_API } from 'react-native-dotenv';

import EventCard from '../components/EventCard'
import HomeScreen from '../screens/HomeScreen'

export default createStackNavigator({
  Home: HomeScreen
})

const styles = StyleSheet.create({
	center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
	},
	widgetContainer: {
		padding: 20,
	}
});
