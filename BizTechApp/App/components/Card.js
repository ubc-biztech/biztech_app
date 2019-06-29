import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Card extends Component {

  doNothing(){

  }
  render() {
    return(
      <TouchableOpacity
        underlayColor='#dddddd'
        style={styles.card}
        onPress={this.props.onPress}>
        <View>
          {this.props.children}
        </View>
      </TouchableOpacity>
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
