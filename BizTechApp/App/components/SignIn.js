import React, {Component} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Auth from '@aws-amplify/auth';
import { withNavigation } from 'react-navigation';

class SignIn extends Component {
	  constructor(){
	    super();
	    this.state = {
        email: '',
        pass: '',
      };
	  }

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Sign In</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => this.setState({email: value})}
            value={this.state.email}/>
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(value) => this.setState({pass: value})}
            value={this.state.pass}/>
        <Button
            style={styles.button}
            color='#7ad040'
            title="Sign In"
            onPress={this.handleSignIn.bind(this)} />

			</View>
		);
  }


	handleSignIn() {
	  const { email, pass } = this.state;
	  Auth.signIn(email, pass)
	    // If we are successful, navigate to Home screen
	    .then(user => this.props.navigation.navigate('Home'))
	    // On failure, display error in console
	    .catch(err => console.log(err));
	}

}

export default withNavigation(SignIn);

const styles = StyleSheet.create({
	container: {
    alignSelf: 'stretch',
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 60
	},
	header: {
    color: '#333333',
    marginBottom: 20,
    fontSize: 25,
  },
  input: {
  	color: '#333333',
    paddingVertical: 5,
    marginBottom: 20,
    borderBottomColor: '#7ad040',
    borderBottomWidth: 1
  },
  button: {
    paddingTop: 10,
    marginTop: 10,
  }
});
