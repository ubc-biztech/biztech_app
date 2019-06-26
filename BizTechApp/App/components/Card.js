import React, {Component} from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Card extends Component {

  render() {
    return(
      <View style={styles.card}>
        {this.props.children}
      </View>
    )
  }

}

const styles = StyleSheet.create({
	card: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    backgroundColor: '#ffffff',
    paddingBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
	},
});
