import Navigator from './App/features/Navigator';
import Amplify from '@aws-amplify/core';
import aws_exports from './aws-exports';
import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './App/reducers/Index';
//redux-persist imports
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

function configureStore(initialState) {
  let store = createStore(
      persistedReducer,
      initialState,
      applyMiddleware(thunk)
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

Amplify.configure(aws_exports);
const { store, persistor } = configureStore();

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator/>
        </PersistGate>
			</Provider>
		);
	}
}
