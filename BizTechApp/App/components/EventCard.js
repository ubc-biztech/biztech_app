import React, {Component} from 'react';
import { View,
         StyleSheet,
         Dimensions,
         Button,
         ActivityIndicator } from 'react-native';
import { Text,
         Image,
				 ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AMAZON_API } from 'react-native-dotenv';
import Card from './Card';

const {width, height} = Dimensions.get('window');

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class EventCard extends Component {

  render() {
    return(
      <Card
        onPress={this.props.onPress}>

        <View >
          <Image
            source={{ uri: this.props.event.img }}
            style={{ width: width-20, height: 240, marginBottom: 10 }}
            // PlaceholderContent={<ActivityIndicator />}
            resizeMode="cover"
          />

            <View style={styles.content}>
              <Text style={{ fontWeight: '800', color: 'black' }}>{this.props.event.ename}</Text>
              <Text style={{ color: '#7ad040' }} >{this.props.event.edate}</Text>
              <Text style={{ marginBottom: 10 }} >{this.props.event.tagline}</Text>
              <Button color='#7ad040' title='Sign Up'/>
            </View>

        </View>

      </Card>
    )
  }

}

const styles = StyleSheet.create({
	content: {
		padding: 10,
    paddingTop: 0
	}
});
