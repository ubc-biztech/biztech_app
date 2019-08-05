import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         Button,
         TextInput } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';
import { withNavigation } from 'react-navigation';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';

class WelcomeScreen extends Component {
	  constructor(){
	    super();
	    this.state = {
        confirmationCode: ''
      }
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

  render() {
    return(
			<ThemeProvider>
          <Text h2>Welcome to the BizTech Family!</Text>
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
            color='#7ad040'
            onPress={ this.handleConfirmationCode.bind(this) }/>
			</ThemeProvider>
    )
  }

  componentDidMount() {
    console.log('YHO', this.props.userData)
  }
};

// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
	};
};

export default withNavigation(connect(mapStateToProps) (WelcomeScreen));
