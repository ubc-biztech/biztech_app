import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button,
 				 Header,
				 ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateEvent from '../components/CreateEvent';
import { StatusBar } from 'react-native';

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class Main extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StatusBar backgroundColor="#7ad040" barStyle="light-content" />
				<View style={styles.widgetContainer}><CreateEvent theme={theme}/></View>
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
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	widgetContainer: {
		margin: 20,
	}
});
