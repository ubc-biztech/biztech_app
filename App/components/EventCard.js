import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import Card from './Card';
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

const { width, height } = Dimensions.get('window');

const theme = {
  colors: {
    primary: '#7ad040',
  }
}

export default class EventCard extends Component {

  render() {
    return (
      <Card
        onPress={this.props.onPress}>

        <View >
          <Image
            source={{ uri: this.props.event.imageUrl }}
            style={{
              width: width - 20,
              height: 240,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginBottom: 10
            }}
            // PlaceholderContent={<ActivityIndicator />}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <Text style={styles.h3}>{this.props.event.ename}</Text>
            <Text style={styles.colour}>{this.props.event.edate}</Text>
            <Text>{this.props.event.tagline}</Text>
          </View>

        </View>

      </Card>
    )
  }

}
