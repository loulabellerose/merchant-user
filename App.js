import 'react-native-gesture-handler';
import React, { useState } from 'react';
//import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//Remove this before ^ production
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import LoansReducer from './store/reducers/loans';

const rootReducer = combineReducers({
  loan: LoansReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </Provider>
  );
}

export default App;