import Navigator from './App/features/Navigator';
import Amplify from '@aws-amplify/core';
import aws_exports from './aws-exports';
import React, {Component} from 'react';
import configureStore from './App/store/configureStore';


Amplify.configure(aws_exports);
const store = configureStore();

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Navigator/>
			</Provider>
		);
	}
}
