import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';

export default class Register extends Component {
    state = {
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
    };
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
                    color='#03e03e'
                    title="Join the BizTech family!"
                    onPress={this.registerPress.bind(this)} />
			</View>
		);
    }

    async registerPress() {
        let response = await fetch('https://'+AMAZON_API+'.execute-api.us-west-2.amazonaws.com/dev/users/create', {
                                    method: 'POST',
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
                                        password: this.state.pass,
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
    borderBottomColor: '#03e03e',
    borderBottomWidth: 1
  },
  button: {
    paddingTop: 10,
    marginTop: 10,
  }
});
