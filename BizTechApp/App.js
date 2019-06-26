
import React, {Component} from 'react';

import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';
import Register from './App/components/Register.js';
import Profile from './App/components/Profile.js';
import Navigator from './App/features/Navigator';


class App extends Component {
	render() {
		return (

				<Navigator/>

// 			<ScrollView style={styles.container}>
// 				<Register />
// 				<Profile/>
// 			</ScrollView>

		);
	}
}


export default App;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#dbffe2'
// 	},
// 	instructions: {
// 		textAlign: 'center',
// 		color: '#333333',
// 		marginBottom: 5
// 	}
// });

// import React, { Component } from 'react';

// import EmojiDict from './src/components/Emoji';

// export default class App extends Component {
	// render() {
		// return <EmojiDict />;
	// }
// }

