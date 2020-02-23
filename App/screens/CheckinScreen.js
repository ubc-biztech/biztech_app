import React, { Component } from 'react';
import { Alert, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { getRegistrations } from '../actions/Login';

// styling
import styles from '../styles/Styles';
import Text from '../components/Text'
import Button from '../components/Button'

class CheckinScreen extends Component {
  state = { checkinCode: '' }

  componentDidMount() {
    this.props.getRegistrations(this.props.userData.id);
  };

  doAlert(message) {
    Alert.alert(
      'Event Check-in',
      message,
      [{ text: 'OK' }],
    );
  };

  goHome() {
    this.props.navigation.navigate('Home');
  };

  checkRegistrationStatus(eventID) {
    const entry = this.props.registration.data.filter(entry => entry.eventID == eventID);
    if (entry.length == 1) {
      return entry[0].registrationStatus;
    }
    return '';
  };

  handleCheckin() {
    console.log(this.state.checkinCode);
    if (this.state.checkinCode.length != 4) {
      this.doAlert('Not a valid code!');
      return;
    }
    fetch(AMAZON_API + '/events/scan?code=' + this.state.checkinCode)
      .then((response) => response.json())
      .then((response) => {
        if (response.size == 1) {
          const status = this.checkRegistrationStatus(response.data[0].id);
          if (status == "checkedin") {
            this.doAlert('You have already checked in to this event.');
            return;
          } else if (status != "registered") {
            this.doAlert('You have not yet registered for this event.');
            return;
          }
          const body = JSON.stringify({
            id: this.props.userData.id,
            eventID: response.data[0].id,
            registrationStatus: 'checkedin'
          });
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
    if (this.props.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.h1}>Loading Screen</Text>
        </View>
      )
    }
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
    registration: state.login.registration,
    isLoading: state.login.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRegistrations: (id) => dispatch(getRegistrations(id))
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CheckinScreen));
