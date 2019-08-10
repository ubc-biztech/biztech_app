import React, {Component} from 'react';
import { View, TextInput } from 'react-native';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { doVerify } from '../actions/Login';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

import Button from '../components/Button'

class ConfirmScreen extends Component {
	  constructor(){
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
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <View style={styles.widgetContainer}>
        <Text>
          Please enter your confirmation code.
        </Text>
        <TextInput
          placeholder="Confirmation Code"
          onChangeText={
            // Set this.state.confirmationCode to the value in this Input box
            (value) => this.setState({ confirmationCode: value })
          }
        />
        <Button
          title='Submit'
          onPress={ this.handleConfirmationCode.bind(this) }/>
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
		doVerify: () => dispatch(doVerify())
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (ConfirmScreen);
