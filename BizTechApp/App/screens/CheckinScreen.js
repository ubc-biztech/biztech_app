import React, {Component} from 'react';
import { Alert, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';

// styling
import styles from '../styles/Styles';
import Text from '../components/Text'
import Button from '../components/Button'


class CheckinScreen extends Component {
  constructor() {
    super();
    this.state = {
      checkinCode: '',
    }
  };

  doAlert(message) {
    Alert.alert(
      'Event Check-in',
      message,
      [{text: 'OK'}],
    );
  };

  goHome() {
    this.props.navigation.navigate('Home');
  }

  handleCheckin() {
    console.log(this.state.checkinCode);
    if (this.state.checkinCode.length != 4) {
      Alert.alert('Not a valid code!');
      return;
    }
    fetch(AMAZON_API + '/events/scan?code=' + this.state.checkinCode)
      .then((response) => response.json())
      .then((response) => {
          console.log(response);
          if (Object.keys(response).length == 1) {
            if (response[0].opened) {
            const studentID = this.props.userData.id;
            let users = response[0].users;
            if(users.hasOwnProperty(studentID)) {
              if (users[studentID] == 'R') {
                console.log('checkin success');
                const body = JSON.stringify({
                  'id' : response[0].id,
                  'userID' : studentID,
                  'status' : 'C'
                });
                let update = fetch(AMAZON_API+'/events/userupdate',
                {   method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: body
                    })
                .then((update) => update.json())
                .then((update) => {
                    console.log(update)
                })
                .done();
                console.log('user check in success');
                this.doAlert('You have successfully checked in. Hang tight!');

              } else if (users[studentID] == 'C') {
                console.log('user already checked in');
                this.doAlert('You have already checked in. Sit tight!');
              } else if (users[studentID] == 'W') {
                console.log('user on waitlist');
                this.doAlert('You are on the waitlist.');
              } else if (users[studentID] == 'Can') {
                console.log('user cancelled');
                this.doAlert('You have cancelled your registration for this event.');
              }
            } else {
              console.log('user not registered');
              this.doAlert('You have not registered for this event.');
            }
          } else {
            console.log('checkin failed');
            this.doAlert('An error occured.');
          }
      }
    })
      .catch(err => {
        console.log('checkin error');
        console.log(err);
        this.doAlert('An error occured.');
      })
  };

  render() {
    return(
      <View style={styles.widgetContainer}>
        <Text style={styles.h1}>Event Check-in</Text>
        <Text>
          Once you arrive at the event venue, enter the 4 character code to check in!
        </Text>
        <TextInput
          autoCapitalize = 'none'
          style={styles.input}
          placeholder='####'
          onChangeText={
            (value) => this.setState({ checkinCode: value })
          }
        />
        <Button
          title='Submit'
          onPress={ this.handleCheckin.bind(this) }
        />
        <Button
          title='Back'
          onPress={ this.goHome.bind(this) }
        />
      </View>
    )
  }
};

const mapStateToProps = (state) => {
	return {
    userData: state.login.user,
  };
};

export default withNavigation(connect(mapStateToProps)(CheckinScreen));
