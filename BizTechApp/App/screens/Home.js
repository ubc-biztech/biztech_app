import React, {Component} from 'react';
import { View,
         ScrollView,
         StyleSheet,
         Dimensions,
         ActivityIndicator } from 'react-native';
import { Button,
 				 Header,
         Card,
         Text,
         Image,
				 ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';

const {width, height} = Dimensions.get('window');

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
        <StatusBar backgroundColor="#7ad040" barStyle="light-content" />
          {this.state && this.state.events &&
            this.state.events.map(event => {
              console.log(event.img)
              return (
                <Card key={event.id}>
                  <View style={styles.center}>
                    <View style={styles.container}>
                      <Image
                        source={{ uri: event.img }}
                        style={{ width: width/1.3, height: 200, marginBottom: 10 }}
                        PlaceholderContent={<ActivityIndicator />}
                        resizeMode="cover"
                      />
                      <Text style={{fontSize: 20}}>{event.ename}</Text>
                      </View>
                    </View>
                </Card>
              )
            })
          }
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
	container: {
		width: width/1.3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection:'column'
	}
});
