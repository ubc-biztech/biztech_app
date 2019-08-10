import React, {Component} from 'react';
import { View, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Navigator from '../features/Navigator';
import Login from '../screens/Login'

class Main extends Component {
  render() {
    return (
      <View style={{ flex:1 }}>
        <StatusBar backgroundColor='#999' barStyle='light-content'/>
        {(this.props.isLoggedIn) ? <Navigator/> : <Login/>}
      </View>
    )
  }
};

// objects
const mapStateToProps = (state) => {
	return {
    isLoggedIn: state.login.isLoggedIn
	};
};

export default connect(mapStateToProps) (Main);
