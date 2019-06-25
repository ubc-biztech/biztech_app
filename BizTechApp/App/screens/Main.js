import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Main extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>Main Page</Text>
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
