import React, { Component } from 'react';
import { ScrollView, RefreshControl, ActivityIndicator, View } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text';
import Button from '../components/Button';

import Notification from '../components/Notification';
import EventCard from '../components/EventCard';

import { populateEvents } from '../actions/Login';
import Carousel from 'react-native-snap-carousel';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchEvents().then(() => {
      this.setState({ refreshing: false });
    });
  }

  async fetchEvents() {
    console.log('home screen fetching events')
    fetch(AMAZON_API + '/events/get')
      .then((response) => {
        console.log('response AAA========>')
        console.log(JSON.stringify(response.json));
        this.props.populateEvents(response)
      })
      
  }

  componentDidMount() {
    this.props.events ? null : this.fetchEvents()
  }

  render() {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        {!this.props.isVerified &&
          <Notification
            onPress={() => this.props.navigation.navigate('Confirm')}
            colour='#ff7043'>Please confirm your account</Notification>
        }
        <View style={styles.widgetContainer}>
          <Text style={styles.h1}>Home</Text>
          {this.props.isLoggedIn && <Text>Welcome, {this.props.userData.fname} </Text>}
          {!this.props.isLoggedIn && <Text>Welcome to BizTech </Text>}
          <Button
            title='Event Check-in'
            onPress={() => this.props.navigation.navigate('Checkin')}
          />
        </View>

        {/* <View style={styles.center}>
          {this.props && this.props.events &&
            this.props.events.map(event => {
              return (
                <EventCard key={event.id} event={event}
                  onPress={() => {
                    this.props.navigation.navigate('Event', {
                      event: event
                    })
                  }
                  } />
              )
            })
          }
        </View> */}
      </ScrollView>
    )
  }
};

// objects
const mapStateToProps = (state) => {
  return {
    userData: state.login.user,
    isLoggedIn: state.login.isLoggedIn,
    isVerified: state.login.isVerified,
    events: state.login.events
  };
};
// actions
const mapDispatchToProps = (dispatch) => {
  return {
    populateEvents: (events) => dispatch(populateEvents(events))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
