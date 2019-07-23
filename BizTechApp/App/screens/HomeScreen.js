import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         Button,
         StatusBar,
         ActivityIndicator } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard'

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

  // async fetchUser(){
  //   fetch(AMAZON_API+'/users/get?id=75129696')
  //     .then((response) => response.json())
  //     .then((response) => {
  //       this.setState({
  //         userData: (response)
  //       })
  //     })
  // }

  componentDidMount() {
    this.fetchEvents()
  }

  render() {
    return(
			<ThemeProvider>
      <ScrollView>
        <View style={styles.widgetContainer}>
          <Text h2>Home</Text>
          {this.props.isLoggedIn && <Text> Welcome, { this.props.userData.name } </Text>}
          {!this.props.isLoggedIn && <Text> Welcome to BizTech </Text>}
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
			</ThemeProvider>
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

const styles = StyleSheet.create({
	center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
	},
	widgetContainer: {
		padding: 20,
	}
});
