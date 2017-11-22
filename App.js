import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Constants } from 'expo';
import reducer from './reducers';
import { MainNavigator } from './routes/MainNavigator';
import { clearAllDecks } from './utils/asyncAPI';
import { beige } from './utils/colours';
import { clearLocalNotifications, setLocalNotification } from './utils/notificationHelpers.js';


const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {

  componentDidMount() {
    // clearAllDecks();
    // clearLocalNotifications();
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: beige, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={beige} barStyle='light-content' />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
