
import React, {Component} from 'react';
import { AMAZON_API } from 'react-native-dotenv';
import { ThemeProvider, Text } from 'react-native-elements';

class Profile extends Component {
  constructor(){
    super();
    const ds = {};
    this.state = {
      userData: ds,
    }
  }

  componentDidMount(){
    this.fetchUser();
  }

  fetchUser(){
    fetch('https://'+AMAZON_API+'.execute-api.us-west-2.amazonaws.com/dev/users/get?id=75129696')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userData: (response)
        })
      })
  }

  render(){
    return(
      <ThemeProvider>
        <Text h2>Profile</Text>
        <Text>Welcome, {this.state.userData.fname}</Text>
      </ThemeProvider>
    )
  }
}

export default Profile;
