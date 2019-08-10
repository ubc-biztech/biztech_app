import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native'
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

export default class Notification extends Component {
  render() {
    return(
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: this.props.colour, alignItems: 'center' }}
        onPress={this.props.onPress}>
        <Text style={ styles.bold }>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}
