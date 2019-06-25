import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from '../screens/Main'
import Login from '../screens/Login'

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

const AppNavigator = createStackNavigator(routeConfig, navigatorConfig)

export default createAppContainer(AppNavigator);
