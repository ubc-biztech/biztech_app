import React, { Component } from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import { Text, ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';

class Profile extends Component {

	  render(){
	    return(
	      <ThemeProvider>
					<ScrollView style={styles.widgetContainer}>
		        <Text h2>Profile</Text>
		        <Text>Welcome, {this.props.userData.fname}</Text>
						<Button
							title='Confirm Account'
							onPress={() => this.props.navigation.navigate('Welcome')}/>
					</ScrollView>
	      </ThemeProvider>
	    )
	  }

}

// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
	};
};

export default connect(mapStateToProps) (Profile);

const styles = StyleSheet.create({
	widgetContainer: {
		padding: 20,
	}
});
