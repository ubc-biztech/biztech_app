import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Styles';

export default class MyButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.button}>
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}
