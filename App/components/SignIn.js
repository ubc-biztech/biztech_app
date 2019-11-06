import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { doLogin } from '../actions/Login';

//styling
import styles from '../styles/Styles';

import Text from '../components/Text'
import Button from '../components/Button'
import Confirm from '../components/Confirm'
import FormTextInput from '../components/FormTextInput';

// Validation Schema for Formik form using Yup library
const FormSchema = Yup.object().shape({
  pass: Yup.string()
    .required('Required'),
  email: Yup.string()
    .required('Required'),
});

class SignIn extends Component {
  constructor() {
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
        <Image source={require('../img/biztech.png')} style={styles.loginLogo} />
        <Text style={styles.h1}>Sign In</Text>

        <Formik
          initialValues={{ email: (this.props.userData ? this.props.userData.email : '') }}
          validationSchema={FormSchema}
          onSubmit={values => this.props.handleSignIn(values)}
        >
          {props => (
            <View style={{ paddingTop: 10 }}>
              <FormTextInput
                style={styles.input}
                placeholder="Email"
                // defaultValue={this.props.userData ? this.props.userData.email : null}
                onChangeText={props.handleChange('email')}
                onBlur={() => props.setFieldTouched('email')}
                value={props.values.email}
              />
              <FormTextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={props.handleChange('pass')}
                secureTextEntry={true}
                onBlur={props.handleBlur('pass')}
                value={props.values.pass} />
              <Button disabled={!props.isValid} onPress={props.handleSubmit} title="Sign In" />
              {this.props.incorrect && (this.props.incorrect.code !== undefined)
                && <Text style={{ marginVertical: 10, fontSize: 10, color: 'red' }}>
                  {this.props.incorrect.message}</Text>}
              {this.props.incorrect && (this.props.incorrect.code == 'UserNotConfirmedException') &&
                <Confirm />}
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
    userData: state.login.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
