import { createStackNavigator } from 'react-navigation'
import Main from './App/screens/Main'
import Login from './App/screens/Login'

const routeConfig = {
  Main: {
    screen: Main
  },
  Login: {
    screen: Login
  }
}

const navigatorConfig = {
  navigationOptions: {
    header: null
  }
}

export default Navigator = createStackNavigator(routeConfig, navigatorConfig)
