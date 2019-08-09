import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { doLogin } from '../actions/Login';

//styling
import styles from '../styles/Styles';

import Button from '../components/Button'

// Validation Schema for Formik form using Yup library
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
      };
	}

	render() {
		if (this.props.isLoading) {
			return (
				<View style={styles.container}>
					<Text style={styles.h1}>Loading Screen</Text>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<Text style={styles.h1}>Sign In</Text>

			  <Formik
			    initialValues={{ email: '' }}
					validationSchema={ FormSchema }
			    onSubmit={values => this.props.handleSignIn(values)}
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
							{//state.props.incorrect indicates an incorrect try
								(this.props.incorrect !== undefined) && <Text style={{ marginVertical: 10, fontSize: 10, color: 'red' }}>Incorrect username/password</Text> }
			      </View>
			    )}
			  </Formik>
			</View>
		);
  }
};

// objects
const mapStateToProps = (state) => {
	return {
		isLoading: state.login.isLoading,
		incorrect: state.login.error,
		isLoggedIn: state.login.isLoggedIn
	};
};

// actions
const mapDispatchToProps = (dispatch) => {
	return {
		handleSignIn: (values) => dispatch(doLogin(values))
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);
