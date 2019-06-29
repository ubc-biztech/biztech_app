import React, {Component} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import Auth from '@aws-amplify/auth';
import { withNavigation } from 'react-navigation';

class Register extends Component {
	  constructor(){
	    super();
	    this.state = {
        fname: '',
        lname: '',
        email: '',
        studentID: '',
        pass: '',
        cpass: '',
        faculty: '',
        year: '',
        gender: '',
        diet: '',
        confirmationCode: '',
        modalVisible: false,
      };
	  }

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Member Registration</Text>
        <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(value) => this.setState({fname: value})}
            value={this.state.fname}/>
        <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(value) => this.setState({lname: value})}
            value={this.state.lname}/>
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => this.setState({email: value})}
            value={this.state.email}/>
        <TextInput
            style={styles.input}
            placeholder="Student Number"
            onChangeText={(value) => this.setState({studentID: value})}
            value={this.state.studentID}/>
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(value) => this.setState({pass: value})}
            value={this.state.pass}/>
        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(value) => this.setState({cpass: value})}
            value={this.state.cpass}/>
        <TextInput
            style={styles.input}
            placeholder="Faculty"
            onChangeText={(value) => this.setState({faculty: value})}
            value={this.state.faculty}/>
        <TextInput
            style={styles.input}
            placeholder="Year"
            onChangeText={(value) => this.setState({year: value})}
            value={this.state.year}/>
        <TextInput
            style={styles.input}
            placeholder="Gender"
            onChangeText={(value) => this.setState({gender: value})}
            value={this.state.gender}/>
        <TextInput
            style={styles.input}
            placeholder="Diet Options"
            onChangeText={(value) => this.setState({diet: value})}
            value={this.state.diet}/>

        <Button
            style={styles.button}
            color='#7ad040'
            title="Join the BizTech family!"
            onPress={this.registerPress.bind(this)} />
        <Button
            style={styles.button}
            color='#03e03e'
            title="debug open modal"
            onPress={this.handleDebugOpen.bind(this)} />

        <Modal
          visible={this.state.modalVisible}
        >
          <View
            style={styles.container}
          >
          <TextInput
            placeholder="Confirmation Code"
            // leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.confirmationCode to the value in this Input box
              (value) => this.setState({ confirmationCode: value })
            }
          />
            <Button
              title='Submit'
							color='#7ad040'
              onPress={ this.handleConfirmationCode.bind(this) }
            />
            <Button
              title='Debug close'
              onPress={ this.handleDebugClose.bind(this)}/>
          </View>
        </Modal>

			</View>
		);
  }

  handleDebugClose(){
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('Home')
  }

  handleDebugOpen(){
    this.setState({ modalVisible: true });
  }

  handleConfirmationCode() {
    const { email, confirmationCode } = this.state;
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }

  async registerPress() {
    this.setState({ modalVisible: true })
    const { email, pass, cpass, fname, lname } = this.state;
    // Make sure passwords match
    if (pass === cpass) {
      Auth.signUp({
        username: email,
        password: pass,
        attributes: {
          email,
          name: fname,
          family_name: lname,
        },
        })
        // On success, show Confirmation Code Modal
        .then(() => this.setState({ modalVisible: true }))
        // On failure, display error in console
        .catch(err => console.log(err));
    } else {
      alert('Passwords do not match.');
    }

    let response = await fetch(AMAZON_API+'users/create',
    {   method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            faculty: this.state.faculty,
            id: this.state.studentID,
            year: this.state.year,
            gender: this.state.gender,
            diet: this.state.diet
        })
        })
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
    })
    .done();
  }
}

export default withNavigation(Register);

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
