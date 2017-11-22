import React from 'react';
import { StackNavigator } from 'react-navigation';
import RootView from '../components/views/RootView';
import IndividualDeckView from '../components/views/IndividualDeckView';
import QuizView from '../components/views/QuizView';
import NewDeckView from '../components/views/NewDeckView';
import NewQuestionView from '../components/views/NewQuestionView';
import SettingsView from '../components/views/SettingsView';

export const REPLACE_VIEW = 'REPLACE_VIEW';

export const MainNavigator = StackNavigator({
  Home: {
    screen: SettingsView
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
  },
  SettingsView: {
    screen: SettingsView
  }
}, {
  navigationOptions: {
    header: null
  }
});
