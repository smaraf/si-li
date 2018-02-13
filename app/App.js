import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import { store } from './config/storeConfig';
import ActiveList from './screens/active-list';
import config from './core/persistence/firebase-config';

firebase.initializeApp(config);

const RootStack = StackNavigator({
  ActiveList: {
    screen: ActiveList,
  },
});

const App = () => (
  <Provider store={store}>
    <RootStack />
  </Provider>
);

Expo.registerRootComponent(App);
