import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native'
//styling
import styles from '../styles/Styles';
import Text from '../components/Text'

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      viewable: true
    }
  }
  render() {
    let textstyle = this.props.whitetext ? styles.whitebold : styles.bold;
    return(
      <View>
        {this.state.viewable &&
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: this.props.colour, alignItems: 'center' }}
            onPress={ () => this.pressed() }>
            <Text style={ textstyle }>{this.props.children}</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

  pressed() {
    this.props.onPress ? this.props.onPress : this.setState({viewable: false})
  }
}
