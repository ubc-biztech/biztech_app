import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from '../styles/Styles';

export default class MyText extends Component {
  render() {
    return (
      <Text style={this.props.style ? (styles.text, this.props.style) : styles.text}>
        {this.props.children}
      </Text>
    )
  }
}
