/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// export default class App extends Component {
// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<Text style={styles.instructions}>BizTech App 2019 Summer</Text>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#F5FCFF'
// 	},
// 	instructions: {
// 		textAlign: 'center',
// 		color: '#333333',
// 		marginBottom: 5
// 	}
// });

import React, { Component } from 'react';

import EmojiDict from './src/components/EmojiDict';

export default class App extends Component {
	render() {
		return <EmojiDict />;
	}
}