
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ThemeProvider, Text, Input } from 'react-native-elements';

class CreateEvent extends Component {
  constructor(){
    super();
    // this.state = {}
  }

  render(){
    return (
      <ThemeProvider theme={this.props.theme}>
        <Text h2>Create Event</Text>
        <Input
          placeholder='Event Name'
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
        />
        <Button title="Submit" />
      </ThemeProvider>
    )
  }
}

export default CreateEvent;
