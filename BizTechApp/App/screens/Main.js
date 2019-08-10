import React, {Component} from 'react';
import { View, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Navigator from '../features/Navigator';
import Login from '../screens/Login'
import { stopLoading } from '../actions/Login'

class Main extends Component {
  render() {
    return (
      <View style={{ flex:1 }}>
        <StatusBar backgroundColor='#999' barStyle='light-content'/>
        {(this.props.isLoggedIn) ? <Navigator/> : <Login/>}
      </View>
    )
  }
  componentDidMount() {
    this.props.stopLoading()
  }
};

// objects
const mapStateToProps = (state) => {
	return {
    isLoggedIn: state.login.isLoggedIn
	};
};
// actions
const mapDispatchToProps = (dispatch) => {
	return {
		stopLoading: () => dispatch(stopLoading())
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Main);
