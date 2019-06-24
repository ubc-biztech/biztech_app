/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Profile from './App/components/Profile';
import CreateEvent from './App/components/CreateEvent';

export default class App extends Component {
	render() {
		return (
			<View>
				<View style={styles.header}>
					<Text style={styles.headerText}>BizTech App 2019 Summer</Text>
				</View>
				<View>
					<View style={styles.widgetContainer}><Profile/></View>
					<View  style={styles.widgetContainer}><CreateEvent/></View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#7ad040',
		paddingTop: 10,
		height: 56,
	},
	headerText: {
		textAlign: 'center',
		color: '#ffffff',
		fontSize: 18,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	widgetContainer: {
		margin: 20,
	}
});
