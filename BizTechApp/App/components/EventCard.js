import React, {Component} from 'react';
import { View,
         StyleSheet,
         Dimensions,
         ActivityIndicator } from 'react-native';
import { Button,
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
    console.log(this.props.event)
    return(
      <Card>
        <View style={styles.center}>
          <View style={styles.container}>
            <Image
              source={{ uri: this.props.event.img }}
              style={{ width: width/1.3, height: 200, marginBottom: 10 }}
              PlaceholderContent={<ActivityIndicator />}
              resizeMode="cover"
            />
            <Text style={{fontSize: 20}}>{this.props.event.ename}</Text>
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
		width: width/1.3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection:'column'
	}
});
