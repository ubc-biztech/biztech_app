
import React, {Component} from 'react';
import {Text, View} from 'react-native';
// import { AMAZON_API } from 'react-native-dotenv'

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
    fetch('https://YEET.execute-api.us-west-2.amazonaws.com/dev/users/get?id=75129696')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userData: (response)
        })
      })
  }

  render(){
    return(
      <View>
        <Text>Profile Yeet!</Text>
      </View>
    )
  }
}

export default Profile;
