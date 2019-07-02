import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';

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

	  async fetchUser(){
	    fetch(AMAZON_API+'/users/get?id=75129696')
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
					<ScrollView style={styles.widgetContainer}>
		        <Text h2>Profile</Text>
		        <Text>Welcome, {this.state.userData.fname}</Text>
					</ScrollView>
	      </ThemeProvider>
	    )
	  }

}

const styles = StyleSheet.create({
	widgetContainer: {
		padding: 20,
	}
});
