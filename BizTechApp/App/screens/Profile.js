import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { Text, ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { logout } from '../actions/Login';

class Profile extends Component {

	  render(){
	    return(
	      <ThemeProvider>
					<ScrollView style={styles.widgetContainer}>
		        <Text h2>Profile</Text>
	          {this.props.isLoggedIn && <Text> Welcome, { this.props.userData.fname } </Text>}
	          {!this.props.isLoggedIn && <Text> Welcome to BizTech </Text>}
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Welcome')}
							style={styles.button}>
							<Text style={styles.buttonText}>Confirm Account</Text>
						</TouchableOpacity>

						<TouchableOpacity
							title='Log Out'
							onPress={() => this.props.logout()}
							style={styles.button}>
							<Text style={styles.buttonText}>Logout</Text>
						</TouchableOpacity>
					</ScrollView>
	      </ThemeProvider>
	    )
	  }

}

// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
    isLoggedIn: state.login.isLoggedIn
	};
};
// actions
const mapDispatchToProps = (dispatch) => {
	return {
		logout: (values) => dispatch(logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);

const styles = StyleSheet.create({
	widgetContainer: {
		padding: 20
	},
	button: {
		color: '#fff',
		padding: 10,
		backgroundColor: '#7ad040',
		marginVertical: 10,
    borderRadius: 30,
	},
	buttonText: {
		color: '#fff',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontWeight: '800'
	}
});
