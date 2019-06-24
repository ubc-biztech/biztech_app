/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {Platform, StyleSheet, Text, View} from 'react-native';
import Profile from './App/components/Profile';

import {
	createStackNavigator, createAppContainer
  } from 'react-navigation';

class HomePage extends Component {
	static navigationOptions = {
		title: 'BizTech App',
	  };
	render() {
    const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>BizTech App 2019 Summer</Text>
				<Profile/>
			</View>
		);
	}
}

const MainNavigator = createStackNavigator({
	Home: { screen: HomePage },
  });

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});
