import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navigator from '../features/Navigator';
import Login from '../screens/Login'

class Main extends Component {
  render() {
    return (this.props.isLoggedIn) ? <Navigator/> : <Login/>
  }
};

// objects
const mapStateToProps = (state) => {
	return {
    isLoggedIn: state.login.isLoggedIn
	};
};

export default connect(mapStateToProps) (Main);
