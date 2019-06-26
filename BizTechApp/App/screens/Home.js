import React, {Component} from 'react';
import { ScrollView,
         RefreshControl,
         StyleSheet,
         View,
         StatusBar,
         ActivityIndicator } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AMAZON_API } from 'react-native-dotenv';
import EventCard from '../components/EventCard'

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchEvents().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return(
			<ThemeProvider theme={theme}>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <View style={styles.widgetContainer}>
          <Text h2>Home</Text>
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
