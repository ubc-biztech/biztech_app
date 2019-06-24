/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button,
 				 Header,
				 Icon,
				 ThemeProvider } from 'react-native-elements';
import Profile from './App/components/Profile';
import CreateEvent from './App/components/CreateEvent';

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Header
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'BizTech App', style: { color: '#fff' } }}
					rightComponent={{ icon: 'home', color: '#fff' }}
					/>
				<View>
					<View style={styles.widgetContainer}><Profile/></View>
					<View  style={styles.widgetContainer}><CreateEvent/></View>
				</View>
			</ThemeProvider>
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
	widgetContainer: {
		margin: 20,
	}
});
