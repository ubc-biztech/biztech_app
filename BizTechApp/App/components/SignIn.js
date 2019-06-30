import React, {Component} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Auth from '@aws-amplify/auth';
import { withNavigation } from 'react-navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
pass: Yup.string()
	.required('Required'),
email: Yup.string()
	.required('Required'),
});

class SignIn extends Component {
	  constructor(){
	    super();
	    this.state = {
        email: '',
        pass: '',
				try: false,
				incorrect: false
      };
	  }

		// { props.touched.email && props.errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{props.errors.email}</Text> }
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Sign In</Text>

			  <Formik
			    initialValues={{ email: '' }}
					validationSchema={ FormSchema }
			    onSubmit={values => this.handleSignIn(values)}
			  >
			    {props => (
			      <View>
			        <TextInput
		            style={styles.input}
								placeholder="Email"
			          onChangeText={props.handleChange('email')}
							  onBlur={() => props.setFieldTouched('email')}
			          value={props.values.email}
			        />
			        <TextInput
			            style={styles.input}
			            placeholder="Password"
				          onChangeText={props.handleChange('pass')}
									secureTextEntry={true}
				          onBlur={props.handleBlur('pass')}
				          value={props.values.pass}/>
			        <Button disabled={!props.isValid} onPress={props.handleSubmit} title="Sign In" />
							{ this.state.try && this.state.incorrect && <Text style={{ marginVertical: 10, fontSize: 10, color: 'red' }}>Incorrect username/password</Text> }
			      </View>
			    )}
			  </Formik>
			</View>
		);
  }


	handleSignIn(values) {
		this.setState({try: true})
	  const { email, pass } = values;
	  Auth.signIn(email, pass)
	    // If we are successful, navigate to Home screen
	    .then(user => {
				this.setState({incorrect: false})
				this.props.navigation.navigate('Home')
			})
	    // On failure, display error in console
	    .catch(err => {
				console.log(err)
				if (err.code == 'NotAuthorizedException' || err.code == 'UserNotFoundException'){
					this.setState({incorrect: true})
				}

			});
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
    marginBottom: 10,
    borderBottomColor: '#7ad040',
    borderBottomWidth: 1
  },
  button: {
    paddingTop: 10,
    marginTop: 10,
  }
});
