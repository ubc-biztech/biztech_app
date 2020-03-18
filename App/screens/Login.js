import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Register from '../components/Register'
import SignIn from '../components/SignIn'
import { ButtonGroup } from 'react-native-elements';

const theme = {
  colors: {
    primary: '#7ad040'
  }
}

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    }

    this.buttons = ['Sign In', 'Sign Up']
  }

  updateIndex() {
    // If selectedIndex was 0, make it 1.  If it was 1, make it 0
    const newIndex = this.state.selectedIndex === 0 ? 1 : 0
    this.setState({ selectedIndex: newIndex })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ScrollView>
          <ButtonGroup
            onPress={this.updateIndex.bind(this)}
            selectedIndex={this.state.selectedIndex}
            buttons={this.buttons}
          />
          {this.state.selectedIndex === 0 ? <SignIn /> : <Register />}
        </ScrollView>
      </ThemeProvider>
    )
  }

}
