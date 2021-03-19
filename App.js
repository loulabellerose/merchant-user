import 'react-native-gesture-handler';
import React from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import loansReducer from './store/reducers/loans';
import businessReducer from './store/reducers/business';

const rootReducer = combineReducers({
  loan: loansReducer,
  business: businessReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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