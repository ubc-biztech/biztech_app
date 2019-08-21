import React, {Component} from 'react';
import { View,
         TextInput } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import { withNavigation } from 'react-navigation';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { doVerify, unhideSuccess } from '../actions/Login';
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
        this.props.navigation.navigate('Profile')
        this.props.navigation.navigate('Home')
      })
      .catch(err => {
        console.log(err)
        if (err.code == 'NotAuthorizedException'){
          Auth.verifyCurrentUserAttributeSubmit('email', this.state.confirmationCode)
            .then(() => {
              this.props.doVerify()
              this.props.navigation.navigate('Profile')
              this.props.navigation.navigate('Home')
              this.props.unhideSuccess()
            })
        }
      });
  }

  render() {
    return(
      <View style={styles.pageContainer}>
        <Text style={styles.h1}>Welcome to BizTech!</Text>
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
		userData: state.login.user,
	};
};

// actions
const mapDispatchToProps = (dispatch) => {
	return {
		doVerify: () => dispatch(doVerify()),
    unhideSuccess: () => dispatch(unhideSuccess())
	};
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps) (ConfirmScreen));
