import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { logout } from '../actions/Login';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'
import Notification from '../components/Notification'
import Button from '../components/Button'

class Profile extends Component {
  static navigationOptions = {
    header: null
  };


	  render(){
	    return(
	      <View>
          { !this.props.isVerified &&
            <Notification
              onPress={() => this.props.navigation.navigate('Confirm')}
              colour='#ff7043'>Please confirm your account</Notification>
          }
					<ScrollView style={styles.widgetContainer}>
		        <Text style={styles.h1}>Profile</Text>
	          {this.props.isLoggedIn && <Text>Welcome, { this.props.userData.fname } </Text>}
	          {!this.props.isLoggedIn && <Text>Welcome to BizTech </Text>}

						<Button
							onPress={() => this.props.navigation.navigate('Edit Profile')}
							title='Edit Profile'/>

						<Button
							onPress={() => this.props.logout()}
							title='Logout'/>

					</ScrollView>
	      </View>
	    )
	  }

}

// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
    isLoggedIn: state.login.isLoggedIn,
    isVerified: state.login.isVerified
	};
};
// actions
const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);
