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
    const confirmationCode = this.state;
    const email = this.props.userData.email;
    console.log(email);
    console.log(this.state.confirmationCode);
    Auth.confirmSignUp(email, this.state.confirmationCode, {})
      .then(() => {
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
			<ThemeProvider>
        <View style={styles.widgetContainer}>
          <Text h2>Welcome to BizTech!</Text>
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
        </View>
			</ThemeProvider>
    )
  }
};

// objects
const mapStateToProps = (state) => {
	return {
		userData: state.login.user,
	};
};

export default withNavigation(connect(mapStateToProps) (WelcomeScreen));

const styles = StyleSheet.create({
  widgetContainer: {
    padding: 20,
  }
})
