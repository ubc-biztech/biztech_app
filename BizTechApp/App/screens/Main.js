import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button,
 				 Header,
				 ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../components/Profile';
import CreateEvent from '../components/CreateEvent';

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class Main extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Header
					statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'BizTech App', style: { color: '#fff' } }}
					rightComponent={{ icon: 'home', color: '#fff' }}
					/>
				<View>
					<View style={styles.widgetContainer}><Profile/></View>
					<View style={styles.widgetContainer}><CreateEvent theme={theme}/></View>
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
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	widgetContainer: {
		margin: 20,
	}
});
