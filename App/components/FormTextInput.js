import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import Text from '../components/Text'

export default class FormTextInput extends Component {
  static propTypes = {
    showError: PropTypes.any,
    errorText: PropTypes.any,
  }

  render() {
    const { showError, errorText, ...other } = this.props;
    return (
      <View>
        <TextInput
          {...other}
        />
        <View style={{ height: 12 }}>
          {showError && errorText &&
            <Text style={{ fontSize: 9, color: 'red' }}>
              {errorText}
            </Text>
          }
        </View>
      </View>
    )
  }
}