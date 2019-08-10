import React, {Component} from 'react';
import { ScrollView, View } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import { withNavigation } from 'react-navigation';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { doVerify } from '../actions/Login';
import * as Yup from 'yup';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

import Button from '../components/Button'
import ProfileForm from '../components/ProfileForm'

// Validation Schema for Formik form using Yup library
const FormSchema = Yup.object().shape({
email: Yup.string()
	.email('Valid email required'),
id: Yup.number()
	.min(9999999, 'Valid Student ID required')
	.max(100000000, 'Valid Student ID required')
});

class EditProfile extends Component {
	  constructor(){
	    super();
	    this.state = {
        confirmationCode: ''
      }
    }

  handleSave() {
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
      .catch(err => console.log(err));
  }

  render() {
    return(
      <ScrollView style={styles.widgetContainer}>
        <Text style={styles.h1}>Edit Profile</Text>
        <ProfileForm disableSid={true} schema={FormSchema} title='Save'/>
        <Button
          onPress={() => this.props.navigation.navigate('Profile')}
          title='Change Password' />

      </ScrollView>
    )
  }
}

// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
	};
};

// actions
const mapDispatchToProps = (dispatch) => {
	return {
		doVerify: () => dispatch(doVerify())
	};
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps) (EditProfile));
