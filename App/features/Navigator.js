import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import NavigationService from './NavigationService';
import HomeNavigator from '../features/HomeNavigator'
import ProfileNavigator from '../features/ProfileNavigator'
import Icon from 'react-native-vector-icons/Feather';

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Profile: ProfileNavigator,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
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

const AppContainer = createAppContainer(TabNavigator);

export default class Navigator extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}
