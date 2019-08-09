import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
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
						<Button
							title='Confirm Account'
							onPress={() => this.props.navigation.navigate('Welcome')}/>
						<Button
							title='Log Out'
							onPress={() => {
								this.props.logout()
								console.log('hi')
							}}/>
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
		padding: 20,
	}
});
