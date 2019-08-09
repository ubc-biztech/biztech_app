import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Styles';

export default class MyButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.disabled ? styles.buttonDisabled : styles.button}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
