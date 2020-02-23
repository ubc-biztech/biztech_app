import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'
import Button from '../components/Button'
import { connect } from 'react-redux';
import { getRegistrations, registerUser } from '../actions/Login';

class EventScreen extends Component {

  componentDidMount() {
    this.props.getRegistrations(this.props.userData.id);
  }

  state = { disableButton: false };

  getDescription(event) {
    if (event.description) {
      return event.description
    } else {
      return "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
  }

  getRegistrationStatus(eventID) {
    const regData = this.props.registration.data;
    const entry = regData.filter(entry => entry.eventID == eventID);
    if (entry.length == 1) {
      this.state.disableButton = true;
      console.log(this.state.disableButton)
      if (entry[0].registrationStatus == 'registered') {
        return 'You have registered for this event!'
      } else if (entry[0].registrationStatus == 'waitlist') {
        return 'You have been added to the waitlist for this event.'
      } else if (entry[0].registrationStatus == 'checkedin') {
        return "You've checked into this event!"
      }
    } else {
      return 'Click below to register!'
    }
  }

  handleRegistration(eventID) {
    if (!this.state.disableButton) {
      this.props.registerUser(this.props.userData.id, eventID);
    }
  }


  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.h1}>Loading Screen</Text>
        </View>
      )
    }
    const { navigation } = this.props
    const event = navigation.getParam('event')
    return (
      <View>
        <Image
          source={{ uri: event.imageUrl }}
          style={{ width: width, height: 240, marginBottom: 10 }}
          resizeMode='cover'
        />
        <View style={styles.widgetContainer}>
          <Text style={styles.h1}>{event.ename}</Text>
          <Text style={styles.colour} >{event.edate}</Text>
          <Text>{this.getDescription(event)}</Text>
          <Text style={styles.h3}>{this.getRegistrationStatus(event.id)}</Text>
          <Button title='Sign Up'
                  disabled = {this.state.disableButton}
                  onPress={this.handleRegistration.bind(this, event.id)} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.login.user,
    registration: state.login.registration,
    isLoading: state.login.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRegistrations: (id) => dispatch(getRegistrations(id)),
    registerUser: (id, eventID) => dispatch(registerUser(id, eventID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
