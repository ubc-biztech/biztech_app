import React, { Component } from 'react';
import { Alert, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';

// styling
import styles from '../styles/Styles';
import Text from '../components/Text'
import Button from '../components/Button'

class CheckinScreen extends Component {
  state = { checkinCode: '' }
  doAlert(message) {
    Alert.alert(
      'Event Check-in',
      message,
      [{ text: 'OK' }],
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
        if (response.size == 1) {
          const body = JSON.stringify({
            id: this.props.userData.id,
            eventID: response.data[0].id,
            registrationStatus: 'checkedin'
          });
          console.log(body)
          fetch(AMAZON_API + '/registration/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: body
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response)
              if (response.registrationStatus == 'checkedin') {
                this.doAlert('Checked in!');
              } else {
                this.doAlert('Checkin failed, the event may be full.');
              }
            })
            .catch(err => {
              this.doAlert('An error occured.');
            })
          // TODO: Readd functionality to open/close event checkin
          // console.log('event not opened');
          // this.doAlert('Check-in for this event has not been opened yet.');

        } else if (response.size == 0) {
          console.log('no event found.');
          this.doAlert('No event with given code.');
        } else {
          //Invalid number of events in response.
          console.log('scan error');
          this.doAlert('An error occured.');
        }
      })
      .catch(err => {
        console.log('checkin error');
        console.log(err);
        this.doAlert('An error occured.');
      })
  };

  render() {
    return (
      <View style={styles.widgetContainer}>
        <Text style={styles.h1}>Event Check-in</Text>
        <Text>
          Once you arrive at the event venue, enter the 4 character code to check in!
        </Text>
        <TextInput
          autoCapitalize='none'
          style={styles.input}
          placeholder='####'
          onChangeText={
            (value) => this.setState({ checkinCode: value })
          }
        />
        <Button
          title='Submit'
          onPress={this.handleCheckin.bind(this)}
        />
        <Button
          title='Back'
          onPress={this.goHome.bind(this)}
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
