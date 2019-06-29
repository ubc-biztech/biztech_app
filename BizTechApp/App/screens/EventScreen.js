import React, {Component} from 'react';
import { ScrollView,
         StyleSheet,
         View,
         StatusBar,
         ActivityIndicator } from 'react-native';
import { Text,
         ThemeProvider } from 'react-native-elements';
import { AMAZON_API } from 'react-native-dotenv';

export default class EventScreen extends Component {

  render() {
    const { navigation } = this.props
    const event = navigation.getParam('event')
    return(
			<ThemeProvider>
        <Image
          source={{ uri: event.img }}
          style={{ width: width-20, height: 240, marginBottom: 10 }}
          resizeMode="cover"
        />
        <View style={styles.widgetContainer}>
          <Text h4>{ event.ename }</Text>
        </View>
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
