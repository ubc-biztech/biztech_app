import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Profile from '../components/Profile';

export default class Login extends Component {
	render() {
		return (
			<View style={styles.widgetContainer}>
				<Profile/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	widgetContainer: {
		margin: 20,
	}
});
