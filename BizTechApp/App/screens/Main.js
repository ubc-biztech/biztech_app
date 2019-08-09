import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import Navigator from '../features/Navigator';
import Login from '../screens/Login'

class Main extends Component {
  render() {
    return (this.props.isLoggedIn) ? <Navigator/> :<Login/>
  }

  componentDidMount() {
    console.log(this.props.isLoggedIn)
  }

};

// objects
const mapStateToProps = (state) => {
	return {
    isLoggedIn: state.login.isLoggedIn
	};
};

export default connect(mapStateToProps) (Main);

const styles = StyleSheet.create({
  widgetContainer: {
    padding: 20,
  }
})
