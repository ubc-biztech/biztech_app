import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { doVerify, unhideSuccess, hideSuccess } from '../actions/Login';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

import Button from '../components/Button'
import FormTextInput from '../components/FormTextInput';

class ConfirmScreen extends Component {
  constructor() {
    super();
    this.state = {
      confirmationCode: ''
    }
  }

  handleConfirmationCode() {
    const confirmationCode = this.state;
    const email = this.props.userData.email;
    console.log(email);
    console.log(this.state.confirmationCode);
    Auth.confirmSignUp(email, this.state.confirmationCode, {})
      .then(() => {
        this.props.doVerify()
        this.props.unhideSuccess()
        setTimeout(() => {
          this.props.hideSuccess()
        }, 5000)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.widgetContainer}>
        <Text>
          Please enter your confirmation code.
        </Text>
        <FormTextInput
          style={styles.input}
          placeholder="Confirmation Code"
          onChangeText={
            // Set this.state.confirmationCode to the value in this Input box
            (value) => this.setState({ confirmationCode: value })
          }
        />
        <Button
          title='Submit'
          onPress={this.handleConfirmationCode.bind(this)} />
      </View>
    )
  }
};

// objects
const mapStateToProps = (state) => {
  return {
    userData: state.login.user
  };
};
// actions
const mapDispatchToProps = (dispatch) => {
  return {
    doVerify: () => dispatch(doVerify()),
    unhideSuccess: () => dispatch(unhideSuccess()),
    hideSuccess: () => dispatch(hideSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen);
