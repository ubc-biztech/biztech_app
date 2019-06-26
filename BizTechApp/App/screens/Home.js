import React, {Component} from 'react';
import { Platform,
         StyleSheet,
         Text,
         ScrollView } from 'react-native';
import { Button,
 				 Header,
				 ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';

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
        console.log(this.state.events[0].ename)
      })
  }

  componentDidMount() {
    this.fetchEvents()
  }

	render() {
		return (
			<ThemeProvider theme={theme}>
				<StatusBar backgroundColor="#7ad040" barStyle="light-content" />
        <Text>Home</Text>
        {this.state && this.state.events &&
          this.mapEvents()
        }
			</ThemeProvider>
		);
	}

  mapEvents(){
    var events = this.state.events.map(function (event) {
        return (
          <Text key={event.id}>{event.ename}</Text>
        );
     });
     return events
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	widgetContainer: {
		margin: 20,
	}
});
