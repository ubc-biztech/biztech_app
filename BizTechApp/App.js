import React, {Component} from 'react';
import Navigator from './App/features/Navigator';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);


export default class App extends Component {
	render() {
		return (
				<Navigator/>
		);
	}
}
