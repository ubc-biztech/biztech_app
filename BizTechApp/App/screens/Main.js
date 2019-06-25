import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Profile from './App/components/Profile';

export default class Main extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>BizTech App 2019 Summer</Text>
				<Profile/>
			</View>
		);
	}
}

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
