import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Image,
         Button, StatusBar, ActivityIndicator } from 'react-native';
import { AMAZON_API } from 'react-native-dotenv';

const {width, height} = Dimensions.get('window');
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

export default class EventScreen extends Component {

  getDescription(event) {
    if (event.description){
      return event.description
    } else {
      return "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
  }


  render() {
    const { navigation } = this.props
    const event = navigation.getParam('event')
    return(
			<View>
        <Image
          source={{ uri: event.img }}
          style={{ width: width, height: 240, marginBottom: 10 }}
          resizeMode="cover"
        />
        <View style={styles.widgetContainer}>
          <Text style={styles.h1}>{ event.ename }</Text>
          <Text style={styles.colour} >{ event.edate }</Text>
          <Text>{ this.getDescription(event) }</Text>
          <Button color='#7ad040' title='Sign Up'/>
        </View>
			</View>
    )
  }
}
