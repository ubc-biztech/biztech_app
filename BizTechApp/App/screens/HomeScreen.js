import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         StatusBar,
         ActivityIndicator } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';

import EventCard from '../components/EventCard'

export default class Home extends Component {
  constructor(props) {
    super(props);
    const ds = {};
    this.state = {
      refreshing: false,
      userData: ds,
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

  async fetchUser(){
    fetch(AMAZON_API+'/users/get?id=75129696')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userData: (response)
        })
      })
  }

  componentDidMount() {
    this.fetchEvents()
    this.fetchUser();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchEvents().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return(
			<ThemeProvider>
      <ScrollView>
        <View style={styles.widgetContainer}>
          <Text h2>Home</Text>
          <Text>Welcome, {this.state.userData.fname}</Text>
        </View>

        <View style={styles.center}>
          {this.state && this.state.events &&
            this.state.events.map(event => {
              return (
                <EventCard key={event.id} event={event}/>
              )
            })
          }
        </View>
      </ScrollView>
			</ThemeProvider>
    )
  }
}

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
