import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';
// import Profile from '../components/Profile';

export default class Profile extends Component {

	  constructor(){
	    super();
	    const ds = {};
	    this.state = {
	      userData: ds,
	    }
	  }

	  componentDidMount(){
	    this.fetchUser();
	  }

	  fetchUser(){
	    fetch('https://'+AMAZON_API+'.execute-api.us-west-2.amazonaws.com/dev/users/get?id=75129696')
	      .then((response) => response.json())
	      .then((response) => {
	        this.setState({
	          userData: (response)
	        })
	      })
	  }

	  render(){
	    return(
	      <ThemeProvider>
					<View style={styles.widgetContainer}>
		        <Text h2>Profile</Text>
		        <Text>Welcome, {this.state.userData.fname}</Text>
					</View>
	      </ThemeProvider>
	    )
	  }

}

const styles = StyleSheet.create({
	widgetContainer: {
		margin: 20,
	}
});
