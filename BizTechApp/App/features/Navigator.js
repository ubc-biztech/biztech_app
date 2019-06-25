import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Main from '../screens/Main'
import Login from '../screens/Login'
import Icon from 'react-native-vector-icons/Feather';

const routeConfig = {
  Main: {
    screen: Main
  },
  Login: {
    screen: Login
  },
}

const navigatorConfig = {
  headerMode: 'none',
  navigationOptions: {
    header: null,
    headerVisible: false,
  },
}

const TabNavigator = createBottomTabNavigator({
  Main: Main,
  Login: Login
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Main') {
        iconName = 'home';
      } else if (routeName === 'Login') {
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
