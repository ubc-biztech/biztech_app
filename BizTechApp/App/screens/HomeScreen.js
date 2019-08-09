import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         Button,
         StatusBar,
         ActivityIndicator } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard'
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async fetchEvents(){
    fetch(AMAZON_API+'/events/get')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          events: response
        })
      })
  }

  componentDidMount() {
    this.fetchEvents()
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.widgetContainer}>
          <Text style={styles.h1}>Home</Text>
          {this.props.isLoggedIn && <Text>Welcome, { this.props.userData.fname } </Text>}
          {!this.props.isLoggedIn && <Text>Welcome to BizTech </Text>}
        </View>

        <View style={styles.center}>
          {this.state && this.state.events &&
            this.state.events.map(event => {
              return (
                <EventCard key={event.id} event={event}
                  onPress={() => {
                    this.props.navigation.navigate('Event', {
                      event: event })
                    }
                  }/>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
};

const mapStateToProps = (state) => {
	return {
    userData: state.login.user,
    isLoggedIn: state.login.isLoggedIn
  };
};

export default connect(mapStateToProps)(Home);
