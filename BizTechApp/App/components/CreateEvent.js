
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Button, ThemeProvider, Text } from 'react-native-elements';

class CreateEvent extends Component {
  constructor(){
    super();
    this.state = {
      text: 'Placeholder'
    }
  }

  componentDidMount(){
  }

  render(){
    return (
      <ThemeProvider>
        <Text h2>Create Event</Text>
        <View>
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />

        </View>
      </ThemeProvider>
    )
  }
}

export default CreateEvent;
