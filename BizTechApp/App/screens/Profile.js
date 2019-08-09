import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { logout } from '../actions/Login';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

class Profile extends Component {

	  render(){
	    return(
	      <View>
					<ScrollView style={styles.widgetContainer}>
		        <Text style={styles.h1}>Profile</Text>
	          {this.props.isLoggedIn && <Text>Welcome, { this.props.userData.fname } </Text>}
	          {!this.props.isLoggedIn && <Text>Welcome to BizTech </Text>}

						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Confirm')}
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
	      </View>
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
