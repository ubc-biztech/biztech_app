import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

export default class Notification extends Component {

  render() {
    let textstyle = this.props.whitetext ? styles.whitebold : styles.bold;
    return (
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: this.props.colour, alignItems: 'center' }}
        onPress={this.props.onPress}>
        <Text style={textstyle}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}
