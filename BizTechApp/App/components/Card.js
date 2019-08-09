import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
//styling
import styles from '../styles/Styles';

export default class Card extends Component {

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
