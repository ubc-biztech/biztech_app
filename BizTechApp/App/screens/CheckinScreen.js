import React, {Component} from 'react';
import { View, TextInput } from 'react-native';
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
      checkinCode: ''
    }
  };

  handleCheckin() {
    console.log(this.state.checkinCode);
    fetch(AMAZON_API + '/events/scan?code=' + this.state.checkinCode)
      .then((response) => response.json())
      .then((response) => {
          console.log(response);
          if (Object.keys(response).length == 1) {
            const studentID = this.props.userData.id;
            console.log("checkin success");
            console.log(studentID);
          } else {
            console.log("checkin failed");
          }
      })
      .catch(err => {
        console.log("checkin error");
        console.log(err);
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
