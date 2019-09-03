import Navigator from './App/features/Navigator';
import Amplify from '@aws-amplify/core';
import aws_exports from './aws-exports';
import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './App/reducers/Index';

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}

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