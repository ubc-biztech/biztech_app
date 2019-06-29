import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Icon from 'react-native-vector-icons/Feather';

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Profile: Profile,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home';
      } else if (routeName === 'Login') {
        iconName = 'user';
      } else if (routeName === 'Profile') {
        iconName = 'user';
      }
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#7ad040',
    inactiveTintColor: 'gray',
  },
})

// const AppNavigator = createStackNavigator(routeConfig, navigatorConfig)

export default createAppContainer(TabNavigator);
