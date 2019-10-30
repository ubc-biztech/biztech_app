import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Auth from '@aws-amplify/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

import NavigationService from '../features/NavigationService.js';
import Button from '../components/Button'

// Validation Schema for Formik form using Yup library
const FormSchema = Yup.object().shape({
  oldpass: Yup.string()
    .required('Password Required'),
  pass: Yup.string()
    .min('6', 'Weak password')
    .required('Password Required'),
});

class PasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      password: ''
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          oldpass: '',
          pass: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values, actions) => {
          const { oldpass, pass } = values;
          Auth.currentAuthenticatedUser()
            .then(user => {
              return Auth.changePassword(user, oldpass, pass);
            })
            .then(data => {
              console.log(data)
              NavigationService.navigate('Profile', {});
            })
            .catch(err => {
              console.log(err)
              this.setState({ err: true })
              this.setState({ errMessage: err.message })
            });
        }}
      >
        {props => (
          <View style={styles.pageContainer}>
            <Text style={styles.h1}>Change Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Old Password"
              onChangeText={props.handleChange('oldpass')}
              value={props.values.oldpass}
            />
            {//if touched or invalid show error text
              props.touched.oldpass && props.errors.oldpass &&
              <Text style={{ fontSize: 10, color: 'red' }}>
                {props.errors.oldpass}</Text>}

            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="New Password"
              onChangeText={props.handleChange('pass')}
              value={props.values.pass}
            />
            {//if touched or invalid show error text
              props.touched.pass && props.errors.pass &&
              <Text style={{ fontSize: 10, color: 'red' }}>
                {props.errors.pass}</Text>}
            <Button
              title='Submit'
              onPress={props.handleSubmit} />

            { // Notify user if account already exists or some other error
              this.state.err &&
              <Text style={{ marginVertical: 10, fontSize: 10, color: 'red' }}>
                {this.state.errMessage}
              </Text>}
          </View>
        )}
      </Formik>
    )
  }
};

export default PasswordScreen;
