import React from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Constants } from 'expo';
import reducer from './components/reducers/';
import RootView from './components/views/RootView';
import IndividualDeckView from './components/views/IndividualDeckView';
import QuizView from './components/views/QuizView';
import NewDeckView from './components/views/NewDeckView';
import NewQuestionView from './components/views/NewQuestionView';
import { clearAllDecks } from './utils/asyncAPI';
import { beige } from './utils/colours';

const MainNavigator = StackNavigator({
  Home: {
    screen: RootView
  },
  IndividualDeckView: {
    screen: IndividualDeckView
  },
  QuizView: {
    screen: QuizView
  },
  NewDeckView: {
    screen: NewDeckView
  },
  NewQuestionView: {
    screen: NewQuestionView
  }
}, {
  navigationOptions: {
    header: null
  }
})

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {

  componentDidMount() {
    // clearAllDecks();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          <View style={{ backgroundColor: beige, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={beige} barStyle='light-content' />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
