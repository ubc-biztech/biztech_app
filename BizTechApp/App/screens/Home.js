import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         ActivityIndicator } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';
import EventCard from '../components/EventCard'

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class Home extends Component {

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
			<ThemeProvider theme={theme}>
      <ScrollView>
        <View style={styles.widgetContainer}>
          <Text h2>Home</Text>
          <Text h4>Events</Text>
        </View>
        <StatusBar backgroundColor="#7ad040" barStyle="light-content" />
          {this.state && this.state.events &&
            this.state.events.map(event => {
              return (
                <EventCard key={event.id} event={event}/>
              )
            })
          }
      </ScrollView>
			</ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
	widgetContainer: {
		padding: 20,
	}
});
