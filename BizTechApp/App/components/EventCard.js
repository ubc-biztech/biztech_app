import React, {Component} from 'react';
import { View,
         StyleSheet,
         Dimensions,
         Button,
         ActivityIndicator } from 'react-native';
import {
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

export default class EventCard extends Component {

  render() {
    return(
      <Card>
        <View style={styles.center}>
          <View style={styles.container}>
            <Image
              source={{ uri: this.props.event.img }}
              style={{ width: width/1.2, height: 200, marginBottom: 10 }}
              PlaceholderContent={<ActivityIndicator />}
              resizeMode="cover"
            />

            <Text style={{fontSize: 20, color: 'black'}}>{this.props.event.ename}</Text>
            <Text>{this.props.event.tagline}</Text>
            <Button color='#7ad040' title='Sign Up'/>

            </View>
          </View>
      </Card>
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
		width: width/1.2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection:'column'
	}
});
